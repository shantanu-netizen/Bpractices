import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
      if (err) return cb(err);
      cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });