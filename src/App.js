import { Container } from "@material-ui/core";
import { Fragment } from "react";
import AppBar from "./components/AppBar";
import ConfForm from "./components/ConfForm";

const App = () => {
  return (
    <Fragment>
      <AppBar appTitle={"Manage Github Repositories visibility"}/>

      <Container maxWidth={false}>
        <ConfForm/>
      </Container>
    </Fragment>
  );
}

export default App;
