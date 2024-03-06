import React from "react";

import { Box, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { ResizableBox } from "react-resizable";

export const CardItemWrapper = ({
  onChange,
  children,
  item,
  selectedItem,
  onClick,
  onDelete,
}) => {
  const { position, left, top, width, height } = item;

  const onResize = (event, { element, size, handle }) => {
    onChange(item.id, size);
  };
  return (
    <Box
      sx={{
        position,
        left,
        top,
        width: `${width}px`,
        height: `${height}px`,
        background: "lightblue",
        border: "1px solid #000",
        cursor: "move",
      }}
      onClick={(e) => onClick(e, item)}
    >
      {selectedItem && selectedItem.id === item.id && (
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
          onClick={() => onDelete(item)}
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      <ResizableBox
        width={item.width}
        height={item.height}
        onResize={onResize}
        // draggableOpts={{ grid: [25, 25] }}
        handle={
          selectedItem && selectedItem.id === item.id ? (
            <span
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                backgroundColor: "#1153aa",
                opacity: 0.75,
                borderRadius: "4px",
                bottom: "-4px",
                right: "-4px",
                cursor: "se-resize",
              }}
            />
          ) : (
            <></>
          )
        }
        axis="both"
      >
        {children}
      </ResizableBox>
    </Box>
  );
};
