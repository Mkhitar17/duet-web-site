import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Admin from '@/pages/api/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable in .env.local');
}

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Get the token from cookies
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch the admin details
    const admin = await Admin.findById(decoded.id).select('-password'); // Exclude password
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is invalid or expired', error: error.message });
  }
}
