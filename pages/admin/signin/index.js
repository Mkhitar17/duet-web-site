import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signIn } from '@/redux/slices/authSlice';
import styles from "./index.module.css"

const AdminSignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  // Get loading and error states from Redux
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    try {
      await dispatch(signIn({ username, password })).unwrap();
      // Redirect to Admin Dashboard on success
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Sign-in failed:', err);
    }
  };

  return (
    <div className={styles.adminContainer}
      style={{
        maxWidth: '400px',
        margin: '140px auto',
        // padding: '200px 0 0 0',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 className={styles.adminTitle}>Admin Sign-In</h1>
      {error && <p style={{ color: 'red', paddingTop:'15px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div style={{ marginBottom: '15px' }} className={styles.adminDiv}>
          <label className={styles.AdminSignInTitle} htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username
          </label>
          <input
            className={styles.adminInput}

            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '15px' }}>
          <label className={styles.AdminSignInTitle} htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            className={styles.adminInput}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Submit Button */}
        <button
        className={styles.buttonAdmin}
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#cccccc' : '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignIn;
