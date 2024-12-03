// "use client";
// import { useState, useEffect } from "react";
// import EmailForm from "../email/page";
// import NameForm from "../name/NameForm";
// import AddressForm from "../address/AddressForm";
// import MobileForm from "../mobile/MobileForm";
// import Breadcrumbs from "./Breadcrumbs";

// const Demo = () => {
//   const [formData, setFormData] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleInputChange = (e) => {
//     let name, value;
//     if (e.target) {
//       // If it's an event object
//       ({ name, value } = e.target);
//     } else {
//       // If it's a direct update
//       ({ name, value } = e);
//     }
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const nextStep = () => setCurrentStep(currentStep + 1);
//   const prevStep = () => setCurrentStep(currentStep - 1);

//   return (
//     <div className="container mx-auto p-6">
//       <Breadcrumbs currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       {currentStep === 1 && (
//         <EmailForm
//           nextStep={nextStep}
//           formData={formData}
//           handleInputChange={handleInputChange}
//         />
//       )}
//       {currentStep === 2 && (
//         <NameForm
//           nextStep={nextStep}
//           prevStep={prevStep}
//           formData={formData}
//           handleInputChange={handleInputChange}
//         />
//       )}
//       {currentStep === 3 && (
//         <AddressForm
//           nextStep={nextStep}
//           prevStep={prevStep}
//           formData={formData}
//           handleInputChange={handleInputChange}
//         />
//       )}
//       {currentStep === 4 && (
//         <MobileForm
//           prevStep={prevStep}
//           formData={formData}
//           handleInputChange={handleInputChange}
//         />
//       )}
//     </div>
//   );
// };

// export default Demo;
