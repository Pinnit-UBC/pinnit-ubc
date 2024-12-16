import React, { useState, useEffect } from 'react';
import Step1 from '@/components/FormSteps/Step1';
import Step2 from '@/components/FormSteps/Step2';
import Step3 from '@/components/FormSteps/Step3';
import Step4 from '@/components/FormSteps/Step4';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
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
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [recommendedClubs, setRecommendedClubs] = useState<[string, number, number, string][]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Fetch categories for Step 3
  useEffect(() => {
    fetch('/api/getCategories')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched categories:', data);
        setCategories(data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setCategories({});
      });
  }, []);

  // Fetch clubs for Step 4 and calculate recommendations
  useEffect(() => {
    fetch('/api/getAllClubs')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched clubs:', data);

        if (!Array.isArray(data)) {
          console.error('API did not return an array:', data);
          setRecommendedClubs([]);
          return;
        }

        const clubs = data.map((club: any) => {
          const matchCount = formData.keywords
            .map((k) => k.toLowerCase())
            .filter((keyword) =>
              [club.keywords, club.keywords_1, club.keywords_2]
                .flat()
                .filter((k: string | null | undefined) => typeof k === 'string') // Ensure valid strings
                .map((k: string) => k.toLowerCase())
                .includes(keyword)
            ).length;

          const followers = parseInt(club.followers.replace(/,/g, ''), 10) || 0;
          return [club.full_name, matchCount, followers, club.profile_pic];
        });

        const sortedClubs = clubs
          .filter(([_, matchCount]) => matchCount > 0) // Only include clubs with matches
          .sort((a, b) => {
            if (b[1] === a[1]) {
              return b[2] - a[2]; // Sort by followers if match count is equal
            }
            return b[1] - a[1]; // Sort by match count
          });

        console.log('Sorted recommended clubs:', sortedClubs);
        setRecommendedClubs(sortedClubs);
      })
      .catch((err) => {
        console.error('Error fetching clubs:', err);
        setRecommendedClubs([]);
      });
  }, [formData.keywords]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFollowing = (club: string) => {
    setFormData((prev) => ({
      ...prev,
      following: prev.following.includes(club)
        ? prev.following.filter((item) => item !== club)
        : [...prev.following, club],
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('/api/userRegistration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from backend:', errorData);
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const successMessage = await response.json();
      console.log('Success response from backend:', successMessage);
      setSuccess('Signup successful! Please check your email to verify your account.');
    } catch (err) {
      console.error('Error submitting the form:', err);
      setError('Error submitting the form');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} />;
      case 3:
        return (
          <Step3
            formData={formData}
            categories={categories}
            customKeyword={customKeyword}
            setCustomKeyword={setCustomKeyword}
            handleToggleSelect={(key, value) => {
              setFormData((prev) => ({
                ...prev,
                [key]: prev[key].includes(value)
                  ? prev[key].filter((item) => item !== value)
                  : [...prev[key], value],
              }));
            }}
            handleAddKeyword={() => {
              const trimmedKeyword = customKeyword.trim();
              if (trimmedKeyword && !formData.keywords.includes(trimmedKeyword)) {
                setFormData((prev) => ({
                  ...prev,
                  keywords: [...prev.keywords, trimmedKeyword],
                }));
                setCustomKeyword('');
              }
            }}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            recommendedClubs={recommendedClubs}
            toggleFollowing={toggleFollowing}
          />
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
          if (step < 4) {
            setStep((prev) => prev + 1);
          } else {
            handleSubmit();
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
