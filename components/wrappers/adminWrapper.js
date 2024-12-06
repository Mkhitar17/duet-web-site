import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageData } from "@/redux/slices/adminSlice"; // Import the thunk
import withAuth from "@/hoc/withAuth"; // Import your withAuth HOC

const adminWrapper = (WrappedComponent) => {
  const AdminWrapper = (props) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.admin);

    // Fetch admin data on render
    useEffect(() => {
        console.log("this was called ")
      dispatch(fetchPageData());
    }, [dispatch]);

    if (isLoading) {
      return <div>Loading...</div>; // Show loading spinner while fetching
    }

    if (error) {
      return <div>Error: {error}</div>; // Show error if fetching fails
    }

    return (
      <main>
        {/* Render the wrapped component */}
        <WrappedComponent {...props} />
      </main>
    );
  };

  // Apply withAuth to ensure authentication
  return withAuth(AdminWrapper);
};

export default adminWrapper;
