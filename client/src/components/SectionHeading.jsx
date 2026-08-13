function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-brand-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-gray-600 dark:text-brand-gray sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
