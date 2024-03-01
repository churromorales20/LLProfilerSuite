import { LLPlacesAutocomplete } from "~/server/utils/places_autocomplete";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const query = getQuery(event)
  const placeAutocompleter = new LLPlacesAutocomplete();

  const placeDetails = await placeAutocompleter.placeInfo(`${query.place_id}`, `${query.session}`)
  const response = {
    data: placeDetails
  };

  node.res.end(JSON.stringify(response));
})
