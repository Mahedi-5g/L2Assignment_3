"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = __importDefault(require("../models/book.model"));
const sendResponse_1 = require("../utils/sendResponse");
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            throw new Error('Not enough copies available');
        }
        book.copies -= quantity;
        yield book.updateAvailability();
        yield book.save();
        const borrow = yield borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        (0, sendResponse_1.sendResponse)(res, borrow, 'Book borrowed successfully');
    }
    catch (err) {
        next(err);
    }
});
exports.borrowBook = borrowBook;
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.Borrow.aggregate([
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
        (0, sendResponse_1.sendResponse)(res, result, 'Borrowed books summary retrieved successfully');
    }
    catch (err) {
        next(err);
    }
});
exports.getBorrowSummary = getBorrowSummary;
