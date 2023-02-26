export default interface Chat {
  id: string;
  chatId: string;
  message: string;
  createdAt: number;
  senderId: string;
  agentId: string;
  transporterId: string;
  status?: 'success' | 'pending' | 'failed';
}
