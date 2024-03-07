import React from "react";

import { Box, MenuItem, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

const drawerWidth = 240;

const SettingsType = {
  input: "input",
  select: "select",
};

const imageSettings = [
  { name: "width", type: SettingsType.input, required: true },
  { name: "height", type: SettingsType.input, required: true },
  { name: "radios", type: SettingsType.input, required: false },
  { name: "top", type: SettingsType.input, required: true },
  { name: "left", type: SettingsType.input, required: true },
];
const textSettings = [
  { name: "fontSize", type: SettingsType.input, required: true },

  {
    name: "weight",
    options: [100, 200, 300, 400, 500, 600, 700, 800, 900, "bold"],
    type: SettingsType.select,
    required: false,
  },
  {
    name: "fontFamily",
    options: ["", "Roboto"],
    type: SettingsType.select,
    required: false,
  },
  {
    name: "decoration",
    options: ["", "underline"],
    type: SettingsType.select,
    required: false,
  },
];

const imageSchema = () =>
  Yup.object({
    width: Yup.string().required(`width is required`),
    height: Yup.string().required(`height is required`),
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
  });

const Input = ({ item, props }) => {
  if (item.type === SettingsType.input) {
    return (
      <Field
        name={item.name}
        type={"text"}
        label={item.name}
        as={TextField}
        error={!!props.errors[item.name]}
        helperText={props.errors[item.name] ?? ""}
        sx={{ minWidth: 100 }}
      />
    );
  }

  if (item.type === SettingsType.select) {
    return (
      <Field
        select
        name={item.name}
        type={"text"}
        label={item.name}
        as={TextField}
        error={!!props.errors[item.name]}
        helperText={props.errors[item.name] ?? ""}
        sx={{ minWidth: 100 }}
      >
        {item.options.map((value) => (
          <MenuItem key={value} value={String(value)}>
            {value}
          </MenuItem>
        ))}
      </Field>
    );
  }
};

const TextSettingsForm = ({ cardItem }) => {
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
                <Input key={item.name} item={item} props={props} />
              ))}

              {/* <LoadingButton
                type="submit"
                variant="contained"
                color="secondary"
              >
                submit
              </LoadingButton> */}
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

const ImageSettingsForm = ({ cardItem }) => {
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
              <Input key={item.name} item={item} props={props} />
            ))}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export const CardItemSittings = ({ cardItem }) => {
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
        <TextSettingsForm cardItem={cardItem} />
      )}

      {!!cardItem && cardItem.type === "image" && (
        <ImageSettingsForm cardItem={cardItem} />
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
