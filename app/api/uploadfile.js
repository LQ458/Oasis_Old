import multer from 'multer';

let fileCount = 0; // Initialize a variable to keep track of the file count

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const filename = req.body.title + '-' + Date.now() + '.' + fileExtension; // Generate a unique filename
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
}).array('files', 9);

const middleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(500).json({ message: 'File upload error' });
    } else if (err) {
      // An unknown error occurred during file upload
      return res.status(500).json({ message: 'Unknown error occurred' });
    }

    // Set the file count to the number of uploaded files at the moment
    fileCount = req.files ? req.files.length : 0; // Check if req.files exist before getting the length

    next();
  });
};

const getFileCount = () => {
  return fileCount; // Return the file count
};

export { middleware, getFileCount };