// import { Model, model, property } from '@loopback/repository';

// @model({ settings: { strict: false } })
// export class Blacklist extends Model {
//   @property({
//     type: 'string',
//     id: true,
//     generated: false,
//     required: true,
//   })
//   token: string;

//   @property({
//     type: 'date',
//     required: true,
//   })
//   createdAt: string;


//   [prop: string]: any;

//   constructor(data?: Partial<Blacklist>) {
//     super(data);
//   }

//   getId() {
//     return this.token;
//   }
//   getIdObject() {
//     return { token: this.token }; 
//   }
// }

// export interface BlacklistRelations {
// }


// export type BlacklistWithRelations = Blacklist & BlacklistRelations;

import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Blacklist extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  token: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  [prop: string]: any;

  constructor(data?: Partial<Blacklist>) {
    super(data);
  }
}

export interface BlacklistRelations {}

export type BlacklistWithRelations = Blacklist & BlacklistRelations;
