import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the cookie
    res.setHeader(
      'Set-Cookie',
      serialize('adminToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1, // Expire the cookie immediately
        path: '/',
      })
    );

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
