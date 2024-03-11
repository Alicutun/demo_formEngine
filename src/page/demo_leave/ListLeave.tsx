import { Box, Button, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../../hook";
import { BASE_URL } from "../../common";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const ListLeave = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const navigate = useNavigate();

  const { refetch, data = [] } = useQuery({
    queryKey: ["getFormEngineById"],
    queryFn: async (payload?: any) => {
      const data: any = await fetchData(
        `${BASE_URL}/LeaveRequest?PageSize=20&PageIndex=1`
      );
      if (data.success) {
        return data?.data;
      } else {
        toast.error(data?.errors[0]);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      flex: 1,
      sortable: false,
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      flex: 2,
      sortable: false,
      field: "status",
      headerName: "Trạng thái",
      width: 160,
      renderCell: (row: any) => {
        return (
          <Box
            sx={{
              color:
                row.value === "Approved"
                  ? "green"
                  : row.value === "Rejected"
                  ? "red"
                  : "orange",
            }}
          >
            {row.value.toUpperCase()}
          </Box>
        );
      },
    },
    {
      flex: 2,
      sortable: false,
      field: "comment",
      headerName: "Nội dung",
      width: 130,
    },
    {
      flex: 2,
      sortable: false,
      field: "employeeCode",
      headerName: "Nhân viên",
      width: 130,
    },
    {
      flex: 2,
      sortable: false,
      field: "leaveRequestDateType",
      headerName: "Số ngày nghỉ",
      width: 160,
    },
    {
      flex: 2,
      sortable: false,
      field: "leaveRequestType",
      headerName: "Loại nghỉ phép",
      width: 160,
    },
    {
      flex: 2,
      sortable: false,
      field: "divisionCode",
      headerName: "Phòng ban",
      width: 200,
    },
    {
      flex: 2,
      sortable: false,
      field: "approver",
      headerName: "Người phê duyệt",
      width: 120,
    },
    {
      flex: 2,
      sortable: false,
      field: "cc",
      headerName: "cc",
      width: 120,
    },
    {
      flex: 1,
      sortable: false,
      field: "bcc",
      headerName: "bcc",
      width: 250,
    },
  ];

  return (
    <Grid m={5}>
      <Box
        mt={3}
        fontFamily="Lexend,sans-serif"
        textAlign="center"
        fontWeight={600}
        fontSize={30}
      >
        DANH SÁCH NGHỈ PHÉP
      </Box>
      <Grid container justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/demoLeave/FormLeave/create");
          }}
        >
          Tạo mới
        </Button>
      </Grid>
      <Box
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
