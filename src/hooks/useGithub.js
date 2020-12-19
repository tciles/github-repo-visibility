import { useState, useMemo } from "react";
import { GithubFactory } from "../api";

const useGithub = () => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [visibility, setVisibility] = useState(false);

    const client = useMemo(() => GithubFactory.create(user, token), [user, token]);

    return {
        user,
        setUser,
        token,
        setToken,
        client,
        repositories,
        setRepositories,
        visibility,
        setVisibility
    };
}

export default useGithub;
