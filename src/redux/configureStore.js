import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import persistState from 'redux-sessionstorage'
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(epicMiddleware),
      persistState('session')
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
}
