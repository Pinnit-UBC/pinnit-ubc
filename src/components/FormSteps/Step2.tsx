import React from 'react';

interface Step2Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
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
};

export default Step2;
