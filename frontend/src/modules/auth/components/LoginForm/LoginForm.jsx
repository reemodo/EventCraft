import React from "react";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";

const initFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string().required("password is required"),
});

const useStyles = (theme) => ({
  loginForm: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  inputField: {
    width: "100%",
    marginBottom: "20px",
  },
  submitBtn: {
    width: "100%",
    marginBottom: "10px",
  },
  cancelBtn: {
    width: "100%",
  },
});

// LoginForm component
export const LoginForm = ({ onClose, isModal, onLogin, loading }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={onLogin}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => (
        <Form className={classes.loginForm}>
          <Stack spacing={0} alignItems={"center"}>
            <Box sx={{ width: '400px' }}>
              {/* email */}
              <Field
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                as={TextField}
                className={classes.inputField}
                error={!!props.errors.email}
                helperText={props.errors.email ?? ""}
                sx={{ width: '100%', height: '100px' }}
              />
            </Box>
            <Box sx={{ width: '400px' }}>
              {/* password */}
              <Field
                name="password"
                type="password"
                label="Password"
                as={TextField}
                variant="outlined"
                className={classes.inputField}
                error={!!props.errors.password}
                helperText={props.errors.password ?? ""}
                sx={{ width: '100%', height: '50px' }}
              />
            </Box>

            {/* submit btn */}
            <Stack direction={"row"} spacing={2}  sx={{marginTop: "20px"}}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                color={"secondary"}
                className={classes.submitBtn}
               
                
              >
                Sign In
              </LoadingButton>


            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
