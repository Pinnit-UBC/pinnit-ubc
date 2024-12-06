import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState<string | null>(null); // To track the field being edited
  const [tempValue, setTempValue] = useState<any>(''); // Temporary value for edits

  // Fetch the user profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' });

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

  // Save updated field to the backend
  const handleSave = async (field: string) => {
    if (!profileData) return;

    try {
      const updatedProfile = { ...profileData, [field]: tempValue };

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ [field]: tempValue }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await res.json();
      setProfileData(updatedData); // Update the state with new profile data
      setEditingField(null); // Exit edit mode
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>No profile data found.</p>;
  }

  // Render each field with edit capability
  const renderField = (label: string, field: string, isArray: boolean = false) => {
    const value = profileData[field];

    if (editingField === field) {
      return (
        <div>
          <strong>{label}:</strong>
          <input
            type="text"
            value={tempValue}
            onChange={(e) =>
              setTempValue(isArray ? e.target.value.split(',').map((v) => v.trim()) : e.target.value)
            }
            placeholder={`Enter new ${label.toLowerCase()}`}
          />
          <button onClick={() => handleSave(field)}>Save</button>
          <button onClick={() => setEditingField(null)}>Cancel</button>
        </div>
      );
    }

    return (
      <div>
        <strong>{label}:</strong> {isArray ? value.join(', ') : value}
        <button onClick={() => { setEditingField(field); setTempValue(value); }}>
          ✏️ Edit
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Welcome to your Profile</h1>
      <p>
        <strong>Name:</strong> {profileData.firstName} {profileData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {profileData.email}
      </p>
      {renderField('Username', 'username')}
      {renderField('Year Level', 'yearLevel')}
      {renderField('Faculty', 'faculty')}
      {renderField('Keywords', 'keywords', true)}
      {renderField('Following', 'following', true)}
    </div>
  );
};

export default Profile;
