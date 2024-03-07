import React, { useRef, useState } from "react";

import { useDrop } from "react-dnd";
import { CardItem } from "../CardItem/CardItem";
import { Box, Stack } from "@mui/material";
import { CardItemWrapper } from "../CardItemWrapper/CardItemWrapper";

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
        item.id === itemData.id
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

  const handleDeleteItem = (itemData) => {
    setItems((prev) => prev.filter((item) => item.id !== itemData.id));
  };

  const handleResize = (id, size) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            width: size.width,
            height: size.height,
          }
        : item
    );
    setItems(updatedItems);
  };

  const handleTextChange = (id, text) => {
    // setSelectedCardItem((prev) => ({ ...prev, text }));
    selectedCardItemRef.current.text = text;
  };

  const handleClick = (e, item) => {
    e.stopPropagation();
    if (e.detail === 2) {
      selectedCardItemRef.current = item;
      setSelectedCardItem(item);
    }
  };

  const handleFocusOut = () => {
    if (selectedCardItemRef.current) {
      const updatedItems = items.map((item) =>
        item.id === selectedCardItemRef.current.id
          ? {
              ...item,
              text: selectedCardItemRef.current.text,
            }
          : item
      );
      setItems(updatedItems);
    }
    selectedCardItemRef.current = null;
    setSelectedCardItem(undefined);
  };

  //   const boundingBox = useRef(null);

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
      handleDrop({ ...item, left, top });
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
            src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
            position: "",
            width: 150,
            height: 50,
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
          {items.map((item) => (
            <CardItem
              key={item.id}
              item={item}
              text={
                selectedCardItemRef.current
                  ? selectedCardItemRef.current.text
                  : ""
              }
              onDrop={handleDrop}
              handleResize={handleResize}
              handleTextChange={handleTextChange}
              selectedCardItem={selectedCardItem}
              handleClick={handleClick}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
