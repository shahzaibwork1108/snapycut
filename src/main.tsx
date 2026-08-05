import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteContentProvider } from "./context/SiteContentContext";
import App from "./App.tsx";
import SeoHead from "./components/SeoHead";
import "./index.css";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

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
        <Suspense fallback={null}>
          <Routes>
            {/* Support legacy /admin path as an alias to the obfuscated admin route */}
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/admin_1122/*" element={<AdminApp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </Suspense>
      </SiteContentProvider>
    </BrowserRouter>
  </StrictMode>
);
