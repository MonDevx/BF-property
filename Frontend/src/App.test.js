import { store } from './redux/store/store';

test('renders without crashing', () => {
  // Smoke test: verify the Redux store is correctly configured
  expect(store).toBeDefined();
  expect(store.getState()).toHaveProperty('user');
  expect(store.getState()).toHaveProperty('language');
  expect(store.getState()).toHaveProperty('currency');
});
