import { Box, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";

import ContentEditable from "react-contenteditable";

import { ItemTypes } from "../CardEdit/CardEdit";
import { CardItemWrapper } from "../CardItemWrapper/CardItemWrapper";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRef } from "react";

export const CardItem = ({
  item,
  text,
  size,
  selectedCardItem,
  handleResize,
  handleClick,
  handleDeleteItem,
  handleTextChange,
  handleDrawerClose,
  zIndex,
}) => {
  const [collected, drag, dragPreview] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width || item.width || 0,
      height: drag.current?.getBoundingClientRect().height || item.height || 0,
    }),
    start: () => {
      handleDrawerClose();
    },
  });

  const placeholderRef = useRef(null);

  const Item = () => {
    const contentEditableRef = useRef(null);

    if (item.type === "text") {
      return (
        <Box
          component={ContentEditable}
          innerRef={contentEditableRef}
          html={text && item.uuid === selectedCardItem.uuid ? text : item.text}
          disabled={!selectedCardItem}
          minWidth={50}
          minHeight={20}
          onChange={(e) => handleTextChange(item.id, e.target.value)}
          sx={{
            fontSize: item.fontSize,
            textDecoration: item.decoration ?? "",
          }}
        />
      );
    } else if (item.type === "image") {
      return (
        <CardItemWrapper
          item={{ ...item, ...size }}
          onChange={handleResize}
          selectedItem={selectedCardItem}
          onClick={handleClick}
          onDelete={handleDeleteItem}
        >
          <Box
            component={"img"}
            sx={{
              width: item.width,
              height: item.height,
              overflow: "hidden",
            }}
            src={item.src}
            alt="card image"
          />
        </CardItemWrapper>
      );
    }
  };

  const showLayout = selectedCardItem && selectedCardItem.uuid === item.uuid;
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <Box
      {...collected}
      ref={!showLayout ? drag : placeholderRef}
      onClick={(e) => handleClick(e, item)}
      sx={{
        width: "fit-content",
        height: "fit-content",
        zIndex,
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
          onClick={() => handleDeleteItem(item)}
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      <Item />
    </Box>
  );
};
