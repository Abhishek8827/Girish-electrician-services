import { AlertCircle, CheckCircle2, LoaderCircle, Upload } from "lucide-react";
import { useState } from "react";
import { submitServiceRequest } from "../api/serviceRequests";
import SectionHeading from "./SectionHeading";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  serviceType: "",
  propertyType: "",
  address: "",
  preferredDate: "",
  preferredTime: "",
  description: "",
  emergency: false,
  image: null,
};

const serviceTypes = [
  "Home wiring",
  "Office wiring",
  "Electrical repair",
  "Electrical panel / DB / MCB",
  "Lighting installation",
  "Fan, switch, or socket installation",
  "Safety inspection",
  "Emergency electrical support",
  "Other professional electrical service",
];

const propertyTypes = ["Home", "Apartment", "Office", "Shop", "Commercial property", "Construction site", "Other"];

function getToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function RequestCta() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [requestId, setRequestId] = useState("");

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;
    const nextValue = type === "checkbox" ? checked : type === "file" ? files[0] || null : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setServerMessage("");
  }

  function validateForm() {
    const nextErrors = {};
    const phonePattern = /^[0-9+()\-\s]{7,30}$/;

    if (form.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!phonePattern.test(form.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!form.serviceType) nextErrors.serviceType = "Choose a service type.";
    if (!form.propertyType) nextErrors.propertyType = "Choose a property type.";
    if (form.address.trim().length < 5) nextErrors.address = "Enter the service address.";
    if (!form.preferredDate || form.preferredDate < getToday()) nextErrors.preferredDate = "Choose today or a future date.";
    if (!form.preferredTime) nextErrors.preferredTime = "Choose a preferred time.";
    if (form.description.trim().length < 10) nextErrors.description = "Describe the issue in at least 10 characters.";
    if (form.image && (!form.image.type.match(/^image\/(jpeg|png|webp)$/) || form.image.size > 5 * 1024 * 1024)) {
      nextErrors.image = "Upload a JPG, PNG, or WebP image smaller than 5 MB.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image") {
        if (value) formData.append(key, value);
        return;
      }
      formData.append(key, String(value));
    });

    setIsSubmitting(true);
    setServerMessage("");

    try {
      const response = await submitServiceRequest(formData);
      setRequestId(response.requestId);
      setForm(initialForm);
    } catch (error) {
      const responseData = error.response?.data;
      setErrors(responseData?.errors || {});
      setServerMessage(responseData?.message || "We could not submit your request. Check that the service API is running and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAnotherRequest() {
    setRequestId("");
    setServerMessage("");
    setErrors({});
  }

  return (
    <section id="request-service" className="scroll-mt-24 bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-brand-yellow/30 bg-brand-black px-7 py-12 sm:px-12">
          <SectionHeading
            eyebrow="Professional support"
            title="Request a professional electrician."
            description="Share the essentials and preferred timing. We will use these details to understand your request before arranging the next step."
          />

          {requestId ? (
            <div className="mt-10 max-w-2xl rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-7" role="status">
              <CheckCircle2 size={34} className="text-brand-yellow" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold text-brand-white">Request received.</h3>
              <p className="mt-3 leading-7 text-brand-gray">
                Your reference is <strong className="text-brand-white">{requestId}</strong>. Keep it for future communication about this request.
              </p>
              <button type="button" onClick={startAnotherRequest} className="mt-6 rounded-full border border-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-yellow hover:bg-brand-yellow hover:text-brand-black">
                Submit another request
              </button>
            </div>
          ) : (
            <form className="mt-10 grid gap-6" onSubmit={handleSubmit} noValidate>
              {serverMessage && (
                <div className="flex gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-6 text-red-100" role="alert">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {serverMessage}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input id="name" name="name" value={form.name} onChange={handleChange} autoComplete="name" className="field" aria-invalid={Boolean(errors.name)} />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <input id="phone" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" inputMode="tel" className="field" aria-invalid={Boolean(errors.phone)} />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" className="field" aria-invalid={Boolean(errors.email)} />
                </Field>
                <Field label="Service type" error={errors.serviceType}>
                  <select id="serviceType" name="serviceType" value={form.serviceType} onChange={handleChange} className="field" aria-invalid={Boolean(errors.serviceType)}>
                    <option value="">Choose a service</option>
                    {serviceTypes.map((service) => <option key={service}>{service}</option>)}
                  </select>
                </Field>
                <Field label="Property type" error={errors.propertyType}>
                  <select id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange} className="field" aria-invalid={Boolean(errors.propertyType)}>
                    <option value="">Choose a property type</option>
                    {propertyTypes.map((property) => <option key={property}>{property}</option>)}
                  </select>
                </Field>
                <Field label="Preferred date" error={errors.preferredDate}>
                  <input id="preferredDate" name="preferredDate" type="date" min={getToday()} value={form.preferredDate} onChange={handleChange} className="field" aria-invalid={Boolean(errors.preferredDate)} />
                </Field>
                <Field label="Preferred time" error={errors.preferredTime}>
                  <input id="preferredTime" name="preferredTime" type="time" value={form.preferredTime} onChange={handleChange} className="field" aria-invalid={Boolean(errors.preferredTime)} />
                </Field>
                <Field label="Optional image" error={errors.image} hint="JPG, PNG, or WebP — max 5 MB">
                  <label htmlFor="image" className="field flex cursor-pointer items-center gap-3">
                    <Upload size={18} className="text-brand-yellow" aria-hidden="true" />
                    <span className="truncate">{form.image ? form.image.name : "Choose an image"}</span>
                    <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="sr-only" />
                  </label>
                </Field>
              </div>

              <Field label="Service address" error={errors.address}>
                <input id="address" name="address" value={form.address} onChange={handleChange} autoComplete="street-address" className="field" aria-invalid={Boolean(errors.address)} />
              </Field>
              <Field label="Describe the electrical issue" error={errors.description} hint="Please do not touch live wires or attempt a repair before a professional assessment.">
                <textarea id="description" name="description" rows="5" value={form.description} onChange={handleChange} className="field resize-y" aria-invalid={Boolean(errors.description)} />
              </Field>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-brand-dark p-4 text-sm leading-6 text-brand-gray">
                <input name="emergency" type="checkbox" checked={form.emergency} onChange={handleChange} className="mt-1 h-4 w-4 accent-brand-yellow" />
                <span><strong className="text-brand-white">This is an urgent electrical issue.</strong> If there is immediate danger, keep clear of the area and contact emergency services where appropriate.</span>
              </label>

              <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-7 py-4 text-base font-bold text-brand-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {isSubmitting ? <><LoaderCircle size={20} className="animate-spin" aria-hidden="true" /> Sending request…</> : "Submit service request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, hint, error, children }) {
  const control = children.props;
  const inputId = control.id || control.htmlFor;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-bold text-brand-white">{label}</label>
      {children}
      {hint && <p className="mt-2 text-xs leading-5 text-brand-gray">{hint}</p>}
      {error && <p id={errorId} className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
}

export default RequestCta;
