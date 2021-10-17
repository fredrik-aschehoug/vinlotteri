import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { useLottery } from '../../../hooks/useLottery';
import { usePlayers } from '../../../hooks/usePlayer';
import { Prizes } from './Prizes';
import { TicketsForm } from './TicketsForm';
import { Button } from '../../Buttons';

const Content = styled.main`
  display: flex;
  gap: 20px;
`;

const FinalizeLottery = () => {
  const { id } = useParams<{ id: string; }>();
  const history = useHistory();
  const { data: lottery, finalizeLottery } = useLottery(id);

  const onClick = async () => {
    if (!lottery?.completed) {
      await finalizeLottery()
    }
    history.push(`/${id}/results`)
  }

  return (
    <section>
      Ferdig med registrering?
      <Button onClick={onClick}>Gå til prisutdeling</Button>
    </section>
  );
};

export const LotteryPage = () => {
  const { id } = useParams<{ id: string; }>();
  const { data: lottery, updateLottery } = useLottery(id);
  const { data: players } = usePlayers();

  if (!lottery || !players) return <span>Loading...</span>;

  return (
    <main>
      <h2>{lottery.name}</h2>
      <Content>
        <TicketsForm lottery={lottery} players={players} onSubmit={updateLottery} />
        <Prizes />
        <FinalizeLottery />
      </Content>
    </main>
  );
};
