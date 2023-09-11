import { createSlice } from '@reduxjs/toolkit';

const messagesSlise = createSlice({
    name: 'messagesSl',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
    },
});

//console.log(messagesSlise);

export const { addMessage } = messagesSlise.actions;
export default messagesSlise.reducer;
