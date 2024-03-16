import React, { useCallback, useMemo, useRef, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import Autocomplete from "@mui/material/Autocomplete";

import * as Yup from "yup";
import { useSelector } from "react-redux";

import { Icon } from "leaflet";

import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "../../api/events.api";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { CardView } from "../../card/components/CardView/CardView";
import { exportAsCanvas } from "../../../shared/utils";
import { ItemTypes } from "../../card/components/CardEdit/CardEdit";
import { eventFormData } from "../../event.utils";
import { Map } from "../../../shared/components/Map/Map";
import { CardListItem } from "../../card/components/CardListItem/CardListItem";

const validationSchema = Yup.object({
  category: Yup.string().required("category is required"),
  isPublic: Yup.string().required("visibility is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string().nullable(),
  location: Yup.string().required("location is required"),
  startDate: Yup.string().required("start date is required"),
  endDate: Yup.string().required("end date is required"),
});

const initCardItem = {
  type: ItemTypes.TEXT,
  left: 0,
  top: 0,
  position: "absolute",
  text: "",
  fontSize: 50,
  decoration: "",
  style: "",
  color: "",
};

const publicPrivate = [
  { name: "Public", value: true },
  { name: "Private", value: false },
];

const categories = [
  { name: "Wedding", id: "wedding" },
  { name: "Party", id: "party" },
  { name: "Sport", id: "sport" },
];

export const EventForm = ({ isAddFlow, model }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [addEvent, error] = useAddEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const exportRef = useRef(null);
  const formikRef = useRef(null);

  const [locationState, setLocationState] = useState();

  const position = [
    model?.location.split(":")[1] ?? 32.81781057069659,
    model?.location.split(":")[2] ?? 35.00259862330999,
  ];

  const onSaveCard = async () => {
    if (exportRef.current) {
      const temp = await exportAsCanvas(exportRef.current, "test");
      return temp;
    }
  };

  const [Results, setResults] = useState([]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  const fetchData = (value) => {
    if (value) {
      fetch(
        `https://dev.virtualearth.net/REST/v1/Locations?q=${value}&key=At9eDSmuRlIFv8AYYWu-9AZxH3oxgpF_bpeQbKiwKrxOmYr9Coxwk-qGJRW_3FL4`
      )
        .then((response) => response.json())
        .then((json) => {
          const results = json.resourceSets[0].resources.filter((user) => {
            return (
              value &&
              user &&
              user.name &&
              user.name.toLowerCase().includes(value)
            );
          });
          console.log(results);
          setResults(results);
        });
    }
  };

  const handleChange = (value) => {
    if (value) {
      fetchData(value);
    }
  };

  const handleEvent = async (formValues) => {
    try {
      if (isAddFlow) {
        const eventData = await addEvent({
          ...formValues,
          card: {
            items: [{ ...initCardItem, text: formValues.title }],
          },
          userId: user.currentUser.id,
        });
        if (eventData.data[0] && eventData.data[0]._id) {
          navigate("/workSpace");
        }
      } else {
        const eventData = await updateEvent({
          formData: {
            ...formValues,
            card: model.card,
            userId: user.currentUser.id,
          },
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

  const onChangeMapMarker = useCallback((data) => {
    setLocationState(data);
    formikRef.current?.setFieldValue(
      "location",
      `${formikRef.current?.values.location.split(":")[0]}:${data.lat}:${
        data.lng
      }`
    );
  }, []);

  const initFormValues = useMemo(() => {
    const startDate = model?.startDate ? dayjs(model.startDate) : null;
    const endDate = model?.endDate ? dayjs(model.endDate) : null;

    return {
      category: model?.category || "",
      title: model?.title || "",
      description: model?.description || "",
      location: model?.location || "",
      isPublic: model?.isPublic || false,
      startDate,
      endDate,
    };
  }, [model]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initFormValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        if (isAddFlow) {
          const img = await onSaveCard();
          img.toBlob(async (result) => {
            await handleEvent({ ...values, img: result });
          });
        } else await handleEvent({ ...values, img: model?.card?.img });
      }}
    >
      {(props) => (
        <Form>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-around"}
          >
            <Stack gap={5}>
              <Box
                sx={{ boxShadow: "rgba(17, 12, 46, 0.08) 0px 48px 100px 0px" }}
              >
                <CardView
                  ref={exportRef}
                  title={props.values.title}
                  item={initCardItem}
                  model={model}
                />
              </Box>

              <Map
                icon={customIcon}
                position={locationState || position}
                setPosition={onChangeMapMarker}
                isAddFlow={isAddFlow}
              />
            </Stack>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Card>
              <CardContent>
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
                    {categories.map(({ name, id }) => (
                      <MenuItem key={name} value={String(id)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>

                  {/* isPublic */}
                  <Field
                    name="isPublic"
                    select
                    type="text"
                    label="Visibility"
                    variant="outlined"
                    as={TextField}
                    error={!!props.errors.isPublic}
                    helperText={props.errors.isPublic ?? ""}
                  >
                    {publicPrivate.map(({ name, value }) => (
                      <MenuItem key={name} value={value}>
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

                  {/* location */}

                  <Field name="location">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <Autocomplete
                        name="location"
                        freeSolo
                        type="text"
                        label="location"
                        variant="outlined"
                        value={field.value.split(":")[0]}
                        onChange={(e, value) => {
                          const location = Results.find(
                            (loc) => loc.name === value
                          );
                          console.log("🚀 ~ location:", value);

                          const lat = location?.geocodePoints[0].coordinates[0];
                          const lng = location?.geocodePoints[0].coordinates[1];
                          if (lng && lat) {
                            setLocationState({ lng, lat });
                          }
                          if (value && lat && lng) {
                            props.setFieldValue(
                              "location",
                              `${value}:${lat}:${lng}`
                            );
                          } else {
                            props.setFieldValue("location", ``);
                          }
                        }}
                        error={!!props.errors.location}
                        helperText={props.errors.location ?? ""}
                        options={Results?.map((option) => option.name) || []}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={(e) => handleChange(e.target.value)}
                            label="location"
                          />
                        )}
                      />
                    )}
                  </Field>

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
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    spacing={2}
                  >
                    <LoadingButton type="submit" variant="contained">
                      {isAddFlow ? "Add" : "Edit"}
                    </LoadingButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
