import useSWR from "swr"
import { Lottery, Player } from "../types";
import { postJsonAsync, putJsonAsync } from "../utils/client";

export const usePlayers = () => {
    const { data, mutate } = useSWR<Player[]>('player');

    const createPlayer = async (playerName: string) => {
        const result = postJsonAsync('player', { name: playerName });
        mutate();
        return result;
    };

    return { data, createPlayer };
};

export const usePlayer = (id: string) => {
    const { data, mutate } = useSWR<Player>(`player/${id}`);

    const updatePlayer = async (lottery: Lottery) => {
        const result = await putJsonAsync('player', lottery);
        await mutate(result);
        return result;
    };

    return { data, updatePlayer };
};
