import { Box } from "@mui/material";
import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { parseCssStyles } from "../../../../shared/utils";

export const Text = ({
  item,
  disabled,
  selectedCardItem,
  text,
  onTextChange,
}) => {
  const contentEditableRef = useRef(null);
  return (
    <>
      {disabled && (
        <Box
          sx={{
            fontSize: item.fontSize,
            textDecoration: item.decoration ?? "",
            fontWeight: item.weight,
            fontFamily: item.fontFamily,
            color: item.color,
            ...parseCssStyles(item.cssStyle || ""),
          }}
        >
          {item.text}
        </Box>
      )}
      {!disabled && (
        <Box
          component={ContentEditable}
          innerRef={contentEditableRef}
          html={text && item.uuid === selectedCardItem.uuid ? text : item.text}
          disabled={!selectedCardItem}
          onChange={(e) => onTextChange(item.id, e.target.value)}
          style={{ ...parseCssStyles(item.cssStyle || ""), color: item.color }}
          sx={{
            fontSize: item.fontSize,
            textDecoration: item.decoration ?? "",
            fontWeight: item.weight,
            fontFamily: item.fontFamily,
          }}
        />
      )}
    </>
  );
};
