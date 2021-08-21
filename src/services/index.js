import axios from "axios";

export async function getVideoData(variables) {
    try {
        const resp = await axios.get("/api/all", { params: variables });
        return resp.data;
    } catch (err) {
        if (err.response) {
            throw err.response.data;
        } else if (err.request) {
            throw err.request;
        } else {
            throw err.message;
        }
    }
}
