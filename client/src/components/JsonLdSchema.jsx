import { businessConfig } from "../data/businessConfig";

function JsonLdSchema() {
  // IMPORTANT: Replace this with your actual production URL
  const websiteUrl =
    "https://abhishek8827.github.io/Girish-electrician-services/";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: businessConfig.name,
    image: `${websiteUrl}${businessConfig.profileImage}`,
    "@id": websiteUrl,
    url: websiteUrl,
    telephone: businessConfig.phone,
    email: businessConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nepanagar",
      addressRegion: "MP",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Place",
      name: businessConfig.serviceArea,
    },
    description: businessConfig.tagline,
    sameAs: [
      businessConfig.instagramUrl,
      `https://wa.me/${businessConfig.phone.replace(/[^0-9]/g, "")}`,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default JsonLdSchema;
