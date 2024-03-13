import React, { useEffect, useRef, useState } from "react";

import { Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab/";

import { v4 as uuidv4 } from "uuid";

import { useDrop } from "react-dnd";

import { CardItem } from "../CardItem/CardItem";

import { exportAsCanvas, parseCssStyles } from "../../../../shared/utils";

import { CardLeftSection } from "../CardLeftSection/CardLeftSection";
import Layout from "../../../../landing/Layout";

import { useDispatch } from "react-redux";
import { rdxEventsActions } from "../../../rdx/events.rdx";
import { useParams } from "react-router-dom";
import { useEventCardHelpers } from "../../hooks/useEventCardHelpers";

export const ItemTypes = {
  BOX: "box",
  SHAPE: "shape",
  TEXT: "text",
  IMAGE: "image",
  CARD: "card",
};

export const CardEdit = () => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  const { getEventCard, pendingGetEventCard } = useEventCardHelpers();

  const [card, setCard] = useState();

  const dispatch = useDispatch();

  //eff show event card side bar item
  useEffect(() => {
    (async () => {
      if (id) {
        const eventCard = await getEventCard();
        setCard({ ...eventCard, type: ItemTypes.CARD });
      }
    })();

    dispatch(rdxEventsActions.setIsEditingEventCard(true));

    return () => {
      dispatch(rdxEventsActions.setEditedCardItemType(""));
      dispatch(rdxEventsActions.setIsEditingEventCard(false));
    };
  }, [dispatch, getEventCard, id]);

  const [selectedCardItem, setSelectedCardItem] = useState();

  const selectedCardItemRef = useRef(null);

  const boundingBox = useRef(null);

  const exportRef = useRef(null);

  const onDrop = (itemData) => {
    if (itemData.position) {
      const updatedItems = items.map((item) =>
        item.uuid === itemData.uuid
          ? {
              ...item,
              left: itemData.left,
              top: itemData.top,
              position: "absolute",
            }
          : item
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { ...itemData, position: "absolute" }]);
    }
  };

  const onResize = (id, size) => {
    selectedCardItemRef.current.width = size.width;
    selectedCardItemRef.current.height = size.height;
  };

  const onTextChange = (id, text) => {
    // setSelectedCardItem((prev) => ({ ...prev, text }));
    selectedCardItemRef.current.text = text;
  };

  const onFocusOut = () => {
    if (selectedCardItemRef.current) {
      const updatedItems = items.map((item) =>
        item.uuid === selectedCardItemRef.current.uuid
          ? {
              ...selectedCardItemRef.current,
            }
          : item
      );
      setItems(updatedItems);
    }
    selectedCardItemRef.current = null;
    setSelectedCardItem(null);
  };

  const onClick = (e, item) => {
    e.stopPropagation();
    if (e.detail === 2) {
      selectedCardItemRef.current = item;
      setSelectedCardItem(item);
      dispatch(rdxEventsActions.setEditedCardItemType(""));
    } else {
      if (selectedCardItemRef.current) {
        if (item.uuid !== selectedCardItemRef.current.uuid) {
          onFocusOut();
        }
      }
    }
  };

  const onDeleteItem = (itemData) => {
    onFocusOut();
    setItems((prev) => prev.filter((item) => item.uuid !== itemData.uuid));
  };

  const onItemSittingsChanged = (item, inputName, value) => {
    const numValue = +value;
    if (!isNaN(numValue)) {
      value = numValue;
    }
    if (!selectedCardItemRef.current) {
      // cardRef.current[inputName] = value;
      setCard((prev) => ({ ...prev, [inputName]: value }));
    } else {
      selectedCardItemRef.current[inputName] = value;

      const updatedItems = items.map((itm) =>
        itm.uuid === item.uuid
          ? {
              ...itm,
              [inputName]: value,
            }
          : itm
      );
      setItems(updatedItems);
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      let delta = {};
      let left = 0;
      let top = 0;

      if (item.position) {
        delta = monitor.getDifferenceFromInitialOffset();
        left = Math.round(item.left + delta.x);
        top = Math.round(item.top + delta.y);
      } else {
        const offset = monitor.getClientOffset();
        const deltaX = offset.x - boundingBox.current.x - item.width / 2;
        const deltaY = offset.y - boundingBox.current.y - item.height / 2;
        left = Math.round(deltaX);
        top = Math.round(deltaY);
      }
      onDrop({
        ...item,
        left,
        top,
        uuid: item.uuid ? item.uuid : uuidv4(),
      });
      return undefined;
    },
  });

  function combinedRef(el) {
    drop(el);
    if (el) {
      boundingBox.current = el.getBoundingClientRect();
    }
  }

  const onSaveCard = async () => {
    if (exportRef.current) {
      const temp = await exportAsCanvas(exportRef.current, "test");
    }
  };

  return (
    <Layout>
      <Stack width={"100%"} sx={{ flexDirection: { sm: "column", md: "row" } }}>
        <CardLeftSection
          selectedCardItem={selectedCardItemRef.current}
          onItemSittingsChanged={onItemSittingsChanged}
          card={card}
        />

        <Stack
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={onFocusOut}
          sx={{ position: "relative", flex: 1 }}
        >
          <LoadingButton
            color="secondary"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1000,
            }}
            variant="contained"
            onClick={onSaveCard}
          >
            save
          </LoadingButton>

          <Box ref={exportRef}>
            <Box
              ref={combinedRef}
              sx={{
                position: "relative",
                width: "500px",
                height: "300px",
                border: "1px solid #000",
                background: card.backgroundColor,
                ...parseCssStyles(card.cssStyle),
              }}
              overflow={"hidden"}
            >
              {items.map((item, idx) => (
                <CardItem
                  key={item.uuid}
                  item={{ ...item, zIndex: item.zIndex ? item.zIndex : idx }}
                  card={card}
                  text={
                    selectedCardItemRef.current
                      ? selectedCardItemRef.current.text
                      : ""
                  }
                  size={{
                    width: selectedCardItemRef.current
                      ? selectedCardItemRef.current.width
                      : item.width,
                    height: selectedCardItemRef.current
                      ? selectedCardItemRef.current.height
                      : item.height,
                  }}
                  onDrop={onDrop}
                  onResize={onResize}
                  onTextChange={onTextChange}
                  selectedCardItem={selectedCardItem}
                  onClick={onClick}
                  onDeleteItem={onDeleteItem}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};
