// import Link from 'next/link';
// import styles from './index.module.css'

// const Dashboard = () => {
//   return (
//     <div className={styles.Container}>
//       <h1>Admin Dashboard</h1>
//       <ul>
//         <li><Link href="/admin/dashboard/products">Արտադրանք</Link></li>
//         <li><Link href="/admin/dashboard/partners">Գործընկերներ</Link></li>
//         <li><Link href="/admin/dashboard/about">Մեր մասին</Link></li>
//         <li><Link href="/admin/dashboard/material">Հումք</Link></li>
//         <li><Link href="/admin/dashboard/contact">Կապ մեզ հետ</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;







import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageData } from "@/redux/slices/adminSlice"; // Thunk for fetching page data
import Link from "next/link";
import styles from "./index.module.css";
import adminWrapper from "@/components/wrappers/adminWrapper";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pageData, isLoading, error } = useSelector((state) => state.admin); // Access Redux state

  // Fetch data when the component renders
  // useEffect(() => {
  //   dispatch(fetchPageData());
  // }, [dispatch]);

  useEffect(() => {
    console.log(pageData,"pageData")
  }, [pageData]);


  if (isLoading) {
    return <div>Loading...</div>; // Show loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if data fetch fails
  }

  return (
    <div className={styles.Container}>
      <h1>Admin Dashboard</h1>
      <ul>
      <li>
          <Link href="/admin/dashboard/banner">Գլխավոր նկար</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/products">Արտադրանք</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/partners">Գործընկերներ</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/about">Մեր մասին</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/material">Հումք</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/contact">Կապ մեզ հետ</Link>
        </li>
      </ul>
      {/* Debugging Section: Display the data */}
      {/* <div>
        <h2>Fetched Page Data:</h2>
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default adminWrapper(Dashboard);
