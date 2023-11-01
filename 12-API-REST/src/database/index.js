import Sequelize from "sequelize";
import dataBaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from "../models/Foto";

const models = [Aluno, User, Foto];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));

// se existir o método associate dentro da classe do Model, será executado
models.forEach((model) => model.associate && model.associate(connection.models));
