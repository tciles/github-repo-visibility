import createClient from "./baseClient"

const BASE_URL = "https://api.github.com"

const GithubFactory = {
    create: (user, token) => {
        const config = {
            headers: {
                "accept": "application/vnd.github.v3+json"
            }
        };

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        const {get, patch} = createClient(BASE_URL, config);

        const client = {
            _user: user,
            _token: token,

            getUserRepositories: user => get(`/user/repos?type=all`),
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
