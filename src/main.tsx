import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteContentProvider } from "./context/SiteContentContext";
import App from "./App.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SeoHead from "./components/SeoHead";
import AdminApp from "./admin/AdminApp";
import "./index.css";

function PublicSite() {
  return (
    <>
      <SeoHead />
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteContentProvider>
        <Routes>
          <Route path="/admin_1122/*" element={<AdminApp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </SiteContentProvider>
    </BrowserRouter>
  </StrictMode>
);
