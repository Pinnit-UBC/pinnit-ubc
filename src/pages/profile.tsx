import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState({
    keywords: [],
    following: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/authenticate', {
          credentials: 'include',
        });

        if (!res.ok) {
          setIsAuthenticated(false);
          router.push('/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch profile data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch('/api/profile', {
            credentials: 'include',
          });

          if (!res.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await res.json();
          setProfileData(data);
        } catch (err) {
          setError('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated]);

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await res.json();
      setProfileData(updatedData);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (isAuthenticated === false) {
    return null; // Avoid rendering anything before redirect
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <div>
        <label>Keywords:</label>
        <textarea
          value={profileData.keywords.join(', ')}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              keywords: e.target.value.split(',').map((kw) => kw.trim()),
            })
          }
        />
      </div>
      <div>
        <label>Following:</label>
        <textarea
          value={profileData.following.join(', ')}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              following: e.target.value.split(',').map((kw) => kw.trim()),
            })
          }
        />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default Profile;
