import { Entity } from '@loopback/repository';
export declare class Film extends Entity {
    id?: string;
    title: string;
    description: string;
    category: string;
    rating: string;
    actors: string;
    file?: string;
    constructor(data?: Partial<Film>);
}
export interface FilmRelations {
}
export type FilmWithRelations = Film & FilmRelations;
