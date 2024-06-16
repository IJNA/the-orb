import axios from "axios";
import { useQuery } from "react-query";

const axiosClient = axios.create({
    baseURL: "https://jenjaoocpj.execute-api.us-east-1.amazonaws.com/staging",
});

export const useGetSearchResults = (query) =>
    useQuery(
        ["search", query],
        async () => {
            const response = await axiosClient.get(`/searchPage/${query}`);
            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            return response.data?.data ?? {};
        },
        {
            enabled: !!query,
        }
    );
