import React, { useState } from "react";
import { useAuthHelpers } from "../../hooks/useAuthHelpers/useAuthHelpers";

import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import Layout from "../../../landing/Layout";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const { login, pendingLogin } = useAuthHelpers();

  const onLogin = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/");
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Error email or password are incorrect");
    }
  };

  return (
    <Layout>
      <Box m={5} mt={10}>
        <Stack
          height={"calc(100vh - 150px)"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card sx={{ width: "fit-content" }}>
            <CardContent>
              <Typography variant="h3" sx={{ pb: 2 }} align="center">
                Login
              </Typography>

              <LoginForm
                onClose={() => {}}
                onLogin={onLogin}
                loading={pendingLogin}
              />

              <Box sx={{ mt: 2 }}>
                <Typography>
                  if you don't have an account
                  <Box
                    as={Link}
                    sx={{ ml: 1, textDecoration: "none", color: "blue" }}
                    to="/register"
                  >
                    Sign up
                  </Box>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <CustomSnackbar
          open={snackbarOpen}
          handleClose={() => setSnackbarOpen(false)}
          severity="error"
          color="error"
          message={snackbarMessage}
        />
      </Box>
    </Layout>
  );
};
