// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');


// Middleware để xác định người dùng đã đăng nhập hay chưa
exports.authenticate = async (req, res, next) => {
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

        // Lưu thông tin người dùng vào req để sử dụng trong các controller tiếp theo
        req.user = user;

        // Tiếp tục chuyển hướng tới controller tiếp theo
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Middleware để kiểm tra xem người dùng có đang xử lý sự kiện mà họ đã tạo hay không
exports.checkEventOwnership = async (req, res, next) => {
    try {
        // Lấy ID của sự kiện từ URL
        const eventId = req.params.id;

        // Lấy thông tin người dùng từ req.user
        const userId = req.user.id;

        // Tìm sự kiện trong cơ sở dữ liệu
        const event = await Event.findByPk(eventId);

        // Kiểm tra xem sự kiện có tồn tại không
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Kiểm tra xem người dùng có phải là người tạo sự kiện không
        if (event.auth !== userId) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }

        // Nếu người dùng là người tạo sự kiện, tiếp tục chuyển hướng tới controller tiếp theo
        next();
    } catch (error) {
        console.error('Error checking event ownership:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
