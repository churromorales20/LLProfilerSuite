import { defineStore } from 'pinia'
import type { IUserInfo, UserInfoFields } from '@ll-interfaces/IUserInfo';
import type { ILoginResponse } from '@ll-interfaces/ILoginResponse';
import type { IShippingAddress } from '@ll-interfaces/IShippingAddress';
import type { ICreditCard } from '@ll-interfaces/ICreditCard';
import isEmptyString from '~/utils/isEmptyString';
import { internalApiFetcher } from '@ll-fetchers/internalApiFetcher';
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import type { IOrder } from '@ll-interfaces/IOrder';

export const shoppingStore = defineStore('shoppingStore', {
  state: () => ({
    error_code: null as number | null,
    shipping_view_step: 1 as number,
    shipping_view_next_step: 0 as number,
    is_working: true as boolean,
    is_user_authenticated: false as boolean,
    items_verified: false as boolean,
    terms_conditions: false as boolean,
    in_modal: false as boolean,
    order: null as null | IOrder,
    user_info: {
      last_name: '',
      first_name: '',
      email: '',
    } as IUserInfo,
    memorial_info: {
      last_name: '',
      first_name: ''
    } as IUserInfo,
    shipping_address_list: [] as IShippingAddress[],
    shipping_address_selected: 0 as number,
    shipping_address: {
      address_line_1: '',
      city: '',
      state: '',
      reference: '',
      postal_code: '',
      country: '',
    } as IShippingAddress,
    credit_card: {
      card_number: '',
      cardholder_name: '',
      expiration_date: '',
      cvv: '',
    } as ICreditCard,
    is_valid: false as boolean
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    addressList: (state) => {
      return state.shipping_address_list;
    },
    orderData: (state) => {
      return state.order;
    },
    inModal: (state) => {
      return state.in_modal;
    },
    shippingViewStep: (state) => {
      return state.shipping_view_step;
    },
    shippingSelectedAddress: (state) => {
      return state.shipping_address_selected!;
    },
    subTotal: (state) => {
      return state.order?.items.reduce((accumulator, item) => {
        return accumulator + item.price;
      }, 0);
    },
    totalDiscount: (state) => {
      return state.order?.items.reduce((accumulator, item) => {
        return accumulator + item.discount;
      }, 0);
    },
    isValid: (state) => {
      return state.is_valid;
    },
    areItemsVerified: (state) => {
      return state.items_verified
    },
    isUserAuthenticated: (state) => {
      return state.is_user_authenticated;
    },
    userWholeName: (state) => {
      return `${state.user_info.first_name} ${state.user_info.last_name}`;
    },
    userInfo: (state) => {
      return state.user_info;
    },
    creditCard: (state) => {
      return state.credit_card;
    },
    shippingAddress: (state) => {
      return state.shipping_address;
    },
    memorialInfo: (state) => {
      return state.memorial_info;
    },
    userEmail: (state) => {
      return `${state.user_info.email}`;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
  },
  actions: {
    seletedAddress(selection: number) {
      this.shipping_address_selected = selection;
    },
    shippingMoveNextStep() {
      
      this.shipping_view_step = this.shipping_view_next_step;
      this.shipping_view_next_step = 0;
      this.validate();
    },
    shippingMovetStep(step: number) {
      this.shipping_view_step = 0;
      this.shipping_view_next_step = step;
      this.shipping_address_selected = 0;
    },
    setInModal(inModal: boolean) {
      this.in_modal = inModal;
    },
    validateCreditCard(): boolean {
      const creditCardRegex = /^(\d{4}[\s-]?){3}\d{4}$/;
      const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;
      return creditCardRegex.test(this.credit_card.card_number!) &&
        !isEmptyString(this.credit_card.cardholder_name!) &&
        expirationDateRegex.test(this.credit_card.expiration_date!) &&
        cvvRegex.test(this.credit_card.cvv!);
    },
    validate(isCardValidated: boolean = false) {
      if (!this.is_user_authenticated &&
        (
          isEmptyString(this.user_info.first_name!) ||
          isEmptyString(this.user_info.last_name!) ||
          isEmptyString(this.user_info.email!)
        )) {

        this.is_valid = false;
        return;

      } else if (isEmptyString(this.memorial_info.first_name!) ||
        isEmptyString(this.memorial_info.last_name!)) {
        this.is_valid = false;
        return;

      } else if (
          (this.shipping_address_selected === 0 && this.shipping_view_step === 3) ||
          (isEmptyString(this.shipping_address.address_line_1!) ||
            isEmptyString(this.shipping_address.city!) ||
            isEmptyString(this.shipping_address.state!) ||
            isEmptyString(this.shipping_address.postal_code!) ||
            isEmptyString(this.shipping_address.country!
          )
        )
      ) {
        this.is_valid = false;
        return;

      } else if (!isCardValidated && !this.validateCreditCard()) {
        this.is_valid = false;
        return;
      } else if (!this.terms_conditions) {
        this.is_valid = false;
        return;
      }

      this.is_valid = true;
    },
    setInvalid() {
      this.is_valid = false;
    },
    emptyUserEmail() {
      this.user_info.email = '';
    },
    changeUser() {
      const authCookie = useCookie('_LL_FRAMEWORK_INFO_')
      authCookie.value = null;
      this.is_user_authenticated = false;
      this.user_info = {} as IUserInfo;
      this.shipping_address_list = [];
      this.shipping_address_selected = 0;

      if (this.shipping_view_step !== 2) {
        this.shippingMovetStep(2);
      }
    },
    checkAuthuser(moveShipping: boolean = true) {
      const authCookie = useCookie('_LL_FRAMEWORK_INFO_');
      if (authCookie.value && authCookie.value !== null) {
        this.is_user_authenticated = true;
        this.user_info = (authCookie?.value! as unknown as ILoginResponse).user;
        this.fetchAddresses();
      } else if (moveShipping) {
        this.shippingMovetStep(2);
      }
    },
    updateCardInfo(cardInfo: ICreditCard) {
      this.credit_card = cardInfo;
    },
    async getOrCreateCart(): Promise<boolean> {
      let result = false;
      try {
        const route = useRoute()

        const response = await internalApiFetcher.get<IOrder>(`shopping?order=${route.query.order ? route.query.order : ''}`);

        if (response.code) {
          const error: ILLApiError<IOrder> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        this.order = response.data!
        result = true;
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
      }

      this.is_working = false

      return result;
    },
    async fetchAddresses() {
      let result = false;
      try {
        const route = useRoute()

        const response = await internalApiFetcher.get<IShippingAddress[]>(`auth/user/addresses`);

        if (response.code) {
          const error: ILLApiError<IShippingAddress[]> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        this.shipping_address_list = response.data!

        let addressNextStep = 2;
        
        if (this.shipping_address_list.length > 0) {
          addressNextStep = 3;
        }

        setTimeout(() => {
          this.shippingMovetStep(addressNextStep);
        }, 500);

        result = true;
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
      }

      this.is_working = false

      return result;
    }
  },
})
