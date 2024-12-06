import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/validateSession', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setProfileData(data.user); // Assuming user info is returned here
        } else {
          setIsAuthenticated(false);
          router.replace('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <div>
      <h1>Welcome to your Profile</h1>
      {profileData && (
        <div>
          <p>Name: {profileData.firstName} {profileData.lastName}</p>
          <p>Email: {profileData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
