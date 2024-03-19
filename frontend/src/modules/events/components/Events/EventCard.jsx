import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { ActionsList } from "./ActionsList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEventHelpers } from "../../hooks/useEventHelper";
import { LoadingButton } from "@mui/lab";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";
import QRCode from "qrcode.react";

export const EventCard = ({
  event,
  inHomePage,
  handelSetEventLists,
  userJoined,
  onJoinEvent,
  onCancelJoinEvent,
}) => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    joinEvent,
    pendingJoinEvent,
    cancelJoinedEvent,
    pendingCancelJoinedEvent,
  } = useEventHelpers();

  const rdxUser = useSelector((state) => state.user);
  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handelEventClick = (e) => {
    navigate(`/eventPage/${event._id}`);
  };

  const onUserJoinEvent = async (e) => {
    if (rdxUser.loggedIn) {
      e.stopPropagation();
      const eventJoined = await joinEvent(rdxUser.currentUser.id, event._id);

      if (eventJoined?._id) {
        onJoinEvent(event, rdxUser.currentUser.id);
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleWhatsAppShare = () => {
    const imageUrl = event.cardID?.img;
    const location = event.location.split(":")[0];
    const text = event.title;
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log("Image URL:", imageUrl); // Log the image URL to verify correctness

    const message = `

      Location: ${location}
              
      Text: ${text}
              
      Date: ${currentDate}
              
      Event Poster: ${imageUrl}
      `;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const onCancelUserJoinEvent = async (e) => {
    e.stopPropagation();
    const eventJoined = await cancelJoinedEvent(
      rdxUser.currentUser.id,
      event._id
    );

    if (eventJoined?._id) {
      onCancelJoinEvent(event, rdxUser.currentUser.id);
    }
  };

  return (
    <>
      <Card sx={{ width: "18em;", height: "20em;" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            sx={{ objectFit: "fill" }}
            objectFit={"cover"}
            image={event.cardID?.img}
            alt="green iguana"
            onClick={handelEventClick}
          />
          <CardContent sx={{ height: "100px" }}>
            <Typography gutterBottom variant="h6" component="div">
              {event.title.charAt(0).toUpperCase() + event.title.substring(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event?.location?.split(":")[0]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          className="cardActions"
          sx={{
            alignItems: "center;",
            justifyContent: "center;",
            padding: "8px;",
            gap: "30%;",
          }}
        >
          {inHomePage && !userJoined && (
            <LoadingButton
              loading={pendingJoinEvent}
              disableSpacing
              size="small"
              color="secondary"
              onClick={onUserJoinEvent}
            >
              join
            </LoadingButton>
          )}
          {rdxUser.loggedIn && (
            <>
              {inHomePage && userJoined && (
                <LoadingButton
                  loading={pendingCancelJoinedEvent}
                  disableSpacing
                  size="small"
                  color="secondary"
                  onClick={onCancelUserJoinEvent}
                >
                  cancel
                </LoadingButton>
              )}

              {!inHomePage && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <QrCode2Icon
                      id="123456"
                      value={`http://localhost:3000/eventPage/${event._id}`}
                      ml="20px"
                      mr="20px"
                      includeMargin={true}
                      onClick={downloadQR}
                      color="secondary"
                    />
                    <WhatsAppIcon
                      color="secondary"
                      onClick={handleWhatsAppShare}
                    />
                  </Box>
                  <Button disableSpacing size="small" color="secondary">
                    <ActionsList
                      event={event}
                      handelSetEventLists={handelSetEventLists}
                    />
                  </Button>
                </>
              )}
            </>
          )}
        </CardActions>
      </Card>

      {openSnackbar && (
        <CustomSnackbar
          color="warning"
          open={openSnackbar}
          handleClose={handleCloseSnackbar}
          message="Please log in to join the event."
          severity="warning"
        />
      )}
    </>
  );
};
