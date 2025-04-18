import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddAthleteForm = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  
  const sports = ["Swimming", "Running", "Shooting", "Fencing", "Obstacle Course", "Triathlon"];
  const ageGroups = ["Under 12", "Under 15", "Under 18", "Adult"];

  const formik = useFormik({
    initialValues: {
      avatar: null,
      fullName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      sports: [],
      ageGroups: [],
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Phone number is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.date().required('Date of birth is required'),
      address: Yup.string().required('Address is required'),
      sports: Yup.array().min(1, 'Select at least one sport'),
      ageGroups: Yup.array().min(1, 'Select at least one age group'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          formik.setFieldValue('avatar', file);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          formik.setFieldValue('avatar', file);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  const isStepValid = (stepIndex) => {
    const currentStepFields = steps[stepIndex - 1].fields;
    return currentStepFields.every(field => {
      if (field === 'avatar') return true; // Avatar is optional
      const error = formik.errors[field];
      const touched = formik.touched[field];
      const value = formik.values[field];
      return (!error && touched) || (Array.isArray(value) && value.length > 0) || Boolean(value);
    });
  };

  const steps = [
    {
      title: 'Personal Information',
      fields: ['avatar', 'fullName', 'gender', 'dateOfBirth'],
    },
    {
      title: 'Contact Information',
      fields: ['email', 'phone', 'address'],
    },
    {
      title: 'Sports & Categories',
      fields: ['sports', 'ageGroups'],
    },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div 
                className="relative w-24 h-24 group cursor-pointer rounded-full"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className={`w-full h-full rounded-full overflow-hidden border-2 ${
                  previewImage ? 'border-indigo-500' : 'border-gray-300 border-dashed'
                } flex items-center justify-center bg-gray-50 transition-all duration-300 ease-in-out hover:border-indigo-400`}>
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-xs text-gray-500">
                        Click to upload
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Upload avatar"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <span className="text-white text-xs">
                    {previewImage ? 'Change Photo' : 'Upload Photo'}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500">Upload profile picture (optional)</span>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                {...formik.getFieldProps('fullName')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm ${
                  formik.touched.fullName && formik.errors.fullName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <div className="flex gap-6">
                {['Male', 'Female'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formik.values.gender === option}
                      onChange={formik.handleChange}
                      className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...formik.getFieldProps('dateOfBirth')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.dateOfBirth}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                {...formik.getFieldProps('phone')}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm ${
                  formik.touched.phone && formik.errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <textarea
                id="address"
                {...formik.getFieldProps('address')}
                rows={3}
                className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm ${
                  formik.touched.address && formik.errors.address
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Sports */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sports *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {sports.map((sport) => (
                  <label key={sport} className="relative flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sports"
                      value={sport}
                      checked={formik.values.sports.includes(sport)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue('sports', [...formik.values.sports, sport]);
                        } else {
                          formik.setFieldValue(
                            'sports',
                            formik.values.sports.filter((s) => s !== sport)
                          );
                        }
                      }}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{sport}</span>
                  </label>
                ))}
              </div>
              {formik.touched.sports && formik.errors.sports && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.sports}</p>
              )}
            </div>

            {/* Age Groups */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Groups *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ageGroups.map((age) => (
                  <label key={age} className="relative flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="ageGroups"
                      value={age}
                      checked={formik.values.ageGroups.includes(age)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue('ageGroups', [...formik.values.ageGroups, age]);
                        } else {
                          formik.setFieldValue(
                            'ageGroups',
                            formik.values.ageGroups.filter((a) => a !== age)
                          );
                        }
                      }}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{age}</span>
                  </label>
                ))}
              </div>
              {formik.touched.ageGroups && formik.errors.ageGroups && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.ageGroups}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="relative bg-white/95 rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white/95">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Athlete</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="sticky top-[73px] z-10 p-4 border-b bg-white/95">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
              <div className="h-1 w-full bg-gray-200">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="relative flex justify-between w-full">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 
                    transition-all duration-300 relative bg-white
                    ${step > i + 1 
                      ? 'border-indigo-600 bg-indigo-600 text-white' 
                      : step === i + 1 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-gray-300 text-gray-300'
                    }
                  `}>
                    {step > i + 1 ? (
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm">{i + 1}</span>
                    )}
                  </div>
                  <span className={`
                    mt-2 text-xs whitespace-nowrap
                    ${step === i + 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}
                  `}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={formik.handleSubmit}>
          <div className="p-4 space-y-4">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-between p-4 border-t bg-gray-50">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium rounded-md ${
                step === 1
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                if (step < steps.length) {
                  setStep(step + 1);
                } else {
                  formik.handleSubmit();
                }
              }}
              disabled={!isStepValid(step)}
              className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium rounded-md ${
                !isStepValid(step)
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              } text-white`}
            >
              {step < steps.length ? 'Next' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAthleteForm;

