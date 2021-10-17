import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik, FormikValues } from 'formik';
import { Prize } from '../../../../types';
import { SubmitButton } from '../../../Buttons';

const FormLayout = styled(Form)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 5px;
`;

export const PrizeForm = ({ onNew }: { onNew: (prize: Partial<Prize>) => Promise<void> }) => {
  const onSubmit = async (values: FormikValues) => {
    if (values.name && values.price) {
      await onNew(values);
    }
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ name: '', price: 0 }}>
      <FormLayout>
        <label htmlFor="name">Navn: </label>
        <Field id="name" name="name" />
        <label htmlFor="price">Pris: </label>
        <Field id="price" name="price" type="number" />
        <SubmitButton>Legg til</SubmitButton>
      </FormLayout>
    </Formik>
  );
};
