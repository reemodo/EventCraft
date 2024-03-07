import React from "react";
import { ItemTypes } from "../CardEdit/CardEdit";
import { useDrag } from "react-dnd";

export const CardListItem = ({ item }) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width ?? 0,
      height: drag.current?.getBoundingClientRect().height ?? 0,
    }),
  });
  return <div>CardListItem</div>;
};
