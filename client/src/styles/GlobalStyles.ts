import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    background-color: #f5f5f5;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  li {
    list-style: none;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;}

    button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #004794;
    color: white;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #0056b3;
    }

    @media (max-width: 455px) {
      padding: 0.3rem 0.6rem;
      font-size: 0.875rem;
    }
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
