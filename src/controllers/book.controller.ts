import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Book } from '../models';
import { BookRepository } from '../repositories';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @post('/books')
  @response(200, {})
  async create( @requestBody() book: any ): Promise<Book> {
    return this.bookRepository.create(book);
  }

  @get('/books/count')
  @response(200, {})
  async count(
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.count(where);
  }

  @get('/books')
  @response(200, {})
  async find(
  ): Promise<Book[]> {
    return this.bookRepository.find();
  }

  @patch('/books')
  @response(200, {
    //   description: 'Book PATCH success count',
    //   content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({})
    book: Book,
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.updateAll(book, where);
  }

  @get('/books/{id}')
  @response(200, { })
  async findById(
    @param.path.string('id') id: string
  ): Promise<Book> {
    return this.bookRepository.findById(id);
  }

  @patch('/books/{id}')
  @response(204)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({})
    book: Book,
  ): Promise<void> {
    await this.bookRepository.updateById(id, book);
  }

  @put('/books/{id}')
  @response(204, {
    description: 'Book PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() book: Book,
  ): Promise<void> {
    await this.bookRepository.replaceById(id, book);
  }

  @del('/books/{id}')
  @response(204)
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookRepository.deleteById(id);
  }
}
