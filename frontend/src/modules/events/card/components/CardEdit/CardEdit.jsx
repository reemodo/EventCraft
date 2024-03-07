import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDrop } from "react-dnd";
import { CardItem } from "../CardItem/CardItem";
import { Box, Stack } from "@mui/material";
import { CardEditSidBar } from "../CardEditSidBar/CardEditSidBar";
import { CardItemSittings } from "../CardItemSittings/CardItemSittings";

export const ItemTypes = {
  BOX: "box",
};

export const CardEdit = () => {
  const [items, setItems] = useState([]);

  const [selectedCardItem, setSelectedCardItem] = useState();

  const selectedCardItemRef = useRef(null);

  const boundingBox = useRef(null);

  const handleDrop = (itemData) => {
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

  const handleResize = (id, size) => {
    selectedCardItemRef.current.width = size.width;
    selectedCardItemRef.current.height = size.height;
  };

  const handleTextChange = (id, text) => {
    // setSelectedCardItem((prev) => ({ ...prev, text }));
    selectedCardItemRef.current.text = text;
  };

  const handleFocusOut = () => {
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

  const handleClick = (e, item) => {
    e.stopPropagation();
    if (e.detail === 2) {
      selectedCardItemRef.current = item;
      setSelectedCardItem(item);
    } else {
      if (selectedCardItemRef.current) {
        if (item.uuid !== selectedCardItemRef.current.uuid) {
          handleFocusOut();
        }
      }
    }
  };

  const handleDeleteItem = (itemData) => {
    handleFocusOut();
    setItems((prev) => prev.filter((item) => item.uuid !== itemData.uuid));
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
      handleDrop({
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
        <CardEditSidBar />
        <CardItemSittings cardItem={selectedCardItem} />
      </Stack>
      <Stack
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={10}
        onClick={handleFocusOut}
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
              item={item}
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
              onDrop={handleDrop}
              handleResize={handleResize}
              handleTextChange={handleTextChange}
              selectedCardItem={selectedCardItem}
              handleClick={handleClick}
              handleDeleteItem={handleDeleteItem}
              zIndex={idx}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
