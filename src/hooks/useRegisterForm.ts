import { useState } from 'react';

export interface FormData {
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
  profile_picture: string | null;
}

const useRegisterForm = () => {
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
    profile_picture: null,
  });

  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (file: File | null) => {
    if (!file) {
      setPreviewImage(null);
      setFormData((prev) => ({ ...prev, profile_picture: null }));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setFormData((prev) => ({ ...prev, profile_picture: reader.result }));
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const toggleFollowing = (club: string) => {
    setFormData((prev) => ({
      ...prev,
      following: prev.following.includes(club)
        ? prev.following.filter((item) => item !== club)
        : [...prev.following, club],
    }));
  };

  return {
    formData,
    setFormData,
    customKeyword,
    setCustomKeyword,
    previewImage,
    handleFileUpload,
    handleChange,
    handleAddKeyword,
    toggleFollowing,
  };
};

export default useRegisterForm;
