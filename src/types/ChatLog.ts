import Chat from './Chat';
import User from './User';

export default interface ChatLog {
  clientId: string;
  transporterId: string;
  transporter: User;
  client: User;
  _id: string;
  lastMessage: Chat;
}
