module.exports = {
  async up(queryInterface, Sequelize) {
    // mudar a coluna email de alunos
    queryInterface.changeColumn(
      'alunos',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    );
  },

  async down() {
    //
  },
};
