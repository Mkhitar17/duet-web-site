import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { checkAuthentication } from '@/redux/slices/authSlice';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoggedIn, loading } = useSelector((state) => state.auth);

    useEffect(() => {

        console.log(isLoggedIn,"isLoggedInisLoggedInisLoggedIn")
      if (!isLoggedIn) {
        dispatch(checkAuthentication())
          .unwrap()
          .then((admin) => {
            if (!admin) {
              router.push('/admin/signin'); // Redirect if not authenticated
            }
          })
          .catch(() => {
            router.push('/admin/signin'); // Redirect on error
          });
      }
    }, [dispatch, isLoggedIn, router]);

    if (loading) {
      return <div>Loading...</div>; // Show loading while checking auth
    }

    if (!isLoggedIn) {
      return null; // Prevent unauthorized content from flashing
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
