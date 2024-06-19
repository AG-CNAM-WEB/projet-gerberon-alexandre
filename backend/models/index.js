'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Requête SQL d'initialisation
const initQuery = `
  INSERT INTO public.products(
    id, name, brand, model, year, price, image, "createdAt", "updatedAt")
  VALUES 
    (1, 'Toyota Camry', 'Toyota', 'Camry', 2025, 30000, 'assets/images/2025-toyota-camry.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Honda Accord', 'Honda', 'Accord', 2025, 28000, 'assets/images/2023-honda-accord-interior.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Ford Mustang', 'Ford', 'Mustang', 2023, 45000, 'assets/images/ford-mustang-2023.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Chevrolet Camaro', 'Chevrolet', 'Camaro', 2026, 50000, 'assets/images/2015-569206-2016-chevrolet-camaro1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Nissan Altima', 'Nissan', 'Altima', 2023, 25000, 'assets/images/2023-nissan-altima.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;

// Fonction pour exécuter la requête SQL d'initialisation
async function executeInitQuery() {
  try {
    await sequelize.query(initQuery);
    console.log('Initial products inserted successfully.');
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}

// Lecture des modèles et chargement dans db
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Association des modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exécution de la requête SQL au démarrage
executeInitQuery()
  .then(() => {
    // Démarrage de votre serveur ou d'autres opérations après l'initialisation
  })
  .catch(err => {
    console.error('Error initializing products:', err);
    // Gestion des erreurs
  });

// Exportation de sequelize et Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
