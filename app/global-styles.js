import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #252839 !important;
  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    display: block!important;
  }
`;

export default GlobalStyle;
