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
                    type: "text",
                    left: 0,
                    top: 0,
                    position: "",
                    text: "text",
                    fontSize: 22,
                    decoration: "underline",
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
                    type: "image",
                    left: 0,
                    top: 0,
                    src: "https://images.pexels.com/photos/19400187/pexels-photo-19400187/free-photo-of-a-car-in-a-desert.jpeg",
                    position: "",
                    width: 150,
                    height: 150,
                  }}
                />
              </MenuItem>
              <MenuItem divider>
                <CardListItem
                  item={{
                    id: "2",
                    type: "image",
                    left: 0,
                    top: 0,
                    src: "https://images.pexels.com/photos/19400187/pexels-photo-19400187/free-photo-of-a-car-in-a-desert.jpeg",
                    position: "",
                    width: 150,
                    height: 150,
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
              <MenuItem divider></MenuItem>
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
