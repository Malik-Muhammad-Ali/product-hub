// One-off provisioning script — run once via `npm run provision`.
// Uses the service role key, which must never be imported into app code.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Brocommerce@123";
const BUCKET_NAME = "blog-images";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Run with: node --env-file=.env scripts/create-admin.mjs"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function ensureBucket() {
  const { data: existing, error: getError } = await supabase.storage.getBucket(BUCKET_NAME);
  if (existing) {
    console.log(`Bucket "${BUCKET_NAME}" already exists — skipping.`);
    return;
  }
  if (getError && !/not found/i.test(getError.message)) {
    throw getError;
  }
  const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: true,
  });
  if (createError) throw createError;
  console.log(`Created public bucket "${BUCKET_NAME}".`);
}

async function ensureAdminUser() {
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;

  const existing = data.users.find((user) => user.email === ADMIN_EMAIL);
  if (existing) {
    console.log(`Admin user "${ADMIN_EMAIL}" already exists — skipping.`);
    return;
  }

  const { error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });
  if (createError) throw createError;
  console.log(`Created admin user "${ADMIN_EMAIL}".`);
}

await ensureBucket();
await ensureAdminUser();
console.log("Provisioning complete.");
