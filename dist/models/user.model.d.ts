import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: string;
    email: string;
    password: string;
    role: string;
    token: String;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
