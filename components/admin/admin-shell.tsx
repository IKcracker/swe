import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAdmin } from "@/app/admin/actions";

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" />
      <path d="M12 11v10" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h14v16H5z" />
      <path d="M8 8h8M8 12h6M8 16h4" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3M20 12h-3M12 20v-3M4 12h3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M13 11l6-6" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function AdminShell({
  title,
  description,
  section = "shipments",
  actions,
  children,
}: {
  title: string;
  description?: string;
  section?: "overview" | "shipments" | "quotes";
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Image
            src="/swe-red-logo.svg"
            alt="SWE Red"
            width={176}
            height={50}
            priority
          />
          <span>Operations</span>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          <Link
            href="/admin"
            className={section === "overview" ? "is-active" : undefined}
          >
            <GridIcon />
            <span>Overview</span>
          </Link>
          <Link
            href="/admin"
            className={section === "shipments" ? "is-active" : undefined}
          >
            <BoxIcon />
            <span>Shipments</span>
          </Link>
          <Link
            href="/admin/quotes"
            className={section === "quotes" ? "is-active" : undefined}
          >
            <QuoteIcon />
            <span>Quote requests</span>
          </Link>
          <Link href="/track" target="_blank">
            <RadarIcon />
            <span>Public tracking</span>
            <ExternalIcon />
          </Link>
          <Link href="/" target="_blank">
            <ExternalIcon />
            <span>View website</span>
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-badge">
            <span>OP</span>
            <div>
              <strong>Operations Admin</strong>
              <small>SWE Red</small>
            </div>
          </div>
          <form action={logoutAdmin}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-workspace-header">
          <div>
            <span className="admin-workspace-eyebrow">SWE Red Operations</span>
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>
          {actions ? <div className="admin-workspace-actions">{actions}</div> : null}
        </header>

        <div className="admin-workspace-body">{children}</div>
      </div>
    </div>
  );
}
