import React from 'react';
import { useLotteries } from '../../../hooks/useLottery';
import { LotteriesTable } from './LotteriesTable';
import { NewLotteryForm } from './NewLotteryForm';

export const LotteriesPage = () => {
  const { data: lotteries, createLottery } = useLotteries();

  if (!lotteries) return <span>Loading...</span>;

  return (
    <main>
      <h2>Legg til nytt lotteri</h2>
      <NewLotteryForm onNew={createLottery} />
      <h2>Eksisterende lotteri</h2>
      <LotteriesTable lotteries={lotteries} />
    </main>
  );
};
