import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/hoc/withAuth';
import axios from 'axios';
import adminWrapper from "@/components/wrappers/adminWrapper";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const { data } = await axios.get('/api/handlers/admin/verify', { withCredentials: true });
//         setAdmin(data.admin);
//       } catch (err) {
//         router.push('/admin/signin'); // Redirect to sign-in on failure
//       }
//     };

//     fetchAdmin();
//   }, [router]);

  if (!admin) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {admin.username}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default adminWrapper(AdminDashboard);
