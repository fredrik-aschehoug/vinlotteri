import React from 'react';
import styled from 'styled-components';
import { Prize } from '../../../../types';

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
`;

const PrizeRow = ({ prize }: { prize: Prize }) => (
  <TableRow>
    <td>{prize.name}</td>
    <td>{`${prize.price} kr`}</td>
  </TableRow>
);

export const PrizesTable = ({ prizes }: { prizes: Prize[]; }) => (
  <table>
    <thead>
      <TableRow>
        <th>Navn</th>
        <th>Pris</th>
      </TableRow>
    </thead>
    <tbody>
      {prizes.map(prize => <PrizeRow key={prize.id} prize={prize} />)}
    </tbody>
  </table>
);
