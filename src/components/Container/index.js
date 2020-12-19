import { Container as ContainerMui } from "@material-ui/core";
import ConfForm from "../ConfForm";
import RepoList from "../RepoList";
import {useConfigurationState} from "../../contexts/ConfigurationProvider"

const Container = () => {
    const configurationState = useConfigurationState();

    return (
        <ContainerMui maxWidth={false}>
          <ConfForm/>
          {configurationState.repositories.length > 0 && <RepoList/>}
        </ContainerMui>
    );
}

export default Container;
