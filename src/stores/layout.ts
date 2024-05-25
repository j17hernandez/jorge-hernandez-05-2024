import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    showSidebar: true
  }),
  actions: {
    openOrCloseSidebar(value: boolean) {
      this.showSidebar = value
    }
  }
})
