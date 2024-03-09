import React from "react";
import { CardEditSidBar } from "../CardEditSidBar/CardEditSidBar";
import { CardItemSittings } from "../CardItemSittings/CardItemSittings";
import { Stack } from "@mui/material";

export const CardLeftSection = ({
  selectedCardItem,
  onItemSittingsChanged,
}) => {
  return (
    <Stack sx={{ flexDirection: { sm: "column", md: "row" }, gap: 2 }}>
      <CardEditSidBar />
      <CardItemSittings
        cardItem={selectedCardItem}
        onChange={onItemSittingsChanged}
      />
    </Stack>
  );
};
