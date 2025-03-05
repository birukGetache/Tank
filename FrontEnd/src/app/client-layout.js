"use client";

import { useEffect } from "react";
import swDev from "./swDev"; // Adjust path as needed
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Adjust the path to your i18n.js file

import "../../styles/globals.css"; 
export default function ClientLayout({ children }) {
  useEffect(() => {
    swDev(); // Register the service worker on the client side
  }, []);

  return (<Provider store={store}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
</Provider>)
}
