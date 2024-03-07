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
  selectedCardItem,
  handleResize,
  handleClick,
  handleDeleteItem,
  handleTextChange,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width ?? 0,
      height: drag.current?.getBoundingClientRect().height ?? 0,
    }),
  });

  const Item = () => {
    const contentEditableRef = useRef(null);

    if (item.type === "text") {
      return (
        <Box
          component={ContentEditable}
          innerRef={contentEditableRef}
          html={text ? text : item.text}
          disabled={!selectedCardItem}
          minWidth={50}
          minHeight={20}
          onChange={(e) => handleTextChange(item.id, e.target.value)}
        />
      );
    } else if (item.type === "image") {
      return (
        <CardItemWrapper
          item={item}
          onChange={handleResize}
          selectedItem={selectedCardItem}
          onClick={handleClick}
          onDelete={handleDeleteItem}
        >
          <Box
            ref={drag}
            component={"img"}
            sx={{
              width: `${item.width}px`,
              height: `${item.height}px`,

              overflow: "hidden",
              cursor: "move",
            }}
            src={item.img}
            alt="card image"
          />
        </CardItemWrapper>
      );
    }
  };

  const showLayout = selectedCardItem && selectedCardItem.id === item.id;
  return (
    <Box
      ref={drag}
      onClick={(e) => handleClick(e, item)}
      sx={{
        width: "fit-content",
        height: "fit-content",

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
