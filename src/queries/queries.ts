import { useQuery } from "@tanstack/react-query"
import { InitDataResponse } from "../types/initDataResponse";

export default function useInitData(): InitDataResponse {
    const { data } = useQuery({queryKey: ['initData']})
    return data as InitDataResponse;
}