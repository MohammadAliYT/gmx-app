// app/context/FormContext.js
"use client";

import { createContext, useState } from "react";

// Create the context
export const FormContext = createContext();

// Context provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (e) => {
    let name, value;
    if (e.target) {
      ({ name, value } = e.target); // If event object
    } else {
      ({ name, value } = e); // If direct object
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        handleInputChange,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
