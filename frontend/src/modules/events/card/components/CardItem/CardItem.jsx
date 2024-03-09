import { useRef } from "react";

import { Box, IconButton } from "@mui/material";

import { useDrag } from "react-dnd";

import { ItemTypes } from "../CardEdit/CardEdit";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { Item } from "../Item/Item";

export const CardItem = ({
  item,
  text,
  size,
  selectedCardItem,
  onResize,
  onClick,
  onDeleteItem,
  onTextChange,
}) => {
  const [collected, drag, dragPreview] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width || item.width || 0,
      height: drag.current?.getBoundingClientRect().height || item.height || 0,
    }),
  });

  const placeholderRef = useRef(null);

  const showLayout = selectedCardItem && selectedCardItem.uuid === item.uuid;

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <Box
      {...collected}
      ref={!showLayout ? drag : placeholderRef}
      onClick={(e) => onClick(e, item)}
      sx={{
        width: "fit-content",
        height: "fit-content",
        zIndex: item.zIndex,
        cursor: "move",
        position: item.position,
        top: item.top,
        left: item.left,
      }}
    >
      {showLayout && (
        <IconButton
          sx={{
            borderRadius: "50%",
            position: "absolute",
            top: -8,
            left: -8,
            width: 15,
            height: 15,
          }}
          color="error"
          onClick={() => onDeleteItem(item)}
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      <Item
        item={item}
        onClick={onClick}
        selectedCardItem={selectedCardItem}
        onDeleteItem={onDeleteItem}
        size={size}
        text={text}
        onTextChange={onTextChange}
        onResize={onResize}
      />
    </Box>
  );
};
