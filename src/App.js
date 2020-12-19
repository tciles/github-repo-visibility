import Container from "./components/Container";
import AppBar from "./components/AppBar";
import {ConfigurationProvider} from "./contexts/ConfigurationProvider"

const App = () => {
  return (
    <ConfigurationProvider>
        <AppBar appTitle={"Manage Github Repositories visibility"}/>
        <Container/>
    </ConfigurationProvider>
  );
}

export default App;
