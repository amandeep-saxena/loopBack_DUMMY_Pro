// import { Middleware } from '@loopback/rest';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';



import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = await jwt.verify(token, 'aman@123') as any;
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default jwtMiddleware;

// export function jwtMiddleware(req: Request, res: Response, next: NextFunction ) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ error: "Access denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, "aman@123")
//     req.userId = (decoded as any).userId;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

//  import { Middleware } from '@loopback/rest';
//import { toInterceptor } from '@loopback/rest';



// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';


// const jwtMiddleware : any = async (req: Request, res: Response, next: NextFunction ): Promise<any>=> {
//     // const token = req.header('Authorization');
//     const token = req.get('Authorization');
//     console.log(token)
//     if (!token) {
//       return res.status(401).json({error: 'Access denied'});
//     }

//     try {
//       const decoded = jwt.verify(token, 'aman@123') as any;

//       (req as any).userId = decoded.userId;

//       next();
//     } catch (error) {
//       return res.status(401).json({error: 'Invalid token'});
//     }
//   };

//   export default jwtMiddleware




