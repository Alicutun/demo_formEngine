import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid container columnGap={2} p={2} borderBottom="1px solid gray">
      <Button
        onClick={() => {
          navigate("/");
        }}
        variant={location.pathname === "/" ? "contained" : "outlined"}
      >
        Home
      </Button>
      <Button
        onClick={() => {
          navigate("/formBuilder/create");
        }}
        variant={
          location.pathname === "/formBuilder/create" ? "contained" : "outlined"
        }
      >
        Create/Design form
      </Button>
      <Button
        onClick={() => {
          navigate("/my-formBuilder");
        }}
        variant={
          location.pathname === "/my-formBuilder" ? "contained" : "outlined"
        }
      >
        My forms
      </Button>
    </Grid>
  );
};
