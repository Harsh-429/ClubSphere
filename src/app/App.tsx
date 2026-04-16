import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import '../styles/index.css';
import { Toaster } from './components/ui/sonner';
import { LiveDataProvider } from './state/LiveDataContext';

export default function App() {
  return (
    <LiveDataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LiveDataProvider>
  );
}
