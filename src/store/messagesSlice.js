import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messagesSl',
    initialState: {
        messages: [],
        chatList: [
            /*'79053601281', '79033210757', '79673381288'*/
        ],
    },
    reducers: {
        addMessage: (state, actions) => {
            state.messages.push({
                text: actions.payload.mess,
                my: actions.payload.my,
                id: actions.payload.id,
                chat: actions.payload.chat,
            });
        },
        addChatList: (state, actions) => {
            state.chatList.push(actions.payload.chat);
        },
    },
});

export const { addMessage, addChatList } = messagesSlice.actions;
//export default messagesSlice.reducer;
