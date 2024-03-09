import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDrop } from "react-dnd";
import { CardItem } from "../CardItem/CardItem";
import { Box, Stack } from "@mui/material";

import { CardLeftSection } from "../CardLeftSection/CardLeftSection";

export const ItemTypes = {
  BOX: "box",
  SHAPE: "shape",
  TEXT: "text",
  IMAGE: "image",
};

export const CardEdit = () => {
  const [items, setItems] = useState([]);

  const [selectedCardItem, setSelectedCardItem] = useState();

  const selectedCardItemRef = useRef(null);

  const boundingBox = useRef(null);

  const onDrop = (itemData) => {
    if (itemData.position) {
      const updatedItems = items.map((item) =>
        item.uuid === itemData.uuid
          ? {
              ...item,
              left: itemData.left,
              top: itemData.top,
              position: "absolute",
            }
          : item
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { ...itemData, position: "absolute" }]);
    }
  };

  const onResize = (id, size) => {
    selectedCardItemRef.current.width = size.width;
    selectedCardItemRef.current.height = size.height;
  };

  const onTextChange = (id, text) => {
    // setSelectedCardItem((prev) => ({ ...prev, text }));
    selectedCardItemRef.current.text = text;
  };

  const onFocusOut = () => {
    if (selectedCardItemRef.current) {
      const updatedItems = items.map((item) =>
        item.uuid === selectedCardItemRef.current.uuid
          ? {
              ...selectedCardItemRef.current,
            }
          : item
      );
      setItems(updatedItems);
    }
    selectedCardItemRef.current = null;
    setSelectedCardItem(undefined);
  };

  const onClick = (e, item) => {
    e.stopPropagation();
    if (e.detail === 2) {
      selectedCardItemRef.current = item;
      setSelectedCardItem(item);
    } else {
      if (selectedCardItemRef.current) {
        if (item.uuid !== selectedCardItemRef.current.uuid) {
          onFocusOut();
        }
      }
    }
  };

  const onDeleteItem = (itemData) => {
    onFocusOut();
    setItems((prev) => prev.filter((item) => item.uuid !== itemData.uuid));
  };

  const onItemSittingsChanged = (item, inputName, value) => {
    const numValue = +value;
    if (!isNaN(numValue)) {
      value = numValue;
    }
    selectedCardItemRef.current[inputName] = value;

    const updatedItems = items.map((itm) =>
      itm.uuid === item.uuid
        ? {
            ...itm,
            [inputName]: value,
          }
        : itm
    );
    setItems(updatedItems);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      let delta = {};
      let left = 0;
      let top = 0;

      if (item.position) {
        delta = monitor.getDifferenceFromInitialOffset();
        left = Math.round(item.left + delta.x);
        top = Math.round(item.top + delta.y);
      } else {
        const offset = monitor.getClientOffset();
        const deltaX = offset.x - boundingBox.current.x - item.width / 2;
        const deltaY = offset.y - boundingBox.current.y - item.height / 2;
        left = Math.round(deltaX);
        top = Math.round(deltaY);
      }
      onDrop({
        ...item,
        left,
        top,
        uuid: item.uuid ? item.uuid : uuidv4(),
      });
      return undefined;
    },
  });

  function combinedRef(el) {
    drop(el);
    if (el) {
      boundingBox.current = el.getBoundingClientRect();
    }
  }

  return (
    <Stack sx={{ flexDirection: { sm: "column", md: "row" } }}>
      <Stack sx={{ flexDirection: { sm: "column", md: "row" }, gap: 2 }}>
        <CardLeftSection
          selectedCardItem={selectedCardItem}
          onItemSittingsChanged={onItemSittingsChanged}
        />
      </Stack>

      <Stack
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={10}
        onClick={onFocusOut}
      >
        <Box
          ref={combinedRef}
          sx={{
            position: "relative",
            width: "500px",
            height: "300px",
            border: "1px solid #000",
          }}
          overflow={"hidden"}
        >
          {items.map((item, idx) => (
            <CardItem
              key={item.uuid}
              item={{ ...item, zIndex: item.zIndex ? item.zIndex : idx }}
              text={
                selectedCardItemRef.current
                  ? selectedCardItemRef.current.text
                  : ""
              }
              size={{
                width: selectedCardItemRef.current
                  ? selectedCardItemRef.current.width
                  : item.width,
                height: selectedCardItemRef.current
                  ? selectedCardItemRef.current.height
                  : item.height,
              }}
              onDrop={onDrop}
              handleResize={onResize}
              onTextChange={onTextChange}
              selectedCardItem={selectedCardItem}
              onClick={onClick}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
