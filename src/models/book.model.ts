

import { Document, model, Schema } from "mongoose";

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): Promise<void>;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, enum: Object.values(Genre) },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, { timestamps: true });

bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

bookSchema.pre('save', function (next) {
  this.title = this.title.trim();
  next();
});

 const Book = model<IBook>('Book', bookSchema);
 export default Book;