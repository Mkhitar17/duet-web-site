
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "@/redux/slices/authSlice";

const AdminIndex = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthentication())
      .unwrap()
      .then((admin) => {
        if (admin) {
          router.replace("/admin/dashboard"); 
        } else {
          router.replace("/admin/signin"); 
        }
      })
      .catch(() => {
        router.replace("/admin/signin"); 
      });
  }, [dispatch, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return null;
};

export default AdminIndex;
