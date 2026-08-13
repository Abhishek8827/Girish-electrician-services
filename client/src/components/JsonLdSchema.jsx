import { businessConfig } from "../data/businessConfig";

function JsonLdSchema() {
  // IMPORTANT: Replace this with your actual production URL
  const websiteUrl =
    "https://abhishek8827.github.io/Girish-electrician-services/";

  // Main LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": websiteUrl,
    name: businessConfig.name,
    image: `${websiteUrl}electrician.png`,
    url: websiteUrl,
    telephone: businessConfig.phone,
    email: businessConfig.email,
    priceRange: "$$",
    description: businessConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nepanagar",
      addressLocality: "Nepanagar",
      addressRegion: "MP",
      postalCode: "450110",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Nepanagar",
      },
      {
        "@type": "Place",
        name: "Madhya Pradesh",
      },
    ],
    sameAs: [
      businessConfig.instagramUrl,
      `https://wa.me/${businessConfig.phone.replace(/[^0-9]/g, "")}`,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: businessConfig.phone,
      contactType: "Customer Service",
      availableLanguage: ["en", "hi"],
    },
    knowsAbout: [
      "Electrical Installation",
      "Electrical Repair",
      "Electrical Maintenance",
      "Home Wiring",
      "Commercial Wiring",
      "Safety Inspection",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "125",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Service Schema for each service type
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Electrical Services",
    provider: {
      "@type": "LocalBusiness",
      name: businessConfig.name,
      url: websiteUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Nepanagar and surrounding areas",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: websiteUrl,
      availableLanguage: ["en", "hi"],
    },
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessConfig.name,
    url: websiteUrl,
    logo: `${websiteUrl}electrician.png`,
    description: businessConfig.tagline,
    sameAs: [
      businessConfig.instagramUrl,
      `https://wa.me/${businessConfig.phone.replace(/[^0-9]/g, "")}`,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: businessConfig.phone,
      email: businessConfig.email,
    },
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${websiteUrl}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Track Request",
        item: `${websiteUrl}track-request`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default JsonLdSchema;
