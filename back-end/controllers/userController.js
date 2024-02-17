
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Controller để lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để tạo mới một người dùng
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để sửa thông tin của người dùng theo id
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, avataURL, role } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu bằng id
    const user = await User.findByPk(userId);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cập nhật thông tin của người dùng
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (avataURL) user.avataURL = avataURL;
    if (role && req.user.role === "admin") {
      user.role = role;
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Lưu thay đổi vào cơ sở dữ liệu
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
