import React, { useState } from 'react';

interface Step3Props {
  formData: any;
  categories: Record<string, string[]>; // Category headers with their keywords
  customKeyword: string;
  setCustomKeyword: (keyword: string) => void;
  handleToggleSelect: (key: 'keywords', value: string) => void;
  handleAddKeyword: () => void;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  categories = {}, // Default value to ensure it's never undefined
  customKeyword,
  setCustomKeyword,
  handleToggleSelect,
  handleAddKeyword,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700">Select your interests and hobbies</label>
        <div className="mt-4">
          {Object.keys(categories).length > 0 ? ( // Ensure categories are loaded
            Object.entries(categories).map(([category, keywords]) => (
              <div key={category} className="mb-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full text-left"
                  onClick={() => toggleCategory(category)}
                >
                  {category} {expandedCategory === category ? '▲' : '▼'}
                </button>
                {expandedCategory === category && (
                  <div className="mt-2 ml-4 flex flex-wrap gap-2">
                    {Array.isArray(keywords) && keywords.length > 0 ? (
                      keywords.map((keyword) => (
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
                      ))
                    ) : (
                      <p className="text-red-500">Invalid or empty data for keywords</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="Add your own keyword"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddKeyword}
          >
            Add Keyword
          </button>
        </div>
      </div>
    </>
  );
};

export default Step3;
