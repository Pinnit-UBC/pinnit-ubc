import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the user profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' }); // Send cookies

        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Could not load profile information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>No profile data found.</p>;
  }

  // Render the user profile
  return (
    <div>
      <h1>Welcome to your Profile</h1>
      <p><strong>Name:</strong> {profileData.firstName} {profileData.lastName}</p>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Year Level:</strong> {profileData.yearLevel}</p>
      <p><strong>Faculty:</strong> {profileData.faculty}</p>
      <p><strong>Keywords:</strong> {profileData.keywords.join(', ')}</p>
      <p><strong>Following:</strong> {profileData.following.join(', ')}</p>
    </div>
  );
};

export default Profile;
