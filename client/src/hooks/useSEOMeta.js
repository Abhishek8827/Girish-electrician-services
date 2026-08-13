import { useEffect } from "react";

/**
 * Hook for managing page-specific meta tags and SEO
 * Updates document head with provided meta information
 */
export function useSEOMeta(config = {}) {
  const {
    title = "Girish Electrician Services | Professional Electrical Solutions",
    description = "Licensed electrician with 15+ years experience. Professional electrical installation, repair & maintenance in Nepanagar, MP.",
    ogTitle,
    ogDescription,
    ogImage = "https://abhishek8827.github.io/Girish-electrician-services/electrician.png",
    canonical,
    noindex = false,
  } = config;

  useEffect(() => {
    // Update page title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = noindex ? "noindex, nofollow" : "index, follow";

    // Update Open Graph tags
    updateOrCreateMetaTag("property", "og:title", ogTitle || title);
    updateOrCreateMetaTag(
      "property",
      "og:description",
      ogDescription || description,
    );
    updateOrCreateMetaTag("property", "og:image", ogImage);

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    // Update Twitter Card tags
    updateOrCreateMetaTag("name", "twitter:title", ogTitle || title);
    updateOrCreateMetaTag(
      "name",
      "twitter:description",
      ogDescription || description,
    );
    updateOrCreateMetaTag("name", "twitter:image", ogImage);
  }, [title, description, ogTitle, ogDescription, ogImage, canonical, noindex]);
}

/**
 * Helper function to update or create meta tags
 */
function updateOrCreateMetaTag(attrType, attrValue, content) {
  const selector =
    attrType === "property"
      ? `meta[property="${attrValue}"]`
      : `meta[name="${attrValue}"]`;

  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (attrType === "property") {
      tag.setAttribute("property", attrValue);
    } else {
      tag.setAttribute("name", attrValue);
    }
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/**
 * Generate structured data for FAQ section
 */
export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate structured data for reviews/testimonials
 */
export function generateReviewSchema(reviews) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Inject structured data into page
 */
export function injectStructuredData(schema) {
  if (!schema) return;

  let script = document.querySelector(
    'script[data-schema-id="' + schema["@type"] + '"]',
  );
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema-id", schema["@type"]);
    document.head.appendChild(script);
  }
  script.innerHTML = JSON.stringify(schema);
}
