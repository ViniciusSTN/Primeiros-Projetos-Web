import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers; // chave authorization possui o token

  // analisa se foi enviado um token de verificação
  if (!authorization) {
    return res.status(401).json({
      errors: ['Necessário logar'],
    });
  }

  // separar o texto do token
  const [, token] = authorization.split(' ');

  try {
    // verifica se o token é válido e retorna os dados do usuário atrelados ao token
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // essa verificação é importante pois se o usuário trocar de email, será necessário logar novamente para alterar o token, evitando falhas de segurança
    // portanto toda requisição que passe por esse middleware precisa checar no BD se o email e id correspondem, semelhante ao que as sessions fazem. Isso gera discuções.
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id; // o id e o email pode ser acessados em rotas para saber qual usuario está logado
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};

// exemplo de token (palavra Bearer seguido pelo token gerado para o usuário):
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY4NjM0Mjk2MiwiZXhwIjoxNjg2OTQ3NzYyfQ.T_5Nk_hxWDEguubeTWYCNB18ZtLomwzHlMLR3UMdd4c
