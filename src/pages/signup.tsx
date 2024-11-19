import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearLevel: '',
    faculty: '',
    eventCategories: [],
    preferredEventDays: [],
    clubsOrganizations: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [key]: options }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const data = await response.json();
      setSuccess('User registered successfully');
      console.log('Registration successful:', data);
    } catch (err) {
      setError('Error submitting the form');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year Level</label>
          <select
            name="yearLevel"
            value={formData.yearLevel}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Year Level</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4+</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Faculty</label>
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Faculty</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Commerce">Commerce</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Event Categories of Interest</label>
          <select
            multiple
            name="eventCategories"
            value={formData.eventCategories}
            onChange={(e) => handleMultiSelectChange(e, 'eventCategories')}
            className="w-full p-2 border rounded"
          >
            <option value="Academic">Academic</option>
            <option value="Social">Social</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Preferred Event Days</label>
          <select
            multiple
            name="preferredEventDays"
            value={formData.preferredEventDays}
            onChange={(e) => handleMultiSelectChange(e, 'preferredEventDays')}
            className="w-full p-2 border rounded"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Clubs/Organizations</label>
          <input
            type="text"
            name="clubsOrganizations"
            value={formData.clubsOrganizations}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
