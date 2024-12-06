import { verifyAdminToken } from '@/middlewares/auth';

export default async function handler(req, res) {
  await verifyAdminToken(req, res, async () => {
    res.status(200).json({ success: true, message: 'You have access to this protected route.' });
  });
}
