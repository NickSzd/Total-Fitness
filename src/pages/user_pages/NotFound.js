import React from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const primary = "#2e74c9";

export default function NotFound() {
  const history = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="soft"
        color="primary"
        onClick={() => {
          history("/");
        }}
      >
        Back Home
      </Button>
    </Box>
  );
}
