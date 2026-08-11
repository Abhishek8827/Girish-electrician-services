import { motion } from "framer-motion";
import { testimonials } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

// Duplicate testimonials for a seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

function TestimonialsSection() {
  const duration = duplicatedTestimonials.length * 5; // Adjust speed here (e.g., 5 seconds per testimonial)

  return (
    <section className="bg-brand-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What our clients say"
          title="Trusted by homes and businesses."
          description="We are proud to deliver a service that earns the trust of our community. Here’s what some of our clients have to say about their experience."
        />
      </div>

      <div className="mt-14 w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", `-${100 / 2}%`], // Move from start to the end of the first half
          }}
          transition={{
            ease: "linear",
            duration: duration,
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-white/10 bg-brand-dark p-8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}${testimonial.image}`}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-bold text-brand-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-brand-gray">
                    {testimonial.service}
                  </p>
                </div>
              </div>
              <blockquote className="mt-6 leading-7 text-brand-gray">
                <p>“{testimonial.quote}”</p>
              </blockquote>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
