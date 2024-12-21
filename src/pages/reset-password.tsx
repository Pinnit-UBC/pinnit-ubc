import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // Store token from query
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Retrieve token from query
  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token as string);
      console.log('Token from query string:', router.query.token); // Debug log
    }
  }, [router.query]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      console.log('Passwords do not match'); // Debug log
      return setError('Passwords do not match');
    }

    try {
      console.log('Attempting password reset with token:', token); // Debug log
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log('Error response from API:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to reset password');
      }

      console.log('Password reset successful! Redirecting to login...'); // Debug log
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      console.error('Error in password reset:', err.message); // Debug log
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" disabled={!token}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
