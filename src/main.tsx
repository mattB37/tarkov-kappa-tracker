import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage, TaskTrackerPage, HideoutTrackerPage, ItemTrackerPage, PrestigeTrackerPage } from './pages';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task-tracker" element={<TaskTrackerPage />} />
        <Route path="/hideout-tracker" element={<HideoutTrackerPage />} />
        <Route path="/item-tracker" element={<ItemTrackerPage />} />
        <Route path="/prestige-tracker" element={<PrestigeTrackerPage />} />
        <Route path="*" element={<div><h1>404 - Page Not Found</h1><p>Sorry, the page you are looking for does not exist.</p></div>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
