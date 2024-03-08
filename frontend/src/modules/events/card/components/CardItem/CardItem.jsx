import { useRef } from "react";

import { Box, IconButton } from "@mui/material";

import { useDrag } from "react-dnd";

import ContentEditable from "react-contenteditable";

import { parseCssStyles } from "../../../../shared/utils";

import { ItemTypes } from "../CardEdit/CardEdit";
import { CardItemWrapper } from "../CardItemWrapper/CardItemWrapper";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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

    return (
      <>
        {item.type === ItemTypes.TEXT && (
          <Box
            component={ContentEditable}
            innerRef={contentEditableRef}
            html={
              text && item.uuid === selectedCardItem.uuid ? text : item.text
            }
            disabled={!selectedCardItem}
            minWidth={50}
            minHeight={20}
            onChange={(e) => handleTextChange(item.id, e.target.value)}
            sx={{
              fontSize: item.fontSize,
              textDecoration: item.decoration ?? "",
              fontWeight: item.weight,
              fontFamily: item.fontFamily,
              ...parseCssStyles(item.style),
            }}
          />
        )}

        {item.type === ItemTypes.IMAGE && (
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
                width: `${+item.width}px`,
                height: `${+item.height}px`,
                overflow: "hidden",
                borderRadius: `${+item.radios}px`,
              }}
              src={item.src}
              alt="card image"
            />
          </CardItemWrapper>
        )}

        {item.type === ItemTypes.SHAPE && (
          <CardItemWrapper
            item={{ ...item, ...size }}
            onChange={handleResize}
            selectedItem={selectedCardItem}
            onClick={handleClick}
            onDelete={handleDeleteItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 50"
              height="100%"
              width="100%"
              style={{
                fill: "currentColor",
                color: "green",
              }}
            >
              {/* <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2zm0 4h2v2h-2z" /> */}
              {/* <path d="m 20 0 L 50 50 l -50 0 l 20 -50" /> */}
              <path d="m 50 -13 l 50 78 L -1 65 " />
              {/* <rect x="10%" y="10%" width="80%" height="80%" /> */}
            </svg>
          </CardItemWrapper>
        )}
      </>
    );
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
