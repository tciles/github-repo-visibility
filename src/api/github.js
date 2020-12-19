import createClient from "./baseClient"

const BASE_URL = "https://api.github.com"

const GithubFactory = {
    create: (user, token) => {
        const config = {};

        if (token) {
            config.headers = {
                "Authorization": `Bearer ${token}`
            };
        }

        const {get, patch} = createClient(BASE_URL, config);

        const client = {
            _user: user,
            _token: token,

            getUserRepositories: user => get(`/users/${user}/repos`),
            updateRepositoryVisibility: (user, repo, visibility = false) => {
                const data = {};
                data['private'] = visibility;

                return patch(`/repos/${user}/${repo}`, data);
            }
        }

        return client;
    }
}

export default GithubFactory;
