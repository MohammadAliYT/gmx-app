"use client";

import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { FormContext } from "./context/FormContext";

const ModalNavigator = () => {
  const { currentStep, setCurrentStep } = useContext(FormContext);
  const router = useRouter();

  const steps = ["Email", "Name", "Address", "Mobile"];
  const stepPaths = ["/email", "/name", "/address", "/mobile"]; // URLs for each step

  const handleStepChange = (currentStep) => {
    setCurrentStep(currentStep + 1);
    router.push(stepPaths[currentStep]);
  };

  useEffect(() => {
    if (currentStep <= stepPaths.length) {
      router.push(stepPaths[currentStep - 1]);
    }
  }, [currentStep, router, stepPaths]);

  return (
    <div className="mb-6">
      <ul className="flex flex-row">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`mr-4 ${
              currentStep === index + 1 ? "font-bold" : "text-gray-500"
            }`}
          >
            <button onClick={() => handleStepChange(index)}>{step}</button>
            {index < steps.length - 1 && <span className="mx-5">{">"}</span>}
          </span>
        ))}
      </ul>
    </div>
  );
};

export default ModalNavigator;
// "use client";
// import Link from "next/link";
// import { useContext } from "react";
// import { FormContext } from "./context/FormContext";

// const ModalNavigator = () => {
//   const { currentStep, setCurrentStep } = useContext(FormContext);

//   const steps = ["Email", "Name", "Address", "Mobile"];
//   const stepPaths = ["/email", "/name", "/address", "/mobile"]; // URLs for each step

//   const handleStepChange = (currentStep) => {
//     setCurrentStep(currentStep + 1);
//   };

//   return (
//     <div className="mb-6">
//       <ul className="flex flex-row">
//         {steps.map((step, index) => (
//           <span
//             key={index}
//             className={`mr-4 ${
//               currentStep === index + 1 ? "font-bold" : "text-gray-500"
//             }`}
//           >
//             <Link
//               href={stepPaths[index]}
//               onClick={() => handleStepChange(index)}
//             >
//               {step}
//             </Link>
//             {index < steps.length - 1 && <span className="mx-5">{">"}</span>}
//           </span>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default ModalNavigator;
