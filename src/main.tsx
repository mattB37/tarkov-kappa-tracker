import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import {HomePage, TaskTrackerPage, HideoutTrackerPage} from './pages';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quest-tracker" element={<TaskTrackerPage />} />
        <Route path="/hideout-tracker" element={<HideoutTrackerPage />} />
        <Route path="*" element={<div><h1>404 - Page Not Found</h1><p>Sorry, the page you are looking for does not exist.</p></div>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
