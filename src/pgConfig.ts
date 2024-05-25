import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  host: "localhost",
  database: "testdatabase",
  password: "Shinde@225",
  port: 5432,
  //dialect
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Data connected to database");
  })
  .catch((err) => {
    console.log("Error in connecting data", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized with the database.");
  })
  .catch((err) => {
    console.error("Unable to synchronize models with the database:", err);
  });

export default sequelize;
