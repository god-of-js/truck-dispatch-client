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
    setChat(state: ChatState, action: { payload: Chat}) {
      state.chats.push({ ...action.payload, stillSending: true})
    }
  },
});

export const { setChats, setChat } = chatSlice.actions;

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

export const selectChatHeads = createSelector(chats, (chatArr) => {
  const chatObj: Record<string, Chat[]> = {};
  chatArr.forEach((chat) => {
    if (chatObj[chat.chatId]) chatObj[chat.chatId].push(chat);
    else {
      chatObj[chat.chatId] = [chat];
    }
  });

  const refinedChats = Object.values(chatObj)
    .map(
      (arr) =>
        arr.sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt))[
          arr.length - 1
        ],
    )
    .sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
  return refinedChats;
});

export const createOrUpdateChat = (chat: Chat) => {
  return () => {
    return Api.createOrUpdateChat(chat);
  };
};
