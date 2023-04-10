import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Chat from 'types/Chat';
import ChatLog from 'types/ChatLog';
import ChatLogData from 'types/ChatLogData';
import { AppDispatch, AppState, RootState } from '.';

export interface ChatState {
  chats: Chat[];
  chatLogs: ChatLog[];
}
const initialState: ChatState = {
  chats: [],
  chatLogs: [],
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state: ChatState, action: { payload: Chat[] }) {
      state.chats = action.payload;
    },
    setChat(state: ChatState, action: { payload: Chat }) {
      state.chats.push(action.payload);
      const logIndex = state.chatLogs.findIndex(
        (log) => log._id === action.payload.chatId,
      );
      state.chatLogs[logIndex].lastMessage = action.payload;
    },
    setChatLogs(state: ChatState, action: { payload: ChatLog[] }) {
      state.chatLogs = action.payload;
    },
    setChatLog(state: ChatState, action: { payload: ChatLog }) {
      state.chatLogs.push(action.payload);
    },
    removeChatById(
      state: ChatState,
      action: { payload: { chatToRemoveId: string } },
    ) {
      const chatIndex = state.chats.findIndex(
        ({ temporaryId }) => temporaryId === action.payload.chatToRemoveId,
      );
      state.chats.splice(chatIndex, 0);
    },
  },
});

export const { setChats, setChat, setChatLogs, removeChatById, setChatLog } =
  chatSlice.actions;

export default chatSlice.reducer;
function getTime(createdAt: number) {
  return new Date(createdAt).getTime();
}
const chats = (state: RootState) => state.chat.chats;
export const selectChatByChatId = (selectedChatId: string) =>
  createSelector(chats, (chatArr) => {
    return chatArr
      .filter(({ chatId }) => chatId === selectedChatId)
      .sort(
        (a, b) =>
          getTime(a.createdAt as number) - getTime(b.createdAt as number),
      );
  });

const user = (state: RootState) => state.account.user;
const chatLogs = (state: RootState) => state.chat.chatLogs;
export const selectUnreadChats = createSelector(
  user,
  chatLogs,
  (userDetails, allChatLogs) => {
    return allChatLogs.filter((log) => {
      return (
        log.lastMessage &&
        !log.lastMessage.readAt &&
        log.lastMessage.senderId !== userDetails?._id
      );
    });
  },
);

export const selectChatLog = (logId: string) =>
  createSelector(chatLogs, (arr) => {
    return arr.find(({ _id }) => _id === logId);
  });

export const createChat = (chat: Chat) => {
  return (dispatch: AppDispatch) => {
    dispatch(setChat(chat));
    return Api.createChat(chat).catch(() => {
      dispatch(removeChatById({ chatToRemoveId: chat._id! }));
    });
  };
};

export const getUserChat = () => {
  return (dispatch: AppDispatch) => {
    return Api.getUserChats().then((data) => {
      dispatch(setChats(data));
    });
  };
};

export const readChat = (chat: Chat) => {
  return (dispatch: AppDispatch) => {
    if (!chat._id) return;
    return Api.setChatHasBeenRead(chat._id);
  };
};

export const createOrFetchChatLog = (data: ChatLogData) => {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.createOrFetchChatLog(data).then((log) => {
      dispatch(setChatLog(log));
      return log;
    });
  };
};

export const getChatLogs = () => {
  return (dispatch: AppDispatch) => {
    return Api.getChatLogs().then((data) => {
      dispatch(setChatLogs(data));
    });
  };
};
