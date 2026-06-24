COMPLETE WEBSITE GUIDE
Security + SEO + Performance + Everything Else
-----------------------------------------------
Use this as a checklist and reference for every website you build.
Paste this into your project as WEBSITE_STANDARDS.md
================================================================================
SECTION 1: WEBSITE SECURITY
Priority levels used below:
[MUST HAVE]    = Critical. Non-negotiable for any live site.
[IMPORTANT]    = Strongly recommended. Do this on every client project.
[GOOD TO HAVE] = Extra edge. Implement when you have time.

1.1 ENCRYPTION & CONNECTION
[MUST HAVE] HTTPS / SSL Certificate
[MUST HAVE] HSTS Header (HTTP Strict Transport Security)
[IMPORTANT] Use TLS 1.2 and TLS 1.3 Only

1.2 INJECTION & INPUT PROTECTION
[MUST HAVE] SQL Injection Prevention
[MUST HAVE] XSS (Cross-Site Scripting) Prevention
[MUST HAVE] CSRF Protection (Cross-Site Request Forgery)
[IMPORTANT] Server-Side Input Validation

1.3 SECURITY HEADERS
[MUST HAVE] Content Security Policy (CSP)
[IMPORTANT] X-Frame-Options
[IMPORTANT] X-Content-Type-Options
[GOOD TO HAVE] Referrer-Policy
[GOOD TO HAVE] Permissions-Policy

1.4 AUTHENTICATION & PASSWORDS
[MUST HAVE] Hash Passwords with bcrypt or Argon2
[MUST HAVE] Rate Limiting on Login Attempts
[IMPORTANT] Two-Factor Authentication (2FA)
[IMPORTANT] Secure Session & Cookie Management
[IMPORTANT] Never Store Sensitive Data in localStorage

1.5 FILE & SERVER PROTECTION
[MUST HAVE] Secure File Upload Handling
[IMPORTANT] Never Expose Error Details in Production
[IMPORTANT] Disable Directory Listing
[IMPORTANT] CORS Policy (Cross-Origin Resource Sharing)
[GOOD TO HAVE] Web Application Firewall (WAF)
[GOOD TO HAVE] DDoS Protection

1.6 MAINTENANCE & MONITORING
[MUST HAVE] Keep All Software Updated
[IMPORTANT] Regular Backups
[GOOD TO HAVE] Security Scanning & Uptime Monitoring

================================================================================
SECTION 2: SEO (SEARCH ENGINE OPTIMIZATION)

2.1 ON-PAGE BASICS
[MUST HAVE] Title Tag (unique per page)
[MUST HAVE] Meta Description (unique per page)
[MUST HAVE] Proper Heading Structure (H1 → H2 → H3)
[MUST HAVE] Image Alt Text
[IMPORTANT] Clean, Readable URL Structure
[IMPORTANT] Keyword Placement

2.2 TECHNICAL SEO
[MUST HAVE] sitemap.xml
[MUST HAVE] robots.txt
[MUST HAVE] Mobile-Friendly (Responsive Design)
[MUST HAVE] Canonical Tags
[IMPORTANT] Core Web Vitals
[IMPORTANT] 404 Error Page & Redirects
[IMPORTANT] HTTPS is an SEO Signal

2.3 LOCAL SEO (MOST IMPORTANT FOR CLINIC SITES)
[MUST HAVE] Google Business Profile (GBP) Setup
[MUST HAVE] NAP Consistency (Name, Address, Phone)
[MUST HAVE] LocalBusiness Schema Markup (Structured Data)
[IMPORTANT] Location Keywords in Content
[IMPORTANT] Encourage Google Reviews

2.4 CONTENT & LINKS
[IMPORTANT] Internal Linking
[IMPORTANT] Unique, Useful Content on Every Page
[GOOD TO HAVE] FAQ Schema Markup
[GOOD TO HAVE] Open Graph Meta Tags

