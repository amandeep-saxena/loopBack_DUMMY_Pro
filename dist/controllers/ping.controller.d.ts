import { Request } from '@loopback/rest';
/**
 */
export declare class PingController {
    private req;
    constructor(req: Request);
    ping(): object;
}
