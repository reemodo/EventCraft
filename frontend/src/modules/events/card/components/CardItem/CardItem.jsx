import { useRef, useState } from "react";

import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";

import { useDrag } from "react-dnd";

import { ItemTypes } from "../CardEdit/CardEdit";

import CloseIcon from "@mui/icons-material/Close";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
  card,
}) => {
  const [collected, drag, dragPreview] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width || item.width || 0,
      height: drag.current?.getBoundingClientRect().height || item.height || 0,
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const them = useTheme();

  const placeholderRef = useRef(null);

  const showLayout = selectedCardItem && selectedCardItem.uuid === item.uuid;

  const [open, setOpen] = useState(false);

  const onCloseTooltip = (e) => {
    if (open) {
      setOpen(false);
    }
    return null;
  };

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <Tooltip
      open={open}
      title={
        <Box>
          <IconButton
            sx={{
              borderRadius: "50%",
              float: "right",
            }}
            onClick={(e) => {
              onCloseTooltip(e);
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: "50%",
              float: "right",
            }}
            color="error"
            onClick={(e) => {
              onCloseTooltip(e);
              onDeleteItem(item);
            }}
            size="small"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      }
    >
      <Box
        ref={!showLayout ? drag : placeholderRef}
        sx={{
          width: "fit-content",
          height: "fit-content",
          zIndex: item.zIndex,
          cursor: "move",
          position: item.position,
          top: item.top,
          left: item.left,
          opacity: collected.opacity,
        }}
      >
        <Item
          item={item}
          onClick={(e) => {
            onClick(e, item);
            setOpen(true);
          }}
          selectedCardItem={selectedCardItem}
          onDeleteItem={onDeleteItem}
          size={size}
          text={text}
          onTextChange={onTextChange}
          onResize={onResize}
        />
      </Box>
    </Tooltip>
  );
};
