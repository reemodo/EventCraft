import React from "react";
import { ItemTypes } from "../CardEdit/CardEdit";

import { Shape } from "../Shape/Shape";
import { Image } from "../Image/Image";
import { Text } from "../Text/Text";

export const ListItem = ({ item }) => {
  return (
    <>
      {item.type === ItemTypes.TEXT && <Text item={item} disabled />}

      {item.type === ItemTypes.IMAGE && <Image item={item} />}

      {item.type === ItemTypes.SHAPE && <Shape item={item} />}
    </>
  );
};
