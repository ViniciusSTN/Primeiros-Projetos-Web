module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // chave estrangeira -> referencia a chave primária id do usuário
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          // faz referência a tabela alunos, usando a chave id
          model: 'alunos',
          key: 'id',
        },
        // set null faz com que ao deletar o usuário, o campo aluno_id ficará nulo
        // para que o set null funcione, a chave allowNull deve ser true
        // onDelete: 'CASCADE' -> apaga todas as fotos referentes ao usuário
        // ler anotações aula 185
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE', // se o id do aluno for alterado, aqui também será
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('fotos');
  },
};
