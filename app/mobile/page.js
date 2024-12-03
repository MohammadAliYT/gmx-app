"use client";
import { useState, useEffect, useContext } from "react";
// import "./body.css";
// import { create } from "@/app/components/actions";
import { FormContext } from "../context/FormContext";

const MobileForm = () => {
  const { formData, handleInputChange, prevStep } = useContext(FormContext);
  const [mobileCode, setMobileCode] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [mobileNumberError, setMobileNumberError] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMobileNumber(formData.mobileNumber || "");
    setMobileCode(formData.mobileCode || "0");
  }, [formData]);

  const handleMobileNumber = (e) => {
    const value = e.target.value;
    setMobileNumber(value);

    const numberRegex = /^\d+$/;

    if (!value) {
      setMobileNumberError("Mobilfunknummer eingeben");
    } else if (value.length < 3 || !numberRegex.test(value)) {
      setMobileNumberError("Gültige Mobilfunknummer eingeben");
    } else if (value.length > 30) {
      setMobileNumberError("Maximal 30 Zeichen verwenden");
    } else {
      setMobileNumberError("");
    }
    handleInputChange(e);
  };

  // Function to check if form is valid
  const checkFormValidity = () => {
    if (mobileNumber && !mobileNumberError) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleMobileCode = (e) => {
    setMobileCode(e.target.value);
    handleInputChange({ name: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    if (!formData.mobileCode) {
      handleInputChange({ name: "mobileCode", value: mobileCode });
    }
  }, [mobileCode, formData, handleInputChange]);

  useEffect(() => {
    checkFormValidity();
  }, [mobileNumber]);

  async function onSubmit(event) {
    event.preventDefault();

    // try {
    //   const response = await create(formData);

    //   if (response.success) {
    //     // Clear errors and show success message
    //     setResponse("Form submitted successfully!");
    //   } else {
    //     // Set errors to be displayed
    //     console.log("errors states", errors);
    //     setErrors(response.errors);
    //   }
    // } catch (error) {
    //   // Handle any unexpected errors (e.g., network issues)
    //   setResponse("An unexpected error occurred");
    // }
  }

  return (
    <div class="form__loading-container">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://s.uicdn.com/umapps/registration-app/live/7.5.0/assets/css/bt_gmx-ea8e24a017.css"
      ></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://s.uicdn.com/umapps/registration-app/live/7.5.0/assets/css/onereg_intenseblue-5e3f98a70a.css"
        data-theme="registration"
        data-appname="core"
        role="theme"
      ></link>
      <form noValidate data-test="form-body" class="form-body">
        <section class="form__panels hastransision multistep-transform0">
          <onereg-form-row controlname="mobilePhone" idfor="mobilePhone">
            <div class="pos-form-wrapper">
              <label class="pos-label pos-label--block" htmlFor="mobilePhone">
                Mobilfunknummer
              </label>
              <div>
                <div class="l-horizontal phone-input">
                  <pos-input class="pos-input">
                    <select
                      data-test="mobile-phone-prefix-input"
                      name="mobileCode"
                      inputMode="numeric"
                      class="pos-form-element pos-text-input ng-untouched ng-pristine ng-valid"
                      onChange={handleMobileCode}
                      value={mobileCode || "0"}
                    >
                      <option value="0"> AT +43 </option>
                      <option value="1"> CH +41 </option>
                      <option value="2"> DE +49 </option>
                    </select>
                  </pos-input>
                  <pos-input class="pos-input l-flex-1">
                    <input
                      data-test="mobile-phone-input"
                      class="pos-form-element pos-text-input ng-untouched ng-pristine ng-invalid"
                      id="mobilePhone"
                      name="mobileNumber"
                      value={mobileNumber || ""}
                      onChange={handleMobileNumber}
                      type="number"
                      onInput={(event) =>
                        event.target.value.length > 30
                          ? (event.target.value = event.target.value.slice(
                              0,
                              30
                            ))
                          : event.target.value
                      }
                    />
                  </pos-input>
                </div>
              </div>
            </div>
          </onereg-form-row>
          {mobileNumberError && (
            <div
              data-test="check-email-availability-failure-message"
              class="onereg-hint-block"
            >
              <div
                type="error"
                class="pos-form-message pos-form-message--negative-top-margin"
              >
                <div class="pos-form-message__wrapper l-horizontal l-center-aligned pos-form-message--error">
                  <div class="pos-svg-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="pos-svg">
                      <use href="#core_error"></use>
                    </svg>
                  </div>
                  <span class="pos-form-message-text">
                    <span>{mobileNumberError}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div class="mt-4">
            <button
              onClick={prevStep}
              class="bg-gray-500 text-white py-2 px-4 mr-2"
            >
              Back
            </button>
            <button
              className={`bg-green-500 text-white py-2 px-4 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div className="">
            {Object.entries(errors).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
        </section>
      </form>
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="core_error" viewBox="0 0 20 20">
            <path d="M19.82 17L11.18 2a1.36 1.36 0 00-2.36 0L.18 17a1.36 1.36 0 001.18 2h17.28a1.36 1.36 0 001.18-2zM8.81 6h2.41L11 13H9zM11 17H9v-2h2z"></path>
          </symbol>
        </svg>
      </div>
    </div>
  );
};
export default MobileForm;
