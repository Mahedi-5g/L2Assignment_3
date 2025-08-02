
import { NextFunction, response } from "express";
import Book from "../models/book.model";
import { sendResponse } from "../utils/sendResponse";
import { Request, Response} from "express";

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    sendResponse(res, book, 'Book created successfully');
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = 10 } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    sendResponse(res, books, 'Books retrieved successfully');
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    sendResponse(res, book, 'Book retrieved successfully');
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    sendResponse(res, book, 'Book updated successfully');
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    sendResponse(res, null, 'Book deleted successfully');
  } catch (err) {
    next(err);
  }
};