import React, { useMemo, useRef } from "react";

import { Divider, MenuItem, Stack, TextField } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LoadingButton } from "@mui/lab";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "../../api/events.api";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { CardView } from "../../card/components/CardView/CardView";
import { exportAsImage } from "../../../shared/utils";

const validationSchema = Yup.object({
  category: Yup.string().required("category is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string().nullable(),
  location: Yup.string().nullable(),
  startDate: Yup.string().required("start date is required"),
  endDate: Yup.string().required("end date is required"),
});

export const EventForm = ({
  onClose,
  isModal,
  isAddFlow,
  model,
  onSuccess,
  onChangEventTitle,
}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [addEvent, error] = useAddEventMutation();
  const [updateEvent, { isLoading, error: errorOnUpdatingEvent }] =
    useUpdateEventMutation();

  const exportRef = useRef(null);

  const onSaveCard = async () => {
    if (exportRef.current) {
      const temp = await exportAsImage(exportRef.current, "test");
      return temp;
    }
  };

  const handelEvent = async (formValues) => {
    try {
      if (isModal) {
        const eventData = await addEvent({
          ...formValues,
          userId: user.currentUser.id,
        });
        if (eventData) onSuccess(eventData);
      } else {
        const eventData = await updateEvent({
          ...formValues,
          userId: user.currentUser.id,
          id: model._id,
        });
        if (eventData?.data?.success) {
          navigate("/workSpace");
        }
      }
    } catch (error) {
      return <div>Error: {error.message}</div>;
    }
  };

  const initFormValues = useMemo(() => {
    const startDate = model?.startDate ? dayjs(model.startDate) : null;
    const endDate = model?.endDate ? dayjs(model.endDate) : null;

    return {
      category: model?.category || "",
      title: model?.title || "",
      description: model?.description || "",
      location: model?.location || "",
      startDate,
      endDate,
    };
  }, [model]);
  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const img = await onSaveCard();
        handelEvent({ ...values, img });
      }}
    >
      {(props) => (
        <Form>
          <CardView ref={exportRef} title={props.values.title} />

          <Divider sx={{ mt: 2, mb: 2 }} />

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

            <DateTimePicker
              name="startDate"
              label="Start Date"
              value={props.values.startDate} // Pass the value directly to the DateTimePicker
              onChange={(value) => {
                props.setFieldValue("startDate", value);
              }}
              renderInput={(props) => <TextField {...props} />} // Render input
              views={["year", "month", "day", "hours", "minutes"]}
              slotProps={{
                textField: {
                  helperText: props.errors.startDate ?? "",
                  error: !!props.errors.startDate,
                },
              }}
            />

            {/* end date */}
            <DateTimePicker
              name="endDate"
              label="End Date"
              value={props.values.endDate} // Pass the value directly to the DateTimePicker
              onChange={(value) => {
                props.setFieldValue("endDate", value);
              }}
              renderInput={(props) => <TextField {...props} />} // Render input
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
                <LoadingButton variant="contained" onClick={onClose}>
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
