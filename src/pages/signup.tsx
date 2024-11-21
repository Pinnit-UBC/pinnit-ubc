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
    keywords: [] as string[], // Array for selected keywords
  });

  const [searchKeyword, setSearchKeyword] = useState(''); // Searchable text input
  const [customKeyword, setCustomKeyword] = useState(''); // Custom keyword input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const popularKeywords = [
    'Tech',
    'Basketball',
    'Painting',
    'Music',
    'Coding',
    'Photography',
    'Writing',
    'Dance',
    'Gaming',
    'Science',
    'Math',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [key]: options }));
  };

  const handleAddKeyword = () => {
    const trimmedKeyword = customKeyword.trim();
    if (trimmedKeyword && !formData.keywords.includes(trimmedKeyword)) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, trimmedKeyword],
      }));
      setCustomKeyword('');
    }
  };

  const handleKeywordSelect = (keyword: string) => {
    if (!formData.keywords.includes(keyword)) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/userRegistration', {
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
        {/* First Name */}
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

        {/* Last Name */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* Year Level */}
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

        {/* Faculty */}
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

        {/* Keywords Section */}
        <div className="mb-4">
          <label className="block text-gray-700">Keywords of Interest</label>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          {/* Filtered Keyword List */}
          <div className="border p-2 rounded h-32 overflow-y-auto">
            {popularKeywords
              .filter((keyword) =>
                keyword.toLowerCase().includes(searchKeyword.toLowerCase())
              )
              .map((keyword) => (
                <div
                  key={keyword}
                  className="cursor-pointer p-1 hover:bg-blue-100"
                  onClick={() => handleKeywordSelect(keyword)}
                >
                  {keyword}
                </div>
              ))}
          </div>
          {/* Add Custom Keyword */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Add custom keyword..."
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              className="w-full p-2 border rounded mr-2"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Selected Keywords */}
        <div className="mb-4">
          <label className="block text-gray-700">Selected Keywords</label>
          <ul className="list-disc pl-5">
            {formData.keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
