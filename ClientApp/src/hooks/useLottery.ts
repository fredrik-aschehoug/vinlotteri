import useSWR from "swr"
import { Lottery } from "../types";
import { postJsonAsync, putJsonAsync } from "../utils/client";

export const useLotteries = () => {
    const { data, mutate } = useSWR<Lottery[]>('lottery');

    const createLottery = async (lotteryName: string) => {
        const result = postJsonAsync('lottery', { name: lotteryName });
        mutate();
        return result;
    };

    return { data, createLottery };
};

export const useLottery = (id: string) => {
    const { data, mutate } = useSWR<Lottery>(`lottery/${id}`);

    const updateLottery = async (lottery: Lottery) => {
        const result = await putJsonAsync('lottery', lottery);
        await mutate(result);
        return result;
    };

    return { data, updateLottery };
};
