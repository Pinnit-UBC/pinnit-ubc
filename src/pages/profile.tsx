import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState({
    keywords: [],
    following: [],
  });
  const [loading, setLoading] = useState(true); // Loading state for profile data
  const [error, setError] = useState('');

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/authenticate', {
          credentials: 'include', // Ensure cookies are sent
        });

        if (!res.ok) {
          console.log('Not authenticated, redirecting...');
          setIsAuthenticated(false);
          router.push('/login');
          return;
        }

        const data = await res.json();
        console.log('Authenticated:', data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Authentication error:', err);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch profile data if authenticated
  useEffect(() => {
    if (isAuthenticated === true) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch('/api/profile', {
            credentials: 'include', // Ensure cookies are sent
          });

          if (!res.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await res.json();
          setProfileData(data);
        } catch (err) {
          console.error('Profile data fetch error:', err);
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
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await res.json();
      setProfileData(updatedData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile');
    }
  };

  // Handle unauthenticated state
  if (isAuthenticated === false) {
    return null; // Avoid rendering anything before redirect
  }

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  return (
    <div>
      <h1>Profile</h1>
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
