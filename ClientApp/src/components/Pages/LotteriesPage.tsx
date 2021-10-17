import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useLotteries } from '../../hooks/useLottery';
import { Lottery } from '../../types';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../Buttons';

const FormLayout = styled(Form)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 5px;
`;

const NewLotteryForm = ({ onNew }: { onNew: (name: string) => Promise<void> }) => {
  const onSubmit = async (values: FormikValues) => {
    if (values.name) {
      await onNew(values.name);
    }
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ name: '' }}>
      <FormLayout>
        <label htmlFor="name">Navn: </label>
        <Field id="name" name="name" />
        <SubmitButton>Legg til</SubmitButton>
      </FormLayout>
    </Formik>
  );
};

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

const LotteriesTable = ({ lotteries }: { lotteries: Lottery[]; }) => (
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
