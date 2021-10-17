import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useLottery } from '../../../hooks/useLottery';
import { usePlayers } from '../../../hooks/usePlayer';
import { usePrizes } from '../../../hooks/usePrizes';
import { Player, Prize, Ticket } from '../../../types';


const TableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
`;

interface PrizeRowProps {
  prize: Prize;
  tickets: Ticket[];
  players: Player[];
}
const PrizeRow = ({ prize, tickets, players }: PrizeRowProps) => {
  const winningTicket = tickets.find(ticket => ticket.id === prize.winningTicket)
  const winningPlayer = players.find(player => player.id === winningTicket?.owner)

  return (
    <TableRow>
      <td>{prize.name}</td>
      <td>{`${prize.price} kr`}</td>
      <td>{winningPlayer?.name}</td>
    </TableRow>
  );
};

interface PrizesProps {
  prizes: Prize[];
  tickets: Ticket[];
  players: Player[];
}
const Prizes = ({ prizes, tickets, players }: PrizesProps) => (
  <table>
    <thead>
      <TableRow>
        <th>Navn</th>
        <th>Pris</th>
        <th>Vinner</th>
      </TableRow>
    </thead>
    <tbody>
      {prizes.map(prize => <PrizeRow key={prize.id} prize={prize} tickets={tickets} players={players} />)}
    </tbody>
  </table>
);

export const ResultsPage = () => {
  const { id } = useParams<{ id: string; }>();
  const { data: lottery } = useLottery(id);
  const { data: prizes } = usePrizes(id);
  const { data: players } = usePlayers();

  if (!lottery || !prizes || !players) return <span>Loading...</span>;

  return (
    <main>
      <h2>{`Resultater for ${lottery.name}`}</h2>
      <Prizes prizes={prizes} tickets={lottery.tickets} players={players} />
    </main>
  );
};
