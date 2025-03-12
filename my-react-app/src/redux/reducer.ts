// src/redux/reducers.ts

import { createSlice } from '@reduxjs/toolkit';
import { SAVE_FORM_DATA } from './actions';
import { saveForgotPasswordData } from './actions';

interface FormState {
    username: string;
    password: string;
}

const initialState: FormState = {
    username: '',
    password: ''
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveFormData: (state, action) => {
            const { username, password } = action.payload;
            state.username = username;
            state.password = password;
            // 保存到 localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
    }
});



export const { saveFormData } = formSlice.actions;

export default formSlice.reducer;