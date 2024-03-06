import { useDrag } from "react-dnd";
import { ItemTypes } from "../CardEdit/CardEdit";
import { Box } from "@mui/material";

export const CardItem = ({ id, left, top, position, width, height }) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({ id, left, top, position, width, height }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        position,
        left,
        top,
        width: `${width}px`,
        height: `${height}px`,
        background: "lightblue",
        border: "1px solid #000",
        cursor: "move",
      }}
    >
      {id}
    </Box>
  );
};
