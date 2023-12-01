import { NextResponse } from 'next/server';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '@/app/public/uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const filename = req.body.title + '-' + Date.now() + '.' + fileExtension; // Generate a unique filename
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
}).array('files', 10);

export async function middleware(req, res) {
  if (req.method === 'POST') {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer error
        return NextResponse.error(err, 500);
      } else if (err) {
        // Handle any other errors
        return NextResponse.error(err, 500);
      }
      // If no error, proceed with your logic
      // For example, you might want to return a success message
      return NextResponse.next();
    });
  } else {
    // Handle any other HTTP method
    return NextResponse.error('Method not allowed', 405);
  }
}