import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";
import { testimonials } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

// Duplicate testimonials for a seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

function TestimonialsSection() {
  const duration = duplicatedTestimonials.length * 2;
  const controls = useAnimationControls();

  const animation = useMemo(
    () => ({
      x: ["0%", `-${100 / 2}%`],
      transition: {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
      },
    }),
    [duration],
  );

  useEffect(() => {
    controls.start(animation);
  }, [controls, animation]);

  return (
    <section className="bg-white py-24 dark:bg-brand-black sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What our clients say"
          title="Trusted by homes and businesses."
          description="We are proud to deliver a service that earns the trust of our community. Here’s what some of our clients have to say about their experience."
        />
      </div>

      <motion.div
        className="mt-14 w-full overflow-hidden"
        onHoverStart={() => controls.stop()}
        onHoverEnd={() => controls.start(animation)}
      >
        <motion.div className="flex gap-8" animate={controls}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="w-[90vw] max-w-md flex-shrink-0 rounded-2xl border border-black/10 bg-gray-100 p-8 dark:border-white/10 dark:bg-brand-dark"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}${testimonial.image}`}
                  alt={`${testimonial.name}, customer testimonial for Girish Electrician Services`}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-brand-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-brand-gray">
                    {testimonial.service}
                  </p>
                </div>
              </div>
              <blockquote className="mt-6 leading-7 text-gray-600 dark:text-brand-gray">
                <p>“{testimonial.quote}”</p>
              </blockquote>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;
