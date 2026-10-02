import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const resources = {
  "account-application": {
    title: "Account Application",
    description: "A proposal placeholder for customer account onboarding.",
    body: "The production version can capture company details, billing information, collection preferences and approved account terms supplied by the client.",
  },
  "shipping-guide": {
    title: "Shipping Guide",
    description: "A neutral shipment-preparation resource.",
    body: "The production version can include packaging guidance, weight and dimension rules, restricted items and service-specific preparation instructions approved by the client.",
  },
  "privacy-compliance": {
    title: "Privacy & Compliance",
    description: "A placeholder area for client-approved legal information.",
    body: "Before launch, replace this page with the client’s own privacy notice, POPIA information, PAIA material and any required regulatory disclosures.",
  },
  "cargo-care": {
    title: "Cargo Care Overview",
    description: "A neutral overview of a future claims and protection workflow.",
    body: "The production version can explain shipment protection, claims requirements, exclusions and supporting documentation using client-approved policy wording.",
  },
} as const;

type ResourceSlug = keyof typeof resources;

export function generateStaticParams() {
  return Object.keys(resources).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources[slug as ResourceSlug];
  return resource ? { title: resource.title, description: resource.description } : {};
}

export default async function DocumentResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources[slug as ResourceSlug];
  if (!resource) notFound();

  return (
    <main>
      <section className="inner-hero documents-hero">
        <div className="container inner-hero-grid">
          <div><p className="section-label">SWE Red resource</p><h1>{resource.title}</h1></div>
          <div className="inner-hero-copy"><p>{resource.description}</p></div>
        </div>
      </section>
      <section className="documents-section">
        <div className="container documents-layout">
          <aside><p className="section-label">Proposal placeholder</p><h2>Client-owned content at launch.</h2></aside>
          <div className="resource-detail-copy">
            <p>{resource.body}</p>
            <p className="quote-note">This content is original proposal copy and is not a reproduction of another company&apos;s document.</p>
            <Link href="/documents" className="button button-dark">Back to resources</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
