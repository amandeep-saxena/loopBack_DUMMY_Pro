// import { post, requestBody, response, get, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { BookRepository, FilmRepository } from "../repositories";
import expressFileUpload from 'express-fileupload';
// import { error, timeStamp } from "console";
import multer from 'multer';

// import { MessageChannel } from "worker_threads";
import fs from 'fs';
import {
  get,
  post,
  requestBody,
  response,
  HttpErrors,
  RestBindings,
  param,

} from '@loopback/rest';
import { inject, lifeCycleObserver } from '@loopback/core';
import path from 'path';
import { Request, Response } from 'express';
import * as xlsx from 'xlsx';

import axios from 'axios';


import { Book } from "../models";
import { Film } from "../models";
import { AnyTxtRecord } from "dns";
// import { buffer } from "stream/consumers";
import nodemailer from 'nodemailer';
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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, dest: 'uploads/' }).single('file');



export class FilmController {
  constructor(
    @repository(FilmRepository)
    public filmRepository: FilmRepository,
    @repository(BookRepository)
    public bookRepository: BookRepository

  ) { }



  @get('/film')
  @response(200)
  async findAllfilm() {

    let film = await this.filmRepository.find()
    console.log(film)

    return {
      message: "all data",
      data: film
    }

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

  @post('/film')
  @response(200)
  async createData(@requestBody({}) film: any): Promise<object> {

    if (!film.title || !film.description || !film.category || !film.rating || !film.actors) {
      throw new HttpErrors.BadRequest('Missing required fields');
    }

    let createdFilm = await this.filmRepository.create(film)

    return {
      message: 'Film successfully created',
      film: createdFilm,
    };

  }




  @post('/upload')
  @response(200, {
    description: 'File uploaded successfully',
    content: { 'multipart/form-data': { schema: { type: 'object' } } },
  })
  async create(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response
  ): Promise<object> {

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
        if (err) {
          reject(new HttpErrors.InternalServerError(`File upload failed: ${err.message}`));
        }

        const uploadedFile = req.file;

        if (!uploadedFile) {
          reject(new HttpErrors.BadRequest('No file uploaded'));
        }

        // const fileName = uploadedFile?.path.split(path.sep).pop()?.trim();

        const { title, description, category, rating, actors } = req.body;

        const createdFilm = {
          title,
          description,
          category,
          rating,
          actors,
          file: uploadedFile?.path.split(path.sep).pop()?.trim(),
        };

        try {
          const savedFilm = await this.filmRepository.create(createdFilm);
          console.log('Created film:', savedFilm);

          resolve({
            message: 'Film successfully created',
            film: savedFilm,
          });
        } catch (error) {
          reject(new HttpErrors.InternalServerError('Failed to save film to database'));
        }
      });
    });
  }




  @get('/film/{id}')
  @response(200)
  async findById(@param.path.string('id') id: string): Promise<Film> {

    if (!id) {
      throw new HttpErrors.BadRequest('The "id" parameter is required.');
    }

    try {

      let data = await this.filmRepository.findById(id);
      console.log(data)
      return data

    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        throw new HttpErrors.NotFound(`Film with id ${id} not found.`);
      }
      throw error;

    }
  }


  @post('film/{id}')
  @response(200)
  async replaceById(@param.path.string('id') id: string, @requestBody({}) film: Film): Promise<any> {


    let updateData = await this.filmRepository.replaceById(id, film)
    return {
      Message: "update record ",
      data: updateData

    }
  }


  @get('/bookess')
  @response(200, {})
  async find(
  ): Promise<Book[]> {
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
  @get('/excelDownload')
  @response(200)
  async download(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response
  ): Promise<void> {
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

      const transporter = nodemailer.createTransport({
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
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.status(200).send(rep)

    } catch (error) {
      console.error('Error generating or downloading Excel file:', error);

      if (!res.headersSent) {
        res.status(500).send({
          message: error.message || 'Internal server error.',
        });
      }
    }
  }



  @get("getData")
  @response(200,)
  async getFlightData(@inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response): Promise<any> {
    try {

      console.log(req.header)
      const url= "http://ip-api.com/json/24.48.0.1?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query";
      const response = await axios.get(url);
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
 
    } catch (error) {
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


  @post('/excelUpload')
  @response(200, {
    description: 'Upload Excel file and process data',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async excelUpload(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      upload(req, res, async (err: any) => {
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

          const transformedData = data.map((record: any) => ({
            title: record.title || null,
            description: record.description || null,
            category: record.category || null,
            rating: record.rating || null,
            actors: record.actors || null,
            file: record.file?.filename || null,
          }));
          console.log('Transformed data:', transformedData);

          const savedRecords = await this.filmRepository.createAll(transformedData);
          console.log('Saved records:', savedRecords);

          resolve(res.status(200).send({ savedRecords }));
        } catch (error) {
          console.error('Error processing Excel file:', error);
          reject(
            res.status(500).send({
              message: 'Error processing Excel file',
              error: error.message,
            }),
          );
        }
      });
    });
  }


  // @get('/excelDownload')
  // @response(200)
  // async ExcelDownload(@inject(RestBindings.Http.RESPONSE) res: Response): Promise<void> {
  //   try {
  //     const data = await this.filmRepository.find();

  //     const report = data.map((resp) => ({
  //       id: resp.id,
  //       title: resp.title,
  //       description: resp.description,
  //       category: resp.category,
  //       rating: resp.rating,
  //       actors: resp.actors,
  //     }));

  //     const workbook = xlsx.utils.book_new();
  //     const worksheet = xlsx.utils.json_to_sheet(report);
  //     xlsx.utils.book_append_sheet(workbook, worksheet, 'filmRepository');

  //     const filePath = path.join(__dirname, '../../files/data.xlsx');

  //     const filesDir = path.dirname(filePath);
  //     if (!fs.existsSync(filesDir)) {
  //       fs.mkdirSync(filesDir, { recursive: true });
  //     }

  //     xlsx.writeFile(workbook, filePath);

  //     res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  //     res.setHeader(
  //       'Content-Type',
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     );

  //     const downloadStream = fs.createReadStream(filePath);
  //     downloadStream.pipe(res);

  //     downloadStream.on('end', () => {
  //       fs.unlink(filePath, (unlinkErr) => {
  //         if (unlinkErr) {
  //           console.error('Failed to delete file:', unlinkErr);
  //         }
  //       });
  //     });

  //     downloadStream.on('error', (err) => {
  //       console.error('Error during file download:', err);
  //       if (!res.headersSent) {
  //         res.status(500).send({ message: 'Could not download the file.' });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error generating Excel file:', error);

  //     if (!res.headersSent) {
  //       res.status(500).send({ message: 'Internal server error.' });
  //     }
  //   }
  // }
}
