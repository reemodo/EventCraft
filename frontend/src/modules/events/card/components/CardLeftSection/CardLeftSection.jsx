import React from "react";
import { CardEditSidBar } from "../CardEditSidBar/CardEditSidBar";
import { CardItemSittings } from "../CardItemSittings/CardItemSittings";
import { Divider, Stack, useMediaQuery } from "@mui/material";

import { useTheme } from "@emotion/react";

export const CardLeftSection = ({
  selectedCardItem,
  onItemSittingsChanged,
  card,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      sx={{
        flexDirection: { sm: "column", md: "row" },
        gap: 2,
      }}
    >
      <CardEditSidBar />
      <Divider orientation={!isMobile ? "vertical" : "horizontal"} flexItem />
      <CardItemSittings
        cardItem={selectedCardItem}
        onChange={onItemSittingsChanged}
        card={card}
      />
      <Divider orientation={!isMobile ? "vertical" : "horizontal"} flexItem />
    </Stack>
  );
};
