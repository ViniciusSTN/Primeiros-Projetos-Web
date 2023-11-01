import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// não deveria existir em uma API real
// router.get('/', loginRequired, userController.index);
// router.get('/:id', userController.show);

// a rota de post de novos usuários não deve ter loginRequired
router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
Padrão usado pela comunidade

index -> Lista todos os usuarios -> GET
store ou create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH OU PUT
*/
