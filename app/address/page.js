"use client";
import { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";
// import "./body.css";

const AddressForm = () => {
  const { formData, handleInputChange, nextStep, prevStep } =
    useContext(FormContext);
  const [land, setLand] = useState(formData.land || "DE");
  const [plz, setPlz] = useState(formData);
  const [plzError, setPlzError] = useState("");
  const [ort, setOrt] = useState(formData.ort || "");
  const [ortError, setOrtError] = useState("");
  const [hausnummer, setHausnummer] = useState(formData.hausnummer || "");
  const [hausnummerError, setHausnummerError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setLand(formData.land || "DE");
    setPlz(formData.plz || "");
    setOrt(formData.ort || "");
    setHausnummer(formData.hausnummer || "");
  }, [formData]);

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

    handleInputChange(e);
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
    handleInputChange(e);
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
    handleInputChange(e);
  };

  const handleLand = (e) => {
    setLand(e.target.value);
    handleInputChange({ name: e.target.name, value: e.target.value });
  };

  const checkFormValidity = () => {
    if (plz && ort && hausnummer) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [plz, ort, hausnummer]);

  useEffect(() => {
    if (!formData.land) {
      handleInputChange({ name: "land", value: land });
    }
  }, [land, formData, handleInputChange]);

  return (
    <div className="form__loading-container">
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
      <section className="form__panels hastransision multistep-transform0">
        <section className="form__panel--email-alias">
          <fieldset
            formgroupname="address"
            className="somes ng-untouched ng-pristine ng-invalid"
            data-test="form-email-alias-group"
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
                      name="land"
                      onChange={handleLand}
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
                      <option value="GB">Vereinigtes Königreich</option>
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
                            formcontrolname="postalCode"
                            data-test="postal-code-input"
                            id="9db2af9d-823c-4938-9c06-993ea7d3ccec"
                            class="ng-untouched ng-pristine ng-invalid"
                            onChange={handlePLZError}
                            name="plz"
                            value={plz || ""}
                            type="number"
                            onInput={(event) =>
                              event.target.value.length > 5
                                ? (event.target.value =
                                    event.target.value.slice(0, 5))
                                : event.target.value
                            }
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
                      <div>
                        <pos-input class="pos-input">
                          <input
                            id="4b78a09a-8d04-4a14-812e-dd40c871b9ce"
                            type="text"
                            placeholder=""
                            data-test="town-input"
                            class="ng-untouched ng-pristine ng-invalid"
                            onChange={handleOrtError}
                            name="ort"
                            value={ort || ""}
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
                    htmlFor="3c643cb5-6e6d-4e45-a340-1b5a72952a48"
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
                        name="hausnummer"
                        value={hausnummer || ""}
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
          <div className="mt-4">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 mr-2"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className={`bg-blue-500 text-white py-2 px-4 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
              cursor={isFormValid ? "not-allowed" : "pointer"}
            >
              Next
            </button>
          </div>
        </section>
      </section>
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

export default AddressForm;
