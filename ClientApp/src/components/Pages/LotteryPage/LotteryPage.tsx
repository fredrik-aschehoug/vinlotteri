import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useLottery } from '../../../hooks/useLottery';
import { usePlayers } from '../../../hooks/usePlayer';
import { Prizes } from './Prizes';
import { TicketsForm } from './TicketsForm';

const Content = styled.main`
  display: flex;
  gap: 20px;
`;

export const LotteryPage = () => {
  const { id } = useParams<{ id: string; }>();
  const { data: lottery, updateLottery } = useLottery(id);
  const { data: players } = usePlayers();


  if (!lottery || !players) return <span>Loading...</span>;

  return (
    <div>
      <h2>{lottery.name}</h2>
      <Content>
        <TicketsForm lottery={lottery} players={players} onSubmit={updateLottery} />
        <Prizes />
      </Content>
    </div>
  );
};
