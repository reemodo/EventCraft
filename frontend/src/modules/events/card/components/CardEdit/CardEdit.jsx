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

  const handleClick = (e, item) => {
    e.stopPropagation();
    setSelectedCardItem(item);
  };

  const handleFocusOut = () => {
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
          id={"1"}
          left={0}
          top={0}
          position={""}
          width={50}
          height={150}
        />
        <CardItem
          id={"2"}
          left={0}
          top={0}
          position={""}
          width={150}
          height={50}
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
          {items.map(({ id, left, top, position, height, width }) => (
            <>
              <CardItemWrapper
                key={id}
                item={{ id, left, top, position, height, width }}
                onChange={handleResize}
                selectedItem={selectedCardItem}
                onClick={handleClick}
                onDelete={handleDeleteItem}
              >
                <CardItem
                  id={id}
                  left={left}
                  top={top}
                  height={height}
                  width={width}
                  position={position}
                  onDrop={handleDrop}
                />
              </CardItemWrapper>
            </>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
