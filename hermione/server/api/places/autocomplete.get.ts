import { LLPlacesAutocomplete } from "~/server/utils/places_autocomplete";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const query = getQuery(event)
  const placeAutocompleter = new LLPlacesAutocomplete();

  const placesInfo = await placeAutocompleter.fetch({
    term: `${query.term}`,
    type: 'cemetery',
    session: query.session ? `${query.session}` : ''
  })
  const response = {
    data: placesInfo
  };

  node.res.end(JSON.stringify(response));
})
