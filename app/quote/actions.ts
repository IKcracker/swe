"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createQuoteRequest } from "@/lib/supabase-rest";
import { generateQuoteNumber } from "@/lib/quotes";

function required(value: FormDataEntryValue | null, label: string) {
  const result = String(value ?? "").trim();
  if (!result) throw new Error(`${label} is required.`);
  return result;
}

function optional(value: FormDataEntryValue | null) {
  const result = String(value ?? "").trim();
  return result || null;
}

export async function submitQuoteRequest(formData: FormData) {
  // Basic honeypot for automated spam.
  if (String(formData.get("company_website") ?? "").trim()) {
    redirect("/quote?submitted=1");
  }

  const email = required(formData.get("email"), "Email");
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  const packageCount = Math.max(
    1,
    Number.parseInt(String(formData.get("package_count") ?? "1"), 10) || 1
  );
  const weightRaw = optional(formData.get("weight_kg"));
  const quoteNumber = generateQuoteNumber();

  await createQuoteRequest({
    quote_number: quoteNumber,
    full_name: required(formData.get("full_name"), "Full name"),
    company_name: optional(formData.get("company_name")),
    email,
    phone: required(formData.get("phone"), "Phone"),
    origin: required(formData.get("origin"), "Collection location"),
    destination: required(formData.get("destination"), "Delivery destination"),
    service_type: required(formData.get("service_type"), "Service type"),
    package_count: packageCount,
    weight_kg: weightRaw ? Number(weightRaw) : null,
    dimensions: optional(formData.get("dimensions")),
    preferred_collection_date: optional(formData.get("preferred_collection_date")),
    notes: optional(formData.get("notes")),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/quotes");

  redirect(`/quote?submitted=${encodeURIComponent(quoteNumber)}`);
}
