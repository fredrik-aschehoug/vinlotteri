import React from 'react';
import { usePrizes } from '../../../../hooks/usePrizes';
import { useParams } from 'react-router';
import { PrizeForm } from './PrizeForm';
import { PrizesTable } from './PrizesTable';

export const Prizes = () => {
  const { id } = useParams<{ id: string; }>();
  const { data: prizes, createPrize } = usePrizes(id);

  if (!prizes) return <span>Loading...</span>;

  return (
    <section>
      <h3>Premier</h3>
      <PrizeForm onNew={createPrize} />
      <PrizesTable prizes={prizes} />
    </section>
  );
};
