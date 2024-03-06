import React, { useRef, useState } from "react";

import { useDrop } from "react-dnd";
import { CardItem } from "../CardItem/CardItem";
import { Box, Stack } from "@mui/material";

export const ItemTypes = {
  BOX: "box",
};

export const CardEdit = () => {
  const [items, setItems] = useState([]);

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
    <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }}>
      <Stack sx={{ flexDirection: { xs: "row", sm: "column" }, gap: 2 }}>
        <CardItem
          id={"1"}
          left={0}
          top={0}
          position={""}
          width={10}
          height={50}
        />
        <CardItem
          id={"2"}
          left={0}
          top={0}
          position={""}
          width={50}
          height={10}
        />
      </Stack>

      <Box
        ref={combinedRef}
        sx={{
          position: "relative",
          width: "500px",
          height: "300px",
          border: "2px solid #000",
        }}
      >
        {items.map(({ id, left, top, position, height, width }) => (
          <CardItem
            key={id}
            id={id}
            left={left}
            top={top}
            height={height}
            width={width}
            position={position}
            onDrop={handleDrop}
          />
        ))}
        {/* Add more draggable items as needed */}
      </Box>
    </Stack>
  );
};
