import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
        justifyContent={"center"}
        width="100%"
        alignItems={"center"}
        pt={2}
      >
        <Accordion
          sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}
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
              height={{ sm: "200px", md: "calc(50vh - 120px)" }}
              width={{ md: "100%" }}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
            >
              <MenuItem divider>
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
              </MenuItem>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}
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
              height={{ sm: "200px", md: "calc(50vh - 120px)" }}
              width={{ md: "100%" }}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
            >
              <MenuItem divider>
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
              </MenuItem>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}
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
              height={{ sm: "200px", md: "calc(50vh - 120px)" }}
              width={{ md: "100%" }}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                "&-ms-overflow-style": "none",
                "& scrollbar-width": "none",
              }}
            >
              <MenuItem divider>
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
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </div>
  );

  return (
    <Box>
      <Box
        component="nav"
        sx={{
          height: { sm: "none", md: "calc(100vh - 65px)" },
          //   width: { sm: drawerWidth, md: "calc(100vh )" },

          width: { sm: "100vw ", md: drawerWidth },
          flexShrink: { sm: 1 },
        }}
        aria-label="mailbox folders"
      >
        {drawer}
      </Box>
    </Box>
  );
};
