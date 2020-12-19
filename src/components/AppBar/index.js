import { AppBar as AppBarMui, Toolbar, Typography } from '@material-ui/core';

const AppBar = ({ appTitle }) => (
    <AppBarMui position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          {appTitle}
        </Typography>
      </Toolbar>
   </AppBarMui>
);

export default AppBar
