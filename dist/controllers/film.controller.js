"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmController = void 0;
const tslib_1 = require("tslib");
// import { post, requestBody, response, get, HttpErrors, param } from "@loopback/rest";
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
// import { error, timeStamp } from "console";
const multer_1 = tslib_1.__importDefault(require("multer"));
// import { MessageChannel } from "worker_threads";
const fs_1 = tslib_1.__importDefault(require("fs"));
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
const path_1 = tslib_1.__importDefault(require("path"));
const xlsx = tslib_1.__importStar(require("xlsx"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const models_1 = require("../models");
// import { buffer } from "stream/consumers";
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
// import { file } from "path-type";
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb: any) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb: any) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// multer({ storage: multerStorage }).any();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.resolve(__dirname, '../../uploads');
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage, dest: 'uploads/' }).single('file');
let FilmController = class FilmController {
    constructor(filmRepository, bookRepository) {
        this.filmRepository = filmRepository;
        this.bookRepository = bookRepository;
    }
    async findAllfilm() {
        let film = await this.filmRepository.find();
        console.log(film);
        return {
            message: "all data",
            data: film
        };
    }
    //   @post('/film')
    //   @response(200)
    //   async create(@requestBody({}) film: any): Promise < object > {
    //     if(!film.title || !film.description || !film.category || !film.rating || !film.actors) {
    //     throw new HttpErrors.BadRequest('Missing required fields');
    //   }
    //   const createdFilm = await this.filmRepository.create(film);
    //   return {
    //     message: 'Film successfully created',
    //     film: createdFilm,
    //   };
    // }
    async createData(film) {
        if (!film.title || !film.description || !film.category || !film.rating || !film.actors) {
            throw new rest_1.HttpErrors.BadRequest('Missing required fields');
        }
        let createdFilm = await this.filmRepository.create(film);
        return {
            message: 'Film successfully created',
            film: createdFilm,
        };
    }
    async create(req, res) {
        // const storage = multer.diskStorage({
        //   destination: (req, file, cb) => {
        //     const uploadPath = path.resolve(__dirname, '../../uploads');
        //     if (!fs.existsSync(uploadPath)) {
        //       fs.mkdirSync(uploadPath, { recursive: true });
        //     }
        //     cb(null, uploadPath);
        //   },
        //   filename: (req, file, cb) => {
        //     const uniqueName = `${Date.now()}-${file.originalname}`;
        //     cb(null, uniqueName);
        //   },
        // });
        // const upload = multer({ storage }).single('file');
        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                var _a;
                if (err) {
                    reject(new rest_1.HttpErrors.InternalServerError(`File upload failed: ${err.message}`));
                }
                const uploadedFile = req.file;
                if (!uploadedFile) {
                    reject(new rest_1.HttpErrors.BadRequest('No file uploaded'));
                }
                // const fileName = uploadedFile?.path.split(path.sep).pop()?.trim();
                const { title, description, category, rating, actors } = req.body;
                const createdFilm = {
                    title,
                    description,
                    category,
                    rating,
                    actors,
                    file: (_a = uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.path.split(path_1.default.sep).pop()) === null || _a === void 0 ? void 0 : _a.trim(),
                };
                try {
                    const savedFilm = await this.filmRepository.create(createdFilm);
                    console.log('Created film:', savedFilm);
                    resolve({
                        message: 'Film successfully created',
                        film: savedFilm,
                    });
                }
                catch (error) {
                    reject(new rest_1.HttpErrors.InternalServerError('Failed to save film to database'));
                }
            });
        });
    }
    async findById(id) {
        if (!id) {
            throw new rest_1.HttpErrors.BadRequest('The "id" parameter is required.');
        }
        try {
            let data = await this.filmRepository.findById(id);
            console.log(data);
            return data;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                throw new rest_1.HttpErrors.NotFound(`Film with id ${id} not found.`);
            }
            throw error;
        }
    }
    async replaceById(id, film) {
        let updateData = await this.filmRepository.replaceById(id, film);
        return {
            Message: "update record ",
            data: updateData
        };
    }
    async find() {
        return this.bookRepository.find();
    }
    // @get('/excelDownload')
    // @response(200)
    // async downloadExcel(
    //   @inject(RestBindings.Http.REQUEST) req: Request,
    //   @inject(RestBindings.Http.RESPONSE) res: Response
    // ): Promise<void> {
    //   try {
    //     const data = await this.filmRepository.find();
    //     if (!data || data.length === 0) {
    //       console.warn('No data available to export.');
    //       res.status(404).send({ message: 'No data available to export.' });
    //       return;
    //     }
    //     const transformedData = data.map((record) => ({
    //       id: record.id,
    //       title: record.title,
    //       description: record.description,
    //       category: record.category,
    //       rating: record.rating,
    //       actors: record.actors,
    //     }));
    //     const workbook = xlsx.utils.book_new();
    //     const worksheet = xlsx.utils.json_to_sheet(transformedData);
    //     xlsx.utils.book_append_sheet(workbook, worksheet, 'filmData');
    //     const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    //     console.log(buffer)
    //     res.setHeader(
    //       'Content-Type',
    //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //     );
    //     res.setHeader(
    //       'Content-Disposition',
    //       'attachment; filename="filmData.xlsx"'
    //     );
    //     res.send(buffer);
    //     console.log('Excel file sent successfully.');
    //   } catch (error) {
    //     console.error('Error generating or sending Excel file:', error);
    //     if (!res.headersSent) {
    //       res.status(500).send({
    //         message: error.message || 'Internal server error.',
    //       });
    //     }
    //   }
    // }
    async download(req, res) {
        try {
            const data = await this.filmRepository.find();
            console.log('Data fetched from repository:', data);
            if (!data || data.length === 0) {
                console.warn('No data available to export.');
                res.status(404).send({ message: 'No data available to export.' });
                return;
            }
            const transformedData = data.map((record) => ({
                id: record.id,
                title: record.title,
                description: record.description,
                category: record.category,
                rating: record.rating,
                actors: record.actors,
            }));
            console.log('Transformed data:', transformedData);
            const workbook = xlsx.utils.book_new();
            // console.log(workbook)
            const worksheet = xlsx.utils.json_to_sheet(transformedData);
            // console.log(worksheet)
            xlsx.utils.book_append_sheet(workbook, worksheet, 'filmData');
            const rep = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            // console.log(rep)
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: "abhinavsaxena119@gmail.com",
                    pass: "bkwgjnfawvkmpjhe",
                },
            });
            const mailOptions = {
                to: 'saxenaamandeep66@gmail.com',
                subject: 'Excel File - Film Data',
                text: 'Please find attached the film data in Excel format.',
                attachments: [
                    {
                        filename: 'filmData.xlsx',
                        content: rep,
                        encoding: 'base64',
                    },
                ],
            };
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully.');
            console.log('Excel file written successfully.');
            res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.status(200).send(rep);
        }
        catch (error) {
            console.error('Error generating or downloading Excel file:', error);
            if (!res.headersSent) {
                res.status(500).send({
                    message: error.message || 'Internal server error.',
                });
            }
        }
    }
    async getFlightData(req, res) {
        try {
            console.log(req.header);
            const url = "http://ip-api.com/json/24.48.0.1?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query";
            const response = await axios_1.default.get(url);
            console.log('External API response:', response.data);
            res.json(response.data);
            // const url2 = "https://restcountries.com/v3.1/all"
            // const [response1, response2] = await Promise.all([
            //   axios.get(url1),
            //   axios.get(url2)
            // ])
            // console.log('External API 1 response:', response1.data);
            // console.log('External API 2 response:', response2.data);
            // const bothData = {
            //   apiData1: response1.data,
            //   apiData2 : response2.data
            // }
            // res.json(bothData)
        }
        catch (error) {
            console.error('Error fetching data from the external API:', error);
            // if (error.response) {
            //   console.error('Response error data:', error.response.data);
            //   console.error('Response status:', error.response.status);
            //   console.error('Response headers:', error.response.headers);
            // } else if (error.request) {
            //   console.error('Request error:', error.request);
            // } else {
            //   console.error('General error:', error.message);
            // }
            res.status(500).json({
                error: {
                    message: error.message || 'Failed to fetch flight data',
                    details: error.response ? error.response.data : 'No response from API',
                },
            });
        }
    }
    async excelUpload(req, res) {
        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    console.error('Error during file upload:', err);
                    return reject(res.status(400).send({ message: 'File upload failed' }));
                }
                if (!req.file) {
                    console.error('No file uploaded');
                    return reject(res.status(400).send({ message: 'No file uploaded' }));
                }
                try {
                    const filePath = req.file.path;
                    console.log('Uploaded file path:', filePath);
                    const workbook = xlsx.readFile(filePath);
                    const sheetNames = workbook.SheetNames;
                    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
                    console.log('Excel data:', data);
                    const transformedData = data.map((record) => {
                        var _a;
                        return ({
                            title: record.title || null,
                            description: record.description || null,
                            category: record.category || null,
                            rating: record.rating || null,
                            actors: record.actors || null,
                            file: ((_a = record.file) === null || _a === void 0 ? void 0 : _a.filename) || null,
                        });
                    });
                    console.log('Transformed data:', transformedData);
                    const savedRecords = await this.filmRepository.createAll(transformedData);
                    console.log('Saved records:', savedRecords);
                    resolve(res.status(200).send({ savedRecords }));
                }
                catch (error) {
                    console.error('Error processing Excel file:', error);
                    reject(res.status(500).send({
                        message: 'Error processing Excel file',
                        error: error.message,
                    }));
                }
            });
        });
    }
};
exports.FilmController = FilmController;
tslib_1.__decorate([
    (0, rest_1.get)('/film'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "findAllfilm", null);
tslib_1.__decorate([
    (0, rest_1.post)('/film'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, rest_1.requestBody)({})),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "createData", null);
tslib_1.__decorate([
    (0, rest_1.post)('/upload'),
    (0, rest_1.response)(200, {
        description: 'File uploaded successfully',
        content: { 'multipart/form-data': { schema: { type: 'object' } } },
    }),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/film/{id}'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.post)('film/{id}'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({})),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Film]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/bookess'),
    (0, rest_1.response)(200, {}),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/excelDownload'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "download", null);
tslib_1.__decorate([
    (0, rest_1.get)("getData"),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "getFlightData", null);
tslib_1.__decorate([
    (0, rest_1.post)('/excelUpload'),
    (0, rest_1.response)(200, {
        description: 'Upload Excel file and process data',
        content: { 'application/json': { schema: { type: 'object' } } },
    }),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilmController.prototype, "excelUpload", null);
exports.FilmController = FilmController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FilmRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.BookRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FilmRepository,
        repositories_1.BookRepository])
], FilmController);
//# sourceMappingURL=film.controller.js.map