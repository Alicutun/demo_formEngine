import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../common/const";
import { useApi } from "../hook/ApiProvider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MyFormBuilder = () => {
  const navigate = useNavigate();
  const { fetchData, postData } = useApi();
  const [name, setName] = useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };

  // Queries
  const { refetch, data = [] } = useQuery({
    queryKey: ["getListFormEngine"],
    queryFn: async () => {
      const data: any = await fetchData(
        `${BASE_URL}/feg-svc/api/v1/FormEngine/list`
      );
      if (data.isSuccess) {
        return data.data;
      } else {
        toast.error(data.message);
      }
    },
  });

  // Mutations
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return postData(`${BASE_URL}/feg-svc/api/v1/FormEngine/`, payload)
        .then((data: any) => {
          if (data.isSuccess) {
            toast.success("Upload file success!");
            refetch();
          }
        })
        .catch((error) => {
          toast.error("Upload file error!");
        });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonObj = JSON.parse(event.target?.result as string);
          const payload = {
            name,
            steps: JSON.stringify(jsonObj),
          };
          mutate(payload);
        } catch (error) {
          console.error("Failed to parse JSON file", error);
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container direction="column" spacing={3} item width="800px">
        <Grid
          item
          sx={{
            fontWeight: 700,
            fontSize: "35px",
          }}
          textAlign="center"
          mt={10}
        >
          My FormBuilder
        </Grid>
        <Grid item container mb={2}>
          <Grid
            container
            columnGap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight={500} fontSize={20}>
              Add new form:
            </Typography>
            <TextField
              size="small"
              label="Name form"
              value={name}
              onChange={handleChange}
            />
            <Button disabled={!name} component="label" variant="contained">
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept=".json"
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
        </Grid>
        <Box
          mt={4}
          sx={{
            borderRadius: "10px",
          }}
          boxShadow={2}
        >
          <Box m={3}>
            <Grid item xs={12} container spacing={2}>
              {data.map((item: any) => (
                <Grid
                  item
                  container
                  xs={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    onClick={() => {
                      navigate(`/my-formBuilder/${item.id}`);
                    }}
                    sx={{ textAlign: "center", textTransform: "none" }}
                    variant="outlined"
                    color="primary"
                    size="small"
                    fullWidth
                  >
                    {item?.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default MyFormBuilder;
