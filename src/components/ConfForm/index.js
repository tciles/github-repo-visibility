import { useState } from "react";
import { TextField, Button, Typography, FormControlLabel, Checkbox, IconButton, InputAdornment } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import useGithub from "../../hooks/useGithub";
import RepoList from "../RepoList/RepoList";
import HelpOutlineRounded from '@material-ui/icons/HelpOutlineRounded';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2)
    },
    form: {
        display: "flex",

        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        width: "50ch"
    }
}));

const ConfForm = () => {
    const classes = useStyles();
    const { user, setUser, token, setToken, client, repositories, setRepositories, visibility, setVisibility } = useGithub();
    const [selection, setSelection] = useState([]);

    const handleOnUserChange = (e) => {
        setUser(e.target.value);
    }

    const handleOnTokenChange = (e) => {
        setToken(e.target.value);
    }

    const handleOnClick = (e) => {
        client.getUserRepositories(user).then(setRepositories).catch(error => {
            console.log(error.toJSON())
        })
    }

    const handleChange = (e) => {
        setVisibility(e.target.checked);
    }

    const onSelectionChange = (newSelection) => {
        setSelection(newSelection.rowIds);
    }

    const handleOnUpdateClick = (e) => {
        for (const repoId of selection) {
            const repo = repositories.find(r => r.id === parseInt(repoId));

            if (!repo || repo.fork) {
                continue;
            }

            client.updateRepositoryVisibility(user, repo.name, visibility).then(console.log).catch(error => {
                console.log(error.toJSON())
            })
        }
    }

    const handleOnTokenHelp = () => {
        window.open("https://github.com/settings/tokens", '_blank')
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit">Configuration</Typography>

            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.input}
                    id="outlined-basic"
                    label="Github user"
                    variant="outlined"
                    onChange={handleOnUserChange} />

                <TextField
                    className={classes.input}
                    id="outlined-basic"
                    label="Github repository token"
                    variant="outlined"
                    type="password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" >
                                <IconButton
                                    title="Create your repository token"
                                    onClick={handleOnTokenHelp}
                                >
                                    <HelpOutlineRounded />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}

                    onChange={handleOnTokenChange} />

                {user && token && selection.length > 0 && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={visibility}
                                onChange={handleChange}
                                name="visibility"
                                color="primary"
                            />
                        }
                        label="Private ?"
                    />
                )}

                {user && !token && <Button variant="contained" color="primary" onClick={handleOnClick}>Find repositories</Button>}
                {user && token && selection.length > 0 && <Button variant="contained" color="primary" onClick={handleOnUpdateClick}>Update visibilities</Button>}
            </form>

            {repositories.length > 1 && <RepoList rows={repositories} onSelectionChange={onSelectionChange} />}
        </div>
    );
}

export default ConfForm;
