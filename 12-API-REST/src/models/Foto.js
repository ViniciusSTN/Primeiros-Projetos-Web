import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'fotos',
    });
    return this;
  }

  // para dizer que essa tabela pertence à tabela de Aluno
  // static associate(models) {
  //   this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  // }

  // OU ENTÃO (dentro do model Aluno):
  // hasOne (tem um)
  // hasMany (tem muitos) -> retorna um array
  // static associate(models) {
  //   this.hasOne(models.Foto, { foreignKey: 'aluno_id' });
  // }
}
