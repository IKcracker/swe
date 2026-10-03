import type { PublicShipment, Shipment, TrackingEvent } from "@/lib/tracking";
import type { QuoteRequest } from "@/lib/quotes";
import { normalizeTrackingNumber } from "@/lib/tracking";

function normalizeSupabaseApiUrl(value?: string) {
  const raw = value?.trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }

  if (/^postgres(?:ql)?:\/\//i.test(raw)) {
    const parsed = new URL(raw);
    const directMatch = parsed.hostname.match(
      /^db\.([a-z0-9]+)\.supabase\.co$/i
    );

    if (directMatch?.[1]) {
      return `https://${directMatch[1]}.supabase.co`;
    }

    const username = decodeURIComponent(parsed.username);
    const projectRef = username.includes(".")
      ? username.split(".").pop()
      : undefined;

    if (projectRef && /^[a-z0-9]+$/i.test(projectRef)) {
      return `https://${projectRef}.supabase.co`;
    }

    throw new Error(
      "SUPABASE_URL is a Postgres connection string. Set it to the Supabase Project URL, for example https://<project-ref>.supabase.co."
    );
  }

  throw new Error(
    "SUPABASE_URL must be the Supabase Project URL, for example https://<project-ref>.supabase.co."
  );
}

function getConfig() {
  const url = normalizeSupabaseApiUrl(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Tracking backend is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY."
    );
  }

  return { url, key };
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  prefer?: string
): Promise<T> {
  const { url, key } = getConfig();
  const headers = new Headers(init.headers);

  headers.set("apikey", key);
  headers.set("Content-Type", "application/json");

  // New sb_secret_ keys are API keys, not JWTs. Sending them as Bearer
  // tokens makes the Data API reject them as invalid JWTs.
  if (!key.startsWith("sb_secret_") && !key.startsWith("sb_publishable_")) {
    headers.set("Authorization", `Bearer ${key}`);
  }

  if (prefer) headers.set("Prefer", prefer);

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Supabase Data API request failed (${response.status}): ${body}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function isDatabaseConfigured() {
  try {
    const url = normalizeSupabaseApiUrl(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    );
    const key =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    return Boolean(url && key);
  } catch {
    return false;
  }
}

export async function listShipments(limit = 100) {
  return request<Shipment[]>(
    `shipments?select=*&order=created_at.desc&limit=${Math.max(
      1,
      Math.min(limit, 250)
    )}`
  );
}

export async function getShipmentById(id: string) {
  const rows = await request<Shipment[]>(
    `shipments?select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function getShipmentEvents(shipmentId: string) {
  return request<TrackingEvent[]>(
    `tracking_events?select=*&shipment_id=eq.${encodeURIComponent(
      shipmentId
    )}&order=event_time.desc`
  );
}

export async function getPublicShipmentByTrackingNumber(
  trackingNumber: string
): Promise<PublicShipment | null> {
  const normalized = normalizeTrackingNumber(trackingNumber);
  const shipments = await request<Shipment[]>(
    `shipments?select=*&tracking_number=eq.${encodeURIComponent(
      normalized
    )}&limit=1`
  );
  const shipment = shipments[0];
  if (!shipment) return null;

  const events = await getShipmentEvents(shipment.id);

  const {
    recipient_name: _recipientName,
    recipient_email: _recipientEmail,
    recipient_phone: _recipientPhone,
    id: _id,
    ...publicFields
  } = shipment;

  return { ...publicFields, events };
}

export async function createShipment(input: {
  tracking_number: string;
  customer_reference?: string | null;
  origin: string;
  destination: string;
  service_type: string;
  status: Shipment["status"];
  current_location?: string | null;
  estimated_delivery?: string | null;
  recipient_name?: string | null;
  recipient_email?: string | null;
  recipient_phone?: string | null;
  package_count?: number;
  weight_kg?: number | null;
}) {
  const rows = await request<Shipment[]>(
    "shipments",
    {
      method: "POST",
      body: JSON.stringify({
        ...input,
        tracking_number: normalizeTrackingNumber(input.tracking_number),
      }),
    },
    "return=representation"
  );

  return rows[0];
}

export async function updateShipment(
  id: string,
  patch: Partial<
    Pick<
      Shipment,
      | "customer_reference"
      | "origin"
      | "destination"
      | "service_type"
      | "status"
      | "current_location"
      | "estimated_delivery"
      | "recipient_name"
      | "recipient_email"
      | "recipient_phone"
      | "package_count"
      | "weight_kg"
    >
  >
) {
  const rows = await request<Shipment[]>(
    `shipments?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(patch),
    },
    "return=representation"
  );

  return rows[0] ?? null;
}

export async function createTrackingEvent(input: {
  shipment_id: string;
  status: Shipment["status"];
  title: string;
  description?: string | null;
  location?: string | null;
  event_time?: string;
}) {
  const rows = await request<TrackingEvent[]>(
    "tracking_events",
    {
      method: "POST",
      body: JSON.stringify({
        ...input,
        event_time: input.event_time ?? new Date().toISOString(),
      }),
    },
    "return=representation"
  );

  return rows[0];
}


export async function createQuoteRequest(input: {
  quote_number: string;
  full_name: string;
  company_name?: string | null;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  service_type: string;
  package_count?: number;
  weight_kg?: number | null;
  dimensions?: string | null;
  preferred_collection_date?: string | null;
  notes?: string | null;
}) {
  const rows = await request<QuoteRequest[]>(
    "quote_requests",
    {
      method: "POST",
      body: JSON.stringify({
        ...input,
        status: "NEW",
      }),
    },
    "return=representation"
  );

  return rows[0];
}

export async function listQuoteRequests(limit = 250) {
  return request<QuoteRequest[]>(
    `quote_requests?select=*&order=created_at.desc&limit=${Math.max(
      1,
      Math.min(limit, 500)
    )}`
  );
}

export async function getQuoteRequestById(id: string) {
  const rows = await request<QuoteRequest[]>(
    `quote_requests?select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function updateQuoteRequest(
  id: string,
  patch: Partial<
    Pick<
      QuoteRequest,
      "status" | "quoted_amount" | "admin_notes"
    >
  >
) {
  const rows = await request<QuoteRequest[]>(
    `quote_requests?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(patch),
    },
    "return=representation"
  );

  return rows[0] ?? null;
}
