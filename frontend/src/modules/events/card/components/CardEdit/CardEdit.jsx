import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDrop } from "react-dnd";
import { CardItem } from "../CardItem/CardItem";
import { Box, Stack } from "@mui/material";

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
    <Stack
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
      onClick={handleFocusOut}
    >
      <Stack sx={{ flexDirection: { xs: "row", sm: "column" }, gap: 2 }}>
        <CardItem
          item={{
            id: "1",
            type: "text",
            left: 0,
            top: 0,
            position: "",
            text: "text",
          }}
        />
        <CardItem
          item={{
            id: "2",
            type: "image",
            left: 0,
            top: 0,
            src: "https://images.pexels.com/photos/19400187/pexels-photo-19400187/free-photo-of-a-car-in-a-desert.jpeg",
            position: "",
            width: 150,
            height: 150,
          }}
        />
      </Stack>
      <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Box
          ref={combinedRef}
          sx={{
            position: "relative",
            width: "500px",
            height: "300px",
            border: "2px solid #000",
          }}
          overflow={"hidden"}
        >
          {items.map((item, idx) => (
            <CardItem
              key={item.id}
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
