"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    username: "postgres",
    host: "localhost",
    database: "testdatabas",
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
exports.default = sequelize;
