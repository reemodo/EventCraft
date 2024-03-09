import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTheme } from "@emotion/react";
import { CardListItem } from "../CardListItem/CardListItem";
import { ItemTypes } from "../CardEdit/CardEdit";

const drawerWidth = 240;

export const CardEditSidBar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <div>
      <Stack
        direction={{ sm: "row", md: "column" }}
        justifyContent={"center"}
        width="100%"
        alignItems={"center"}
        pt={2}
      >
        <Accordion sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}>
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
        <Accordion sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}>
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
            >
              <MenuItem divider>
                <CardListItem
                  item={{
                    id: "2",
                    type: ItemTypes.IMAGE,
                    left: 0,
                    top: 0,
                    src: "",
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
        <Accordion sx={{ width: { sx: "30%", sm: "30%", md: "100%" } }}>
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
          borderRight: !isMobile ? "1px solid" : "",
          borderBottom: isMobile ? "1px solid" : "",
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
