import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { LotteriesPage } from './components/Pages/LotteriesPage';
import { LotteryPage } from './components/Pages/LotteryPage';
import { ResultsPage } from './components/Pages/ResultsPage';

import './custom.css'

export const App = () => (
  <Layout>
    <Route exact path='/' component={LotteriesPage} />
    <Route exact path='/:id/results' component={ResultsPage} />
    <Route exact path='/:id' component={LotteryPage} />
  </Layout>
);
