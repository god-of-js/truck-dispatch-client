export default interface Chat {
  _id?: string;
  chatId: string;
  message: string;
  senderId: string;
  receiverId: string;
  transporterId: string;
  agentId: string;
  temporaryId?: string;
  readAt?: number;
  createdAt?: number;
  updatedAt?: number;
}
