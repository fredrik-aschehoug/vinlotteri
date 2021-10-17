import React from 'react';
import styled from 'styled-components';
import { Lottery } from '../../../types';
import { Link } from 'react-router-dom';

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
`;

const LotteryRow = ({ lottery }: { lottery: Lottery }) => (
  <TableRow>
    <td>
      <Link to={`/${lottery.id}`}>{lottery.name}</Link>
    </td>
    <td>{new Date(lottery.created).toLocaleString('nb-NO')}</td>
    <td>{lottery.completed ? 'ja' : 'nei'}</td>
  </TableRow>
);

export const LotteriesTable = ({ lotteries }: { lotteries: Lottery[]; }) => (
  <table>
    <thead>
      <TableRow>
        <th>Navn</th>
        <th>Opprettet</th>
        <th>Ferdig?</th>
      </TableRow>
    </thead>
    <tbody>
      {lotteries.map(lottery => <LotteryRow key={lottery.id} lottery={lottery} />)}
    </tbody>
  </table>
);
