import { Button, Grid } from "@mui/material";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container direction="column" spacing={3} item width="400px">
        <Grid
          item
          sx={{
            fontWeight: 700,
            fontSize: "35px",
            color: "dodgerblue",
          }}
          textAlign="center"
          mt={10}
          mb={2}
        >
          Form Builder
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              navigate("/formBuilder/create");
            }}
            className="custom-btn btn-16"
          >
            Create new form
          </Button>
        </Grid>
        {/* <Grid item xs={12}>
          <Button
            onClick={() => {
              navigate("/my-formBuilder");
            }}
            className="custom-btn btn-16"
          >
            My forms
          </Button>
        </Grid> */}
        <Grid item xs={12}>
          <Button
            onClick={() => {
              navigate("/demoLeave/listLeave");
            }}
            className="custom-btn btn-16"
          >
            Nhân viên
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              navigate("/demoLeave/listTask");
            }}
            className="custom-btn btn-16"
          >
            Danh sách Tasks
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
