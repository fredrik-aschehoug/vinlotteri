
export interface Player {
    id: string;
    name: string;
}

export interface Ticket {
    id: number;
    owner: string | null;
}

export interface Lottery {
    id: string;
    name: string;
    tickets: Ticket[];
    completed: boolean;
    created: string;
}