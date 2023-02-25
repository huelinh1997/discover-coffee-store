import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee store",
    page: 1,
    perPage: 30,
  });
  const unsplashResult = photos.response.results;
  return unsplashResult.map((result) => result.urls["small"]);
};

const getUrlCoffeeStore = () => {
  return;
};
export const getListCoffee = async (
  latLong = "11.938765380515518,108.44223399584486",
  limit = 6,
  query = "coffee"
) => {
  const photos = await getListCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FOURSQUARE_API_URL}/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`,
    options
  );

  const data = await response.json();

  return (data?.results || []).map((result, index) => ({
    ...result,
    id: result.fsq_id,
    imgUrl: photos.length ? photos[index] : null,
    address: result?.location?.address || null,
    region: result?.location?.region || null,
    upvote: result?.upvote || null,
  }));
};
