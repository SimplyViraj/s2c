import { combineReducers, configureStore, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import { slices } from './slice';
import middleware from '@/middleware';
import { apis } from './api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
const rootReducer=combineReducers({
    ...slices,
    ...apis.reduce((acc,api)=>{
        acc[api.reducerPath]=api.reducer
        return acc
    }, {} as ReducersMapObject)
});
export type RootState=ReturnType<typeof rootReducer>
export function makeStore(preloadedState?:Partial<RootState>) {
    return configureStore({
        reducer:rootReducer,
        middleware:(gDm)=>gDm().concat(...apis.map((api)=>api.middleware as Middleware)),
        preloadedState,
        devTools:process.env.NODE_ENV !== 'production',
    })
}

export const store=makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()