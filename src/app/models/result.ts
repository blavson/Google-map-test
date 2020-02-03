import { Comment } from 'src/app/models/comment';

export class Result {
  success: boolean;
  count: number;
  comments : Comment[];
}
