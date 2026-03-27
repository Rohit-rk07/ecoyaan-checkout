"use client";

import { useMemo, useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Rohit Sharma",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "rohit@example.com",
  },
  { name: "phone", label: "Phone", type: "tel", placeholder: "9876543210" },
  { name: "pinCode", label: "PIN Code", type: "text", placeholder: "560001" },
  { name: "city", label: "City", type: "text", placeholder: "Bengaluru" },
  { name: "state", label: "State", type: "text", placeholder: "Karnataka" },
];

function getEmptyAddress() {
  return {
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  };
}

function validateAddress(address) {
  const nextErrors = {};

  Object.entries(getEmptyAddress()).forEach(([key]) => {
    const value = address[key];
    if (!String(value).trim()) {
      nextErrors[key] = "This field is required";
    }
  });

  if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
    nextErrors.email = "Use a valid email format";
  }

  if (address.phone && !/^\d{10}$/.test(address.phone)) {
    nextErrors.phone = "Use a 10 digit mobile number";
  }

  if (address.pinCode && !/^\d{6}$/.test(address.pinCode)) {
    nextErrors.pinCode = "Use a 6 digit PIN code";
  }

  return nextErrors;
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `addr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function ShippingForm() {
  const {
    shippingAddresses,
    selectedShippingAddressId,
    upsertShippingAddress,
    removeShippingAddress,
    selectShippingAddress,
  } = useCheckout();

  const selectedAddress = useMemo(() => {
    if (!selectedShippingAddressId) return null;
    return (
      shippingAddresses.find((address) => address.id === selectedShippingAddressId) ??
      null
    );
  }, [selectedShippingAddressId, shippingAddresses]);

  const [isEditorOpen, setIsEditorOpen] = useState(
    () => shippingAddresses.length === 0,
  );
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getEmptyAddress());
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startAdd = () => {
    setEditingId(null);
    setFormData(getEmptyAddress());
    setErrors({});
    setIsEditorOpen(true);
  };

  const startEdit = (address) => {
    setEditingId(address.id);
    setFormData({
      fullName: address.fullName ?? "",
      email: address.email ?? "",
      phone: address.phone ?? "",
      pinCode: address.pinCode ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
    });
    setErrors({});
    setIsEditorOpen(true);
  };

  const onDelete = (id) => {
    removeShippingAddress(id);

    if (selectedShippingAddressId === id) {
      const next = shippingAddresses.find((address) => address.id !== id);
      if (next) {
        selectShippingAddress(next.id);
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateAddress(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const id = editingId ?? createId();
    const addressToSave = { id, ...formData };

    upsertShippingAddress(addressToSave);
    selectShippingAddress(id);
    setIsEditorOpen(false);
  };

  return (
    <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-5 shadow-[0_18px_40px_rgba(19,26,22,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Shipping
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[color:var(--ink)]">
            Delivery address
          </h2>
        </div>
        <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">
          Saved on this device
        </span>
      </div>

      {shippingAddresses.length > 0 ? (
        <div className="mt-6 space-y-3">
          {shippingAddresses.map((address) => {
            const isSelected = address.id === selectedShippingAddressId;

            return (
              <div
                key={address.id}
                role="button"
                tabIndex={0}
                onClick={() => selectShippingAddress(address.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectShippingAddress(address.id);
                  }
                }}
                className={`group rounded-[24px] border px-4 py-4 transition ${
                  isSelected
                    ? "border-[color:var(--accent)] bg-[color:var(--surface)]"
                    : "border-[color:var(--border)] bg-white/40 hover:border-[color:var(--border-strong)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => selectShippingAddress(address.id)}
                    className="mt-1 grid h-5 w-5 place-items-center rounded-full border border-[color:var(--border-strong)] bg-white/70"
                    aria-label="Select address"
                  >
                    {isSelected ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" />
                    ) : null}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[color:var(--ink)]">
                      {address.fullName}
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {address.email} · {address.phone}
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {address.city}, {address.state} - {address.pinCode}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        startEdit(address);
                      }}
                      className="rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-1 text-xs font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--border-strong)] hover:text-[color:var(--ink)]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(address.id);
                      }}
                      className="rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-1 text-xs font-semibold text-[color:var(--danger)] transition hover:border-[color:var(--border-strong)]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-dashed border-[color:var(--border-strong)] bg-white/30 px-4 py-4 text-sm text-[color:var(--muted)]">
          Add at least one delivery address to continue.
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={startAdd}
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-white/70 px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--accent)]"
        >
          Add new address
        </button>

        {selectedAddress ? (
          <div className="text-xs text-[color:var(--muted)]">
            Selected:{" "}
            <span className="font-semibold text-[color:var(--ink)]">
              {selectedAddress.fullName}
            </span>
          </div>
        ) : (
          <div className="text-xs text-[color:var(--muted)]">
            Select an address to proceed.
          </div>
        )}
      </div>

      {isEditorOpen ? (
        <form onSubmit={onSubmit} className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[color:var(--ink)]">
              {editingId ? "Edit address" : "New address"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsEditorOpen(false);
                setErrors({});
              }}
              className="rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-1 text-xs font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--border-strong)]"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col gap-1.5 text-sm text-[color:var(--ink)]"
              >
                <span className="font-medium">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 outline-none transition placeholder:text-[color:var(--muted-soft)] focus:border-[color:var(--border-strong)]"
                />
                {errors[field.name] ? (
                  <span className="text-xs text-[color:var(--danger)]">
                    {errors[field.name]}
                  </span>
                ) : null}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[color:var(--ink)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-92"
          >
            {editingId ? "Update address" : "Save address"}
          </button>
        </form>
      ) : null}
    </section>
  );
}
