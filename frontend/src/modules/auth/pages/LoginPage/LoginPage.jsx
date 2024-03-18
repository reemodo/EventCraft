import React from "react";
import { useAuthHelpers } from "../../hooks/useAuthHelpers/useAuthHelpers";

import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import Layout from "../../../landing/Layout";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, pendingLogin } = useAuthHelpers();

  const onLogin = async (data) => {
    await login(data);
    navigate("/");
  };

  return (
    <Layout>
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
    </Layout>
  );
};
