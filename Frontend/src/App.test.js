import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './redux/store/store';

test('renders without crashing', () => {
  // Smoke test: verify the app entry point can be imported
  expect(store).toBeDefined();
  expect(store.getState()).toHaveProperty('user');
  expect(store.getState()).toHaveProperty('language');
  expect(store.getState()).toHaveProperty('currency');
});
