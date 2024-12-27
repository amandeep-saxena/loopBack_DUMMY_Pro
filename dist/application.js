"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksApiApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const sequence_1 = require("./sequence");
const controllers_1 = require("./controllers");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const jwt_middleware_1 = tslib_1.__importDefault(require("./middlewares/jwt-middleware"));
class BooksApiApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.middleware((0, rest_1.toInterceptor)(body_parser_1.default.json()));
        this.expressMiddleware('bodyParser.urlencoded', body_parser_1.default.urlencoded({ extended: true }));
        //jwt token path
        this.middleware((0, rest_1.toInterceptor)((req, res, next) => {
            console.log(req.path, "hii aman");
            if (req.path === '/login') {
                return next();
            }
            (0, jwt_middleware_1.default)(req, res, next);
        }));
        // this.middleware(toMiddleware(jwtMiddleware));
        // this.middleware(jwtMiddleware)
        //  const server = this.getSync<RestServer>('servers.RestServer')as any
        //  server.middleware('routes', jwtMiddleware)
        const CustomCorsMiddleware = async (ctx, next) => {
            const response = ctx.response;
            response.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (ctx.request.method === 'OPTIONS') {
                response.status(204).end();
                return;
            }
            return next();
        };
        console.log(CustomCorsMiddleware);
        this.middleware(CustomCorsMiddleware);
        this.sequence(sequence_1.MySequence);
        this.controller(controllers_1.FilmController);
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.BooksApiApplication = BooksApiApplication;
// // src/application.ts
// import { BootMixin } from '@loopback/boot';
// import { ApplicationConfig } from '@loopback/core';
// import { RestApplication } from '@loopback/rest';
// import { ServiceMixin } from '@loopback/service-proxy';
// import { RepositoryMixin } from '@loopback/repository';
// import { fileUploadMiddleware } from './middlewares/file-upload.middleware'; 
// export { ApplicationConfig };
// export class BooksApiApplication extends BootMixin(
//   ServiceMixin(RepositoryMixin(RestApplication)),
// ) {
//   constructor(options: ApplicationConfig = {}) {
//     super(options);
//     this.middleware(fileUploadMiddleware);
//     this.projectRoot = __dirname;
//     this.bootOptions = {
//       controllers: {
//         dirs: ['controllers'],
//         extensions: ['.controller.js'],
//         nested: true,
//       },
//     };
//   }
// }
//# sourceMappingURL=application.js.map