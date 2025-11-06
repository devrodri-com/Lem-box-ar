# 🛫 LEM-BOX V2 📦

Project for the new **LEM-BOX** website developed with **Next.js (App Router)**, **TypeScript**, and **TailwindCSS**, with a **mobile-first** approach and dark branding (#005F40 / #EB6619).

---

## 🌐 Multi-country

- **lem-box.com**: Country selector to redirect to local versions.  
- **lem-box.com.uy**: Completed version, with content and design adapted for Uruguay.  
- **lem-box.com.ar**: Pending version, similar to the Uruguay one but with text and specific adjustments for Argentina.

---

## 🚀 Current status

- **Header (desktop + mobile)**  
  - Glassmorphism (`bg-[#005f40]/10 + backdrop-blur`)  
  - Mobile menu in portal with dynamic overlay, ESC close, and focus return  
  - Scroll-shrink and scroll-spy implemented  

- **Hero**  
  - 100dvh, dynamic background, bottom overlay/fade  
  - Main CTA to registration (`https://lem-box.com/Tracking/web/#/register`)  
  - Micro-animation on scroll indicator  

- **“About Us” section**  
  - Dark green background (#02120F)  
  - Rewritten text and clear bullets  
  - Metallic logo/image in PNG for maximum quality  

- **“Benefits” section**  
  - 3×2 grid with 6 benefits  
  - Cards with images generated in SORA (optimized WebP)  
  - Hover lift + premium Apple-like shadow  
  - Top label “Benefits” styled, consistent H2  

---

## 🛠️ Stack

- [Next.js 15 (App Router)](https://nextjs.org)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com)  
- [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images) for image optimization  
- [Cloudinary](https://cloudinary.com) for static media (coming soon)  

---

## ▶️ Development

Run locally:
npm run dev
# or
yarn dev

Open [http://localhost:3000](http://localhost:3000).

---

## 🌍 Next steps

- Refine **How it works** section with a style consistent with Benefits  
- Create **/services** page with cards and descriptions  
- Integrate **public tracking** and database (Supabase/Postgres)  
- Integrate automations via **n8n**  
- Develop multi-country structure:  
  - Implement country selector on **lem-box.com**  
  - Finalize **.ar** version, based on **.uy** with localized text and content adjustments  

---

## 📌 Notes

This README will be updated with each project phase.

---

## 📝 Development

The **LEM-BOX V2** project is designed with a **mobile-first** approach, using **Next.js 15** with **App Router**, **TypeScript**, and **TailwindCSS** to maintain modern, scalable, and optimized code.  
A **dark branding theme** has been implemented with key colors: dark green (#02120F) for backgrounds and vibrant orange (#EB6619) for accents and calls to action.

### ✅ Completed design and development

- Header with glassmorphism, accessible mobile menu, and advanced behavior (overlay, ESC close, focus return).  
- Full viewport Hero with dynamic background and microanimation to guide the user.  
- “About Us” section with clear content and visually appealing design, including high-quality metallic PNG images.  
- “Benefits” section with 3x2 grid, optimized image cards, and premium hover effects.  

### 🔄 In progress and upcoming developments

- “How it works” section with consistent style to Benefits.  
- Services page with cards and descriptions.  
- Integration of public tracking and database using Supabase/Postgres for analytics and user management.  
- Automations via n8n to optimize internal workflows.  
- Multi-country architecture, with a selector on **lem-box.com** and local versions for **Uruguay (.uy)** and **Argentina (.ar)**, adapting content and text per market.  

The **design guidelines** maintain visual consistency with dark branding, prioritizing usability and mobile experience, with graphic details and microinteractions that add dynamism and professionalism.

This document will be updated as development progresses and new functionalities and improvements are implemented.
