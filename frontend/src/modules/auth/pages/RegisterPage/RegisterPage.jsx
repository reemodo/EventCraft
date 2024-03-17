import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { useAuthHelpers } from "../../hooks/useAuthHelpers/useAuthHelpers";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../landing/Layout";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, pendingRegister } = useAuthHelpers();

  const onRegister = async (data) => {
    await register(data);
    navigate("/");
  };
  return (
    <Layout>
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
    </Layout>
  );
};
