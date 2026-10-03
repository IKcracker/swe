export type QuoteStatus =
  | "NEW"
  | "REVIEWING"
  | "QUOTED"
  | "WON"
  | "LOST";

export type QuoteRequest = {
  id: string;
  quote_number: string;
  full_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  service_type: string;
  package_count: number;
  weight_kg: number | null;
  dimensions: string | null;
  preferred_collection_date: string | null;
  notes: string | null;
  status: QuoteStatus;
  quoted_amount: number | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export const quoteStatuses: QuoteStatus[] = [
  "NEW",
  "REVIEWING",
  "QUOTED",
  "WON",
  "LOST",
];

const statusLabels: Record<QuoteStatus, string> = {
  NEW: "New",
  REVIEWING: "Reviewing",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

export function getQuoteStatusLabel(status: QuoteStatus) {
  return statusLabels[status] ?? status;
}

export function generateQuoteNumber() {
  const year = new Date().getFullYear();
  const token = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `QTE-${year}-${token}`;
}
