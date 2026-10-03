import type { PublicShipment, Shipment, TrackingEvent } from "@/lib/tracking";
import { normalizeTrackingNumber } from "@/lib/tracking";

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

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
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  if (prefer) headers.set("Prefer", prefer);

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Database request failed (${response.status}): ${body}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));
}

export async function listShipments(limit = 100) {
  return request<Shipment[]>(
    `shipments?select=*&order=created_at.desc&limit=${Math.max(1, Math.min(limit, 250))}`
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
    `shipments?select=*&tracking_number=eq.${encodeURIComponent(normalized)}&limit=1`
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
