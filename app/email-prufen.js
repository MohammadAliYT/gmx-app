"use client";

import "./body.css";
import React, { useState } from "react";
// import { create } from "@/app/components/actions";

const EmailPrufen = () => {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("gmx.de");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [land, setLand] = useState("DE");
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const [ort, setOrt] = useState("");
  const [ortError, setOrtError] = useState("");
  const [hausnummer, setHausnummer] = useState("");
  const [hausnummerError, setHausnummerError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("0");
  const [mobileNumberError, setMobileNumberError] = useState();
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [dobError, setDobError] = useState("");

  const handleInputChange = (event) => {
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
      setDobError("Please enter a valid date within the range.");
      return false;
    }

    // Check if the date is valid
    const isValidDate = (d, m, y) => {
      const date = new Date(y, m - 1, d); // JS months are 0-based
      return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
      );
    };

    if (!isValidDate(dayValue, monthValue, yearValue)) {
      setDobError("Invalid date. Please check the day, month, and year.");
      return false;
    }

    setDobError("");
    return true;
  };

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
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate password length
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } // If confirm password is already filled, validate it against the new password
    else if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Validate that confirm password matches the password
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (!passwordError && !confirmPasswordError) {
      setConfirmPasswordError("Password is valid. Form can be submitted.");
    } else {
      setConfirmPasswordError("");
    }
  };

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
  };

  // Handle input change and validation for Vorname
  const handleFirstNameChange = (e) => {
    const invalidCharsRegex = /[^a-zA-ZäöüÄÖÜß\s]/;
    const value = e.target.value.trim(); // Trim spaces from the input
    setFirstName(value);

    // Check if firstName is empty
    if (!value) {
      setFirstNameError("Vornamen eingeben");
    }
    // Check if firstName is less than 2 characters long
    else if (value.length < 2) {
      setFirstNameError("Mindestens 2 Zeichen verwenden");
    }
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
  };

  const handlePLZError = (e) => {
    const value = e.target.value;
    setPlz(value);

    if (!value) {
      setPlzError("Postleitzahl eingeben");
    } else if (value.length < 2) {
      setPlzError("Mindestens 2 Zeichen verwenden");
    } else if (/[^0-9]/.test(value)) {
      // Only numbers are allowed
      setPlzError("Ungültige Postleitzahl: Bitte nur Zahlen eingeben");
    } else if (/\s/.test(value)) {
      // No spaces allowed
      setPlzError("Leerzeichen nicht erlaubt: Bitte Eingabe korrigieren");
    } else {
      setPlzError("");
    }
  };

  const handleOrtError = (e) => {
    const value = e.target.value;
    setOrt(value);

    if (!value) {
      setOrtError("Ort eingeben");
    } else if (value.length < 2) {
      setOrtError("Mindestens 2 Zeichen verwenden");
      // } else if (/[^0-9]/.test(value)) {
      //   // Only numbers are allowed
      //   setOrtError("Ungültige Zeichen verwendet: Bitte Eingabe korrigieren");
    } else {
      setOrtError("");
    }
  };

  const handleHausnummerError = (e) => {
    const value = e.target.value;
    setHausnummer(value);

    if (!value) {
      setHausnummerError("Straße & Hausnummer eingeben");
    } else if (value.length < 2) {
      setHausnummerError("Mindestens 2 Zeichen verwenden");
    } else if (value.length > 45) {
      setHausnummerError("Maximal 45 Zeichen verwenden");
    } else {
      setHausnummerError("");
    }
  };

  async function onSubmit(event) {
    event.preventDefault();
    const formData = {
      email: email,
      domain: domain,
      firstName: firstName,
      lastName: lastName,
      land: land,
      plz: plz,
      ort: ort,
      hausnummer: hausnummer,
      password: password,
      confirmPassword: confirmPassword,
      mobileNumber: mobileNumber,
      dob: `${dob.year}-${dob.month}-${dob.day}`,
    };

    // create(formData);
  }

  return (
    <div className="onereg-registration-app">
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
      <onereg-form class="onereg-responsive-block-host">
        <div data-test="form" className="onereg-responsive-block">
          <div className="form__loading-container">
            <div className="l-fit onereg-teaser">
              <iframe
                data-test="form-teaser"
                className="teaser-frame"
                src="https://s.uicdn.com/umapps/registration-app/live/7.5.0/assets/teasers/free-gmxnet-de.html"
              ></iframe>
            </div>
            <form noValidate="" data-test="form-body" className="form-body">
              <section className="form__panels hastransision multistep-transform0">
                <section className="form__panel--email-alias">
                  <div>
                    <fieldset
                      data-test="form-email-alias-group"
                      className="somes ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="onereg-progress-meter">
                        {/* This is for email availablilty checking */}
                        {/* <div className="onereg-progress-meter__container a-mb-space-2">
                          <div
                            data-test="progress-meter-item"
                            className="onereg-progress-meter__item onereg-progress-meter__item--active"
                          >
                            <span className="onereg-progress-meter__text">
                              1 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            className="onereg-progress-meter__item"
                          >
                            <span className="onereg-progress-meter__text">
                              2 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            className="onereg-progress-meter__item"
                          >
                            <span className="onereg-progress-meter__text">
                              3 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            className="onereg-progress-meter__item"
                          >
                            <span className="onereg-progress-meter__text">
                              4 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            className="onereg-progress-meter__item"
                          >
                            <span className="onereg-progress-meter__text">
                              5 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                        </div> */}
                        {/* I dont know what this is doing  */}
                        <div>
                          {/* <h1
                            data-test="form-header-steps"
                            pos-i18n="REGISTRATION_FORM_TITLE"
                            className="form-header-steps"
                          >
                            Erstellen Sie Ihr GMX Postfach
                          </h1> */}

                          <div className="l-horizontal l-start-aligned">
                            <h2
                              pos-i18n="CHOOSE_MAIL_ADDRESS_TITLE"
                              data-test="form-fields-title"
                            >
                              Wunsch-E-Mail-Adresse
                            </h2>
                            <div
                              data-test="content-box-trigger"
                              name="core_info"
                              role="button"
                              className="pos-svg-icon onereg-info-icon"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pos-svg"
                              >
                                <use href="#core_info"></use>
                              </svg>
                            </div>
                          </div>
                          <div
                            data-test="content-box"
                            boxid="onereg-email-panel"
                            className="pos-content-box pos-info-box"
                            style={{ height: "0px" }}
                          >
                            <div className="pos-info-box__outer-wrapper">
                              <div className="pos-info-box__inner-wrapper">
                                {/* use next-il8next and make a locales/file for translation */}
                                <span pos-i18n="INFOBOX_EMAIL_PANEL">
                                  Wählen Sie hier Ihre neue
                                  Wunsch-E-Mail-Adresse. Die Verfügbarkeit der
                                  E-Mail-Adresse wird bei weiterer Eingabe
                                  überprüft. Dabei werden Ihre bisher
                                  eingegebenen Daten zur Generierung von
                                  Vorschlägen an GMX übertragen.
                                </span>
                              </div>
                              <div
                                name="core_close"
                                role="button"
                                data-test="close-button"
                                className="pos-svg-icon pos-svg-icon--24"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="pos-svg"
                                >
                                  <use href="#core_close"></use>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="pos-form-wrapper">
                            <div className="email-alias-input l-horizontal l-between-justified">
                              <div className="pos-input email-alias-input__alias-input-wrapper l-flex-1">
                                <input
                                  type="text"
                                  autoComplete="off"
                                  autoCapitalize="none"
                                  data-test="check-email-availability-email-input"
                                  formcontrolname="alias"
                                  onChange={handleEmail}
                                  className="pos-form-element pos-text-input email-alias-input__alias-input ng-untouched ng-pristine ng-invalid"
                                />
                              </div>
                              <div className="pos-input email-alias-check-select">
                                <select
                                  data-test="check-email-availability-email-domain-input"
                                  formcontrolname="emailDomain"
                                  className="pos-form-element pos-text-input email-alias-input__domain-input ng-untouched ng-pristine ng-valid"
                                  value={domain}
                                  onChange={(e) => setDomain(e.target.value)}
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
                                    <option value="email.gmx">
                                      @email.gmx
                                    </option>
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
                                    <span>{emailError}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Suggestion box which appears when the email is available for the user */}
                          {/* <div>
                            <div
                              titletext="ALIAS_MDH_TIP"
                              showmorebuttontext="ALIAS_SHOW_MORE_DOMAINS"
                              data-test="mdh-suggestions"
                              className="div"
                            >
                              <div className="onereg-suggestions-box__row onereg-suggestions-box__row--highlighted">
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__title-cell">
                                  Unser Tipp: Mit diesen E-Mail-Endungen mailen
                                  Sie noch persönlicher
                                </div>
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__close-cell">
                                  <div
                                    name="core_close"
                                    role="button"
                                    data-test="close-button"
                                    className="pos-svg-icon onereg-suggestions-box__close-button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="pos-svg"
                                    >
                                      <use href="#core_close"></use>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div
                                icon="or_at-icon"
                                className="onereg-suggestions-box__row onereg-suggestions-box__row--separated onereg-suggestions-box__suggestion-row"
                              >
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__suggestion-cell">
                                  <div className="pos-svg-icon onereg-suggestions-box__suggestion-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="pos-svg"
                                    >
                                      <use href="#or_at-icon"></use>
                                    </svg>
                                  </div>
                                  drecords.de
                                </div>
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__cell--link">
                                  <a pos-i18n="ALIAS_USE_SUGGESTION">
                                    Übernehmen
                                  </a>
                                </div>
                              </div>
                              <div
                                icon="or_at-icon"
                                className="onereg-suggestions-box__row onereg-suggestions-box__row--separated onereg-suggestions-box__suggestion-row"
                              >
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__suggestion-cell">
                                  <div className="pos-svg-icon onereg-suggestions-box__suggestion-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="pos-svg"
                                    >
                                      <use href="#or_at-icon"></use>
                                    </svg>
                                  </div>
                                  radiod.de
                                </div>
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__cell--link">
                                  <a pos-i18n="ALIAS_USE_SUGGESTION">
                                    Übernehmen
                                  </a>
                                </div>
                              </div>
                              <div className="onereg-suggestions-box__row onereg-suggestions-box__row--separated">
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__show-more-button-cell">
                                  <a data-test="show-more-suggestions-button">
                                    Weitere Domains anzeigen
                                  </a>
                                </div>
                              </div>
                              <div className="onereg-suggestions-box__row">
                                <div className="onereg-suggestions-box__cell onereg-suggestions-box__footer-cell">
                                  <p>
                                    <strong>
                                      500 zusätzliche E-Mail-Adressen
                                    </strong>
                                    zum Personalisieren sichern: Individuell
                                    mailen auf Basis Ihrer eigenen
                                    <strong>Wunsch-Domain</strong> – für nur
                                    1,99 € / Monat.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div> */}

                          {/* check-email-availability-failure-message */}
                          {/* <div
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
                                  <span>
                                    Diese Wunsch-E-Mail-Adresse ist bereits
                                    vergeben
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div> */}

                          {/* Suggestion box if the user types in an email address that is already taken */}
                          <div>
                            {/* <div
                              titletext="ALIAS_PAY_LEVEL_ONE_SUGGESTIONS_HEADING"
                              showmorebuttontext="ALIAS_SHOW_MORE_SUGGESTIONS"
                              data-test="alias-paylevel-one-suggestions"
                              class="onereg-suggestions-box"
                            >
                              <div class="onereg-suggestions-box__row onereg-suggestions-box__row--highlighted">
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__title-cell">
                                  Premium Vorschläge:
                                </div>
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__close-cell">
                                  <div
                                    name="core_close"
                                    role="button"
                                    data-test="close-button"
                                    class="pos-svg-icon onereg-suggestions-box__close-button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#core_close"></use>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div
                                icon="or_premium_upselling"
                                class="onereg-suggestions-box__row onereg-suggestions-box__row--separated onereg-suggestions-box__suggestion-row"
                              >
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__suggestion-cell">
                                  <div class="pos-svg-icon onereg-suggestions-box__suggestion-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#or_premium_upselling"></use>
                                    </svg>
                                  </div>
                                  ali1@gmx.biz
                                </div>
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__cell--link">
                                  <a pos-i18n="ALIAS_USE_SUGGESTION">
                                    Übernehmen
                                  </a>
                                </div>
                              </div>
                              <div
                                icon="or_premium_upselling"
                                class="onereg-suggestions-box__row onereg-suggestions-box__row--separated onereg-suggestions-box__suggestion-row"
                              >
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__suggestion-cell">
                                  <div class="pos-svg-icon onereg-suggestions-box__suggestion-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#or_premium_upselling"></use>
                                    </svg>
                                  </div>
                                  ali2@gmx.eu
                                </div>
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__cell--link">
                                  <a pos-i18n="ALIAS_USE_SUGGESTION">
                                    Übernehmen
                                  </a>
                                </div>
                              </div>
                              <div
                                icon="or_premium_upselling"
                                class="onereg-suggestions-box__row onereg-suggestions-box__row--separated onereg-suggestions-box__suggestion-row"
                              >
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__suggestion-cell">
                                  <div class="pos-svg-icon onereg-suggestions-box__suggestion-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#or_premium_upselling"></use>
                                    </svg>
                                  </div>
                                  ali2@gmx.info
                                </div>
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__cell--link">
                                  <a pos-i18n="ALIAS_USE_SUGGESTION">
                                    Übernehmen
                                  </a>
                                </div>
                              </div>
                              <div class="onereg-suggestions-box__row onereg-suggestions-box__row--separated">
                                <div class="onereg-suggestions-box__cell onereg-suggestions-box__show-more-button-cell">
                                  <a data-test="show-more-suggestions-button">
                                    Weitere Vorschläge einblenden
                                  </a>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <onereg-pay-info-box></onereg-pay-info-box>
                        <onereg-mdh-info-box></onereg-mdh-info-box>
                        <div className="l-horizontal l-between-justified l-center-aligned onereg-progress-meter__buttons">
                          <span
                            role="button"
                            pos-i18n="BACK"
                            data-test="progress-meter-prev"
                            className="toggle-wrapper onereg-progress-meter__buttons-back onereg-progress-meter__buttons--hidden"
                          >
                            Zurück
                          </span>
                          <button
                            pos-button="primary"
                            type="button"
                            data-test="progress-meter-next"
                            className="pos-button onereg-progress-meter__buttons-next pos-button--primary"
                            disabled=""
                          >
                            <span pos-i18n="NEXT">Weiter</span>
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </section>

                {/* <section className="form__panel--alt-email">
                  <label
                    htmlFor="altEmail"
                    className="pos-label pos-label--block"
                  >
                    Alternate Email
                  </label>
                  <input id="altEmail" name="altEmail" type="hidden" />
                </section> */}

                <section class="form__panel--personal-info">
                  <onereg-progress-meter class="onereg-progress-meter">
                    <div class="onereg-progress-meter__container a-mb-space-2">
                      <div
                        data-test="progress-meter-item"
                        class="onereg-progress-meter__item onereg-progress-meter__item--active"
                      >
                        <span class="onereg-progress-meter__text">
                          1 <span pos-i18n="STEP_SEP">von</span> 5
                        </span>
                      </div>
                      <div
                        data-test="progress-meter-item"
                        class="onereg-progress-meter__item"
                      >
                        <span class="onereg-progress-meter__text">
                          2 <span pos-i18n="STEP_SEP">von</span> 5
                        </span>
                      </div>
                      <div
                        data-test="progress-meter-item"
                        class="onereg-progress-meter__item"
                      >
                        <span class="onereg-progress-meter__text">
                          3 <span pos-i18n="STEP_SEP">von</span> 5
                        </span>
                      </div>
                      <div
                        data-test="progress-meter-item"
                        class="onereg-progress-meter__item"
                      >
                        <span class="onereg-progress-meter__text">
                          4 <span pos-i18n="STEP_SEP">von</span> 5
                        </span>
                      </div>
                      <div
                        data-test="progress-meter-item"
                        class="onereg-progress-meter__item"
                      >
                        <span class="onereg-progress-meter__text">
                          5 <span pos-i18n="STEP_SEP">von</span> 5
                        </span>
                      </div>
                    </div>
                    <onereg-personal-info class="onereg-personal-info">
                      <fieldset class="ng-touched ng-dirty ng-invalid">
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
                                  />
                                  <i class="pos-input-radio__border">
                                    <span class="pos-input-radio__checker"></span>
                                  </i>
                                  <span class="pos-input-radio__labeltext">
                                    weiblich
                                  </span>
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
                                  />
                                  <i class="pos-input-radio__border">
                                    <span class="pos-input-radio__checker"></span>
                                  </i>
                                  <span class="pos-input-radio__labeltext">
                                    männlich
                                  </span>
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
                                  />
                                  <i class="pos-input-radio__border">
                                    <span class="pos-input-radio__checker"></span>
                                  </i>
                                  <span class="pos-input-radio__labeltext">
                                    neutral
                                  </span>
                                </label>
                              </pos-input-radio>
                            </onereg-radio-wrapper>
                          </div>
                          <div>
                            <span
                              role="button"
                              data-test="company-toggle"
                              class="l-horizontal l-nowrap toggle-wrapper"
                            >
                              <pos-svg-icon class="pos-svg-icon pos-svg-icon--16 pos-caret l-self-center-aligned">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="pos-svg"
                                >
                                  <use href="#core_arrow-up"></use>
                                </svg>
                              </pos-svg-icon>
                              <span pos-i18n="COMPANY">Firma / Verein</span>
                            </span>
                          </div>
                        </div>

                        <pos-content-box
                          boxid="onereg-company"
                          class="pos-content-box pos-content-box--visible"
                          style={{}}
                        >
                          <div class="pos-info-box__outer-wrapper">
                            <div class="pos-info-box__inner-wrapper w-full -translate-x-2">
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

                        <onereg-form-row>
                          <div class="pos-form-wrapper">
                            <label
                              class="pos-label pos-label--block"
                              htmlFor="a7d0a59f-2427-40ad-821c-4c75bf7138b7"
                            >
                              Vorname
                            </label>
                            <div></div>
                            <div>
                              <pos-input class="pos-input">
                                <input
                                  id="a7d0a59f-2427-40ad-821c-4c75bf7138b7"
                                  type="text"
                                  placeholder=""
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
                            <div></div>
                            <div>
                              <pos-input class="pos-input">
                                <input
                                  id="f3e3d664-6d2d-4672-9553-4e9780e6c0da"
                                  type="text"
                                  placeholder=""
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
                        <fieldset
                          formgroupname="address"
                          class="ng-touched ng-dirty ng-invalid"
                        >
                          <onereg-form-row>
                            <div class="pos-form-wrapper">
                              <label
                                class="pos-label pos-label--block"
                                htmlFor="e6539ad3-3096-47ed-b7f0-d3a018305d41"
                              >
                                Land
                              </label>
                              <div>
                                <pos-input class="pos-input">
                                  <select
                                    data-test="country-input"
                                    class="pos-form-element pos-text-input ng-touched ng-dirty ng-valid"
                                    id="e6539ad3-3096-47ed-b7f0-d3a018305d41"
                                    value={land}
                                    onChange={(e) => setLand(e.target.value)}
                                  >
                                    <option value="BE">Belgien</option>
                                    <option value="BG">Bulgarien</option>
                                    <option value="DK">Dänemark</option>
                                    <option value="DE">Deutschland</option>
                                    <option value="EE">Estland</option>
                                    <option value="FI">Finnland</option>
                                    <option value="FR">Frankreich</option>
                                    <option value="GR">Griechenland</option>
                                    <option value="IE">Irland</option>
                                    <option value="IT">Italien</option>
                                    <option value="HR">Kroatien</option>
                                    <option value="LV">Lettland</option>
                                    <option value="LT">Litauen</option>
                                    <option value="LU">Luxemburg</option>
                                    <option value="MT">Malta</option>
                                    <option value="NL">Niederlande</option>
                                    <option value="AT">Österreich</option>
                                    <option value="PL">Polen</option>
                                    <option value="PT">Portugal</option>
                                    <option value="RO">Rumänien</option>
                                    <option value="SE">Schweden</option>
                                    <option value="CH">Schweiz</option>
                                    <option value="SK">Slowakei</option>
                                    <option value="SI">Slowenien</option>
                                    <option value="ES">Spanien</option>
                                    <option value="CZ">Tschechien</option>
                                    <option value="HU">Ungarn</option>
                                    <option value="GB">
                                      Vereinigtes Königreich
                                    </option>
                                    <option value="CY">Zypern</option>
                                  </select>
                                </pos-input>
                              </div>
                            </div>
                          </onereg-form-row>
                          <div id="address-group">
                            <div class="l-horizontal">
                              <div class="onereg-plz-field a-mr-space-1">
                                <onereg-form-row>
                                  <div class="pos-form-wrapper">
                                    <label
                                      class="pos-label pos-label--block"
                                      htmlFor="9db2af9d-823c-4938-9c06-993ea7d3ccec"
                                    >
                                      PLZ
                                    </label>
                                    <div>
                                      <pos-input class="pos-input">
                                        <input
                                          type="text"
                                          inputMode="numeric"
                                          formcontrolname="postalCode"
                                          data-test="postal-code-input"
                                          id="9db2af9d-823c-4938-9c06-993ea7d3ccec"
                                          class="ng-untouched ng-pristine ng-invalid"
                                          onChange={handlePLZError}
                                        />
                                      </pos-input>
                                    </div>
                                  </div>
                                </onereg-form-row>
                              </div>
                              <div class="l-flex-4">
                                <onereg-form-row>
                                  <div class="pos-form-wrapper">
                                    <label
                                      class="pos-label pos-label--block"
                                      htmlFor="4b78a09a-8d04-4a14-812e-dd40c871b9ce"
                                    >
                                      Ort
                                    </label>
                                    <div></div>
                                    <div>
                                      <pos-input class="pos-input">
                                        <input
                                          id="4b78a09a-8d04-4a14-812e-dd40c871b9ce"
                                          type="text"
                                          placeholder=""
                                          data-test="town-input"
                                          class="ng-untouched ng-pristine ng-invalid"
                                          onChange={handleOrtError}
                                        />
                                      </pos-input>
                                    </div>
                                  </div>
                                </onereg-form-row>
                              </div>
                            </div>
                            {plzError && (
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
                                    <span>{plzError}</span>
                                  </span>
                                </div>
                              </div>
                            )}
                            {ortError && (
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
                                    <span>{ortError}</span>
                                  </span>
                                </div>
                              </div>
                            )}
                            <onereg-form-row>
                              <div class="pos-form-wrapper">
                                <label
                                  class="pos-label pos-label--block"
                                  for="3c643cb5-6e6d-4e45-a340-1b5a72952a48"
                                >
                                  Straße &amp; Hausnummer
                                </label>
                                <div></div>
                                <div>
                                  <pos-input
                                    class={
                                      hausnummerError
                                        ? "pos-input--error pos-input"
                                        : "pos-input"
                                    }
                                  >
                                    <input
                                      id="3c643cb5-6e6d-4e45-a340-1b5a72952a48"
                                      type="text"
                                      placeholder=""
                                      data-test="street-and-number-input"
                                      class="ng-untouched ng-pristine ng-invalid"
                                      onChange={handleHausnummerError}
                                    />
                                  </pos-input>
                                </div>
                              </div>
                            </onereg-form-row>
                            {hausnummerError && (
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
                                    <span>{hausnummerError}</span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </fieldset>
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
                                    // class="pos-input-dob"
                                  >
                                    <pos-input class="pos-input">
                                      <input
                                        type="number"
                                        name="day"
                                        data-test="day"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength="2"
                                        class="pos-dob pos-dob--dd"
                                        placeholder="TT"
                                        min="1"
                                        max="31"
                                        onChange={handleInputChange}
                                        onInput={(event) =>
                                          event.target.value.length > 2
                                            ? (event.target.value =
                                                event.target.value.slice(0, 2))
                                            : event.target.value
                                        }
                                      />
                                    </pos-input>
                                    <pos-input class="pos-input">
                                      <input
                                        // onChange={handleDOB}
                                        type="number"
                                        data-test="month"
                                        name="month"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength="2"
                                        class="pos-dob pos-dob--mm"
                                        placeholder="MM"
                                        min="1"
                                        max="12"
                                        onInput={(event) =>
                                          event.target.value.length > 2
                                            ? (event.target.value =
                                                event.target.value.slice(0, 2))
                                            : event.target.value
                                        }
                                        onChange={handleInputChange}
                                      />
                                    </pos-input>
                                    <pos-input class="pos-input">
                                      <input
                                        // onChange={handleDOB}
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
                                            ? (event.target.value =
                                                event.target.value.slice(0, 4))
                                            : event.target.value
                                        }
                                        onChange={handleInputChange}
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
                            <p className="error-message">{dobError}</p>
                          )}
                        </onereg-form-row>
                      </fieldset>
                    </onereg-personal-info>
                    <div class="l-horizontal l-between-justified l-center-aligned onereg-progress-meter__buttons">
                      <span
                        role="button"
                        pos-i18n="BACK"
                        data-test="progress-meter-prev"
                        class="toggle-wrapper onereg-progress-meter__buttons-back onereg-progress-meter__buttons--hidden"
                      >
                        Zurück
                      </span>
                      <button
                        pos-button="primary"
                        type="button"
                        data-test="progress-meter-next"
                        class="pos-button onereg-progress-meter__buttons-next pos-button--primary"
                        disabled=""
                      >
                        <span pos-i18n="NEXT">Weiter</span>
                      </button>
                    </div>
                  </onereg-progress-meter>
                </section>

                <section class="form__panel--password">
                  <onereg-password class="onereg-password">
                    <fieldset
                      data-test="form-password-group"
                      class="ng-untouched ng-pristine ng-invalid"
                    >
                      <onereg-progress-meter class="onereg-progress-meter">
                        <div class="onereg-progress-meter__container a-mb-space-2">
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item onereg-progress-meter__item--active"
                          >
                            <span class="onereg-progress-meter__text">
                              1 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              2 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              3 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              4 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              5 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                        </div>
                        <div class="l-horizontal l-start-aligned">
                          <h2
                            pos-i18n="CHOOSE_PASSWORD_TITLE"
                            data-test="form-fields-title"
                          >
                            Passwort
                          </h2>
                          <pos-svg-icon
                            name="core_info"
                            role="button"
                            class="pos-svg-icon onereg-info-icon"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="pos-svg"
                            >
                              <use href="#core_info"></use>
                            </svg>
                          </pos-svg-icon>
                        </div>
                        <pos-content-box
                          boxid="onereg-pwtipps"
                          class="pos-content-box pos-info-box onereg-pwtipps"
                          style={{ height: "0px" }}
                        >
                          <div class="pos-info-box__outer-wrapper">
                            <div class="pos-info-box__inner-wrapper">
                              <div>
                                Ein gutes Passwort:
                                <ul>
                                  <li>ist schwer zu erraten</li>
                                  <li>ist möglichst lang</li>
                                  <li>
                                    wird nur für einen Online-Dienst genutzt
                                  </li>
                                </ul>
                                <p>
                                  Ein Satz wäre eine gute Idee. Mischen Sie
                                  Groß- und Kleinschreibung, Zahlen und Symbole.
                                </p>
                                <p class="a-mb-space-0">
                                  Weitere Informationen gibt es in der{" "}
                                  <a
                                    href="https://hilfe.gmx.net/sicherheit/vorsorgen/passwort.html"
                                    target="_blank"
                                  >
                                    GMX Hilfe
                                  </a>
                                  .
                                </p>
                              </div>
                            </div>
                            <pos-svg-icon
                              name="core_close"
                              role="button"
                              data-test="close-button"
                              class="pos-svg-icon pos-svg-icon--24"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="pos-svg"
                              >
                                <use href="#core_close"></use>
                              </svg>
                            </pos-svg-icon>
                          </div>
                        </pos-content-box>
                        <input
                          type="text"
                          value=""
                          tabIndex="-1"
                          class="onereg-pwmanager-fix-field"
                        />
                        <onereg-form-row
                          idfor="password"
                          labeltext="CHOOSE_PASSWORD"
                          data-test="password"
                        >
                          <div class="pos-form-wrapper">
                            <label
                              class="pos-label pos-label--block"
                              htmlFor="password"
                            >
                              Passwort wählen
                            </label>
                            <div>
                              <pos-input class="pos-input onereg-password-container">
                                <input
                                  autoComplete="off"
                                  type={showPassword ? "text" : "password"}
                                  formcontrolname="password"
                                  data-test="choose-password-input"
                                  id="password"
                                  class="pos-input--password ng-dirty ng-touched ng-invalid"
                                  onChange={handlePasswordChange}
                                />
                                {password && (
                                  <pos-svg-icon
                                    role="button"
                                    name="core_password-eye"
                                    class="pos-svg-icon pos-input-toggle pos-input-icon"
                                    title="Passwort anzeigen"
                                    onClick={() =>
                                      setShowPassword((prevState) => !prevState)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#core_password-eye"></use>
                                    </svg>
                                  </pos-svg-icon>
                                )}
                              </pos-input>
                              {passwordError && (
                                <p style={{ color: "red" }}>{passwordError}</p>
                              )}
                              <pos-form-message
                                type="info"
                                class="pos-form-message onereg-password__minlength-message"
                              >
                                <div class="pos-form-message__wrapper l-horizontal l-center-aligned pos-form-message--info">
                                  <pos-svg-icon class="pos-svg-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#core_info"></use>
                                    </svg>
                                  </pos-svg-icon>
                                  <span class="pos-form-message-text">
                                    <span>
                                      Mindestens 8 Zeichen - am besten einen
                                      Satz oder eine Mischung aus Buchstaben,
                                      Symbolen und Zahlen verwenden
                                    </span>
                                  </span>
                                </div>
                              </pos-form-message>
                            </div>
                          </div>
                        </onereg-form-row>
                        <onereg-form-row
                          idfor="confirm-password"
                          labeltext="REPEAT_PASSWORD"
                          data-test="confirm-password"
                        >
                          <div class="pos-form-wrapper">
                            <label
                              class="pos-label pos-label--block"
                              htmlFor="confirm-password"
                            >
                              Passwort wiederholen
                            </label>
                            <div>
                              <pos-input class="pos-input">
                                <input
                                  autoComplete="off"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  data-test="choose-password-confirm-input"
                                  id="confirm-password"
                                  class="pos-input--password ng-untouched ng-pristine ng-invalid"
                                  onChange={handleConfirmPasswordChange}
                                />
                                {confirmPassword && (
                                  <pos-svg-icon
                                    role="button"
                                    name="core_password-eye"
                                    class="pos-svg-icon pos-input-toggle pos-input-icon"
                                    title="Passwort anzeigen"
                                    onClick={() =>
                                      setShowConfirmPassword(
                                        (prevState) => !prevState
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="pos-svg"
                                    >
                                      <use href="#core_password-eye"></use>
                                    </svg>
                                  </pos-svg-icon>
                                )}
                              </pos-input>
                            </div>
                            {confirmPasswordError && (
                              <p style={{ color: "red" }}>
                                {confirmPasswordError}
                              </p>
                            )}
                          </div>
                        </onereg-form-row>
                        <div class="l-horizontal l-between-justified l-center-aligned onereg-progress-meter__buttons">
                          <span
                            role="button"
                            pos-i18n="BACK"
                            data-test="progress-meter-prev"
                            class="toggle-wrapper onereg-progress-meter__buttons-back onereg-progress-meter__buttons--hidden"
                          >
                            Zurück
                          </span>
                          <button
                            pos-button="primary"
                            type="button"
                            data-test="progress-meter-next"
                            class="pos-button onereg-progress-meter__buttons-next pos-button--primary"
                            disabled=""
                          >
                            <span pos-i18n="NEXT">Weiter</span>
                          </button>
                        </div>
                      </onereg-progress-meter>
                    </fieldset>
                  </onereg-password>
                </section>

                <section
                  data-test="password-recovery"
                  class="form__panel--password-recovery"
                >
                  <onereg-password-recovery class="onereg-password-recovery">
                    <fieldset class="ng-touched ng-dirty ng-invalid">
                      <onereg-progress-meter class="onereg-progress-meter">
                        <div class="onereg-progress-meter__container a-mb-space-2">
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item onereg-progress-meter__item--active"
                          >
                            <span class="onereg-progress-meter__text">
                              1 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              2 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              3 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              4 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                          <div
                            data-test="progress-meter-item"
                            class="onereg-progress-meter__item"
                          >
                            <span class="onereg-progress-meter__text">
                              5 <span pos-i18n="STEP_SEP">von</span> 5
                            </span>
                          </div>
                        </div>
                        <div class="l-horizontal l-start-aligned">
                          <h2 pos-i18n="PASSWORD_RECOVERY_CONTACT_TITLE">
                            Passwort-Wiederherstellung per SMS
                          </h2>
                          <pos-svg-icon
                            name="core_info"
                            role="button"
                            class="pos-svg-icon onereg-info-icon"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="pos-svg"
                            >
                              <use href="#core_info"></use>
                            </svg>
                          </pos-svg-icon>
                        </div>
                        <pos-content-box
                          boxid="onereg-recovery-panel"
                          class="pos-content-box pos-info-box"
                          style={{ height: "0px" }}
                        >
                          <div class="pos-info-box__outer-wrapper">
                            <div class="pos-info-box__inner-wrapper">
                              <div pos-i18n="INFOBOX_RECOVERY_PANEL">
                                Wir nutzen diese Nummer, um Ihren Account zu
                                schützen. Wir kontaktieren Sie unter Umständen
                                über diese Nummer, um Ihnen Zugriff auf Ihren
                                Account zu ermöglichen, z.B. im Rahmen einer
                                Passwortwiederherstellung, zur Identitätsprüfung
                                oder falls verdächtige Aktivitäten bzw.
                                sicherheitsrelevante Änderungen in Ihrem Account
                                festgestellt werden oder bei einer anstehenden
                                Löschung der Account-Inhalte wegen Inaktivität.
                                Außerdem verwenden wir diese Nummer, um eine
                                Landeszuordnung aus steuerrechtlichen Gründen
                                vornehmen zu können. Weitergehende Nutzungen der
                                Nummer nehmen wir ohne Ihre vorherige
                                Einwilligung nicht vor.
                              </div>
                            </div>
                            <pos-svg-icon
                              name="core_close"
                              role="button"
                              data-test="close-button"
                              class="pos-svg-icon pos-svg-icon--24"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="pos-svg"
                              >
                                <use href="#core_close"></use>
                              </svg>
                            </pos-svg-icon>
                          </div>
                        </pos-content-box>
                        <div class="a-mb-space-1" hidden="">
                          <onereg-checkbox-wrapper class="ng-touched ng-dirty ng-valid">
                            <pos-input-checkbox
                              name="mobile-phone-checkbox"
                              class="pos-input-checkbox"
                            >
                              <label class="pos-input-checkbox__label">
                                <input
                                  type="checkbox"
                                  class="pos-input-checkbox__input"
                                  name="mobile-phone-checkbox"
                                />
                                <i class="pos-input-checkbox__border">
                                  <i class="pos-input-checkbox__checker"></i>
                                </i>
                                <span class="pos-input-checkbox__labeltext">
                                  Per SMS (erforderlich)
                                </span>
                              </label>
                            </pos-input-checkbox>
                          </onereg-checkbox-wrapper>
                        </div>
                        <onereg-form-row
                          controlname="mobilePhone"
                          idfor="mobilePhone"
                        >
                          <div class="pos-form-wrapper">
                            <label
                              class="pos-label pos-label--block"
                              htmlFor="mobilePhone"
                            >
                              Mobilfunknummer
                            </label>
                            <div>
                              <div class="l-horizontal phone-input">
                                <pos-input class="pos-input">
                                  <select
                                    data-test="mobile-phone-prefix-input"
                                    class="pos-form-element pos-text-input ng-untouched ng-pristine ng-valid"
                                  >
                                    <option value="0: Object"> AT +43 </option>
                                    <option value="1: Object"> CH +41 </option>
                                    <option value="2: Object"> DE +49 </option>
                                  </select>
                                </pos-input>
                                <pos-input class="pos-input l-flex-1">
                                  <input
                                    data-test="mobile-phone-input"
                                    class="pos-form-element pos-text-input ng-untouched ng-pristine ng-invalid"
                                    id="mobilePhone"
                                    onChange={handleMobileNumber}
                                  />
                                </pos-input>
                              </div>
                            </div>
                          </div>
                        </onereg-form-row>
                        {mobileNumberError && (
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
                                  <span>{mobileNumberError}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div class="a-mb-space-1" hidden="">
                          <onereg-checkbox-wrapper class="ng-touched ng-dirty ng-valid">
                            <pos-input-checkbox
                              data-test="email-recovery-checkbox"
                              name="contact-email-checkbox"
                              value="emailCheckbox"
                              class="pos-input-checkbox"
                            >
                              <label class="pos-input-checkbox__label">
                                <input
                                  type="checkbox"
                                  class="pos-input-checkbox__input"
                                  name="contact-email-checkbox"
                                />
                                <i class="pos-input-checkbox__border" />
                                <i class="pos-input-checkbox__checker"></i>
                                <span class="pos-input-checkbox__labeltext">
                                  Per E-Mail
                                </span>
                              </label>
                            </pos-input-checkbox>
                          </onereg-checkbox-wrapper>
                        </div>
                        <onereg-form-row
                          type="email"
                          data-test="contact-email-formrow"
                          idfor="contactEmail"
                          class="password-recovery__email-form-row password-recovery__email-form-row--hidden"
                          hidden=""
                        >
                          <div class="pos-form-wrapper">
                            <label
                              class="pos-label pos-label--block"
                              htmlFor="contactEmail"
                            >
                              E-Mail-Adresse
                            </label>
                            <div></div>
                            <div>
                              <pos-input class="pos-input">
                                <input
                                  id="contactEmail"
                                  type="email"
                                  placeholder=""
                                  data-test="contact-email-input"
                                  class="ng-touched ng-dirty ng-valid"
                                />
                              </pos-input>
                            </div>
                          </div>
                        </onereg-form-row>
                        <div class="l-horizontal l-between-justified l-center-aligned onereg-progress-meter__buttons">
                          <span
                            role="button"
                            pos-i18n="BACK"
                            data-test="progress-meter-prev"
                            class="toggle-wrapper onereg-progress-meter__buttons-back onereg-progress-meter__buttons--hidden"
                          >
                            Zurück
                          </span>
                          <button
                            pos-button="primary"
                            type="button"
                            data-test="progress-meter-next"
                            class="pos-button onereg-progress-meter__buttons-next pos-button--primary"
                            disabled=""
                          >
                            <span pos-i18n="NEXT">Weiter</span>
                          </button>
                        </div>
                      </onereg-progress-meter>
                    </fieldset>
                  </onereg-password-recovery>
                </section>

                <section class="form__panel--terms-and-conditions">
                  <onereg-terms-and-conditions class="onereg-terms-and-conditions">
                    <onereg-progress-meter class="onereg-progress-meter">
                      <div class="onereg-progress-meter__container a-mb-space-2">
                        <div
                          data-test="progress-meter-item"
                          class="onereg-progress-meter__item onereg-progress-meter__item--active"
                        >
                          <span class="onereg-progress-meter__text">
                            1 <span pos-i18n="STEP_SEP">von</span> 5
                          </span>
                        </div>
                        <div
                          data-test="progress-meter-item"
                          class="onereg-progress-meter__item"
                        >
                          <span class="onereg-progress-meter__text">
                            2 <span pos-i18n="STEP_SEP">von</span> 5
                          </span>
                        </div>
                        <div
                          data-test="progress-meter-item"
                          class="onereg-progress-meter__item"
                        >
                          <span class="onereg-progress-meter__text">
                            3 <span pos-i18n="STEP_SEP">von</span> 5
                          </span>
                        </div>
                        <div
                          data-test="progress-meter-item"
                          class="onereg-progress-meter__item"
                        >
                          <span class="onereg-progress-meter__text">
                            4 <span pos-i18n="STEP_SEP">von</span> 5
                          </span>
                        </div>
                        <div
                          data-test="progress-meter-item"
                          class="onereg-progress-meter__item"
                        >
                          <span class="onereg-progress-meter__text">
                            5 <span pos-i18n="STEP_SEP">von</span> 5
                          </span>
                        </div>
                      </div>
                      <fieldset>
                        <onereg-free-level-two class="onereg-free-level-two">
                          <fieldset
                            data-test="onereg-free-level-two-panel"
                            class="onereg-free-level-two-panel__container a-mb-space-4"
                          >
                            <onereg-checkbox-wrapper class="ng-untouched ng-pristine ng-valid">
                              <pos-input-checkbox
                                name="onereg-free-level-two-checkbox"
                                data-test="onereg-free-level-two-checkbox"
                                class="pos-input-checkbox a-mb-space-2"
                              >
                                <label class="pos-input-checkbox__label">
                                  <input
                                    type="checkbox"
                                    class="pos-input-checkbox__input"
                                    name="onereg-free-level-two-checkbox"
                                  />
                                  <i class="pos-input-checkbox__border">
                                    <i class="pos-input-checkbox__checker"></i>
                                  </i>
                                  <span class="pos-input-checkbox__labeltext">
                                    <strong>
                                      Kostenloses Plus-Upgrade mit 10 FreiSMS /
                                      Monat
                                    </strong>
                                  </span>
                                </label>
                              </pos-input-checkbox>
                            </onereg-checkbox-wrapper>
                            <div
                              pos-i18n="FREE_LEVEL_TWO_INFO"
                              class="onereg-free-level-two__info"
                            >
                              Ich entscheide mich für das dauerhaft kostenlose
                              Upgrade zu FreeMail Plus. Dabei erhalte ich von
                              GMX WEB.Cent und GMX FreeMail Plus interessante
                              Angebote mit Inhalten von ausgewählten Partnern
                              per E-Mail. Diese Benachrichtigungen kann ich nach
                              Abschluss der Registrierung jederzeit unter Mein
                              Account wieder abbestellen.
                            </div>
                          </fieldset>
                        </onereg-free-level-two>
                        <onereg-euds-box data-test="onereg-euds-box">
                          <div class="onereg-euds">
                            <h2
                              data-test="euds-title"
                              class="onereg-euds__title l-horizontal l-center-aligned"
                            >
                              <pos-svg-icon
                                name="or_ssl"
                                class="pos-svg-icon onereg-euds__icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="pos-svg"
                                >
                                  <use href="#or_ssl"></use>
                                </svg>
                              </pos-svg-icon>
                              <span pos-i18n="EUDS_TITLE">
                                Wir schützen Ihre Daten
                              </span>
                            </h2>
                            <div>
                              <div data-test="euds-body">
                                Ihre Daten gehören Ihnen. Wir werden Ihre Daten
                                nur verwenden, um Ihnen die von Ihnen gewählten
                                Produkte und Dienste anbieten zu können. Sie
                                möchten mehr erfahren? Weitere Informationen
                                finden Sie in unseren{" "}
                                <a
                                  target="_blank"
                                  href="https://agb-server.gmx.net/datenschutz?target=_blank"
                                >
                                  Datenschutzhinweisen
                                </a>
                                .
                              </div>
                            </div>
                          </div>
                        </onereg-euds-box>
                        <onereg-agb-box>
                          <div class="agb-box">
                            <div class="agb-box__title-container">
                              <h2
                                pos-i18n="AGB_BOX_TITLE_GERMANY"
                                class="agb-box__title"
                              >
                                Bei uns erhalten Sie ein kostenfreies E-Mail
                                Postfach made in Germany!
                              </h2>
                              <pos-svg-icon
                                name="or_made-in-germany"
                                class="pos-svg-icon agb-box__icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="pos-svg"
                                >
                                  <use href="#or_made-in-germany"></use>
                                </svg>
                              </pos-svg-icon>
                            </div>
                            <p
                              pos-i18n="AGB_BOX_BODY_FREEMAIL"
                              class="agb-box__text"
                            >
                              Um Ihnen auch in Zukunft ein kostenfreies E-Mail
                              Postfach anbieten zu können, erhalten Sie
                              wöchentlich den Newsletter GMX Magazin als festen
                              Leistungsbestandteil des FreeMail Postfachs. Der
                              Newsletter enthält GMX Angebote unserer
                              Vorteilswelt, wichtige technische Hinweise sowie
                              Tipps zu GMX Produkten und Dienstleistungen und
                              kann nicht abbestellt werden, da er unseren
                              FreeMail Dienst mitfinanziert.
                            </p>
                          </div>
                        </onereg-agb-box>
                        <div class="a-mb-space-2">
                          <span>
                            Hinweis: Gemäß gesetzlicher Bestimmungen darf GMX
                            Ihnen Informationen zu eigenen Produkten per E-Mail
                            zusenden. Sie können dieser Zusendung jederzeit{" "}
                            <a
                              target="_blank"
                              href="https://agb-server.gmx.net/datenschutz#Widerspruchsmoeglichkeit"
                            >
                              widersprechen.
                            </a>
                          </span>
                        </div>
                        <div class="a-mb-space-2">
                          <span>
                            <strong>
                              Es gelten die{" "}
                              <a
                                target="_blank"
                                href="https://agb-server.gmx.net/gmxagb-de/"
                              >
                                AGB
                              </a>
                              ,
                            </strong>{" "}
                            das{" "}
                            <a
                              target="_blank"
                              href="https://agb-server.gmx.net/gmxagb-de?target=_blank#Gesetzliches%20Widerrufsrecht"
                            >
                              Widerrufsrecht
                            </a>
                            , die Hinweise zum{" "}
                            <a
                              target="_blank"
                              href="https://agb-server.gmx.net/datenschutz"
                            >
                              Datenschutz
                            </a>{" "}
                            sowie die{" "}
                            <a target="_blank" href="https://www.gmx.net/mail/">
                              Leistungsbeschreibung
                            </a>{" "}
                            von GMX FreeMail.
                          </span>
                          <span>
                            {" "}
                            Ich habe diese Dokumente und die{" "}
                            <a
                              target="_blank"
                              href="https://img.ui-portal.de/gmx/freemail/vz/gmx_vz_Freemail.pdf?target=_blank"
                            >
                              Vertragszusammenfassung
                            </a>{" "}
                            zur Kenntnis genommen und heruntergeladen.
                          </span>
                        </div>
                        <div data-test="form-footer">
                          <div class="pos-form-wrapper">
                            <button
                              pos-button="cta"
                              data-test="create-mailbox-create-button"
                              type="submit"
                              class="pos-button terms-and-conditions__cta-button pos-button--cta"
                              onClick={(e) => onSubmit(e)}
                            >
                              <span class="form__create-account-text">
                                Zustimmen und weiter
                              </span>
                            </button>
                          </div>
                        </div>
                      </fieldset>
                      <div class="l-horizontal l-between-justified l-center-aligned onereg-progress-meter__buttons">
                        <span
                          role="button"
                          pos-i18n="BACK"
                          data-test="progress-meter-prev"
                          class="toggle-wrapper onereg-progress-meter__buttons-back onereg-progress-meter__buttons--hidden"
                        >
                          Zurück
                        </span>
                        <button
                          pos-button="primary"
                          type="button"
                          data-test="progress-meter-next"
                          class="pos-button onereg-progress-meter__buttons-next pos-button--primary"
                        >
                          <span pos-i18n="NEXT">Weiter</span>
                        </button>
                      </div>
                    </onereg-progress-meter>
                  </onereg-terms-and-conditions>
                </section>
              </section>
            </form>
          </div>
        </div>
      </onereg-form>

      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="core_info" viewBox="0 0 20 20">
            <path d="M17 1H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V3a2 2 0 00-2-2zm-6 15H9V8h2zM9 4h2v2H9z"></path>
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
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="core_close" viewBox="0 0 20 20">
            <path d="M11.4 10l5.3-5.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L10 8.6 4.7 3.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L8.6 10l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.4 10z"></path>
          </symbol>
        </svg>
      </div>
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="or_at-icon" viewBox="0 0 24 24">
            <path d="M22 17.9l1.2 1.9S19.4 24 12.5 24C4.7 24 0 19.3 0 12 0 4.8 4.9 0 12.9 0 19.7 0 24 3.9 24 9.4c0 5.7-4.1 8.5-9.4 9.1l-.1-1.4c-.5.5-1.8 1.6-3.8 1.6-3.2 0-4.7-2.2-4.7-6.2 0-4.4 2.6-7.1 6.6-7.1 3.2 0 5.2 1.3 5.2 1.3v8.7c2.2-1 3.5-2.8 3.5-5.6 0-4.4-3.4-7.3-8.6-7.3-6 0-9.3 3.8-9.3 9.4 0 6 3.5 9.4 9.5 9.4 5.5.1 9.1-3.4 9.1-3.4zm-7.7-3.1V8.4c-.6-.1-1.2-.1-1.8-.1-1.9 0-2.9 1.4-2.9 4 0 2.7.8 3.6 2.4 3.6 1 0 1.8-.7 2.3-1.1z"></path>
          </symbol>
        </svg>
      </div>
      <div style={{ width: "0px", height: "0px", overflow: "hidden" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="or_premium_upselling" viewBox="0 0 32 32">
            <path d="M22.2 16.3L16 2.6 9.7 16.3 0 5.1 4.9 26h22.2L32 5.1l-9.8 11.2zM5 29l1.2 2h19.6l1.2-2v-1H5v1z"></path>
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
          <symbol id="core_password-eye" viewBox="0 0 20 20">
            <path
              class="cls-1"
              d="M19.73 8.91A11.51 11.51 0 0010 3.14 11.19 11.19 0 00.25 9a2.31 2.31 0 000 2A11.19 11.19 0 0010 16.86a11.51 11.51 0 009.77-5.77 2.31 2.31 0 00-.04-2.18zM10 14a4 4 0 114-4 4 4 0 01-4 4z"
            ></path>
          </symbol>
        </svg>
      </div>
    </div>
  );
};

export default EmailPrufen;
