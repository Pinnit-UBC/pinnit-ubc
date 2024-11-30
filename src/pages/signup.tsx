import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  year_level: string;
  faculty: string;
  keywords: string[];
  following: string[];
}

interface ClubsData {
  [key: string]: string[];
}

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Track the current step
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    year_level: '',
    faculty: '',
    keywords: [],
    following: [],
  });

  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [recommendedClubs, setRecommendedClubs] = useState<[string, number][]>([]); // Club name and match score
  const [clubsData, setClubsData] = useState<ClubsData>({});
  const [keywords, setKeywords] = useState<string[]>([]);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Fetch keywords dynamically from the public folder
  useEffect(() => {
    fetch('/data/keywords.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load keywords.json: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setKeywords(data.keywords))
      .catch((err) => console.error('Error loading keywords data:', err));
  }, []);

  // Fetch club data from the public directory
  useEffect(() => {
    fetch('/data/clubs.json')
      .then((res) => res.json())
      .then((data) => setClubsData(data))
      .catch((err) => console.error('Error loading clubs data:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleSelect = (key: 'keywords' | 'following', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
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

  const handleRecommendations = () => {
    const clubScores: [string, number][] = Object.entries(clubsData).map(
      ([club, clubKeywords]) => {
        const matchCount = formData.keywords.filter((keyword) =>
          clubKeywords.includes(keyword)
        ).length;
        return [club, matchCount];
      }
    );

    // Sort clubs by match count (descending)
    const sortedClubs = clubScores.sort((a, b) => b[1] - a[1]);

    setRecommendedClubs(sortedClubs);
  };

  const handleSubmit = async () => {
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

  const toggleFollowing = (club: string) => {
    handleToggleSelect('following', club);
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return false;
    }
    setError(''); // Clear error if passwords match
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
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
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Create Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Year Level</label>
              <select
                name="year_level"
                value={formData.year_level}
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
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Select your interests and hobbies</label>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <button
                    type="button"
                    key={keyword}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.keywords.includes(keyword)
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleToggleSelect('keywords', keyword)}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Recommended Clubs and Organizations</h2>
            {recommendedClubs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recommendedClubs.map(([club]) => (
                  <button
                    key={club}
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.following.includes(club)
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => toggleFollowing(club)}
                  >
                    {club}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recommendations available.</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1 && !validatePasswords()) {
            return;
          }
          if (step === 3) {
            handleRecommendations();
            setStep((prev) => prev + 1);
          } else if (step === 4) {
            handleSubmit();
          } else {
            setStep((prev) => prev + 1);
          }
        }}
      >
        {renderStep()}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-2 rounded"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            {step === 4 ? 'Register' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
