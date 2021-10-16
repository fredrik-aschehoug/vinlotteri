import { Field, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { useLotteries } from '../hooks/useLottery';
import { Lottery } from '../types';

const NewLotteryForm = ({ onNew }: { onNew: (name: string) => Promise<void> }) => {
  const onSubmit = async (values: FormikValues) => {
    if (values.name) {
      await onNew(values.name)
    }
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{ name: '' }}>
      <Form>
        <label htmlFor="name">Navn</label>
        <Field id="name" name="name" />
        <button type="submit">Legg til</button>
      </Form>
    </Formik>
  )
}

const LotteryRow = ({ lottery }: { lottery: Lottery }) => (
  <tr>
    <td>{lottery.name}</td>
    <td>{new Date(lottery.created).toLocaleString('nb-NO')}</td>
  </tr>
)

const LotteriesTable = ({ lotteries }: { lotteries: Lottery[]; }) => (
  <table>
    <thead>
      <th>Navn</th>
      <th>Opprettet</th>
    </thead>
    <tbody>
      {lotteries.map(lottery => <LotteryRow key={lottery.id} lottery={lottery} />)}
    </tbody>
  </table>
);

export const LotteriesPage = () => {
  const { data: lotteries, createLottery } = useLotteries();

  if (!lotteries) return <span>Loading...</span>;

  return (
    <div>
      <NewLotteryForm onNew={createLottery} />
      <LotteriesTable lotteries={lotteries} />
    </div>
  );
};
