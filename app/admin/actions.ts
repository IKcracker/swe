"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getAdminCookieName,
  requireAdmin,
} from "@/lib/admin-auth";
import {
  createShipment,
  createTrackingEvent,
  updateShipment,
} from "@/lib/supabase-rest";
import {
  generateTrackingNumber,
  shipmentStatuses,
  type ShipmentStatus,
} from "@/lib/tracking";

function optionalString(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  return normalized || null;
}

function requiredString(value: FormDataEntryValue | null, field: string) {
  const normalized = String(value ?? "").trim();
  if (!normalized) throw new Error(`${field} is required.`);
  return normalized;
}

function statusFromForm(value: FormDataEntryValue | null): ShipmentStatus {
  const status = String(value ?? "") as ShipmentStatus;
  if (!shipmentStatuses.includes(status)) {
    throw new Error("Invalid shipment status.");
  }
  return status;
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(getAdminCookieName());
  redirect("/admin/login");
}

export async function createShipmentAction(formData: FormData) {
  await requireAdmin();

  const trackingNumber =
    optionalString(formData.get("tracking_number")) ?? generateTrackingNumber();
  const status = statusFromForm(formData.get("status") || "BOOKED");
  const packageCount = Math.max(
    1,
    Number.parseInt(String(formData.get("package_count") ?? "1"), 10) || 1
  );
  const weightRaw = optionalString(formData.get("weight_kg"));

  const shipment = await createShipment({
    tracking_number: trackingNumber,
    customer_reference: optionalString(formData.get("customer_reference")),
    origin: requiredString(formData.get("origin"), "Origin"),
    destination: requiredString(formData.get("destination"), "Destination"),
    service_type: requiredString(formData.get("service_type"), "Service type"),
    status,
    current_location: optionalString(formData.get("current_location")),
    estimated_delivery: optionalString(formData.get("estimated_delivery")),
    recipient_name: optionalString(formData.get("recipient_name")),
    recipient_email: optionalString(formData.get("recipient_email")),
    recipient_phone: optionalString(formData.get("recipient_phone")),
    package_count: packageCount,
    weight_kg: weightRaw ? Number(weightRaw) : null,
  });

  await createTrackingEvent({
    shipment_id: shipment.id,
    status,
    title: "Shipment created",
    description: "Shipment was created in the SWE Red tracking system.",
    location: shipment.current_location || shipment.origin,
  });

  revalidatePath("/admin");
  redirect(`/admin/shipments/${shipment.id}`);
}

export async function updateShipmentAction(formData: FormData) {
  await requireAdmin();

  const shipmentId = requiredString(formData.get("shipment_id"), "Shipment ID");
  const status = statusFromForm(formData.get("status"));
  const eventTitle = requiredString(formData.get("event_title"), "Event title");
  const location = optionalString(formData.get("current_location"));
  const description = optionalString(formData.get("event_description"));
  const estimatedDelivery = optionalString(formData.get("estimated_delivery"));

  await updateShipment(shipmentId, {
    status,
    current_location: location,
    estimated_delivery: estimatedDelivery,
  });

  await createTrackingEvent({
    shipment_id: shipmentId,
    status,
    title: eventTitle,
    description,
    location,
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath("/track");
  redirect(`/admin/shipments/${shipmentId}?updated=1`);
}
