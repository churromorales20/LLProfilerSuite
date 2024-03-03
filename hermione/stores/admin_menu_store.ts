import { defineStore } from 'pinia'

export const adminMenuStore = defineStore('adminMenuStore', {
  state: () => ({
    is_opened: false as boolean,
  }),
  getters: {
    isOpened: (state) => {
      return state.is_opened;
    },
  },
  actions: {
    toggleStatus() {
      this.is_opened = !this.is_opened;

      if (!this.is_opened) {
        document.removeEventListener('click', this.outSideClickHandler);
      }
    },
    setListener(){
      document.addEventListener('click', this.outSideClickHandler);
    },
    outSideClickHandler (event: MouseEvent) {

      const menuElem = document.getElementById('_ll_menu_left_');
      const targetElement = event.target as HTMLElement;

      if (!menuElem?.contains(targetElement)) {
        console.log('OUT');

        this.toggleStatus();
      }
    }
  },
})
