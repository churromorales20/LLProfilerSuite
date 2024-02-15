import { defineStore } from 'pinia'

export const imagesPickerStore = defineStore('imagesPickerStore', {
  state: () => ({
    error_code: null as number | null,
    is_working: false as boolean,
    cropper_src: null as string | null,
    show_image_icon: false as boolean,
    is_image_working: false as boolean,
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
    showImageIcon: (state) => {
      return state.show_image_icon;
    },
    showCropper: (state) => {
      return state.cropper_src !== null;
    },
    cropperSrc: (state) => {
      return state.cropper_src;
    },
    imageWorking: (state) => {
      return state.is_image_working;
    },
  },
  actions: {
    setShowImageIcon(status: boolean) {
      this.show_image_icon = status;
    },
    setCropperSrc(value: string | null) {
      this.cropper_src = value;
    },
    setWorking(status: boolean){
      this.is_image_working = status;
    }
  },
})
