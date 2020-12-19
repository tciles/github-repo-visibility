import { TextField, Button, Typography, FormControlLabel, Checkbox, IconButton, InputAdornment, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import HelpOutlineRounded from '@material-ui/icons/HelpOutlineRounded';
import { useConfigurationState, useConfigurationDispatch, useConfigurationGithub } from "../../contexts/ConfigurationProvider"
import { Fragment } from "react";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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

    const setAlerts = (msg, type = "error") => {
        const payload = [];

        if (typeof msg === "string") {
            payload.push({ type, msg });
        }

        configurationDispatch({ type: "SET_ALERTS", payload })
    }

    const handleOnTokenChange = (e) => {
        configurationDispatch({ type: "SET_TOKEN", payload: e.target.value })
    }

    const handleChange = (e) => {
        configurationDispatch({ type: "SET_VISIBILITY", payload: e.target.checked === true })
    }

    const onError = error => {
        console.log(error.toJSON())

        setAlerts(error.message)
    }

    const handleOnClick = (e) => {
        setAlerts("Find repositories...", "info")
        getRepositories(() => {
            setTimeout(() => { setAlerts([]); }, 0)
        });
    }

    const getRepositories = (cb) => {
        if (!cb) {
            cb = () => { };
        }

        configurationGithub.getUserRepositories(configurationState.user).then(respositories => {
            configurationDispatch({ type: "SET_REPOSITORIES", payload: respositories })

            cb();
        }).catch(onError)
    }

    const handleOnUpdateClick = (e) => {
        setAlerts("Update repositories...", 'info')

        const { selectedIds, repositories, visibility } = configurationState;

        const l = selectedIds.length;
        let i = 0;

        for (const repoId of selectedIds) {
            const repo = repositories.find(r => r.id === parseInt(repoId));

            if (!repo) {
                continue;
            }

            configurationGithub.updateRepositoryVisibility(repo.full_name, visibility)
                .then(response => {
                    i++;

                    if (i >= l) {
                        getRepositories(() => {
                            setAlerts("All selected project updated", "success")
                            setTimeout(() => { setAlerts([]); }, 1000)
                        })
                    }
                })
                .catch(onError)
        }
    }

    const handleOnTokenHelp = () => {
        window.open("https://github.com/settings/tokens", '_blank')
    }

    return (
        <Container className={classes.root} maxWidth={false}>
            <Typography variant="h6" color="inherit">Configuration</Typography>

            <form className={classes.form} noValidate autoComplete="off">
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

                {configurationState.token && (
                    <Button variant="contained" color="primary" onClick={handleOnClick}>Find repositories</Button>
                )}

                {configurationState.repositories.length > 0 &&
                    configurationState.selectedIds.length > 0 && (
                        <Fragment>
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

            <div style={{ marginTop: "16px" }}>
                {configurationState.repositories.length > 0 && configurationState.selectedIds.length < 1 && (
                    <Alert severity="info">Select a repository</Alert>
                )}

                {configurationState.alerts.length > 0 && (
                    configurationState.alerts.map((e, idx) => <Alert severity={e.type} key={idx}>{e.msg}</Alert>)
                )}
            </div>
        </Container>
    );
}

export default ConfForm;
