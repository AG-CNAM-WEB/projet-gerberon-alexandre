// src/models/user.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      civilite: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.JSONB, // Utilisez JSONB pour les données d'adresse
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return User;
  };
  