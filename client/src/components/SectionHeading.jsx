function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant,
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-extrabold leading-tight sm:text-4xl ${variant === "dark" ? "text-brand-white" : "text-gray-900 dark:text-brand-white"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${variant === "dark" ? "text-brand-gray" : "text-gray-600 dark:text-brand-gray"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
