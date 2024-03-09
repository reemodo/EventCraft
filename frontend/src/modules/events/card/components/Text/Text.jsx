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
      {!disabled && (
        <Box
          component={ContentEditable}
          innerRef={contentEditableRef}
          html={text && item.uuid === selectedCardItem.uuid ? text : item.text}
          disabled={!selectedCardItem}
          minWidth={50}
          minHeight={20}
          onChange={(e) => onTextChange(item.id, e.target.value)}
          sx={{
            fontSize: item.fontSize,
            textDecoration: item.decoration ?? "",
            fontWeight: item.weight,
            fontFamily: item.fontFamily,
            ...parseCssStyles(item.style),
          }}
        />
      )}
    </>
  );
};
