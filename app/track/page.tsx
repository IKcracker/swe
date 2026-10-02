import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track a Shipment",
  description: "Use the SWE Red internal demo tracking interface.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const reference = ref?.trim();

  return (
    <main>
      <section className="track-page-section">
        <div className="container track-page-grid">
          <div className="track-page-copy">
            <p className="section-label">SWE Red track & trace</p>
            <h1>Track without an external courier link.</h1>
            <p>
              This self-contained demo interface is intentionally disconnected
              from the original company&apos;s tracking platform.
            </p>
          </div>

          <div className="track-page-card">
            <span>Demo shipment tracking</span>
            <h2>Enter a reference number</h2>
            <form action="/track" method="get">
              <label>
                <span className="sr-only">Reference number</span>
                <input name="ref" autoComplete="off" placeholder="e.g. RED-10294" defaultValue={reference} required />
              </label>
              <button type="submit">Check demo status <Arrow /></button>
            </form>

            {reference ? (
              <div className="demo-track-result">
                <small>Demo result</small>
                <strong>{reference.toUpperCase()}</strong>
                <p>Status: In transit</p>
                <span>This is sample proposal data, not a live shipment record.</span>
              </div>
            ) : (
              <p>Enter any reference to preview the proposed tracking experience.</p>
            )}
          </div>
        </div>
      </section>

      <section className="track-help-section">
        <div className="container track-help-grid">
          <div><p className="section-label">Production integration</p><h2>Connect the client&apos;s own tracking API at launch.</h2></div>
          <div><p>The finished system can use the client&apos;s approved courier, TMS or parcel-tracking provider without changing this user experience.</p><Link href="/contact" className="button button-dark">Contact setup <Arrow /></Link></div>
        </div>
      </section>
    </main>
  );
}
