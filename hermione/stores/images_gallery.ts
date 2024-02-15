import { defineStore } from 'pinia'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export const imagesGalleryStore = defineStore('imagesGalleryStore', {
  state: () => ({
    gallery: null as PhotoSwipeLightbox | null,
  }),
  getters: {
    /*isWorking: (state) => {
      return state.is_working;
    },*/
  },
  actions: {
    init(){
      if (this.gallery !== null) {
        this.gallery!.destroy()
      }
      this.gallery = new PhotoSwipeLightbox({
        gallery: '#_profile_gallery_images_',
        children: '.image-profile',
        pswpModule: () => import('photoswipe')
      });

      this.gallery.init();
    }
  },
})
