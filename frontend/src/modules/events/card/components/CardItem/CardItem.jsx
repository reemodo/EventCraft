import { Box, TextField } from "@mui/material";
import { ItemTypes } from "../CardEdit/CardEdit";
import { useDrag } from "react-dnd";

export const CardItem = ({ id, left, top, position, width, height }) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({ id, left, top, position, width, height }),
  });
  return (
    <Box
      ref={drag}
      sx={{
        width: `${width}px`,
        height: `${height}px`,
        background: "lightblue",
        overflow: "hidden",
        cursor: "move",
      }}
    >
      <TextField multiline sx={{ width, height, border: "none" }} />
    </Box>
  );
};
