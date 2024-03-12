import React from "react";

import { Box } from "@mui/material";

import { ResizableBox } from "react-resizable";

import { parseCssStyles } from "../../../../shared/utils";

export const CardItemWrapper = ({
  onChange,
  children,
  item,
  selectedItem,
  onClick,
}) => {
  const { width, height } = item;

  const onResize = (event, { element, size, handle }) => {
    onChange(item.id, size);
  };

  const showLayout = selectedItem && selectedItem.uuid === item.uuid;
  return (
    <Box
      sx={{
        width: `${width}px`,
        height: `${height}px`,

        // border: "1px solid #000",
        cursor: "move",
      }}
      onClick={(e) => onClick(e, item)}
    >
      <ResizableBox
        width={+width}
        height={+height}
        onResize={onResize}
        // draggableOpts={{ grid: [25, 25] }}
        axis="both"
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
        style={{
          border: showLayout ? "1px solid " : "none",
          ...parseCssStyles(item.cssStyle),
          overflow: "hidden",
        }}
      >
        {children}
      </ResizableBox>
    </Box>
  );
};
