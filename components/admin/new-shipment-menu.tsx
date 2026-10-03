import { createShipmentAction } from "@/app/admin/actions";
import { getStatusLabel, shipmentStatuses } from "@/lib/tracking";

export function NewShipmentMenu({
  configured = true,
}: {
  configured?: boolean;
}) {
  return (
    <details className="admin-create-menu">
      <summary>+ New shipment</summary>

      <div className="admin-create-popover">
        <div className="admin-create-popover-head">
          <div>
            <span>New shipment</span>
            <h2>Create tracking record</h2>
          </div>
          <small>Tracking number can be generated automatically.</small>
        </div>

        <form
          action={createShipmentAction}
          className="admin-form-grid admin-create-form"
        >
          <label>
            <span>Tracking number</span>
            <input
              name="tracking_number"
              placeholder="Leave blank to auto-generate"
            />
          </label>

          <label>
            <span>Customer reference</span>
            <input
              name="customer_reference"
              placeholder="PO / order / reference"
            />
          </label>

          <label>
            <span>Origin *</span>
            <input name="origin" required placeholder="Johannesburg" />
          </label>

          <label>
            <span>Destination *</span>
            <input name="destination" required placeholder="Cape Town" />
          </label>

          <label>
            <span>Service type *</span>
            <select name="service_type" defaultValue="Next Day Express" required>
              <option>Same Day Express</option>
              <option>Next Day Express</option>
              <option>Priority Delivery</option>
              <option>Economy</option>
              <option>Road Freight</option>
              <option>International Air Freight</option>
              <option>Cross-Border Road Freight</option>
            </select>
          </label>

          <label>
            <span>Initial status *</span>
            <select name="status" defaultValue="BOOKED">
              {shipmentStatuses.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Current location</span>
            <input name="current_location" placeholder="Johannesburg Hub" />
          </label>

          <label>
            <span>Estimated delivery</span>
            <input name="estimated_delivery" type="datetime-local" />
          </label>

          <label>
            <span>Recipient name</span>
            <input name="recipient_name" />
          </label>

          <label>
            <span>Recipient email</span>
            <input name="recipient_email" type="email" />
          </label>

          <label>
            <span>Recipient phone</span>
            <input name="recipient_phone" />
          </label>

          <label>
            <span>Packages</span>
            <input
              name="package_count"
              type="number"
              min="1"
              defaultValue="1"
            />
          </label>

          <label>
            <span>Weight (kg)</span>
            <input name="weight_kg" type="number" min="0" step="0.01" />
          </label>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={!configured}
          >
            Create shipment
          </button>
        </form>
      </div>
    </details>
  );
}
