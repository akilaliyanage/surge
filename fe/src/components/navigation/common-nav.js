import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { LogoutButton } from "../buttons/logout-button";

export const CommonNav = () => {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SURGE GLOBAL ASSIGNMNET - AKILA LIYANAGE
          </Typography>
          <LogoutButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