2.5 SEO MONITORING TOOLS
[MUST HAVE] Google Search Console (Free)
[MUST HAVE] Google Analytics 4 / GA4 (Free)

================================================================================
SECTION 3: PERFORMANCE (LOAD UNDER 2 SECONDS)

3.1 IMAGES (BIGGEST IMPACT — DO THIS FIRST)
[MUST HAVE] Compress All Images
[MUST HAVE] Use WebP Format
[MUST HAVE] Lazy Load Images Below the Fold
[IMPORTANT] Always Set Width and Height on Images
[IMPORTANT] Preload the Hero Image (LCP Fix)
[GOOD TO HAVE] Responsive Images with srcset

3.2 CSS & JAVASCRIPT
[MUST HAVE] Minify CSS and JavaScript
[MUST HAVE] Defer or Async All Non-Critical JavaScript
[IMPORTANT] Inline Critical CSS
[IMPORTANT] Remove Unused CSS
[GOOD TO HAVE] Code Splitting (for React/Vue sites)

3.3 SERVER & NETWORK
[MUST HAVE] Enable Gzip or Brotli Compression
[MUST HAVE] Browser Caching Headers
[IMPORTANT] Use a CDN (Content Delivery Network)
[IMPORTANT] Choose Fast Hosting
[IMPORTANT] Reduce HTTP Requests
[GOOD TO HAVE] HTTP/2 or HTTP/3
[GOOD TO HAVE] DNS Prefetch and Preconnect for Third Parties

3.4 FONTS
[IMPORTANT] Self-Host Fonts (Do Not Use Google Fonts CDN)
[IMPORTANT] Use font-display: swap
[IMPORTANT] Only Load Font Weights You Actually Use
[GOOD TO HAVE] Use a System Font Stack as Fallback

3.5 MEASURING PERFORMANCE
[MUST HAVE] Google PageSpeed Insights
[IMPORTANT] GTmetrix (beginner-friendly)
[GOOD TO HAVE] WebPageTest.org (advanced)

================================================================================
SECTION 4: THINGS YOU DID NOT MENTION (BUT EVERY SITE NEEDS)

4.1 ACCESSIBILITY (WCAG 2.1)
[MUST HAVE] Color Contrast Ratio
[MUST HAVE] Keyboard Navigation
[IMPORTANT] Semantic HTML Elements
[IMPORTANT] ARIA Labels for Icon-Only Elements
[GOOD TO HAVE] Skip to Main Content Link

4.2 LEGAL & COMPLIANCE
[MUST HAVE] Privacy Policy Page
[MUST HAVE] Cookie Consent Banner
[IMPORTANT] Terms & Conditions Page
[IMPORTANT] Medical Disclaimer

4.3 CROSS-BROWSER & DEVICE TESTING
[MUST HAVE] Real Mobile Device Testing
[IMPORTANT] Cross-Browser Testing
[IMPORTANT] Minimum Touch Target Size

4.4 UPTIME & MAINTENANCE
[MUST HAVE] Uptime Monitoring
[IMPORTANT] Track Domain & SSL Expiry Dates
[IMPORTANT] Maintenance Retainer (Upsell Opportunity!)
[GOOD TO HAVE] Staging Environment

4.5 USER EXPERIENCE (UX)
[MUST HAVE] One Clear Call-to-Action (CTA) Per Page
[MUST HAVE] Contact Info Visible on Every Page
[MUST HAVE] Click-to-Call on Mobile
[MUST HAVE] WhatsApp Chat Button (Especially in India!)
[IMPORTANT] Google Maps Embed on Contact Page
[IMPORTANT] Loading States & Form Feedback
[GOOD TO HAVE] Custom 404 Error Page
[GOOD TO HAVE] Smooth Scroll & Micro Interactions

4.6 ANALYTICS & REPORTING
[IMPORTANT] Conversion Tracking in GA4
[GOOD TO HAVE] Microsoft Clarity (Free Heatmaps & Session Recording)

================================================================================
END OF GUIDE
