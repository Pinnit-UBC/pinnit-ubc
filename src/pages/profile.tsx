import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState<string | null>(null); // Track the field being edited
  const [tempValue, setTempValue] = useState<any>(''); // Temporary value for edits
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null); // For uploading a new profile picture
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For previewing the selected image

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
      setProfileData(updatedData); // Update state with new profile data
      setEditingField(null); // Exit edit mode
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert('Failed to save changes. Please try again.');
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfilePicture(file);

      // Generate a preview image URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
    }
  };

  // Upload and save profile picture
  const handleUploadProfilePicture = async () => {
    if (!newProfilePicture) return;

    const reader = new FileReader();
    reader.readAsDataURL(newProfilePicture);

    reader.onload = async () => {
      const base64File = reader.result;

      try {
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ file: base64File }),
        });

        if (!res.ok) {
          throw new Error('Failed to upload profile picture');
        }

        const data = await res.json();
        setProfileData({ ...profileData, profilePicture: data.profilePicture });
        setNewProfilePicture(null);
        setPreviewImage(null); // Clear the preview after successful upload
        alert('Profile picture updated successfully!');
      } catch (err) {
        console.error('Error uploading profile picture:', err);
        alert('Failed to upload profile picture. Please try again.');
      }
    };
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
        <div key={field}>
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
      <div key={field}>
        <strong>{label}:</strong> {isArray ? value.join(', ') : value}
        <button
          onClick={() => {
            setEditingField(field);
            setTempValue(value);
          }}
        >
          ✏️ Edit
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Welcome to your Profile</h1>
      {/* Editable Name */}
      {renderField('First Name', 'firstName')}
      {renderField('Last Name', 'lastName')}
      {/* Editable Email */}
      {renderField('Email', 'email')}
      {/* Editable fields */}
      {renderField('Username', 'username')}
      {renderField('Year Level', 'yearLevel')}
      {renderField('Faculty', 'faculty')}
      {renderField('Keywords', 'keywords', true)}
      {renderField('Following', 'following', true)}
      <div>
        <strong>Profile Picture:</strong>
        <div>
          {/* Display existing profile picture or preview the selected image */}
          <img
            src={previewImage || profileData.profilePicture}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </div>
        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        <button onClick={handleUploadProfilePicture}>Upload New Profile Picture</button>
      </div>
    </div>
  );
};

export default Profile;
