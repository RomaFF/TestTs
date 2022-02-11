import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'

import defaultData from '../reducers/defaultData'
import filteredData from '../reducers/filteredData'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({defaultData, filteredData}),
    compose(applyMiddleware(ReduxThunk, sagaMiddleware))
)
/*sagaMiddleware.run(watchFetchDog);*/
sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

