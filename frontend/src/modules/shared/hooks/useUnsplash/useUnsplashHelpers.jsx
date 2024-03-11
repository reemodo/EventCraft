import { useCallback } from "react";

import { useLazyGetPhotosQuery } from "../../../shared/apis/unsplash.api";

export const useUnsplashHelpers = () => {
  const [getPhotosQuery, { isLoading: pendingPhotos }] =
    useLazyGetPhotosQuery();

  const getPhotos = useCallback(
    async ({ search }) => {
      try {
        const photos = await getPhotosQuery({ search });
        return photos.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
    [getPhotosQuery]
  );

  return {
    getPhotos,
    pendingPhotos,
  };
};
