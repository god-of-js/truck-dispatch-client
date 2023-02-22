import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Chat from 'types/Chat';
import { AppDispatch, AppState, RootState } from '.';

export interface ChatState {
  chats: Chat[];
}
const initialState: ChatState = {
  chats: [],
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state: ChatState, action: { payload: Chat[] }) {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
function getTime(createdAt: number) {
  return new Date(createdAt).getTime();
}
const chats = (state: RootState) => state.chat.chats;
export const selectChatByChatId = (selectedChatId: string) =>
  createSelector(chats, (chatArr) => {
    return chatArr
      .filter(({ chatId }) => chatId === selectedChatId)
      .sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt));
  });

export const sendChat = (chat: Chat) => {
  return () => {
    return Api.sendChat(chat);
  };
};

export const getChats = (id: string, query: 'transporterId' | 'agentId') => {
  return (dispatch: AppDispatch) => {
    return Api.getChatsInvolvingUser(id, query).then((data) => {
      console.log(data);
      dispatch(setChats(data));
    });
  };
};
