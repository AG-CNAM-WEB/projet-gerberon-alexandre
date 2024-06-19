const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');
const { SECRET_KEY } = process.env;

class AuthController {
  static async register(req, res) {
    try {
      const { prenom, nom, civilite, address, email, phone, login, password } = req.body;

      // Create user
      const newUser = await UserService.createUser({
        prenom,
        nom,
        civilite,
        address,
        email,
        phone,
        login,
        password,
      });

      // Generate JWT token
      const token = jwt.sign({ id: newUser.id }, SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      // Trouver l'utilisateur par username dans la base de données
      const user = await UserService.getUserByLogin(username);
      console.log('credential ok');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid login' });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('compare is valid', isPasswordValid)
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // Générer un token JWT
      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '1h',
      });
      console.log('jwt ok');
      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ success: false, message: 'Failed to log in' });
    }
  }
}

module.exports = AuthController;
