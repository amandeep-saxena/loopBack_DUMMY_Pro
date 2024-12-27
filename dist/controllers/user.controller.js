"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const core_1 = require("@loopback/core");
// import { post } from "axios";
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
// import { MongodbDataSource } from "../datasources";
let UserController = class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(req, res) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).send({ Message: "All Filed required" });
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
            });
            console.log(createUser);
            res.status(200).send({ data: createUser, Message: "User registered successfully!" });
        }
        catch (error) {
            console.log(error);
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
    async loginUser(req, resp) {
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
            const token = jwt.sign({ userId: userfind.id, email: userfind.email, role: userfind.role }, "aman@123", { expiresIn: '1h' });
            return resp.status(200).send({
                message: 'Login successful',
                token: token,
                user: {
                    userId: userfind.id,
                    email: userfind.email,
                    role: userfind.role,
                },
            });
        }
        catch (error) {
            return resp.status(500).send({
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getUserAfterTokenVerification(req, res) {
        try {
            const userId = req.userId;
            const user = await this.userRepository.findById(userId);
            console.log(user);
            return res.json({
                message: 'You have accessed the protected route!',
                user: user,
            });
        }
        catch (error) {
            return res.status(401).json({
                message: 'Invalid token or user not found',
                error: error.message,
            });
        }
    }
    async verifyToken(req, resp) {
        try {
            const token = req.body.token;
            if (!token) {
                return resp.status(400).send({ message: 'Token is required' });
            }
            const decoded = jwt.verify(token, 'aman@123');
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
        }
        catch (error) {
            return resp.status(401).send({
                message: 'Invalid token',
                error: error.message,
            });
        }
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, rest_1.post)('/registerUser'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
tslib_1.__decorate([
    (0, rest_1.post)("/login"),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
tslib_1.__decorate([
    (0, rest_1.get)('/verify-token'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, rest_1.param.header.string('Authorization')),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUserAfterTokenVerification", null);
tslib_1.__decorate([
    (0, rest_1.post)('/token'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "verifyToken", null);
exports.UserController = UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserController);
//# sourceMappingURL=user.controller.js.map