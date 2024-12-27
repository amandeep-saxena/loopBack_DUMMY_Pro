
// import multer from 'multer';
// import path from 'path';
// import { Request, Response } from '@loopback/rest';


// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb: any) => {
//     cb(null, path.join(__dirname, '../uploads')); 
//   },
//   filename: (req, file, cb: any) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage: multerStorage }).any();

// export const fileUploadMiddleware : any = (req: Request, res: Response, next: any) => {
//   upload(req, res, (err: any) => {
//     if (err) {
//       res.status(500).json({ error: 'File upload failed', details: err.message });
//     } else {
//       next();
//     }
//   });
// };


// import multer from 'multer';
// import path from 'path';
// import { Request, Response } from '@loopback/rest';


// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb: any) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb: any) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const multerMiddleware = multer({ storage: multerStorage }).any();

// export const fileUploadMiddleware: any = (req: Request, res: Response, next: any) => {
//   console.log('Middleware triggered');
//   multerMiddleware(req, res, (err) => {
//     if (err) {
//       console.log('File upload error:', err.message);
//       res.status(500).json({ error: 'File upload failed', details: err.message });
//     } else {
//       console.log('File upload success');
//       next();
//     }
//   });
// };
