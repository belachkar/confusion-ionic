import { Comment } from './Comments';

export class Menu {
  id: number;
  name: string;
  image: string;
  category: string;
  label: string;
  price: number;
  description: string;
  comments: Comment[];

}