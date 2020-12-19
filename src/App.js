import Container from "./components/Container";
import AppBar from "./components/AppBar";
import {ConfigurationProvider} from "./contexts/ConfigurationProvider"

const App = () => {
  return (
    <ConfigurationProvider>
        <AppBar appTitle={"Make my Github repository private"}/>
        <Container/>
    </ConfigurationProvider>
  );
}

export default App;
