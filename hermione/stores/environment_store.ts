import { defineStore } from 'pinia'

export const environmentStore = defineStore('environmentStore', {
  state: () => ({
    profiles_url: '' as string,
  }),
  getters: {
    profilesUrl: (state) => {
      return state.profiles_url;
    },
  },
  actions: {
    setProfileUrl(url: string) {
      this.profiles_url = url;
    },
  },
})
