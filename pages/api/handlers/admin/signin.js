import dbConnect from '@/utils/dbConnect'; // Database connection utility
import Admin from '@/pages/api/models/Admin'; // Admin model
import { generateToken } from '@/utils/jwtUtils'; // JWT generation utility
import { serialize } from 'cookie'; // Cookie utility to set cookies securely

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    try {
      // Find admin by username
      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      // Check if the password matches
      const isMatch = await admin.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      // Generate a JWT token
      const token = generateToken(admin._id);

      // Set the token in an HTTP-only cookie
      res.setHeader(
        'Set-Cookie',
        serialize('adminToken', token, {
          httpOnly: true, // Prevent client-side access to the cookie
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'strict', // Restrict cross-site requests
          maxAge: 3 * 24 * 60 * 60, // Token validity: 7 days
          path: '/', // Cookie available site-wide
        })
      );

      // Respond with admin details (excluding password)
      res.status(200).json({
        success: true,
        message: 'Sign-in successful',
        data: { id: admin._id, username: admin.username },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
