import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, callBack) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== "image/jpeg") {
      // primeiro parâmetro é um erro
      return callBack(new multer.MulterError('Arquivo precisa ser PNG ou JPEG'));
    }

    // caso não tiver erro retorna true
    return callBack(null, true); // primeiro parâmetro é um erro
  },
  storage: multer.diskStorage({
    destination: (req, file, callBack) => {
      // o primeiro parâmetro é um erro
      callBack(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, callBack) => {
      // alterar o nome do arquivo para a hora atual em ms
      // a função extname extrai a extenção do arquivo, nesse caso tendo como base o nome do arquivo original
      callBack(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
