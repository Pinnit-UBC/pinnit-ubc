import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    yearLevel: '',
    faculty: '',
    eventCategories: [],
    preferredEventDays: [],
    clubsOrganizations: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (name: string, selectedOptions: string[]) => {
    setFormData({ ...formData, [name]: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />
      <select name="yearLevel" onChange={handleChange} required>
        <option value="">Select Year Level</option>
        <option value="First Year">First Year</option>
        <option value="Second Year">Second Year</option>
        <option value="Third Year">Third Year</option>
        <option value="Fourth Year">Fourth Year</option>
        <option value="Graduate">Graduate</option>
      </select>
      <select name="faculty" onChange={handleChange} required>
        <option value="">Select Faculty</option>
        <option value="Engineering">Engineering</option>
        <option value="Arts">Arts</option>
        <option value="Science">Science</option>
        <option value="Business">Business</option>
        <option value="Other">Other</option>
      </select>
      {/* Multi-select for Event Categories and Preferred Event Days */}
      {/* Add searchable multi-select for Clubs/Organizations */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
