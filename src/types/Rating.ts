import User from './User';

export default interface Rating {
  _id: string;
  tripId: string;
  comment: string;
  createdAt: string;
  /**The id of the user presently rating */
  userRating: string | User;
  /**The id of the user presently being rated */
  userRated: string | User;
  starRating: number;
}
