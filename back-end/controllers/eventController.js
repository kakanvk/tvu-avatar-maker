// server/controllers/eventController.js

const Event = require('../models/Event');
const User = require('../models/User');

// Controller để lấy tất cả sự kiện
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để lấy thông tin của sự kiện theo ID
exports.getEventById = async (req, res) => {
  try {
    // Lấy thông tin của sự kiện theo ID
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);

    // Kiểm tra sự kiện có tồn tại không
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Kết mã auth với bảng User để lấy thông tin của người tạo sự kiện
    event.auth = await User.findByPk(event.auth);

    // Trả về thông tin của sự kiện cùng với thông tin của người tạo
    res.json({ event });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để tạo mới một sự kiện
exports.createEvent = async (req, res) => {
  try {
    const { name, description, slug, frameURL } = req.body;
    const auth = req.user.id;

    console.log(auth);

    const newEvent = await Event.create({ name, description, auth, slug, frameURL });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để sửa thông tin của sự kiện theo ID
exports.updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, auth, slug, frameURL } = req.body;
    const event = await Event.findByPk(eventId);

    // Kiểm tra sự kiện có tồn tại không
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Cập nhật thông tin của sự kiện
    if(name) event.name = name;
    if(description) event.description = description;
    if(auth) event.auth = auth;
    if(slug) event.slug = slug;
    if(frameURL) event.frameURL = frameURL;

    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Error updating event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller để xóa sự kiện theo danh sách ID
exports.deleteEventsByIds = async (req, res) => {
  try {
    const eventIds = req.body.eventIds;

    // Kiểm tra xem danh sách ID có tồn tại không
    if (!eventIds || eventIds.length === 0) {
      return res.status(400).json({ error: 'Event IDs are required' });
    }

    // Xóa sự kiện theo danh sách ID
    const deleteResult = await Event.destroy({ where: { id: eventIds } });

    // Kiểm tra số lượng sự kiện đã bị xóa
    if (deleteResult === 0) {
      return res.status(404).json({ error: 'No events found with the provided IDs' });
    }

    res.json({ message: 'Events deleted successfully' });
  } catch (error) {
    console.error('Error deleting events by IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
