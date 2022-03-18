import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools, EnhancerOptions } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import common, { commonEpic } from './common';
import createNFT, { createNFTEpic } from './createNFT';
import buyNFT, { buyNFTEpic } from './buyNFT';
import getBalance, { getBalanceEpic } from './getBalance';
import explore, { exploreEpic } from './explore';
import search, { searchEpic } from './search';

const reducers = combineReducers({ common, createNFT, buyNFT, getBalance, explore, search });

// prepare beforehand
// If use OPEN API
// const api = new DefaultApi()
export const epicMiddleware = createEpicMiddleware({});
const epics = combineEpics(commonEpic, createNFTEpic, buyNFTEpic, getBalanceEpic, exploreEpic, searchEpic);

// const enhancerOptions: EnhancerOptions = {
//   actionSanitizer: action => action,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   stateSanitizer: (state: State) => {
//     return { ...state };
//   },
// };
// const composeEnhancers = composeWithDevTools(enhancerOptions);
export const store = createStore(reducers, applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);

export type State = ReturnType<typeof store.getState>;
