import axios from "axios";

const createClient = (baseURL, extraConfig) => {
    let config = { baseURL }

    if (typeof extraConfig === "object") {
        config = {...config, ...extraConfig}
    }

    const client = axios.create(config);

    client.interceptors.response.use(response => {
        if ("errors" in response) {
            return response.errors;
        }

        return response.data;
    }, error => {
        return Promise.reject(error);
    });

    const {get, post, put, patch, delete: destroy} = client;

    return {get, post, put, patch, destroy};
}

export default createClient;
