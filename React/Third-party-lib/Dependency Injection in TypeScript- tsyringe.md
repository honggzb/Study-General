[Dependency Injection in TypeScript- tsyringe](#top)

- [General](#general)
- [Repository](#repository)
- [Service layer](#service-layer)
- [Controller layer](#controller-layer)
- [Set Up Express Routes - handle HTTP requests by using controller](#set-up-express-routes---handle-http-requests-by-using-controller)
- [Testing](#testing)

------------------------------------------------------------------------

## General

- Dependency Injection (DI) is a design pattern that helps create loosely coupled, maintainable, and testable code
- layers
  - Repository: handle data access operations
  - Service: business Logic
  - Controller: manages HTTP requests
1. `npm install tsyringe`
2. add following to 'tsconfig.json'
3. Add a polyfill for the Reflect API
   1. [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
   2. The Reflect polyfill import should only be added once(such as root directory of react project), and before DI is used

```ts
//tsconfig.json
{
  "compileroptions": {
    "experimentaldecorators": true,
    "emitdecoratormetadata": true
  }
}
// main.ts
import "reflect-metadata";
```
  
## Repository

1. Define the Book Model: define our Mongoose model for the Book entity
2. Create the BookRepository: a repository class to handle data access operations using the Mongoose model

```ts
// 
import mongoose, { Schema, Document, Model } from "mongoose";
// Define the Book interface extending Mongoose Document
interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
}
// Define the Book schema
const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true }
});
// Create the Book model
const BookModel: Model<IBook> = mongoose.model<IBook>("Book", BookSchema);
export { IBook, BookModel };
// 
import { injectable } from "tsyringe";
import { IBook, BookModel } from "./BookModel";
@injectable()
class BookRepository {
  async getBookById(id: string): Promise<IBook | null> {
    return BookModel.findById(id).exec();
  }
  async getAllBooks(): Promise<IBook[]> {
    return BookModel.find().exec();
  }
  async addBook(book: Partial<IBook>): Promise<IBook> {
    return BookModel.create(book);
  }
  async updateBook(id: string, updatedBook: Partial<IBook>): Promise<IBook | null> {
    return BookModel.findByIdAndUpdate(id, updatedBook, { new: true }).exec();
  }
  async deleteBook(id: string): Promise<void> {
    await BookModel.findByIdAndDelete(id).exec();
  }
}
export default BookRepository;
```

[⬆ back to top](#top)

## Service layer

- Create the BookService: contains business logic and interacts with the repository

```ts
import { injectable, inject } from "tsyringe";
import BookRepository from "./BookRepository";
import { IBook } from "./BookModel";
@injectable()
class BookService {
  constructor(@inject(BookRepository) private bookRepository: BookRepository) {}
  async getBook(id: string): Promise<IBook | null> {
    return this.bookRepository.getBookById(id);
  }
  async getAllBooks(): Promise<IBook[]> {
    return this.bookRepository.getAllBooks();
  }
  async createBook(title: string, author: string, publishedYear: number): Promise<IBook> {
    const newBook = { title, author, publishedYear };
    return this.bookRepository.addBook(newBook);
  }
  async updateBook(id: string, updatedBook: Partial<IBook>): Promise<IBook | null> {
    return this.bookRepository.updateBook(id, updatedBook);
  }
  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
export default BookService;
```

[⬆ back to top](#top)

## Controller layer

- Create the BookController with Auto-bind Decorator
- handles HTTP requests and uses the service to perform operations

```ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import BookService from "./BookService";
import { autobind } from "core-decorators";

class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = container.resolve(BookService);
  }

  @autobind
  async getBook(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const book = await this.bookService.getBook(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @autobind
  async getAllBooks(_req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @autobind
  async createBook(req: Request, res: Response): Promise<void> {
    const { title, author, publishedYear } = req.body;
    try {
      const book = await this.bookService.createBook(title, author, publishedYear);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @autobind
  async updateBook(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updatedBook = req.body;
    try {
      const book = await this.bookService.updateBook(id, updatedBook);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @autobind
  async deleteBook(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.bookService.deleteBook(id);
      res.status(200).json({ message: "Book deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default BookController;
```

[⬆ back to top](#top)

## Set Up Express Routes - handle HTTP requests by using controller

```ts
import express from "express";
import mongoose from "mongoose";
import BookController from "./BookController";

const app = express();
const bookController = new BookController();
// Middleware
app.use(express.json());
// Routes
app.get("/books/:id", bookController.getBook);
app.get("/books", bookController.getAllBooks);
app.post("/books", bookController.createBook);
app.put("/books/:id", bookController.updateBook);
app.delete("/books/:id", bookController.deleteBook);
// Connect to MongoDB and start the server
mongoose.connect("mongodb://localhost:27017/bookstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch(console.error);
```

[⬆ back to top](#top)

## Testing

```ts
// Application code
container.register(MyDependency, { useFactory: () => myDependencyObject );
container.register(OtherDependency, { useValue: otherDependencyObject );

import { container } from 'tsyringe';
describe('BusinessLogic', () => {
  it('should call action on dependencyA when foo is called', () => {
    // We can mock a class at any level in the dependency tree without touching anything else
    container.registerInstance(DependencyC, mock());
    // dependency A gets a mock version of dependency C during this resolution.
    const underTest = container.resolve(BusinessLogic);
    // We can call this now that we're done testing, and the mock will be removed.
    // When we resolve the instance after this, we get the original dependencies.
    // In practice, we've found it's easy to just place this in your afterEach block.
    container.clearInstances()
  });
});

describe('MyDependency', () => {
  it('should not be mocked', () => {
    container.resolve(MyDependency);
    container.resolve(OtherDependency);
    container.clearInstances();
    // This will fail!
    // OtherDependency is no longer registered with the container.
    container.resolve(OtherDependency)
    // This will be fine, the dependency remains registered after clears
    container.resolve(MyDependency);
  });
});
//--------------------------
import { container, UserCommands } from "@/core/user/user.commands"
describe("test ftw", () => {
    let userAdapterMock: UserAdapterMock
    let userCommands: UserCommands
    beforeEach(() => {
        userAdapterMock = new UserAdapter()
        container.registerInstance<UserAdapter>("UserAdapter", userAdapter)
        userCommands = container.resolve<UserCommands>("UserCommands")
    });
    ...
});
```

- [Implementing Dependency Injection in TypeScript with Mongoose and tsyringe](https://blog.devgenius.io/implementing-dependency-injection-in-typescript-with-mongoose-and-tsyringe-dae3b19a3b79)
