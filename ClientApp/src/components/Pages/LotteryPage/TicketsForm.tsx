import React from 'react';
import styled from 'styled-components';
import { Form, Formik, FormikValues } from 'formik';
import { Lottery, Player, Ticket } from '../../../types';
import { usePlayers } from '../../../hooks/usePlayer';
import { DropdownCreatable } from '../../DropdownCreatable';
import { SubmitButton } from '../../Buttons';

const Row = styled.div`
    display: grid;
    grid-template-columns: 20px 300px;
    gap: 10px;
`;

const TicketRow = ({ ticket }: { ticket: Ticket }) => {
  const { data: players, createPlayer } = usePlayers();

  if (!players) return <span>Loading...</span>;

  const onCreate = async (name: string) => {
    const newPlayer = await createPlayer(name);
    return ({ label: newPlayer.name, value: newPlayer.id });
  }

  const options = players.map(player => ({ label: player.name, value: player.id }));

  return (
    <Row>
      {ticket.id}
      <DropdownCreatable
        name={`tickets[${ticket.id}]`}
        options={options}
        onCreate={onCreate}
      />
    </Row>
  );
};

interface TicketsFormProps {
  lottery: Lottery;
  players: Player[];
  onSubmit: (lottery: Lottery) => Promise<void>;
}
export const TicketsForm = ({ lottery, players, onSubmit }: TicketsFormProps) => {
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
    <section>
      <h3>Lodd</h3>
      <Formik initialValues={{ tickets: initialValues }} onSubmit={submitHandler}>
        <Form>
          {lottery.tickets.map(ticket => <TicketRow key={ticket.id} ticket={ticket} />)}
          <SubmitButton>Lagre</SubmitButton>
        </Form>
      </Formik>
    </section>
  );
};
