export default interface Chat {
  chatId: string;
  message: string;
  senderId: string;
  receiverId: string;
  transporterId: string;
  agentId: string;
  readAt?: number;
  createdAt?: number;
  updatedAt?: number;
}
