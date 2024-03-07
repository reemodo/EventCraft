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

  const showLayout = selectedItem && selectedItem.id === item.id;
  return (
    <Box
      sx={{
        position,
        left,
        top,
        width: `${width}px`,
        height: `${height}px`,

        border: "1px solid #000",
        cursor: "move",
      }}
      onClick={(e) => onClick(e, item)}
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
          onClick={() => onDelete(item)}
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      <ResizableBox
        width={"fit-content"}
        height={"fit-content"}
        onResize={onResize}
        // draggableOpts={{ grid: [25, 25] }}

        handle={
          showLayout && item.type !== "text" ? (
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
        style={{ border: showLayout ? "1px solid " : "none" }}
      >
        {children}
      </ResizableBox>
    </Box>
  );
};
