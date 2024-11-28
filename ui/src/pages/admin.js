import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Header from "../components/header";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [rows, setRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("true"));
    const token = sessionData?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    // Fetch data from the backend
    axios
      .get("http://localhost:5000/users/getAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Transform the data to match the DataGrid format
        const data = response.data.map((user, index) => ({
          id: index + 1,
          S_No: index + 1,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          mcqTestsAssigned: user.mcqTestsAssigned.join(", "),
          codingTestsAssigned: user.codingTestsAssigned.join(", "),
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "S_No", headerName: "S_No", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "mcqTestsAssigned",
      headerName: "MCQ Tests Assigned",
      width: 200,
      editable: true,
    },
    {
      field: "codingTestsAssigned",
      headerName: "Coding Tests Assigned",
      width: 200,
      editable: true,
    },
  ];

  const nav = useNavigate();

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          height: "100vh",
          marginTop: "5%",
        }}
      >
        {/* Top Button Group */}
        <Box
          sx={{
            width: "85%",
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            style={{ width: "10vw", marginRight: "5%" }}
            onClick={() => nav("/adduser")}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={{ width: "10vw", marginRight: "5%" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            style={{
              width: "10vw",
              marginRight: "5%",
              backgroundColor: "#fc7a46",
            }}
          >
            Update
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 400, width: "85%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newSelection) =>
              setRowSelectionModel(newSelection)
            }
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "#1976d2",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "#1976d2",
              },
              "& .MuiDataGrid-row": {
                borderColor: "#1976d2",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #1976d2",
              },
              "& .MuiDataGrid-toolbarContainer": {
                borderBottom: "1px solid #1976d2",
              },
            }}
          />
        </Box>

        {/* Bottom Buttons */}
        <Box
          sx={{
            width: "85%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{
              marginRight: "1rem",
              backgroundColor: "#fc7a46",
              color: "white",
            }}
            onClick={() => setRowSelectionModel([])} // Clear selection
          >
            Clear
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Admin;

