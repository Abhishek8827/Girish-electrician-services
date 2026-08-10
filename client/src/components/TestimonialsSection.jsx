import { motion, useMotionValue, useTransform } from "framer-motion";
import { testimonials } from "../data/siteContent";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

function TestimonialCard({ testimonial, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.figure
      key={testimonial.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col rounded-2xl border border-white/10 bg-brand-black p-8 [transform-style:preserve-3d]"
    >
      <blockquote
        className="flex-grow text-lg leading-8 text-brand-gray"
        style={{ transform: "translateZ(30px)" }}
      >
        <FaQuoteLeft
          className="mb-4 h-8 w-8 text-brand-yellow"
          aria-hidden="true"
        />
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption
        className="mt-8 border-t border-white/10 pt-6"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}${testimonial.image}`}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover bg-brand-dark"
          />
          <div>
            <div className="font-bold text-brand-white">{testimonial.name}</div>
            <div className="mt-1 text-sm text-brand-yellow">
              {testimonial.service}
            </div>
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

function TestimonialsSection() {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-24 bg-brand-dark py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Subtle Background Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#facc15 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <SectionHeading
          eyebrow="Client feedback"
          title="Trusted by homes and businesses."
          description="We are proud to deliver a service that earns the trust of our clients. Here is what some of them have to say."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TestimonialsSection;
