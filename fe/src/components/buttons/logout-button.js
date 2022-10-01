import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Log Out
    </Button>
  );
};
