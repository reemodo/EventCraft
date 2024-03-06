import React from "react";

import { LoadingButton } from "@mui/lab";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";

const initFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string().required("password is required"),
});

export const LoginForm = ({ onClose, isModal, onLogin, loading }) => {
  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onLogin(values);
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing={4} alignItems={"center"}>
            <Box>
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
            </Box>
            <Box>
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
            </Box>

            {/* submit btn */}
            <Stack direction={"row"} spacing={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                login
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
