import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../common";
import { useApi } from "../../hook";

export const ListTaskPM = () => {
  const { fetchData } = useApi();
  const navigate = useNavigate();

  const { data = [] } = useQuery({
    queryKey: ["getFormEngineById"],
    queryFn: async (payload?: any) => {
      const data: any = await fetchData(
        `${BASE_URL}/Tasks?PageSize=20&PageIndex=1`
      );
      if (data.success) {
        return data.data;
      } else {
        toast.error(data?.errors[0]);
      }
    },
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, sortable: false },
    {
      sortable: false,
      field: "",
      headerName: "Tác vụ",
      flex: 1,
      renderCell: (cell: any) => {
        const { row } = cell;
        console.log("row:", row);
        return (
          <Button
            onClick={() => {
              navigate(
                `/demoLeave/FormLeave/${
                  row?.status === "New" ? "check" : "checked"
                }?transactionId=${row?.transactionId}`
              );
            }}
          >
            Xem
          </Button>
        );
      },
    },
    {
      sortable: false,
      field: "employeeCode",
      headerName: "Nhân viên",
      flex: 1,
    },
    {
      sortable: false,
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (row: any) => {
        return (
          <Box
            sx={{
              color:
                row.value === "Completed"
                  ? "green"
                  : row.value === "Terminated"
                  ? "red"
                  : "",
            }}
          >
            {row.value.toUpperCase()}
          </Box>
        );
      },
    },
    {
      sortable: false,
      field: "divisionCode",
      headerName: "Phòng ban",
      flex: 1,
    },
    { field: "assignee", headerName: "Người phê duyệt", flex: 2 },
    {
      sortable: false,
      field: "taskName",
      headerName: "Task",
      flex: 3,
    },
  ];

  return (
    <Grid m={5}>
      <Box
        mt={3}
        fontFamily="Lexend,sans-serif"
        fontWeight={600}
        textAlign="center"
        fontSize={30}
      >
        DANH SÁCH TASKS
      </Box>
      <Box
        m={4}
        sx={{
          borderRadius: "10px",
        }}
        boxShadow={2}
      >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </Box>
    </Grid>
  );
};
