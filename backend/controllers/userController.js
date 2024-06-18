// controllers/userController.js

const UserService = require('../services/userService');

class UserController {
  static async getProfile(req, res) {
    try {
      const userId = req.id;
      console.log("UserID de userController :", userId);
      const user = await UserService.getUserById(userId);
      console.log("getProfile :", user)
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.userId;
      const updatedData = req.body;

      const user = await UserService.updateUser(userId, updatedData);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteProfile(req, res) {
    try {
      const userId = req.userId;

      await UserService.deleteUser(userId);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

module.exports = UserController;