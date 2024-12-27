import { Entity, model, property } from '@loopback/repository';

@model()
export class Film extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  // @property({
  //   type: 'number',
  //   required: false,
  // })
  // length: number;

  @property({
    type: 'string',
    required: true,
  })
  rating: string;

  @property({
    type: 'string',
    required: true,
  })
  actors: string;

  @property({
    type: 'string',
    required: false,
  })
  file?: string;


  constructor(data?: Partial<Film>) {
    super(data);
  }
}

export interface FilmRelations {

}

// interface FilmResponse {
//   response: string;
//   data: Film;
// }

export type FilmWithRelations = Film & FilmRelations;
