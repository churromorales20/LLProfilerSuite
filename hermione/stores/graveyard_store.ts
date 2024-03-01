import type { IGoogleLocation } from '@ll-interfaces/IAutocompleteItem';
import { defineStore } from 'pinia'

export const graveyardStore = defineStore('graveyardStore', {
  state: () => ({
    google_map_html: null as HTMLElement | null,
    google_map: null as google.maps.Map | null
  }),
  getters: {
    
  },
  actions: {

    init(elem: HTMLElement, location: IGoogleLocation){
      this.google_map_html = elem;
      let map_view_position: google.maps.LatLngLiteral = location;
      this.google_map = new google.maps.Map(this.google_map_html as HTMLElement, {
        center: { ...map_view_position },
        zoom: 14,

        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
        ],
        clickableIcons: false,
        streetViewControl: false,
        mapTypeControl: false,
        draggableCursor: "crosshair",
        fullscreenControl: false,
        minZoom: 2,

        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
        },

        gestureHandling: "greedy", // Does not need 2 fingers to move on map when using touchscreen (Not working on Firefox Mobile. Safari, not sure.)
        keyboardShortcuts: false,
      });

      new google.maps.Marker({
        position: location,
        map: this.google_map,
        title: "Hello World!",
      });
    }
  },
})
