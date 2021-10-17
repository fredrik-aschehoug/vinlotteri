import useSWR from "swr"
import { Prize } from "../types";
import { postJsonAsync } from "../utils/client";

export const usePrizes = (lotteryId: string) => {
    const url = `lottery/${lotteryId}/prize`
    const { data, mutate } = useSWR<Prize[]>(url);

    const createPrize = async (prize: Partial<Prize>) => {
        const result = postJsonAsync(url, prize);
        mutate();
        return result;
    };

    return { data, createPrize };
};
