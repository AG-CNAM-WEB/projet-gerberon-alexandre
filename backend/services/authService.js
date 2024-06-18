// src/services/authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET_KEY = process.env.SECRET_KEY || 'secret';

class AuthService {
  static async register(userData) {
    const { prenom, nom, civilite, address, email, phone, login, password } = userData;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      prenom,
      nom,
      civilite,
      address,
      email,
      phone,
      login,
      password: hashedPassword,
    });

    // Génération d'un token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return { token };
  }

  static async login(login, password) {
    // Recherchez l'utilisateur par login
    const user = await User.findOne({ where: { login } });

    if (!user) {
      throw new Error('Invalid login or password');
    }

    // Vérifiez le mot de passe
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Invalid login or password');
    }

    // Génération d'un token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return { token };
  }

  static async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async updateProfile(userId, updatedData) {
    const { prenom, nom, civilite, address, email, phone, login, password } = updatedData;

    // Recherchez l'utilisateur par ID
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Mise à jour des données de l'utilisateur
    user.prenom = prenom;
    user.nom = nom;
    user.civilite = civilite;
    user.address = address;
    user.email = email;
    user.phone = phone;
    user.login = login;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return user;
  }
}

module.exports = AuthService;
