import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';
import { useConfigurationState, useConfigurationDispatch } from "../../contexts/ConfigurationProvider"

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field: 'private',
        headerName: 'Private',
        width: 130,
        renderCell: params => {
            const backgroundColor = params.value ? "#d32f2f" : "#388e3c"

            return <div style={{
                backgroundColor,
                color: "#fff",
                height: "32px",
                lineHeight: "32px",
                padding: "0 4px",
                borderRadius: "4px"
            }}>{params.value ? "Private" : "Public"}</div>
        }
    },
    { field: 'name', headerName: 'Project name', width: 300 },
    { field: 'full_name', headerName: 'Full name', width: 300 },
];

const RepoList = () => {
    const configurationState = useConfigurationState();
    const configurationDispatch = useConfigurationDispatch();

    const onSelectionChange = (newSelection) => {
        configurationDispatch({ type: "SET_SELECTED_IDS", payload: newSelection.rowIds })
    }

    let repositories = configurationState.repositories.filter(repo => !repo.fork);
    repositories = [...repositories.filter(v => !!v)]

    return (
        <Container style={{ height: 700, width: '100%', paddingTop: 20 }} maxWidth={false}>
            <DataGrid
                rows={repositories}
                columns={columns}
                pageSize={25}
                checkboxSelection
                onSelectionChange={onSelectionChange} />
        </Container>
    );
}

export default RepoList;
