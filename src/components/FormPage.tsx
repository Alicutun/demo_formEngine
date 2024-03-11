import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";
type TFormPage = {
  children: ReactNode;
};
const FormPage = (props: TFormPage) => {
  const { children } = props;
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={6}
        sx={{
          borderRadius: "10px",
          border: "1px #3498ff solid",
        }}
        mt={2}
      >
        <Box m={2}>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default FormPage;
