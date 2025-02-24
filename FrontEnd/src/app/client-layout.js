"use client";

import { useEffect } from "react";
import swDev from "./swDev"; // Adjust path as needed
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import "../../public/styles/globals.css";  // Make sure the path to the CSS is correct

export default function ClientLayout({ children }) {
  useEffect(() => {
    swDev(); // Register the service worker on the client side
  }, []);

  return (<Provider store={store}>
  {children}
</Provider>)
}
