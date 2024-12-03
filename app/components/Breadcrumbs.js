const Breadcrumbs = ({ currentStep, setCurrentStep }) => {
  const steps = ["Email", "Name", "Address", "Mobile"];

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
            <button onClick={() => setCurrentStep(index + 1)} className="">
              {step}
            </button>
            {index < steps.length - 1 && <span className="mx-5">{">"}</span>}
          </span>
        ))}
      </ul>
    </div>
  );
};
export default Breadcrumbs;
