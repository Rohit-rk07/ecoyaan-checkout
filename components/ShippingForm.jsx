"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

const fields = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "pinCode", label: "PIN Code", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
];

export default function ShippingForm() {
  const router = useRouter();
  const { address, setAddress } = useCheckout();
  const [formData, setFormData] = useState(
    address || {
      fullName: "",
      email: "",
      phone: "",
      pinCode: "",
      city: "",
      state: "",
    },
  );
  const [errors, setErrors] = useState({});

  const isValid = useMemo(() => {
    const nextErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!String(value).trim()) {
        nextErrors[key] = "This field is required";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      nextErrors.phone = "Phone must be 10 digits";
    }

    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      nextErrors.pinCode = "PIN must be 6 digits";
    }

    return {
      valid: Object.keys(nextErrors).length === 0,
      nextErrors,
    };
  }, [formData]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isValid.valid) {
      setErrors(isValid.nextErrors);
      return;
    }

    setErrors({});
    setAddress(formData);
    router.push("/checkout/payment");
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Shipping Address</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-1 text-sm text-zinc-700">
            {field.label}
            <input
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={onChange}
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none ring-zinc-900/20 focus:ring"
            />
            {errors[field.name] ? (
              <span className="text-xs text-red-600">{errors[field.name]}</span>
            ) : null}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
      >
        Continue to Payment
      </button>
    </form>
  );
}
