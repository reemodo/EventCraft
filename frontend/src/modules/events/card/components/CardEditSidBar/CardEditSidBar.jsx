import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { CardListItem } from "../CardListItem/CardListItem";
import { ItemTypes } from "../CardEdit/CardEdit";
import { useUnsplashHelpers } from "../../../../shared/hooks/useUnsplash/useUnsplashHelpers";
import { useFreePik } from "../../../../shared/hooks/useFreePik/useFreePik";
import { useSelector } from "react-redux";

const AccordionNames = {
  Text: "text",
  Image: "image",
  Shape: "shape",
};

export const CardEditSidBar = ({ children }) => {
  const rdxEvents = useSelector((state) => state.events);

  const [photos, setPhotos] = useState([]);
  const [shapes, setShapes] = useState([]);

  const { getPhotos, pendingPhotos } = useUnsplashHelpers();

  const { getShapes, pendingFreePik } = useFreePik();

  //eff get images and icons
  useEffect(() => {
    (async () => {
      const photosData = await getPhotos({ search: "" });
      setPhotos(photosData);

      const shapesData = await getShapes({ search: "" });
      setShapes(shapesData);
    })();
  }, [getPhotos, getShapes]);

  const drawer = (
    <div>
      <Stack
        direction={{ sm: "row", md: "column" }}
        // justifyContent={"center"}
        // alignItems={"center"}
        pt={2}
      >
        {rdxEvents.editedCardItemType === ItemTypes.TEXT && (
          <Stack
            direction={"column"}
            width={{ md: "350px" }}
            overflow={"scroll"}
            sx={{
              "&::-webkit-scrollbar": { display: "none" },
              "&-ms-overflow-style": "none",
              "& scrollbar-width": "none",
            }}
            height={{ xs: "200px", sm: "200px", md: "calc(100vh - 150px)" }}
          >
            <Box sx={{ pt: 2 }}>
              <CardListItem
                item={{
                  id: "1",
                  type: ItemTypes.TEXT,
                  left: 0,
                  top: 0,
                  position: "",
                  text: "text",
                  fontSize: 22,
                  decoration: "underline",
                  style: "",
                  color: "",
                }}
              />
              <Divider sx={{ pt: 2 }} />
            </Box>
          </Stack>
        )}

        {rdxEvents.editedCardItemType === ItemTypes.IMAGE && (
          <ImageList
            sx={{
              width: 250,
              height: { xs: "200px", sm: "200px", md: "calc(100vh - 150px)" },
            }}
            cols={2}
            rowHeight={120}
          >
            {photos?.map((photo, idx) => (
              <ImageListItem key={idx}>
                <Box sx={{ pt: 2 }}>
                  <CardListItem
                    item={{
                      id: photo.id,
                      type: ItemTypes.IMAGE,
                      left: 0,
                      top: 0,
                      src: photo.url,
                      position: "",
                      width: 100,
                      height: 100,
                      style: "",
                    }}
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {rdxEvents.editedCardItemType === ItemTypes.SHAPE && (
          <ImageList
            sx={{
              width: 250,
              height: { xs: "200px", sm: "200px", md: "calc(100vh - 150px)" },
            }}
            cols={2}
            rowHeight={120}
          >
            {shapes.map((item, idx) => (
              <ImageListItem key={idx}>
                <Box sx={{ pt: 2 }} key={item.id}>
                  <CardListItem
                    item={{
                      id: item.id,
                      type: ItemTypes.IMAGE,
                      left: 0,
                      top: 0,
                      color: "gray",
                      src: item.url,
                      position: "",
                      width: 100,
                      height: 100,
                      style: "",
                    }}
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Stack>
    </div>
  );

  return (
    <Box>
      <Box component="nav">{drawer}</Box>
    </Box>
  );
};
