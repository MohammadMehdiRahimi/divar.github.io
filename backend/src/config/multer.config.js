import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const type =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `${Date.now()}-${Math.floor(Math.random() * 10)}.${type}`);
  },
});
export const upload = multer({
  storage,
  limits: 5 * 1024 * 1024,
});
