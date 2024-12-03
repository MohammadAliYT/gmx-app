const Header = () => {
  return (
    <header class="pos-header">
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
      <div class="pos-header__content">
        <div class="pos-brand-logo">
          <div
            data-test="brand-logo"
            class="pos-svg-icon pos-brand-icon pos-brand-icon--default"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 123 40"
              width="123"
              height="30"
            >
              <path
                d="M109.17 18.84l10.66-17.75h-10.88l-5.67 9-6.1-9H85.36l12.57 17.73L85.36 38.84h11.92l6.8-11.37 8.06 11.37h10.64zm-39.42-17.75l-8.09 20.19L53.99 1.09h-9.67l-6.42 37.78h9.77l3.16-21.77h.1l8.66 21.77h3.91l9.07-21.77h.12l2.75 21.77h9.82L82.68 1.09zM19.95 17.8v7.68h8c-1.22 5.21-4.48 7.42-8.7 7.42-6.42 0-9.89-5.91-9.89-11.75S13.49 8.4 19.9 8.4c3.94 0 6.76 2.38 8.11 5.95l9.26-3.88C34.04 3.47 28.06 0 20.34 0 8.25 0 0 8 0 20.19c0 11.81 8.2 19.81 20 19.81 6.27 0 11.8-2.24 15.46-7.36 3.29-4.64 3.74-9.36 3.84-14.84h-10.24z"
                style={{ fill: "#fff", fillOpacity: 1 }}
              ></path>
            </svg>
          </div>
          <span class="pos-brand-title">Registrierung</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
