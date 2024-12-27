import { Response, Request } from '@loopback/rest';
import { UserRepository } from "../repositories";
export declare class UserController {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    loginUser(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
    getUserAfterTokenVerification(req: Request, res: Response): Promise<any>;
    verifyToken(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
}
