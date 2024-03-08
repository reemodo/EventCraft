import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

import ContentEditable from "react-contenteditable";

import { ItemTypes } from "../CardEdit/CardEdit";

import { useRef } from "react";

export const CardListItem = ({ item }) => {
  const [collected, drag, dragPreview] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({
      ...item,
      width: drag.current?.getBoundingClientRect().width || item.width || 0,
      height: drag.current?.getBoundingClientRect().height || item.height || 0,
    }),
  });

  const Item = () => {
    const contentEditableRef = useRef(null);

    return (
      <>
        {item.type === ItemTypes.TEXT && (
          <Box
            component={ContentEditable}
            innerRef={contentEditableRef}
            html={item.text}
            disabled={true}
            minWidth={50}
            minHeight={20}
            sx={{
              fontSize: item.fontSize,
              textDecoration: item.decoration ?? "",
            }}
          />
        )}

        {item.type === ItemTypes.IMAGE && (
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
        )}

        {item.type === ItemTypes.SHAPE && (
          <Box
            as={"svg"}
            sx={{
              width: item.width,
              height: item.height,
              overflow: "hidden",
            }}
            alt="card image"
          >
            <circle
              cx={`${item.width}`}
              cy={`${item.height}`}
              r="50"
              fill={item.color || "gray"}
            />
          </Box>
        )}
      </>
    );
  };

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
      <Item />
    </Box>
  );
};
