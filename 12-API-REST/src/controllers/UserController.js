import User from '../models/User';

class UserController {
  // store
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      // const users = await User.findAll(); // busca todos os usuários
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] }); // busca somente esses tributos listados
      console.log(users);
      // console.log('User ID', req.userId);
      // console.log('User Email', req.userEmail);
      return res.json(users); // retorna os usuários
    } catch (e) {
      return res.json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id); // find by primary key

      const { id, nome, email } = user;

      // return res.json(user); // retorna o usuário informado
      return res.json({ id, nome, email }); // retorna apenas alguns atributos do usuário informado
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body); // atualiza os dados
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy(); // apaga o usuário
      return res.json('Usuário deletado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
