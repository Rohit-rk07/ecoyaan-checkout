"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  Object.entries(address).forEach(([key, value]) => {
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

export default function ShippingForm() {
  const router = useRouter();
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [formData, setFormData] = useState(
    shippingAddress || getEmptyAddress(),
  );
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateAddress(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setShippingAddress(formData);
    router.push("/checkout/payment");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel-strong)] p-5 shadow-[0_18px_40px_rgba(19,26,22,0.08)]"
    >
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
          Required
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
        Review payment step
      </button>
    </form>
  );
}
