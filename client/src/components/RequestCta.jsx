import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import {
  MdCheckCircleOutline,
  MdContentCopy,
  MdCheck,
  MdErrorOutline,
  MdFileUpload,
} from "react-icons/md";
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

const propertyTypes = [
  "Home",
  "Apartment",
  "Office",
  "Shop",
  "Commercial property",
  "Construction site",
  "Other",
];

function getToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function RequestCta({ initialServiceType }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [requestId, setRequestId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;
    const nextValue =
      type === "checkbox"
        ? checked
        : type === "file"
          ? files[0] || null
          : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setServerMessage("");
  }

  function validateForm() {
    const nextErrors = {};
    const phonePattern = /^[0-9+()\-\s]{7,30}$/;

    if (form.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!phonePattern.test(form.phone.trim()))
      nextErrors.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!form.serviceType) nextErrors.serviceType = "Choose a service type.";
    if (!form.propertyType) nextErrors.propertyType = "Choose a property type.";
    if (form.address.trim().length < 5)
      nextErrors.address = "Enter the service address.";
    if (!form.preferredDate || form.preferredDate < getToday())
      nextErrors.preferredDate = "Choose today or a future date.";
    if (!form.preferredTime)
      nextErrors.preferredTime = "Choose a preferred time.";
    if (form.description.trim().length < 10)
      nextErrors.description = "Describe the issue in at least 10 characters.";
    if (
      form.image &&
      (!form.image.type.match(/^image\/(jpeg|png|webp)$/) ||
        form.image.size > 5 * 1024 * 1024)
    ) {
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
      setServerMessage(
        responseData?.message ||
          "We could not submit your request. Check that the service API is running and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAnotherRequest() {
    setRequestId("");
    setServerMessage("");
    setErrors({});
    setIsCopied(false);
  }

  function handleCopy() {
    if (!requestId) return;
    navigator.clipboard.writeText(requestId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  useEffect(() => {
    if (initialServiceType) {
      // Find the option that most closely matches the category title
      const matchingOption = serviceTypes.find((option) =>
        initialServiceType
          .toLowerCase()
          .includes(option.split(" ")[0].toLowerCase()),
      );

      setForm((current) => ({
        ...current,
        serviceType: matchingOption || initialServiceType,
      }));
      // Focus the element to bring it into view for the user
      document.getElementById("serviceType")?.focus();
    }
  }, [initialServiceType]);

  return (
    <motion.section
      id="request-service"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
      className="scroll-mt-24 bg-gray-100 py-24 dark:bg-brand-dark sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-brand-yellow/30 bg-white px-8 py-14 dark:bg-brand-black sm:px-14">
          {" "}
          {/* Increased padding */}
          <SectionHeading
            eyebrow="Professional support"
            title="Request a professional electrician."
            description="Share the essentials and preferred timing. We will use these details to understand your request before arranging the next step."
          />
          {requestId ? (
            <div
              className="mt-12 max-w-3xl rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-8"
              role="status"
            >
              <MdCheckCircleOutline
                size={34}
                className="text-brand-yellow"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-3xl font-bold text-gray-900 dark:text-brand-white">
                {" "}
                {/* Increased font size */}
                Request received.
              </h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-brand-gray">
                  Your reference ID
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <strong className="text-xl font-bold text-gray-800 dark:text-brand-white">
                    {requestId}
                  </strong>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex w-24 items-center justify-center gap-2 rounded-full border border-brand-yellow/50 px-3 py-1.5 text-xs font-bold text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-brand-black"
                  >
                    {isCopied ? (
                      <>
                        <MdCheck size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <MdContentCopy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm leading-8 text-gray-600 dark:text-brand-gray">
                  Keep this ID for future communication about your request.
                </p>
              </div>

              <button
                type="button"
                onClick={startAnotherRequest}
                className="mt-6 rounded-full border border-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-yellow hover:bg-brand-yellow hover:text-brand-black"
              >
                {" "}
                {/* Increased padding */}
                Submit another request
              </button>
            </div>
          ) : (
            <form
              className="mt-10 grid gap-6"
              onSubmit={handleSubmit}
              noValidate // Increased gap for form fields
            >
              {serverMessage && (
                <div
                  className="flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm leading-6 text-red-700 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-100"
                  role="alert"
                >
                  <MdErrorOutline
                    size={20}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  {serverMessage}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input // Increased input padding
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="field"
                    aria-invalid={Boolean(errors.name)}
                  />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <input // Increased input padding
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    className="field"
                    aria-invalid={Boolean(errors.phone)}
                  />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <input // Increased input padding
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="field"
                    aria-invalid={Boolean(errors.email)}
                  />
                </Field>
                <Field label="Service type" error={errors.serviceType}>
                  <select // Increased select padding
                    id="serviceType"
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className="field"
                    aria-invalid={Boolean(errors.serviceType)}
                  >
                    <option value="">Choose a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Property type" error={errors.propertyType}>
                  <select // Increased select padding
                    id="propertyType"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className="field"
                    aria-invalid={Boolean(errors.propertyType)}
                  >
                    <option value="">Choose a property type</option>
                    {propertyTypes.map((property) => (
                      <option key={property}>{property}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred date" error={errors.preferredDate}>
                  <input // Increased input padding
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={getToday()} // Explicitly set min date to prevent past date selection
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="field"
                    aria-invalid={Boolean(errors.preferredDate)}
                  />
                </Field>
                <Field label="Preferred time" error={errors.preferredTime}>
                  <input // Increased input padding
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="field"
                    aria-invalid={Boolean(errors.preferredTime)}
                  />
                </Field>
                <Field
                  label="Optional image"
                  error={errors.image}
                  hint="JPG, PNG, or WebP — max 5 MB"
                >
                  <label
                    htmlFor="image"
                    className="field flex cursor-pointer items-center gap-3" // Increased input padding
                  >
                    <MdFileUpload
                      size={18}
                      className="text-brand-yellow"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {form.image ? form.image.name : "Choose an image"}
                    </span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                </Field>
              </div>

              <Field label="Service address" error={errors.address}>
                <input // Increased input padding
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  className="field"
                  aria-invalid={Boolean(errors.address)}
                />
              </Field>
              <Field
                label="Describe the electrical issue"
                error={errors.description}
                hint="Please do not touch live wires or attempt a repair before a professional assessment." // Increased hint font size
              >
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  className="field resize-y"
                  aria-invalid={Boolean(errors.description)}
                />
              </Field>

              <label className="flex items-start gap-3 rounded-xl border border-black/10 bg-gray-100 p-5 text-base leading-7 text-gray-600 dark:border-white/10 dark:bg-brand-dark dark:text-brand-gray">
                {" "}
                {/* Increased padding, font size, and line-height */}
                <input
                  name="emergency"
                  type="checkbox"
                  checked={form.emergency}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-brand-yellow"
                />
                <span>
                  <strong className="text-gray-800 dark:text-brand-white">
                    This is an urgent electrical issue.
                  </strong>{" "}
                  If there is immediate danger, keep clear of the area and
                  contact emergency services where appropriate.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-8 py-4.5 text-lg font-bold text-brand-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" // Increased padding and font size
              >
                {isSubmitting ? (
                  <>
                    <CgSpinner
                      size={20}
                      className="animate-spin"
                      aria-hidden="true"
                    />{" "}
                    Sending request…
                  </>
                ) : (
                  "Submit service request"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function Field({ label, hint, error, children }) {
  const inputId = children.props.id || children.props.htmlFor;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ");

  return (
    <div>
      <label // Increased label font size
        htmlFor={inputId}
        className="mb-2 block text-base font-bold text-gray-900 dark:text-brand-white"
      >
        {label}
      </label>
      {React.cloneElement(children, {
        "aria-describedby": describedBy || undefined,
      })}
      {hint && (
        <p
          id={hintId}
          className="mt-2 text-sm leading-6 text-gray-600 dark:text-brand-gray"
        >
          {hint}
        </p>
      )}{" "}
      {/* Increased hint font size and line-height */}
      {error && ( // Increased error font size
        <p
          id={errorId}
          className="mt-2 text-base text-red-600 dark:text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default RequestCta;
