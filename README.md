# Nightbuild Studio (thenightbuild)

> An independent, student-run creative web engineering agency. We architect unconventional web platforms, bespoke client showcases, and computer science capstones with zero templates and sub-second execution.

![Nightbuild Studio](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop)

---

## ⚡ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Apple-grade design system & fluid container)
- **Typography**: Plus Jakarta Sans (Headings) + Inter (Body/UI)
- **Animation**: Framer Motion (One deliberate entrance reveal)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **AI Gateway**: Google Gemini 3.6 Flash (`/api/gemini`)
- **Deploy Target**: [Vercel](https://vercel.com/)

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and add your credentials:
```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-google-ai-studio-key
```

### 3. Database Setup (Supabase)
Run the migration file located at [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) in your Supabase SQL Editor. This sets up:
- `projects` table with Row-Level Security (RLS) public read
- `leads` table with public insert-only permissions
- Seed portfolio records for flagship client sites and student capstones

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 🚢 Deploy to Vercel

1. Push this repository to your GitHub account:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. In the **Environment Variables** section, paste:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**. Vercel will automatically build and assign a production URL.

---

## 👥 Engineering Collective

- **Nirmal Kumar** — Co-Founder & Systems / Full-Stack Engineer ([LinkedIn](https://www.linkedin.com/in/nirmal-kumar-a43a56392))
- **Pusarla Aakash** — Co-Founder & Creative Technologist ([LinkedIn](https://www.linkedin.com/in/pusarla-aakash-79b9a9392))
- **Vidya Sagar** — Co-Founder & Backend / Platform Engineer ([LinkedIn](https://www.linkedin.com/in/vidyasagarcodes/))
- **Pusarla Manoj Kumar** — Co-Founder & Cloud Infrastructure / Security Lead ([LinkedIn](https://www.linkedin.com/in/pusarla-manoj-kumar-b3454a3b3))

**Direct Studio Email**: [nigthbulid@gmail.com](mailto:nigthbulid@gmail.com)
