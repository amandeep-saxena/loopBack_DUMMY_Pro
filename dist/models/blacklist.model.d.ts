import { Entity } from '@loopback/repository';
export declare class Blacklist extends Entity {
    token: string;
    createdAt: string;
    [prop: string]: any;
    constructor(data?: Partial<Blacklist>);
}
export interface BlacklistRelations {
}
export type BlacklistWithRelations = Blacklist & BlacklistRelations;
