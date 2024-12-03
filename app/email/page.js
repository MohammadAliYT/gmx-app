"use client";
import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";

const EmailForm = () => {
  const { formData, handleInputChange, nextStep } = useContext(FormContext);
  const [email, setEmail] = useState(formData.email || "");
  const [domain, setDomain] = useState(formData.domain || "gmx.de");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setEmail(formData.email || "");
    setDomain(formData.domain || "gmx.de");
  }, [formData]);

  const handleEmail = (e) => {
    const value = e.target.value.trim();
    setEmail(value);

    // Regular expression to detect invalid characters (non-alphanumeric, non-dot, non-hyphen)
    const invalidCharsRegex = /[^a-zA-Z0-9.-]/;

    // Regular expression to check if the string contains at least one letter
    const letterRegex = /[a-zA-Z]/;
    // Check if email is empty
    if (!value) {
      setEmailError("Wunsch-E-Mail-Namen eingeben");
    }
    // Check if email is less than 3 characters long
    else if (value.length < 3) {
      setEmailError("Mindestens 3 Zeichen verwenden");
    }
    // Check if email is more than 4 characters long
    else if (value.length > 40) {
      setEmailError("Maximal 40 Zeichen verwenden");
    }
    // Check for spaces in the email
    else if (/\s/.test(value)) {
      setEmailError("Leerzeichen nicht erlaubt: Bitte Eingabe korrigieren");
    }
    // Check for invalid characters
    else if (invalidCharsRegex.test(value)) {
      setEmailError("Ungültige Zeichen verwendet: Bitte Eingabe korrigieren");
    }
    // Check if the email contains at least one letter
    else if (!letterRegex.test(value)) {
      setEmailError("Mindestens einen Buchstaben verwenden");
    }
    // Check for spaces in the email
    else if (/\s/.test(value)) {
      setEmailError("Leerzeichen nicht erlaubt: Bitte Eingabe korrigieren");
    } else {
      setEmailError("");
    }

    // Update formData
    handleInputChange(e);
  };

  // Function to check if form is valid
  const checkFormValidity = () => {
    if (email) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleDomain = (e) => {
    setDomain(e.target.value);
    handleInputChange({ name: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    // handleDomain();
    checkFormValidity();
  }, [email, domain]);

  useEffect(() => {
    if (!formData.domain) {
      handleInputChange({ name: "domain", value: domain });
    }
  }, [domain, formData, handleInputChange]);

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
          <section class="form__panel--email-alias">
            <div>
              <fieldset
                data-test="form-email-alias-group"
                class="somes ng-untouched ng-pristine ng-invalid"
              >
                <div class="onereg-progress-meter">
                  <div>
                    <div class="pos-form-wrapper">
                      <div class="email-alias-input l-horizontal l-between-justified">
                        <div class="pos-input email-alias-input__alias-input-wrapper l-flex-1">
                          <input
                            type="text"
                            autoComplete="off"
                            autoCapitalize="none"
                            data-test="check-email-availability-email-input"
                            formcontrolname="alias"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            class="pos-form-element pos-text-input email-alias-input__alias-input ng-untouched ng-pristine ng-invalid"
                          />
                        </div>
                        <div class="pos-input email-alias-check-select">
                          <select
                            data-test="check-email-availability-email-domain-input"
                            formcontrolname="emailDomain"
                            name="domain"
                            class="pos-form-element pos-text-input email-alias-input__domain-input ng-untouched ng-pristine ng-valid"
                            value={domain}
                            onChange={handleDomain}
                          >
                            <optgroup label="FreeMail" _mstlabel="106717">
                              <option value="gmx.de">@gmx.de</option>
                              <option value="gmx.net">@gmx.net</option>
                              <option value="mein.gmx">@mein.gmx</option>
                              <option value="gmx.at">@gmx.at</option>
                              <option value="gmx.ch">@gmx.ch</option>
                            </optgroup>
                            <optgroup label="Premium" _mstlabel="96811">
                              <option value="mail.gmx">@mail.gmx</option>
                              <option value="email.gmx">@email.gmx</option>
                              <option value="gmx.eu">@gmx.eu</option>
                              <option value="gmx.org">@gmx.org</option>
                              <option value="gmx.info">@gmx.info</option>
                              <option value="gmx.biz">@gmx.biz</option>
                              <option value="gmx.com">@gmx.com</option>
                            </optgroup>
                          </select>
                        </div>
                        <button
                          pos-button="primary"
                          type="button"
                          data-test="check-email-availability-check-button"
                          className="pos-button email-alias-input__check pos-button--primary"
                          disabled={!email}
                        >
                          <span
                            pos-i18n="EMAIL_ALIAS_CHECK"
                            className="email-alias-check__text"
                          >
                            Prüfen
                          </span>
                        </button>
                      </div>
                    </div>
                    {emailError && (
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="pos-svg"
                              >
                                <use href="#core_error"></use>
                              </svg>
                            </div>
                            <span class="pos-form-message-text">
                              <span>{emailError}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      // onClick={nextStep}
                      onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                      }}
                      class={`bg-blue-500 text-white py-2 px-4 ${
                        !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isFormValid}
                      cursor={isFormValid ? "not-allowed" : "pointer"}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
          </section>
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

export default EmailForm;
