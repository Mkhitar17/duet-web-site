import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '@/redux/slices/authSlice';

const AdminSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Get Redux states
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await dispatch(signUp({ username, password })).unwrap();
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Sign-up failed:', err); // Log error for debugging
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '100px 0 0 0',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <h1>Admin Sign-Up</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
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
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
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
            }}
          />
        </div>

        {/* Submit Button */}
        <button
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
          {loading ? 'Adding Admin...' : 'Add Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignUp;
