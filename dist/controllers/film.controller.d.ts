import { BookRepository, FilmRepository } from "../repositories";
import { Request, Response } from 'express';
import { Book } from "../models";
import { Film } from "../models";
export declare class FilmController {
    filmRepository: FilmRepository;
    bookRepository: BookRepository;
    constructor(filmRepository: FilmRepository, bookRepository: BookRepository);
    findAllfilm(): Promise<{
        message: string;
        data: (Film & import("../models").FilmRelations)[];
    }>;
    createData(film: any): Promise<object>;
    create(req: Request, res: Response): Promise<object>;
    findById(id: string): Promise<Film>;
    replaceById(id: string, film: Film): Promise<any>;
    find(): Promise<Book[]>;
    download(req: Request, res: Response): Promise<void>;
    getFlightData(req: Request, res: Response): Promise<any>;
    excelUpload(req: Request, res: Response): Promise<any>;
}
