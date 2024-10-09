import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ChakraProvider } from '@chakra-ui/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Import your publishable key
const CLERK_PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY
const CONVEX_URL = process.env.REACT_APP_VITE_CONVEX_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

if (!CONVEX_URL) {
  throw new Error("Missing Convex URL")
}
const convex = new ConvexReactClient(CONVEX_URL as string)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl='/feed'>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <App />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
