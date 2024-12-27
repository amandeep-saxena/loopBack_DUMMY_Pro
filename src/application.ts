import { BootMixin } from '@loopback/boot';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';

import { ANY, RepositoryMixin } from '@loopback/repository';
import { AnyScopeFilterSchema, RestApplication, toInterceptor, RestServer } from '@loopback/rest';
import { ApplicationConfig } from '@loopback/core';

import { ServiceMixin } from '@loopback/service-proxy';
import { MySequence } from './sequence';
import { FilmController } from './controllers';
export { ApplicationConfig };
import bodyParser from 'body-parser';
import jwtMiddleware from './middlewares/jwt-middleware';
// import { CorsMiddlewareProvider } from '@loopback/cors';
import { Middleware, MiddlewareContext } from '@loopback/rest';
export class BooksApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {

    super(options);


    this.middleware(toInterceptor(bodyParser.json()));
    this.expressMiddleware('bodyParser.urlencoded', bodyParser.urlencoded({ extended: true }));


    //jwt token path
    this.middleware(toInterceptor((req, res, next) => {
      console.log(req.path , "hii aman")
      if (req.path === '/login') {
        return next();
      }
      jwtMiddleware(req, res, next);
    }));




    // this.middleware(toMiddleware(jwtMiddleware));

    // this.middleware(jwtMiddleware)


    //  const server = this.getSync<RestServer>('servers.RestServer')as any
    //  server.middleware('routes', jwtMiddleware)



    const CustomCorsMiddleware: Middleware = async (ctx: MiddlewareContext, next: any) => {
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
    console.log(CustomCorsMiddleware)
    this.middleware(CustomCorsMiddleware);

    this.sequence(MySequence);
    this.controller(FilmController)


    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

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
