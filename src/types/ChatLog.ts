import Chat from './Chat';
import User from './User';

export default interface ChatLog {
  transporter: User;
  client: User;
  _id: string;
  lastMessage: Chat;
}
