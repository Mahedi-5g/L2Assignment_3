import { Request, Response, NextFunction} from 'express';
import { Borrow } from '../models/borrow.model';
import  Book  from '../models/book.model';
import { sendResponse } from '../utils/sendResponse';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.copies < quantity) {
      throw new Error('Not enough copies available');
    }
    book.copies -= quantity;
    await book.updateAvailability();
    await book.save();
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    sendResponse(res, borrow, 'Book borrowed successfully');
  } catch (err) {
    next(err);
    
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
      {
        $project: {
          book: {
            title: '$book.title',
            isbn: '$book.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);
    sendResponse(res, result, 'Borrowed books summary retrieved successfully');
  } catch (err) {
    next(err);
  }
};
