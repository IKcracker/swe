import { NextResponse } from "next/server";
import {
  getPublicShipmentByTrackingNumber,
  isDatabaseConfigured,
} from "@/lib/supabase-rest";
import { normalizeTrackingNumber } from "@/lib/tracking";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Tracking backend is not configured." },
      { status: 503 }
    );
  }

  const { trackingNumber } = await params;
  const normalized = normalizeTrackingNumber(trackingNumber);

  if (!normalized || normalized.length < 4) {
    return NextResponse.json(
      { error: "A valid tracking number is required." },
      { status: 400 }
    );
  }

  try {
    const shipment = await getPublicShipmentByTrackingNumber(normalized);

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { shipment },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Public tracking lookup failed", error);
    return NextResponse.json(
      { error: "Unable to retrieve shipment tracking right now." },
      { status: 500 }
    );
  }
}
