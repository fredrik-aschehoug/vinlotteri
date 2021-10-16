import React from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { useLottery } from '../hooks/useLottery';
import { Lottery, Player, Ticket } from '../types';
import { useParams } from 'react-router';
import { usePlayers } from '../hooks/usePlayer';
import { DropdownCreatable } from './DropdownCreatable';

const TicketRow = ({ ticket }: { ticket: Ticket }) => {
    const { data: players, createPlayer } = usePlayers();

    if (!players) return <span>Loading...</span>;

    const options = players.map(player => ({ label: player.name, value: player.id }));

    return (
        <div>
            {ticket.id}
            <DropdownCreatable
                name={`tickets[${ticket.id}]`}
                options={options}
                onCreate={createPlayer}
            />
        </div>
    );
};

interface TicketsFormProps {
    lottery: Lottery;
    players: Player[];
    onSubmit: (lottery: Lottery) => Promise<void>;
}
const TicketsForm = ({ lottery, players, onSubmit }: TicketsFormProps) => {
    const getOptionFromPlayerId = (id: string) => {
        const player = players.find(player => player.id === id);
        return ({ label: player?.name, value: player?.id })
    };

    const initialValues = lottery.tickets.map(ticket => ticket.owner ? getOptionFromPlayerId(ticket.owner) : null);
    initialValues.unshift(null); // Ticket ID starts at index 1

    const submitHandler = async (values: FormikValues) => {
        const updatedTickets = lottery.tickets.map(ticket => {
            if (values.tickets[ticket.id]) {
                return ({ ...ticket, owner: values.tickets[ticket.id].value })
            }
            return ({ ...ticket, owner: null });
        });
        
        await onSubmit({ ...lottery, tickets: updatedTickets });
    };

    return (
        <Formik initialValues={{ tickets: initialValues }} onSubmit={submitHandler}>
            <Form>
                {lottery.tickets.map(ticket => <TicketRow key={ticket.id} ticket={ticket} />)}
                <button type="submit">Lagre</button>
            </Form>
        </Formik>
    );
};

export const LotteryPage = () => {
    const { id } = useParams<{  id: string; }>();
    const { data: lottery, updateLottery } = useLottery(id);
    const { data: players } = usePlayers();
    

    if (!lottery || !players) return <span>Loading...</span>;

    return (
        <div>
            {lottery.name}
            <TicketsForm lottery={lottery} players={players} onSubmit={updateLottery} />
        </div>
    );
};
