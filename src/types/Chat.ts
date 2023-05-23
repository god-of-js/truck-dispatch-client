export default interface Chat {
  _id?: string;
  chatLog: string;
  message: string;
  sender: string;
  receiver: string;
  temporaryId?: string;
  readAt?: number;
  createdAt?: number;
}
