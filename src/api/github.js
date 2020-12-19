import createClient from "./baseClient"

const BASE_URL = "https://api.github.com"

const GithubFactory = {
    create: (token) => {
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
            getUserRepositories: () => get(`/user/repos?type=all`),
            updateRepositoryVisibility: (repo, visibility = false) => patch(`/repos/${repo}`, {'private': visibility}),
        }

        return client;
    }
}

export default GithubFactory;
