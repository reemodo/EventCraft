import React, { useMemo } from "react";

import { Box, Grid, MenuItem, Stack, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LoadingButton } from "@mui/lab";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  category: Yup.string().required("category is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string().nullable(),
  location: Yup.string().nullable(),
  startDate: Yup.string().required("start date is required"),
  endDate: Yup.string().required("end date is required"),
});

export const EventForm = ({ onClose, isModal, isAddFlow }) => {
  const eventRdx = useSelector((state) => state.events);

  const initFormValues = useMemo(
    () => ({
      category: eventRdx?.selectedEvent?.category || "",
      title: eventRdx?.selectedEvent?.title || "",
      description: eventRdx?.selectedEvent?.description || "",
      location: eventRdx?.selectedEvent?.location || "",
      startDate: eventRdx?.selectedEvent?.startDate
        ? new Date(eventRdx.selectedEvent.startDate)
        : "",
      endDate: eventRdx?.selectedEvent?.endDate
        ? new Date(eventRdx.selectedEvent.endDate)
        : "",
    }),
    [
      eventRdx.selectedEvent?.category,
      eventRdx.selectedEvent?.description,
      eventRdx.selectedEvent.endDate,
      eventRdx.selectedEvent?.location,
      eventRdx.selectedEvent.startDate,
      eventRdx.selectedEvent?.title,
    ]
  );

  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <Form>
          <Stack sx={{ gap: 2, pt: 2 }}>
            {/* category */}
            <Field
              name="category"
              select
              type="text"
              label="Category"
              variant="outlined"
              as={TextField}
              error={!!props.errors.category}
              helperText={props.errors.category ?? ""}
            >
              {[{ name: "asad", id: "1" }].map(({ name, id }) => (
                <MenuItem key={name} value={String(id)}>
                  {name}
                </MenuItem>
              ))}
            </Field>

            {/* title */}
            <Field
              name="title"
              type="text"
              label="Title"
              variant="outlined"
              as={TextField}
              error={!!props.errors.title}
              helperText={props.errors.title ?? ""}
            />

            {/* description */}
            <Field
              name="description"
              label="Description"
              variant="outlined"
              as={TextField}
              multiline
              error={!!props.errors.description}
              helperText={props.errors.description ?? ""}
            />

            {/* location  */}
            <Field
              name="location"
              label="Location"
              variant="outlined"
              as={TextField}
              error={!!props.errors.location}
              helperText={props.errors.location ?? ""}
            />

            {/* start date */}

            <Field
              name="startDate"
              label="Start Date"
              as={DateTimePicker}
              value={props.values.startDate}
              onChange={(value) => {
                props.setFieldValue("startDate", new Date(value));
              }}
              views={["year", "month", "day", "hours", "minutes"]}
              slotProps={{
                textField: {
                  helperText: props.errors.startDate ?? "",
                  error: !!props.errors.startDate,
                },
              }}
            />

            {/* end date */}
            <Field
              name="endDate"
              label="End Date"
              as={DateTimePicker}
              value={props.values.endDate}
              onChange={(value) => {
                props.setFieldValue("endDate", new Date(value));
              }}
              views={["year", "month", "day", "hours", "minutes"]}
              slotProps={{
                textField: {
                  helperText: props.errors.endDate ?? "",
                  error: !!props.errors.endDate,
                },
              }}
            />

            {/* submit btn */}
            <Stack justifyContent={"center"} direction={"row"} spacing={2}>
              <LoadingButton type="submit" variant="contained">
                {isAddFlow ? "Add" : "Edit"}
              </LoadingButton>

              {isModal && (
                <LoadingButton variant="outlined" onClick={onClose}>
                  cancel
                </LoadingButton>
              )}
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
