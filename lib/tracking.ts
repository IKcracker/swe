export type ShipmentStatus =
  | "BOOKED"
  | "COLLECTED"
  | "IN_TRANSIT"
  | "AT_HUB"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "EXCEPTION"
  | "CANCELLED";

export type Shipment = {
  id: string;
  tracking_number: string;
  customer_reference: string | null;
  origin: string;
  destination: string;
  service_type: string;
  status: ShipmentStatus;
  current_location: string | null;
  estimated_delivery: string | null;
  recipient_name: string | null;
  recipient_email: string | null;
  recipient_phone: string | null;
  package_count: number;
  weight_kg: number | null;
  created_at: string;
  updated_at: string;
};

export type TrackingEvent = {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  title: string;
  description: string | null;
  location: string | null;
  event_time: string;
  created_at: string;
};

export type PublicShipment = Pick<
  Shipment,
  | "tracking_number"
  | "customer_reference"
  | "origin"
  | "destination"
  | "service_type"
  | "status"
  | "current_location"
  | "estimated_delivery"
  | "package_count"
  | "weight_kg"
  | "created_at"
  | "updated_at"
> & {
  events: TrackingEvent[];
};

const statusLabels: Record<ShipmentStatus, string> = {
  BOOKED: "Booked",
  COLLECTED: "Collected",
  IN_TRANSIT: "In transit",
  AT_HUB: "At hub",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  EXCEPTION: "Exception",
  CANCELLED: "Cancelled",
};

export function getStatusLabel(status: ShipmentStatus) {
  return statusLabels[status] ?? status;
}

export const shipmentStatuses = Object.keys(statusLabels) as ShipmentStatus[];

export function normalizeTrackingNumber(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function generateTrackingNumber() {
  const year = new Date().getFullYear();
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `SWR-${year}-${random}`;
}
