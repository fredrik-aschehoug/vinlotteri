import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import { getJsonAsync } from './utils/client';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') ?? '/';
const rootElement = document.getElementById('root');

const swrConfig = {
  fetcher: (path: string) => getJsonAsync(path)
}

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <SWRConfig value={swrConfig}>
      <App />
    </SWRConfig>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
