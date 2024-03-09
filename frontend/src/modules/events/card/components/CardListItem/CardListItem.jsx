import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../CardEdit/CardEdit";

import { ListItem } from "../ListItem/ListItem";

export const CardListItem = ({ item }) => {
  const [collected, drag, dragPreview] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width || item.width || 0,
      height: drag.current?.getBoundingClientRect().height || item.height || 0,
    }),
  });

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <Box
      {...collected}
      ref={drag}
      // onClick={(e) => handleClick(e, item)}
      sx={{
        width: "fit-content",
        height: "fit-content",
        cursor: "move",
        position: item.position,
        top: item.top,
        left: item.left,
      }}
    >
      <ListItem item={item} />
    </Box>
  );
};
