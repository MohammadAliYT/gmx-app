"use client";
import { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";

const NameForm = () => {
  const { formData, handleInputChange, nextStep, prevStep } =
    useContext(FormContext);

  const [firstName, setFirstName] = useState(formData.firstName || "");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState(formData.lastName || "");
  const [lastNameError, setLastNameError] = useState("");
  const [salutation, setSalutation] = useState(formData.salutation || "");
  const [dob, setDob] = useState({
    day: formData?.dob?.day || "",
    month: formData?.dob?.month || "",
    year: formData?.dob?.year || "",
  });
  const [dobError, setDobError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  // Toggle function
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDOB = (event) => {
    const { name, value } = event.target;

    // Update the respective field in the dob state
    setDob((prevDob) => ({
      ...prevDob,
      [name]: value,
    }));

    // Use the current value directly for validation instead of relying on the dob state
    const updatedDob = {
      ...dob,
      [name]: value,
    };

    const dayValue = parseInt(updatedDob.day, 10);
    const monthValue = parseInt(updatedDob.month, 10);
    const yearValue = parseInt(updatedDob.year, 10);

    // Basic range validation
    if (
      isNaN(dayValue) ||
      isNaN(monthValue) ||
      isNaN(yearValue) ||
      dayValue < 1 ||
      dayValue > 31 ||
      monthValue < 1 ||
      monthValue > 12 ||
      yearValue < 1920 ||
      yearValue > 2008
    ) {
      setDobError("Gültiges Geburtsdatum eingeben (Mindestalter: 16 Jahre)");
      return false;
    }

    setDobError("");
    setDob(updatedDob);

    handleInputChange({ name: "dob", value: updatedDob });
    return true;
  };

  useEffect(() => {
    setFirstName(formData.firstName || "");
    setLastName(formData.lastName || "");
    setSalutation(formData.salutation || "");
    setDob({
      day: formData?.dob?.day || "",
      month: formData?.dob?.month || "",
      year: formData?.dob?.year || "",
    });
  }, [formData]);

  // Handle input change and validation for Vorname
  const handleFirstNameChange = (e) => {
    const invalidCharsRegex = /[^a-zA-ZäöüÄÖÜß\s]/;
    const value = e.target.value; // Trim spaces from the input
    setFirstName(value);

    // Check if firstName is empty
    if (!value) {
      setFirstNameError("Vornamen eingeben");
    }
    // Check if firstName is less than 2 characters long
    // else if (value.length < 2) {
    //   setFirstNameError("Mindestens 2 Zeichen verwenden");
    // }
    // Check if firstName is more than 40 characters long
    else if (value.length > 40) {
      setFirstNameError("Maximal 40 Zeichen verwenden");
    }
    // Check for invalid characters
    else if (invalidCharsRegex.test(value)) {
      setFirstNameError(
        "Ungültige Zeichen verwendet: Bitte Eingabe korrigieren"
      );
    } else {
      setFirstNameError(""); // Clear the error if the input is valid
    }

    // Update formData
    handleInputChange(e);
  };

  // Handle input change and validation for Vorname
  const handleLastNameChange = (e) => {
    const invalidCharsRegex = /[^a-zA-ZäöüÄÖÜß\s]/;
    const value = e.target.value.trim(); // Trim spaces from the input
    setLastName(value);

    // Check if firstName is empty
    if (!value) {
      setLastNameError("Vornamen eingeben");
    }
    // Check if firstName is less than 2 characters long
    else if (value.length < 2) {
      setLastNameError("Mindestens 2 Zeichen verwenden");
    }
    // Check if firstName is more than 40 characters long
    else if (value.length > 40) {
      setLastNameError("Maximal 40 Zeichen verwenden");
    }
    // Check for invalid characters
    else if (invalidCharsRegex.test(value)) {
      setLastNameError(
        "Ungültige Zeichen verwendet: Bitte Eingabe korrigieren"
      );
    } else {
      setLastNameError(""); // Clear the error if the input is valid
    }

    // Update formData
    handleInputChange(e);
  };

  const handleSalutationChange = (event) => {
    setSalutation(event.target.value);
    handleInputChange(event);
  };

  // Function to check if form is valid
  const checkFormValidity = () => {
    if (
      firstName &&
      !firstNameError &&
      lastName &&
      !lastNameError &&
      salutation &&
      dob.day &&
      dob.month &&
      dob.year &&
      !dobError
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    salutation,
    dob,
    dobError,
  ]);

  // // Render null on the server side to avoid browser-specific code execution
  // if (!isMounted) return null;

  return (
    <div>
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
          <onereg-personal-info class="onereg-personal-info">
            <h2 pos-i18n="PERSONAL_INFO_TITLE" class="a-mb-space-2">
              Persönliche Angaben
            </h2>
            <label pos-i18n="SALUTATION_LABEL" class="pos-label">
              Ansprache
            </label>
            <div class="l-flex l-horizontal l-wrap a-mb-space-1">
              <div class="l-flex l-horizontal">
                <onereg-radio-wrapper class="ng-touched ng-dirty ng-valid">
                  <pos-input-radio
                    data-test="gender-radio-group"
                    name="salutation"
                    class="pos-input-radio"
                  >
                    <label class="pos-input-radio__label">
                      <input
                        type="radio"
                        class="pos-input-radio__input"
                        name="salutation"
                        value="FEMALE"
                        onChange={handleSalutationChange}
                        checked={salutation === "FEMALE" || false}
                      />
                      <i class="pos-input-radio__border">
                        <span class="pos-input-radio__checker"></span>
                      </i>
                      <span class="pos-input-radio__labeltext">weiblich</span>
                    </label>
                  </pos-input-radio>
                </onereg-radio-wrapper>

                <onereg-radio-wrapper class="ng-touched ng-dirty ng-valid">
                  <pos-input-radio
                    data-test="gender-radio-group"
                    name="salutation"
                    class="pos-input-radio"
                  >
                    <label class="pos-input-radio__label">
                      <input
                        type="radio"
                        class="pos-input-radio__input"
                        name="salutation"
                        value="MALE"
                        onChange={handleSalutationChange}
                        checked={salutation === "MALE" || false}
                      />
                      <i class="pos-input-radio__border">
                        <span class="pos-input-radio__checker"></span>
                      </i>
                      <span class="pos-input-radio__labeltext">männlich</span>
                    </label>
                  </pos-input-radio>
                </onereg-radio-wrapper>
                <onereg-radio-wrapper class="ng-touched ng-dirty ng-valid">
                  <pos-input-radio
                    data-test="gender-radio-group"
                    name="salutation"
                    class="pos-input-radio"
                  >
                    <label class="pos-input-radio__label">
                      <input
                        type="radio"
                        class="pos-input-radio__input"
                        name="salutation"
                        value="UNKNOWN"
                        checked={salutation === "UNKNOWN" || false}
                        onChange={handleSalutationChange}
                      />
                      <i class="pos-input-radio__border">
                        <span class="pos-input-radio__checker"></span>
                      </i>
                      <span class="pos-input-radio__labeltext">neutral</span>
                    </label>
                  </pos-input-radio>
                </onereg-radio-wrapper>
              </div>
              <div>
                <span
                  role="button"
                  data-test="company-toggle"
                  class="l-horizontal l-nowrap toggle-wrapper"
                  onClick={handleToggle} // Toggle on click
                  style={{ cursor: "pointer" }} // Ensure it looks clickable
                >
                  <pos-svg-icon class="pos-svg-icon pos-svg-icon--16 pos-caret l-self-center-aligned">
                    <svg xmlns="http://www.w3.org/2000/svg" class="pos-svg">
                      <use
                        href={isOpen ? "#core_arrow-down" : "#core_arrow-up"}
                      ></use>
                    </svg>
                  </pos-svg-icon>
                  <span pos-i18n="COMPANY">Firma / Verein</span>
                </span>
              </div>
            </div>
            {isOpen ? (
              <pos-content-box
                boxid="onereg-company"
                class="pos-content-box pos-content-box--visible"
              >
                <div class="pos-info-box__outer-wrapper">
                  <div
                    class="pos-info-box__inner-wrapper w-full -translate-x-2"
                    style={{ paddingLeft: "9px" }}
                  >
                    <onereg-form-row>
                      <div class="pos-form-wrapper">
                        <label
                          class="pos-label pos-label--block"
                          htmlFor="250829f8-1898-4ca7-9ef4-8584da2f0ab6"
                        >
                          Firma / Verein
                        </label>
                        <div></div>
                        <div>
                          <pos-input class="pos-input">
                            <input
                              id="250829f8-1898-4ca7-9ef4-8584da2f0ab6"
                              type="text"
                              placeholder=""
                              data-test="company-input"
                              class="ng-touched ng-dirty ng-valid"
                            />
                          </pos-input>
                        </div>
                      </div>
                    </onereg-form-row>
                  </div>
                </div>
              </pos-content-box>
            ) : null}

            <onereg-form-row>
              <div class="pos-form-wrapper">
                <label
                  class="pos-label pos-label--block"
                  htmlFor="a7d0a59f-2427-40ad-821c-4c75bf7138b7"
                >
                  Vorname
                </label>
                <div>
                  <pos-input class="pos-input">
                    <input
                      id="a7d0a59f-2427-40ad-821c-4c75bf7138b7"
                      type="text"
                      placeholder="Vorname"
                      name="firstName"
                      value={firstName}
                      data-test="first-name-input"
                      class="ng-untouched ng-pristine ng-invalid"
                      onChange={handleFirstNameChange}
                    />
                  </pos-input>
                </div>
              </div>
              {firstNameError && (
                <div
                  data-test="check-email-availability-failure-message"
                  className="onereg-hint-block"
                >
                  <div
                    type="error"
                    className="pos-form-message pos-form-message--negative-top-margin"
                  >
                    <div className="pos-form-message__wrapper l-horizontal l-center-aligned pos-form-message--error">
                      <div className="pos-svg-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pos-svg"
                        >
                          <use href="#core_error"></use>
                        </svg>
                      </div>
                      <span className="pos-form-message-text">
                        <span>{firstNameError}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </onereg-form-row>
            <onereg-form-row>
              <div class="pos-form-wrapper">
                <label
                  class="pos-label pos-label--block"
                  htmlFor="f3e3d664-6d2d-4672-9553-4e9780e6c0da"
                >
                  Nachname
                </label>
                <div>
                  <pos-input class="pos-input">
                    <input
                      id="f3e3d664-6d2d-4672-9553-4e9780e6c0da"
                      type="text"
                      placeholder="Nachname"
                      name="lastName"
                      value={lastName}
                      data-test="last-name-input"
                      class="ng-untouched ng-pristine ng-invalid"
                      onChange={handleLastNameChange}
                    />
                  </pos-input>
                </div>
              </div>
              {lastNameError && (
                <div
                  data-test="check-email-availability-failure-message"
                  className="onereg-hint-block"
                >
                  <div
                    type="error"
                    className="pos-form-message pos-form-message--negative-top-margin"
                  >
                    <div className="pos-form-message__wrapper l-horizontal l-center-aligned pos-form-message--error">
                      <div className="pos-svg-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pos-svg"
                        >
                          <use href="#core_error"></use>
                        </svg>
                      </div>
                      <span className="pos-form-message-text">
                        <span>{lastNameError}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </onereg-form-row>
          </onereg-personal-info>
          <onereg-form-row>
            <div class="pos-form-wrapper">
              <label
                class="pos-label pos-label--block"
                htmlFor="33660ff8-fabf-42dd-b88c-df52b25b9b0f"
              >
                Geburtsdatum
              </label>
              <div>
                <div class="l-horizontal l-baseline-aligned">
                  <onereg-dob-wrapper class="ng-untouched ng-pristine ng-invalid">
                    <pos-input-dob
                      name="dob"
                      class={
                        dobError
                          ? "pos-input-dob pos-input--error"
                          : "pos-input-dob"
                      }
                    >
                      <pos-input class="pos-input">
                        <input
                          name="day"
                          value={dob.day}
                          type="number"
                          data-test="day"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength="2"
                          class="pos-dob pos-dob--dd"
                          placeholder="TT"
                          min="1"
                          max="31"
                          onChange={handleDOB}
                          onInput={(event) =>
                            event.target.value.length > 2
                              ? (event.target.value = event.target.value.slice(
                                  0,
                                  2
                                ))
                              : event.target.value
                          }
                        />
                      </pos-input>
                      <pos-input class="pos-input">
                        <input
                          value={dob.month}
                          name="month"
                          type="number"
                          data-test="month"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength="2"
                          class="pos-dob pos-dob--mm"
                          placeholder="MM"
                          min="1"
                          max="12"
                          onInput={(event) =>
                            event.target.value.length > 2
                              ? (event.target.value = event.target.value.slice(
                                  0,
                                  2
                                ))
                              : event.target.value
                          }
                          onChange={handleDOB}
                        />
                      </pos-input>
                      <pos-input class="pos-input">
                        <input
                          value={dob.year}
                          name="year"
                          type="number"
                          data-test="year"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength="4"
                          class="pos-dob pos-dob--yyyy"
                          placeholder="JJJJ"
                          min="1920"
                          max="2008"
                          onInput={(event) =>
                            event.target.value.length > 4
                              ? (event.target.value = event.target.value.slice(
                                  0,
                                  4
                                ))
                              : event.target.value
                          }
                          onChange={handleDOB}
                        />
                      </pos-input>
                      <span
                        data-test="dob-format-example"
                        class="pos-input-smalltext"
                      >
                        z. B. 16.03.1997
                      </span>
                    </pos-input-dob>
                  </onereg-dob-wrapper>
                </div>
              </div>
            </div>
            {dobError && (
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
                      <span>{dobError}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </onereg-form-row>
          <div className="mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 mr-2"
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className={`bg-blue-500 text-white py-2 px-4 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
            >
              Next
            </button>
          </div>
        </section>
      </form>

      {/* svg icons */}
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="core_arrow-up" viewBox="0 0 20 20">
            <path d="M10 5.5c.3 0 .5.1.7.3l7 7c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L10 7.9l-6.3 6.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l7-7c.2-.2.5-.3.7-.3z"></path>
          </symbol>
        </svg>
      </div>
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="core_arrow-down" viewBox="0 0 20 20">
            <path d="M10 14.5c-.3 0-.5-.1-.7-.3l-7-7c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l6.3 6.3 6.3-6.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.2.2-.5.3-.7.3z"></path>
          </symbol>
        </svg>
      </div>
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
export default NameForm;
