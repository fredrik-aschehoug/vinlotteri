import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik, FormikValues } from 'formik';
import { SubmitButton } from '../../Buttons';

const FormLayout = styled(Form)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 5px;
`;

export const NewLotteryForm = ({ onNew }: { onNew: (name: string) => Promise<void> }) => {
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
