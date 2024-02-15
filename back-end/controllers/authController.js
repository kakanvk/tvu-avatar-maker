// server/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controller để xác thực người dùng và tạo token JWT
exports.login = async (req, res) => {
    try {
        // Lấy thông tin đăng nhập từ body của yêu cầu
        const { email, password } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu dựa trên email
        const user = await User.findOne({ where: { email } });

        // Kiểm tra xem người dùng có tồn tại hay không
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        secret_key = 'kakanvk';

        // Tạo token JWT
        const token = jwt.sign({ userId: user.id }, secret_key, { expiresIn: "30d" });

        // Lưu token vào cookie
        res.cookie('token', token, { httpOnly: true });

        // Trả về thông tin người dùng và token
        res.json({ user, token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller để lấy thông tin của người dùng hiện tại từ token JWT
exports.getCurrentUser = async (req, res) => {
    try {
        // Lấy token từ cookie
        const token = req.cookies.token;

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        secret_key = 'kakanvk';

        // Giải mã token để lấy userId
        const decodedToken = jwt.verify(token, secret_key);

        // Tìm người dùng trong cơ sở dữ liệu bằng userId
        const user = await User.findByPk(decodedToken.userId);

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Trả về thông tin của người dùng hiện tại
        res.json(user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller để đăng xuất người dùng
exports.logout = async (req, res) => {
    try {
        // Xóa cookie chứa token
        res.clearCookie('token');

        // Trả về thông báo đăng xuất thành công
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
