import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
