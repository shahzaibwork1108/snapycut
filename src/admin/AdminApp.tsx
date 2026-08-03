import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminOverview from "./pages/AdminOverview";
import SeoSettingsPage from "./pages/SeoSettingsPage";
import SectionEditorPage from "./pages/SectionEditorPage";
import TestimonialsManagerPage from "./pages/TestimonialsManagerPage";
import ClientSayManagerPage from "./pages/ClientSayManagerPage";
import { Loader2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="text-[#c1eb40] animate-spin" size={32} />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AuthGuard>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="section/:sectionKey" element={<SectionEditorPage />} />
          <Route path="seo" element={<SeoSettingsPage />} />
          <Route path="testimonials" element={<TestimonialsManagerPage />} />
          <Route path="client-say" element={<ClientSayManagerPage />} />
        </Route>
      </Routes>
    </AuthGuard>
  );
}
