import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'private', headerName: 'Private', width: 130 },
  { field: 'fork', headerName: 'Fork', width: 130 },
  { field: 'name', headerName: 'Project name', width: 300 },
  { field: 'full_name', headerName: 'Full name', width: 300 },
];

const RepoList = ({rows, onSelectionChange}) => {
    return (
        <Container style={{ height: 700, width: '100%', paddingTop: 20 }} maxWidth={false}>
            <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={25} 
                checkboxSelection 
                onSelectionChange={onSelectionChange}/>
        </Container>
    );
}

export default RepoList;
