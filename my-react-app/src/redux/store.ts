// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducer';

export const store = configureStore({
    reducer: {
        form: formReducer
    }
});