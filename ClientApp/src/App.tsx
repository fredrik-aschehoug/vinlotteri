import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { LotteriesPage } from './components/LotteriesPage';
import { Counter } from './components/Counter';

import './custom.css'

export const App = () => (
  <Layout>
    <Route exact path='/' component={LotteriesPage} />
    <Route path='/counter' component={Counter} />
  </Layout>
);
