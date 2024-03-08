import React from "react";

import { Grid, Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

const initFormValues = {
  email: "",
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("email is invalid").required("email is required"),
  name: Yup.string().required("name is required"),
  phone: Yup.string()
    .matches(
      /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/,
      "phone number is not valid"
    )
    .required("phone is required"),
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string().required("confirmPassword is required"),
});

export const RegisterForm = ({ onClose, isModal, onRegister, loading }) => {
  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onRegister(values);
      }}
    >
      {(props) => (
        <Form>
          <Stack sx={{ gap: 2 }}>
            <Grid justifyContent={"center"} sx={{ gap: 2 }} container>
              {/* Name */}
              <Field
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                as={TextField}
                error={!!props.errors.name}
                helperText={props.errors.name ?? ""}
              />

              {/* email */}
              <Field
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                as={TextField}
                error={!!props.errors.email}
                helperText={props.errors.email ?? ""}
              />
            </Grid>

            <Grid justifyContent={"center"} sx={{ gap: 2 }} container>
              {/* password */}
              <Field
                name="password"
                type="password"
                label="password"
                as={TextField}
                variant="outlined"
                error={!!props.errors.password}
                helperText={props.errors.password ?? ""}
              />

              {/* confirm password */}

              <Field
                name="confirmPassword"
                type="password"
                label="confirm password"
                as={TextField}
                variant="outlined"
                error={!!props.errors.confirmPassword}
                helperText={props.errors.confirmPassword ?? ""}
              />
            </Grid>

            {/* password */}
            <Grid
              sx={{
                justifyContent: {
                  xs: "center",
                  sm: "start",
                },
              }}
              container
            >
              <Field
                name="phone"
                type="text"
                label="phone number"
                as={TextField}
                variant="outlined"
                error={!!props.errors.phone}
                helperText={props.errors.phone ?? ""}
              />
            </Grid>

            {/* submit btn */}
            <Stack justifyContent={"center"} direction={"row"} spacing={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                color="secondary"
              >
                Register
              </LoadingButton>

              {isModal && (
                <LoadingButton
                  color="secondary"
                  variant="outlined"
                  onClick={onClose}
                >
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
