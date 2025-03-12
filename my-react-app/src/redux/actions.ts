import { createAction } from '@reduxjs/toolkit';

export const SAVE_FORM_DATA = 'SAVE_FORM_DATA';

export const saveFormData = (formData: { username: string; password: string }) => {
    return createAction(SAVE_FORM_DATA)(formData);
};
export const saveForgotPasswordData = (data) => {
    return {
        type: 'SAVE_FORGOT_PASSWORD_DATA',
        payload: data
    };
};