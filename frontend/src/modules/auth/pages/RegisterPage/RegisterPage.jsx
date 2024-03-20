import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { useAuthHelpers } from "../../hooks/useAuthHelpers/useAuthHelpers";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../landing/Layout";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { register, pendingRegister } = useAuthHelpers();

  const onRegister = async (data) => {
    const success = await register(data);
    if (success) {
      navigate("/");
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Error entered invalid data or already sign up.");
    }
  };
  return (
    <Layout>
      <Box m={5} mt={10}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"calc(100vh - 150px)"}
        >
          <Card sx={{ width: "fit-content" }}>
            <CardContent>
              <Typography variant="h2" sx={{ pb: 2 }} align="center">
                Sign up
              </Typography>

              <RegisterForm
                onClose={() => {}}
                onRegister={onRegister}
                loading={pendingRegister}
              />

              <Box sx={{ mt: 2 }}>
                <Typography>
                  if you have an account please
                  <Box
                    as={Link}
                    sx={{ ml: 1, textDecoration: "none", color: "blue" }}
                    to="/login"
                  >
                    Login
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
