import React from "react";

import { Box, MenuItem, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

const CARD_MAX_WIDTH = 500;
const CARD_MAX_HEIGHT = 300;

const CARD_MIN_WIDTH = 50;
const CARD_MIN_HEIGHT = 50;

const drawerWidth = 240;

const SettingsType = {
  input: "input",
  select: "select",
  textarea: "textarea",
};

const imageSettings = [
  { name: "width", type: SettingsType.input },
  { name: "height", type: SettingsType.input },
  { name: "radios", type: SettingsType.input },
  { name: "top", type: SettingsType.input },
  { name: "left", type: SettingsType.input },
  {
    name: "style",
    type: SettingsType.textarea,
  },
];
const textSettings = [
  { name: "fontSize", type: SettingsType.input },

  {
    name: "weight",
    options: [100, 200, 300, 400, 500, 600, 700, 800, 900, "bold"],
    type: SettingsType.select,
  },
  {
    name: "fontFamily",
    options: ["", "Roboto"],
    type: SettingsType.select,
  },
  {
    name: "decoration",
    options: ["", "underline"],
    type: SettingsType.select,
  },
  {
    name: "style",
    type: SettingsType.textarea,
  },
];

const imageSchema = () =>
  Yup.object({
    width: Yup.string()
      .test(
        "height",
        `height must be less than ${CARD_MIN_WIDTH}px and more than ${CARD_MAX_WIDTH}px`,
        (val) => {
          const number = +val;
          if (isNaN(number)) {
            return false;
          } else {
            return number >= CARD_MIN_WIDTH && number <= CARD_MAX_WIDTH;
          }
        }
      )
      .required(`width is required`),
    height: Yup.string()
      .test(
        "height",
        `height must be less than ${CARD_MAX_HEIGHT}px and more than ${CARD_MIN_HEIGHT}px`,
        (val) => {
          const number = +val;
          if (isNaN(number)) {
            return false;
          } else {
            return number >= CARD_MIN_HEIGHT && number <= CARD_MAX_HEIGHT;
          }
        }
      )

      .required(`height is required`),
    radios: Yup.string().nullable(),
    top: Yup.string().required(`top is required`),
    left: Yup.string().required(`left is required`),
  });

const textSchema = () =>
  Yup.object({
    fontSize: Yup.string().required(`fontSize is required`),
    weight: Yup.string().nullable(),
    fontFamily: Yup.string().nullable(),
    decoration: Yup.string().nullable(),
    style: Yup.string().nullable(),
  });

const Input = ({ item, props, onChange, cardItem }) => {
  return (
    <>
      {item.type === SettingsType.input && (
        <Field
          name={item.name}
          type={"text"}
          label={item.name}
          as={TextField}
          error={!!props.errors[item.name]}
          helperText={props.errors[item.name] ?? ""}
          sx={{ minWidth: 100 }}
          onChange={(e) => {
            props.setFieldValue(item.name, e.target.value);
            onChange(cardItem, item.name, e.target.value);
          }}
        />
      )}

      {item.type === SettingsType.textarea && (
        <Field
          name={item.name}
          label={item.name}
          as={TextField}
          multiline
          minRows={2}
          variant="outlined"
          error={!!props.errors[item.name]}
          helperText={props.errors[item.name] ?? ""}
          onChange={(e) => {
            props.setFieldValue(item.name, e.target.value);
            onChange(cardItem, item.name, e.target.value);
          }}
        />
      )}

      {item.type === SettingsType.select && (
        <Field
          select
          name={item.name}
          type={"text"}
          label={item.name}
          as={TextField}
          error={!!props.errors[item.name]}
          helperText={props.errors[item.name] ?? ""}
          sx={{ minWidth: 100 }}
          onChange={(e) => {
            props.setFieldValue(item.name, e.target.value);
            onChange(cardItem, item.name, e.target.value);
          }}
        >
          {item.options.map((value) => (
            <MenuItem key={value} value={String(value)}>
              {value}
            </MenuItem>
          ))}
        </Field>
      )}
    </>
  );
};

const TextSettingsForm = ({ cardItem, onChange }) => {
  const textSettingsInitValue = (cardItem) => {
    const initValues = textSettings.reduce((initValues, current) => {
      initValues[current.name] = cardItem[current.name]
        ? cardItem[current.name]
        : "";
      return initValues;
    }, {});
    return initValues;
  };
  return (
    <Formik
      validationSchema={textSchema()}
      onSubmit={(values) => {
        console.log("🚀 ~ TextSettingsForm ~ values:", values);
      }}
      initialValues={textSettingsInitValue(cardItem)}
    >
      {(props) => {
        return (
          <Form>
            <Stack
              gap={5}
              direction={{ xs: "row", sm: "row", md: "column" }}
              height={{ sm: "", md: "calc(100vh - 120px)" }}
              width={{ xs: "100vw", sm: "100vm", md: "100%" }}
              overflow={"scroll"}
              pt={2}
            >
              {textSettings.map((item) => (
                <Input
                  key={item.name}
                  item={item}
                  cardItem={cardItem}
                  props={props}
                  onChange={onChange}
                />
              ))}
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

const ImageSettingsForm = ({ cardItem, onChange }) => {
  const ImageSettingsInitValue = () => {
    const initValues = imageSettings.reduce((initValues, current) => {
      initValues[current.name] = cardItem[current.name]
        ? cardItem[current.name]
        : "";
      return initValues;
    }, {});
    return initValues;
  };
  return (
    <Formik
      validationSchema={imageSchema}
      onSubmit={(values) => {
        console.log("🚀 ~ TextSettingsForm ~ values:", values);
      }}
      initialValues={ImageSettingsInitValue()}
    >
      {(props) => (
        <Form>
          <Stack
            gap={5}
            direction={{ xs: "row", sm: "row", md: "column" }}
            height={{ sm: "", md: "calc(100vh - 120px)" }}
            width={{ xs: "100vw", sm: "100vm", md: "100%" }}
            overflow={"scroll"}
            sx={{}}
            pt={2}
          >
            {imageSettings.map((item) => (
              <Input
                key={item.name}
                item={item}
                cardItem={cardItem}
                props={props}
                onChange={onChange}
              />
            ))}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export const CardItemSittings = ({ cardItem, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <Stack
      direction={{ sm: "row", md: "column" }}
      justifyContent={"center"}
      width="100%"
      alignItems={"center"}
      pt={5}
    >
      {!!cardItem && cardItem.type === "text" && (
        <TextSettingsForm cardItem={cardItem} onChange={onChange} />
      )}

      {!!cardItem && cardItem.type === "image" && (
        <ImageSettingsForm cardItem={cardItem} onChange={onChange} />
      )}
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        height: { sm: "none", md: "calc(100vh - 65px)" },
        //   width: { sm: drawerWidth, md: "calc(100vh )" },
        borderRight: !isMobile ? "1px solid" : "",
        borderBottom: isMobile ? "1px solid" : "",
        width: { sm: "100vw ", md: drawerWidth },
        flexShrink: { sm: 1 },
        // overflow: "hidden",
      }}
      aria-label="mailbox folders"
    >
      {drawer}
    </Box>
  );
};
