const bcrypt = require('bcryptjs');
const { User } = require('../models');

class UserService {
  static async createUser(userData) {
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

    return user;
  }

  static async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'id"'] },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async getUserByLogin(login) {
    const user = await User.findOne({ where: { login } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async updateUser(userId, updatedData) {
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

  static async deleteUser(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}

module.exports = UserService;
