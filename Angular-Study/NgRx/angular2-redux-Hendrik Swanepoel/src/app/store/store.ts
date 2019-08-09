import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { IAppState } from './IAppState';
import { Course } from '../courses/course';
import { reducer } from './reducer';
import freezeState from './freezeState';

declare var window: any;
const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension) ? window.devToolsExtension() : (f) => f;

//export const store = createStore<IAppState>(reducer, compose(devToolsExtension) as GenericStoreEnhancer);
export const store = createStore<IAppState>(reducer, compose(applyMiddleware(freezeState), devToolsExtension) as GenericStoreEnhancer);
