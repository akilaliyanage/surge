import { Token } from "@mui/icons-material";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const createNewTodo = async (accessToken, body) => {

    console.log(accessToken);
    const config = {
        url: `${apiServerUrl}/api/v1/todo/create`,
        method: "POST",
        data: body,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};