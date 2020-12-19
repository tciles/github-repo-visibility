import { TextField, Button, Typography, FormControlLabel, Checkbox, IconButton, InputAdornment } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineRounded from '@material-ui/icons/HelpOutlineRounded';
import { useConfigurationState, useConfigurationDispatch, useConfigurationGithub } from "../../contexts/ConfigurationProvider"
import { Fragment } from "react";

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
    const configurationState = useConfigurationState();
    const configurationDispatch = useConfigurationDispatch();
    const configurationGithub = useConfigurationGithub();

    const handleOnUserChange = (e) => {
        configurationDispatch({ type: "SET_USER", payload: e.target.value })
    }

    const handleOnTokenChange = (e) => {
        configurationDispatch({ type: "SET_TOKEN", payload: e.target.value })
    }

    const handleChange = (e) => {
        configurationDispatch({ type: "SET_VISIBILITY", payload: e.target.checked === true })
    }

    const handleOnClick = (e) => {
        configurationGithub.getUserRepositories(configurationState.user).then(respositories => {
            configurationDispatch({ type: "SET_REPOSITORIES", payload: respositories })
        }).catch(error => {
            console.log(error.toJSON())
        })
    }

    const handleOnUpdateClick = (e) => {
        const { selectedIds, repositories, user, visibility } = configurationState;

        for (const repoId of selectedIds) {
            const repo = repositories.find(r => r.id === parseInt(repoId));

            if (!repo) {
                continue;
            }

            configurationGithub.updateRepositoryVisibility(user, repo.name, visibility)
                .then(console.log)
                .catch(error => {
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

                <Button variant="contained" color="primary" onClick={handleOnClick}>Find repositories</Button>

                {configurationState.repositories.length > 0 && (
                    <Fragment>
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

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={configurationState.visibility}
                                    onChange={handleChange}
                                    name="visibility"
                                    color="primary"
                                />
                            }
                            label="Private ?"
                        />

                        <Button variant="contained" color="primary" onClick={handleOnUpdateClick}>Update visibilities</Button>
                    </Fragment>
                )}
            </form>

        </div>
    );
}

export default ConfForm;
