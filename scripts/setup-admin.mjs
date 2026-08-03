import "dotenv/config";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!supabaseUrl || !anonKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

if (!email || !password) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  process.exit(1);
}

const anonHeaders = {
  apikey: anonKey,
  "Content-Type": "application/json",
};

function adminHeaders() {
  if (!serviceRoleKey) return null;
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

async function signIn() {
  const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: anonHeaders,
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

async function signUp() {
  const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: anonHeaders,
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

async function findUserByEmail() {
  const headers = adminHeaders();
  if (!headers) return null;

  const res = await fetch(
    `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email.eq.${email}`)}`,
    { headers }
  );
  const data = await res.json();
  if (!res.ok) {
    console.error("Admin list users failed:", data.msg || data.error_description || data);
    return null;
  }
  return data.users?.[0] ?? null;
}

async function confirmUser(userId) {
  const headers = adminHeaders();
  if (!headers) return false;

  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ email_confirm: true }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Confirm user failed:", data.msg || data.error_description || data);
    return false;
  }
  return true;
}

async function createConfirmedUser() {
  const headers = adminHeaders();
  if (!headers) return false;

  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Admin create user failed:", data.msg || data.error_description || data);
    return false;
  }
  return true;
}

async function updateUserPassword(userId) {
  const headers = adminHeaders();
  if (!headers) return false;

  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      password,
      email_confirm: true,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Update user failed:", data.msg || data.error_description || data);
    return false;
  }
  return true;
}

async function ensureConfirmedWithServiceRole() {
  if (!serviceRoleKey) return false;

  console.log("Using service role to confirm admin user...");
  const existing = await findUserByEmail();

  if (existing) {
    await updateUserPassword(existing.id);
    console.log(`Updated and confirmed existing user: ${email}`);
  } else {
    const created = await createConfirmedUser();
    if (!created) return false;
    console.log(`Created confirmed admin user: ${email}`);
  }

  const retry = await signIn();
  return retry.ok;
}

const signInResult = await signIn();
if (signInResult.ok) {
  console.log(`Admin login works for ${email}`);
  process.exit(0);
}

console.log("Sign in failed:", signInResult.data.msg || signInResult.data.error_description);

if (serviceRoleKey) {
  const fixed = await ensureConfirmedWithServiceRole();
  if (fixed) {
    console.log(`Admin ready. Login with ${email}`);
    process.exit(0);
  }
  process.exit(1);
}

console.log("Creating admin account via signup...");
const signUpResult = await signUp();
if (!signUpResult.ok) {
  const msg = signUpResult.data.msg || signUpResult.data.error_description || "";
  if (msg.toLowerCase().includes("already registered")) {
    console.log("User already exists but login failed.");
    console.log("\nFix manually (30 seconds):");
    console.log(`https://supabase.com/dashboard/project/mswvipiyvujlpsuudzny/auth/users`);
    console.log("Open user -> Confirm user");
    console.log("\nOr add SUPABASE_SERVICE_ROLE_KEY to .env and run: npm run admin:setup");
  } else {
    console.error("Sign up failed:", msg);
  }
  process.exit(1);
}

const retry = await signIn();
if (retry.ok) {
  console.log(`Admin account ready. Login with ${email}`);
  process.exit(0);
}

console.log("Account exists but email is not confirmed.");
console.log("\nOption 1 - Dashboard (fastest):");
console.log(`https://supabase.com/dashboard/project/mswvipiyvujlpsuudzny/auth/users`);
console.log("Click synaryverse@gmail.com -> Confirm user");
console.log("\nOption 2 - Auto fix:");
console.log("Supabase -> Project Settings -> API -> service_role key");
console.log("Add SUPABASE_SERVICE_ROLE_KEY to .env, then run: npm run admin:setup");
process.exit(1);
