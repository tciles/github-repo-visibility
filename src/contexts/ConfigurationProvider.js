import {createContext, useReducer, useContext, useMemo} from "react";
import { GithubFactory } from "../api";

const ConfigurationStateContext = createContext();
const ConfigurationDispatchContext = createContext();
const ConfigurationGithubContext = createContext();

const configurationReducer = (state, action) => {
    switch(action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        case "SET_TOKEN":
            return { ...state, token: action.payload }
        case "SET_VISIBILITY":
            return { ...state, visibility: action.payload }
        case "SET_REPOSITORIES":
            return { ...state, repositories: action.payload }
        case "SET_SELECTED_IDS":
            return { ...state, selectedIds: action.payload }
    }
}

const ConfigurationProvider = ({children}) => {
    const [state, dispatch] = useReducer(configurationReducer, {
        user: "",
        token: "",
        visibility: true,
        repositories: [],
        selectedIds: []
    });

    const client = useMemo(() => GithubFactory.create(state.token), [state.token]);

    return (
        <ConfigurationStateContext.Provider value={state}>
            <ConfigurationDispatchContext.Provider value={dispatch}>
                <ConfigurationGithubContext.Provider value={client}>
                    {children}
                </ConfigurationGithubContext.Provider>
            </ConfigurationDispatchContext.Provider>
        </ConfigurationStateContext.Provider>
    );
}

const useConfigurationState = () => {
    const context = useContext(ConfigurationStateContext);

    if (context === undefined) {
        throw new Error('useConfigurationState must be used within a ConfigurationProvider')
    }

    return context;
}

const useConfigurationDispatch = () => {
    const context = useContext(ConfigurationDispatchContext);

    if (context === undefined) {
        throw new Error('useConfigurationDispatch must be used within a ConfigurationProvider')
    }

    return context;
}

const useConfigurationGithub = () => {
    const context = useContext(ConfigurationGithubContext);

    if (context === undefined) {
        throw new Error('useConfigurationGithub must be used within a ConfigurationProvider')
    }

    return context;
}

export {ConfigurationProvider, useConfigurationState, useConfigurationDispatch, useConfigurationGithub};
