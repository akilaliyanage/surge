import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getAllTodos, updateStatus } from '../services/api.service';

const columns = [
  { field: '_id', headerName: 'ID', width: 0 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    hidden: true
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: true,
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    width: 110,
    editable: true,
  },
  {
    field: 'action',
    width: 200,
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        window.open(params.row.file)

        console.log(params.row.file);
      };

      return <Button variant='contained' onClick={onClick}>DOWNLOAD ATTACHMENT</Button>;
    },
  },
  {
    field: 'status',
    width: 200,
    headerName: 'Status',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();

        console.log(params.row.status);
      };

      const handleChange = async (event, newStatus) => {
        console.log(newStatus);

        const { data, error } = await updateStatus(window.localStorage.getItem("token"), params.row._id, newStatus)

        if (data) {
          window.location.replace("/todo")
        }

      };

      return <ToggleButtonGroup
        color={params.row.status == "todo" ? "primary" : params.row.status == "inprogress" ? "secondary" : params.row.status == "done" ? "error" : "primary"}
        value={params.row.status}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="todo">TODO</ToggleButton>
        <ToggleButton value="inprogress">IN PROGRESS</ToggleButton>
        <ToggleButton value="done">DONE</ToggleButton>
      </ToggleButtonGroup>;
    },
  },
];


export default function ListTodo() {

  const [todos, setTodos] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { user } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();



  useEffect(() => {

    let isMounted = true;

    const getTodos = async () => {
      const accessToken = await getAccessTokenSilently();

      window.localStorage.setItem("token", accessToken)

      const { data, error } = await getAllTodos(accessToken, user.name)

      console.log(data);

      setTodos(data)

    }

    getTodos()

    return () => {
      isMounted = false;
    };

  }, [getAccessTokenSilently]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        rows={todos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
