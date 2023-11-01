/** @type {import('sequelize-cli').Migration} */

const bcryptjs = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Luiz',
          email: 'luiz@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Ana',
          email: 'ana@gmail.com',
          password_hash: await bcryptjs.hash('123456sla', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Guilherme',
          email: 'gui@gmail.com',
          password_hash: await bcryptjs.hash('123456321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],

      {},
    );
  },

  async down() {
    //
  },
};
