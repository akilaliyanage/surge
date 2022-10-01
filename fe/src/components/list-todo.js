// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { useAuth0 } from "@auth0/auth0-react";
// import { getAllTodos } from '../services/api.service';

// // 

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//         field: 'firstName',
//         headerName: 'First name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'lastName',
//         headerName: 'Last name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export const ListTodo = async () => {

//     const [todos, setTodos] = React.useState([]);

//     const { user } = useAuth0();



//     // useEffect(async () => {

//     //     let isMounted = true;


//     //     const { getAccessTokenSilently } = useAuth0();

//     //     const accessToken = getAccessTokenSilently();

//     //     console.log(accessToken);

//     //     // console.log(accessToken);
//     //     // // Update the document title using the browser API
//     //     // const { data, error } = await getAllTodos(accessToken, user.name)

//     //     // if (!isMounted) {
//     //     //     return;
//     //     // }

//     //     // if (data) {
//     //     //     setTodos(data)
//     //     // }



//     // });


//     return (
//         // <Box sx={{ height: 400, width: '100%' }}>
//         //     <DataGrid
//         //         rows={todos}
//         //         columns={columns}
//         //         pageSize={5}
//         //         rowsPerPageOptions={[5]}
//         //         checkboxSelection
//         //         disableSelectionOnClick
//         //         experimentalFeatures={{ newEditingApi: true }}
//         //     />
//         // </Box>
//     );
// }


import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth0 } from "@auth0/auth0-react";
import { getAllTodos } from '../services/api.service';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'ID',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
  },
];


export default function ListTodo() {

  const [todos, setTodos] = React.useState([]);

  const { user } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();



  useEffect(() => {

    let isMounted = true;

    const getTodos = async () => {
      const accessToken = await getAccessTokenSilently();

      const { data, error } = await getAllTodos(accessToken, user.name)

      console.log(data);

      setTodos(data)

    }

    getTodos()

    return () => {
      isMounted = false;
    };

  },  [getAccessTokenSilently]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
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
