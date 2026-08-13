# SEO Quick Reference & Maintenance Guide

## 🚀 Quick Start for Team Members

### Using the SEO Meta Hook

```jsx
import { useSEOMeta } from "../hooks/useSEOMeta";

function MyPage() {
  useSEOMeta({
    title: "Page Title | Girish Electrician Services",
    description: "A compelling description that drives clicks (150-160 chars)",
    ogTitle: "What appears when shared on Facebook",
    ogDescription: "Description for social media sharing",
    canonical:
      "https://abhishek8827.github.io/Girish-electrician-services/my-page",
    noindex: false, // Set to true to hide from search engines
  });

  return <div>Page content</div>;
}
```

### Adding Images with SEO

```jsx
<img
  src="path/to/image.png"
  alt="Descriptive text that includes keywords and explains the image clearly"
  loading="lazy"
  decoding="async"
  className="..."
/>
```

### Adding Schema Data

```jsx
import { generateFAQSchema, injectStructuredData } from "../hooks/useSEOMeta";

useEffect(() => {
  const schema = generateFAQSchema([{ question: "Q?", answer: "A." }]);
  injectStructuredData(schema);
}, []);
```

## 📝 SEO Writing Guidelines

### Title Tags (50-60 characters)

- ✅ Good: "Electrician in Nepanagar | 15+ Years Experience"
- ❌ Bad: "Homepage" or "Services"
- Include: Target keyword, location, differentiator

### Meta Descriptions (150-160 characters)

- ✅ Good: "Licensed electrician in Nepanagar with 15+ years experience. Professional electrical installation, repair & emergency services. Call today!"
- ❌ Bad: "Welcome to our website"
- Include: Main keyword, unique value, call-to-action

### Heading Hierarchy

```html
<h1>Main page topic (ONE per page)</h1>
<h2>Section heading</h2>
<h3>Subsection heading</h3>
```

### Image Alt Text Formula

`[What] + [Context] + [Benefit/Action]`

Examples:

- "Professional electrician installing circuit breaker panel in residential home"
- "LED lighting fixture installation in modern office space"
- "Safety inspection of electrical wiring and distribution board"

## 🔗 Important URLs

| Purpose                   | URL                                      |
| ------------------------- | ---------------------------------------- |
| Search Console            | https://search.google.com/search-console |
| Analytics                 | https://analytics.google.com             |
| Business Profile          | https://business.google.com              |
| Structured Data Validator | https://validator.schema.org             |
| Page Speed                | https://pagespeed.web.dev                |

## 🛠️ Common Tasks

### Updating Site Information

Edit: `client/src/data/businessConfig.js`

```js
export const businessConfig = {
  name: "Girish Electrician Services",
  phone: "+91 84353 08015",
  email: "girishwani137@gmail.com",
  location: "Nepanagar, MP, India",
  // ... other fields
};
```

### Adding New Pages

1. Create page component
2. Add `useSEOMeta` hook with unique title/description
3. Add to Routes in `App.jsx`
4. Update `sitemap.xml` with new URL
5. Submit to Google Search Console

### Updating Services

Edit: `client/src/data/siteContent.js`

- Services appear in ServicesSection
- Update `serviceCategories` array
- Each service gets its own panel

### Monitoring Performance

Check weekly:

- Google Search Console for errors
- PageSpeed Insights for speed
- Search rankings for target keywords

Monthly:

- Review analytics traffic
- Check search query performance
- Update content based on trends

## ⚠️ DON'Ts (SEO Anti-Patterns)

❌ **Never do this:**

- Keyword stuffing ("electrician electrician electrician")
- Duplicate content on multiple pages
- Hidden text or invisible links
- Broken internal links
- Multiple H1 tags on one page
- Clickbait titles/descriptions
- Cloaking or misleading content

## ✅ DO'S (SEO Best Practices)

✅ **Always:**

- Write for users first, search engines second
- Include target keywords naturally (2-3 times per page)
- Use descriptive headings (H2, H3)
- Add alt text to every image
- Internal link to related content
- Keep pages updated and fresh
- Monitor analytics regularly

## 📊 Monthly SEO Checklist

- [ ] Review Google Search Console for errors
- [ ] Check PageSpeed Insights (target: 90+)
- [ ] Monitor top performing pages
- [ ] Update old content with new information
- [ ] Check competitor rankings
- [ ] Verify all links are working
- [ ] Optimize images (< 100KB)
- [ ] Check mobile responsiveness
- [ ] Review search queries in Analytics
- [ ] Update business information if changed

## 🎯 Target Keywords by Page

### Homepage

- Electrician in Nepanagar
- Electrical services Nepanagar
- Professional electrician
- Electrical installation & repair
- Emergency electrical services

### Track Request Page

- Track electrical service request
- Service request status
- Electrical work tracking

### Services Landing

- Residential electrical services
- Commercial electrical services
- Electrical panel installation
- Emergency electrician

## 💡 Content Ideas to Increase Traffic

1. **Blog Posts** (monthly)
   - "5 Signs Your Electrical Panel Needs Repair"
   - "Common Residential Wiring Problems"
   - "Emergency Electrical Safety Tips"

2. **FAQ Content** (quarterly)
   - Add to FaqSection
   - Creates rich snippets
   - Improves user engagement

3. **Testimonials** (ongoing)
   - Ask satisfied customers for reviews
   - Add to TestimonialsSection
   - Post on Google Business Profile

4. **Location Pages** (future)
   - "Electrician in [nearby city]"
   - Local keyword targeting
   - Expand service area

## 🔐 Password & Access Management

- [ ] Google Search Console - set up for owner access
- [ ] Google Analytics - shared with team
- [ ] Google Business Profile - multiple admins
- [ ] GitHub repository - secure credentials

## 📞 Support & Questions

For SEO questions, refer to:

- `SEO-GUIDE.md` - Comprehensive reference
- `SEO-IMPLEMENTATION.md` - Code examples
- `useSEOMeta.js` - Hook documentation
- Google Search Central - Official guidance

---

**Last Updated:** 2026-08-13
**Version:** 1.0
