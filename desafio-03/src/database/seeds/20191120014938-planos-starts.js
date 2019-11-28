module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "planos",
      [
        {
          title: "Start",
          duration: 1,
          price: "129.00",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Gold",
          duration: 3,
          price: "109.00",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Diamond",
          duration: 6,
          price: "89.00",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
