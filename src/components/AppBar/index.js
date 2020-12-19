import { AppBar as AppBarMui, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
const GITHUB_URL = "https://github.com/tciles/github-repo-visibility";

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
  }));

const AppBar = ({ appTitle }) => {
    const classes = useStyles();

    const handleClick = () => {
        window.open(GITHUB_URL, "_blank");
    }

    return (
        <AppBarMui position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>{appTitle}</Typography>
            <div>
                  <IconButton
                    aria-label="Github project link"
                    aria-haspopup="true"
                    onClick={handleClick}
                    title="Github"
                    color="inherit"
                  >
                    <GitHubIcon />
                  </IconButton>
            </div>
          </Toolbar>
       </AppBarMui>
    )
};

export default AppBar
