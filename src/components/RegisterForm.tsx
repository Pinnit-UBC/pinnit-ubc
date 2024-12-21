import React from 'react';
import Step1 from '@/components/FormSteps/Step1';
import Step2 from '@/components/FormSteps/Step2';
import Step3 from '@/components/FormSteps/Step3';
import Step4 from '@/components/FormSteps/Step4';
import useRegisterForm from '@/hooks/useRegisterForm';
import useCategories from '@/hooks/useCategories';
import useClubs from '@/hooks/useClubs';

const Register: React.FC = () => {
  const { step, formData, previewImage, customKeyword, setCustomKeyword, setStep, handleChange, handleFileUpload, handleAddKeyword, toggleFollowing, handleSubmit } = useRegisterForm();
  const { categories } = useCategories();
  const { recommendedClubs } = useClubs(formData.keywords);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} />;
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            handleFileUpload={handleFileUpload}
            previewImage={previewImage}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            categories={categories}
            customKeyword={customKeyword}
            setCustomKeyword={setCustomKeyword}
            handleToggleSelect={(key, value) => {
              handleChange({ target: { name: key, value } } as React.ChangeEvent<HTMLInputElement>);
            }}
            handleAddKeyword={handleAddKeyword}
          />
        );
      case 4:
        return <Step4 formData={formData} recommendedClubs={recommendedClubs} toggleFollowing={toggleFollowing} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 4) {
            setStep(step + 1);
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
              onClick={() => setStep(step - 1)}
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
