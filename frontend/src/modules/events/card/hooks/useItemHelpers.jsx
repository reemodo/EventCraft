import React, { useCallback, useState } from "react";
import {
  useAddCardItemMutation,
  useDeleteCardItemMutation,
  useUpdateCardItemMutation,
} from "../api/cardItem.api";

export const useItemHelpers = () => {
  const [pendingAddItem, setPendingAddItem] = useState(false);
  const [pendingUpdateItem, setPendingUpdateItem] = useState(false);
  const [pendingDeleteItem, stePendingDeleteItem] = useState(false);

  const [addCardItem] = useAddCardItemMutation();
  const [updateCardItem] = useUpdateCardItemMutation();
  const [deleteCardItem] = useDeleteCardItemMutation();

  const addItem = useCallback(
    async (item) => {
      try {
        setPendingAddItem(true);
        const createdItem = await addCardItem(item);
        return createdItem.data;
      } catch (err) {
        return null;
      } finally {
        setPendingAddItem(false);
      }
    },
    [addCardItem]
  );

  const updateItem = useCallback(
    async (item) => {
      try {
        setPendingUpdateItem(true);
        const newItem = { ...item };
        const createdItem = await updateCardItem(newItem);
        return createdItem.data;
      } catch (err) {
        return null;
      } finally {
        setPendingUpdateItem(false);
      }
    },
    [updateCardItem]
  );

  const removeItem = useCallback(
    async ({ itemId, cardId }) => {
      try {
        stePendingDeleteItem(true);
        const createdItem = await deleteCardItem({ itemId, cardId });
        return createdItem.data;
      } catch (err) {
        return null;
      } finally {
        stePendingDeleteItem(false);
      }
    },
    [deleteCardItem]
  );
  return {
    addItem,
    removeItem,
    updateItem,
    pendingAddItem,
    pendingUpdateItem,
    pendingDeleteItem,
  };
};
