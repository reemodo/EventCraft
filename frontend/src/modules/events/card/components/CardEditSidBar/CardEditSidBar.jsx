import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  MenuItem,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { CardListItem } from "../CardListItem/CardListItem";
import { ItemTypes } from "../CardEdit/CardEdit";

const drawerWidth = 240;

const AccordionNames = {
  Text: "text",
  Image: "image",
  Shape: "shape",
};

export const CardEditSidBar = ({ children }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const drawer = (
    <div>
      <Stack
        direction={{ sm: "row", md: "column" }}
        // justifyContent={"center"}
        // alignItems={"center"}
        pt={2}
      >
        <Accordion
          sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}
          height={{ xs: "200px", sm: "200px", md: "calc(50vh - 120px)" }}
          expanded={expanded === AccordionNames.Text}
          onChange={handleChange(AccordionNames.Text)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Texts
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction={"column"}
              width={{ md: "100%" }}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
              height={{ xs: "200px", sm: "200px", md: "calc(50vh - 120px)" }}
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
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}
          height={{ xs: "200px", sm: "200px", md: "calc(50vh - 120px)" }}
          expanded={expanded === AccordionNames.Image}
          onChange={handleChange(AccordionNames.Image)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Images
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              width={{ md: "100%" }}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
              height={{ xs: "200px", sm: "200px", md: "calc(50vh - 120px)" }}
            >
              <Box sx={{ pt: 2 }}>
                <CardListItem
                  item={{
                    id: "2",
                    type: ItemTypes.IMAGE,
                    left: 0,
                    top: 0,
                    src: "https://images.pexels.com/photos/20392251/pexels-photo-20392251/free-photo-of-a-brown-butterfly-sitting-on-a-leaf-with-green-leaves.jpeg",
                    position: "",
                    width: 150,
                    height: 150,
                    style: "",
                  }}
                />
                <Divider sx={{ pt: 2 }} />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            width: { sx: "30%", sm: "30%", md: "100%" },
          }}
          expanded={expanded === AccordionNames.Shape}
          onChange={handleChange(AccordionNames.Shape)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Shapes
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction={"column"}
              width={{ md: "100%" }}
              overflow={"scroll"}
              height={{ xs: "200px", sm: "200px", md: "calc(50vh - 120px)" }}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
            >
              <Box sx={{ pt: 2 }}>
                <CardListItem
                  item={{
                    id: "3",
                    type: ItemTypes.SHAPE,
                    left: 0,
                    top: 0,
                    color: "gray",
                    position: "",
                    width: 150,
                    height: 150,
                    style: "",
                    d: "m 50 0 l 0 0 l 50 100 l -100 0",
                  }}
                />
                <Divider sx={{ pt: 2 }} />
              </Box>

              <Box sx={{ pt: 2 }}>
                <CardListItem
                  item={{
                    id: "3",
                    type: ItemTypes.SHAPE,
                    left: 0,
                    top: 0,
                    color: "gray",
                    position: "",
                    width: 150,
                    height: 150,
                    style: "",
                    d: "m 50 0 l 50 50 l -50 50 l -50 -50",
                  }}
                />
                <Divider sx={{ pt: 2 }} />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </div>
  );

  return (
    <Box>
      <Box component="nav">{drawer}</Box>
    </Box>
  );
};
