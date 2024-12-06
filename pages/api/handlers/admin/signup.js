import dbConnect from '@/utils/dbConnect';
import Admin from '@/pages/api/models/Admin';

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection

  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    try {
      // Check if admin with the same username already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Admin with this username already exists.' });
      }

      // Create a new admin user
      const newAdmin = await Admin.create({ username, password });

      // Send success response
      res.status(201).json({
        success: true,
        message: 'Admin created successfully.',
        data: {
          id: newAdmin._id,
          username: newAdmin.username,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
