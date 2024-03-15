import React, { forwardRef } from "react";

import { CardListItem } from "../CardListItem/CardListItem";

import { Box } from "@mui/material";

export const CardView = forwardRef(({ title, item, model }, ref) => {
  return (
    <Box ref={ref}>
      <Box
        sx={{
          position: "relative",
          width: "500px",
          height: "300px",
          boxShadow: "rgba(17, 12, 46, 0.08) 0px 48px 100px 0px",
          mt: 2,
        }}
        overflow={"hidden"}
      >
        {!model && (
          <CardListItem
            item={{
              ...item,
              text: title,
            }}
          />
        )}

        {!!model && (
          <>
            {model.cardItems.map((item) => (
              <CardListItem
                item={{
                  ...item,
                }}
                key={item._id}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
});
