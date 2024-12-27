import { CountSchema, repository } from "@loopback/repository";
import { inject } from '@loopback/core';
// import { post } from "axios";
import {
  post,
  requestBody,
  Response,
  RestBindings,
  Request,
  response,
  param,
  get
} from '@loopback/rest';

import { UserRepository } from "../repositories";
import * as jwt from 'jsonwebtoken';

// import { MongodbDataSource } from "../datasources";

export class UserController {
  constructor(
    // @inject('datasource.mongodb') private dataSource: MongodbDataSource,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }



  @post('/registerUser')
  @response(200)
  async registerUser(@inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response) {
    try {
      const { email, password, role } = req.body

      if (!email || !password || !role) {
        return res.status(400).send({ Message: "All Filed required" })
      }

      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });
      if (existingUser) {
        return res.status(400).send({ message: 'User already registered' });
      }

      const createUser = await this.userRepository.create({
        email,
        password,
        role
      })

      console.log(createUser)
      res.status(200).send({ data: createUser, Message: "User registered successfully!" })

    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: error.message || 'Internal server error.',
      });

    }

  }

  // @post("/login")
  // @response(200)
  // async loginUser(@inject(RestBindings.Http.REQUEST) req: Request, @inject(RestBindings.Http.RESPONSE) resp: Response) {
  //   try {
  //     const { email, password } = req.body;

  //     if (!email || !password) {
  //       return resp.status(400).send("email and password required")
  //     }

  //     // const userfind = await this.userRepository.findOne({ where: { email: email } })

  //     const userfind = await this.userRepository.findOne({
  //       where: { email: email },
  //       // explain: true

  //     })
  //     console.log(userfind);

  //     if (!userfind || userfind.password !== password) {
  //       return resp.status(400).send({ message: 'Invalid email or password' })
  //     }

  //     return resp.status(200).send({ message: 'Login successful', user: { id: userfind.id, email: userfind.email, role: userfind.role } });

  //   } catch (error) {
  //     return resp.status(500).send({
  //       message: error.message || 'Internal server error.',
  //     });

  //   }

  // }


  @post("/login")
  @response(200)
  async loginUser(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) resp: Response
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return resp.status(400).send("Email and password are required");
      }

      const userfind = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!userfind || userfind.password !== password) {
        return resp.status(400).send({ message: 'Invalid email or password' });
      }

      // const secretKey = "aman@123";
      const token = jwt.sign(
        { userId: userfind.id, email: userfind.email, role: userfind.role },
        "aman@123",
        { expiresIn: '1h' }
      );

      return resp.status(200).send({
        message: 'Login successful',
        token: token,
        user: {
          userId: userfind.id,
          email: userfind.email,
          role: userfind.role,
        },
      });
    } catch (error) {
      return resp.status(500).send({
        message: error.message || 'Internal server error.',
      });
    }
  }


  @get('/verify-token')
  @response(200,)
  async getUserAfterTokenVerification(
    @param.header.string('Authorization')
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<any> {
    try {
      const userId = req.userId;

      const user = await this.userRepository.findById(userId);
      console.log(user)

      return res.json({
        message: 'You have accessed the protected route!',
        user: user,
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid token or user not found',
        error: error.message,
      });
    }
  }


  @post('/token')
  @response(200)
  async verifyToken(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) resp: Response
  ) {
    try {
      const token = req.body.token;
      if (!token) {
        return resp.status(400).send({ message: 'Token is required' });
      }
      const decoded = jwt.verify(token, 'aman@123') as any;
      console.log(decoded);
      const record = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        iat: decoded.iat,
        exp: decoded.exp
      };

      return resp.status(200).send({
        message: 'Token is valid',
        user: record,
      });
    } catch (error) {
      return resp.status(401).send({
        message: 'Invalid token',
        error: error.message,
      });
    }
  }





}
