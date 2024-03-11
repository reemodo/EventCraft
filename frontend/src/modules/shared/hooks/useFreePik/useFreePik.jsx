import { useCallback, useState } from "react";
import { useLazyGetShapesQuery } from "../../apis/unsplash.api";

export const useFreePik = () => {
  const [pendingGetShapes, setPendingGetShapes] = useState(false);

  const [getShapesApi] = useLazyGetShapesQuery();

  const getShapes = useCallback(
    async (filter) => {
      setPendingGetShapes(true);
      try {
        const shapes = await getShapesApi(filter);

        return shapes.data.data.map((item) => ({
          url: item.thumbnails[0].url,
          id: item.id,
        }));
      } catch (err) {
        console.error(err);
        return [];
      } finally {
        setPendingGetShapes(false);
      }
    },
    [getShapesApi]
  );

  return { getShapes, pendingGetShapes };
};
