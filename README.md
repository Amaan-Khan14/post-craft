# PostCraft

> One Content Piece, Every Platform. Perfectly Optimized.

PostCraft is a production-ready SaaS application that transforms a single piece of content into platform-optimized posts for multiple social media platforms using AI.

## Features

- **AI-Powered Content Generation**: Uses Claude by Anthropic to transform your content
- **Multi-Platform Support**: LinkedIn, Twitter/X, Instagram, and Facebook
- **Platform Optimization**: Each platform gets content optimized for length, tone, and hashtags
- **Subscription Tiers**: Free, Starter ($19/mo), and Pro ($49/mo) plans
- **Usage Tracking**: Monthly post limits with clear usage indicators
- **Authentication**: Secure auth powered by Supabase
- **Payment Processing**: Stripe integration for subscriptions
- **Responsive Design**: Mobile-first UI with Tailwind CSS

## Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Anthropic Claude API** - AI content generation (claude-sonnet-4-20250514)
- **Supabase** - Authentication, database, and real-time features
- **PostgreSQL** - Database with Row Level Security
- **Stripe** - Payment processing and subscription management

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **React Router** - Client-side routing

## Project Structure

```
postcraft/
├── backend/
│   ├── app/
│   │   ├── routers/          # API endpoints
│   │   ├── models/           # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   └── middleware/       # Auth middleware
│   ├── database/
│   │   └── schema.sql        # Database schema
│   ├── main.py               # FastAPI app entry
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # API client, Supabase
│   │   ├── store/            # Zustand stores
│   │   └── types/            # TypeScript types
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.9+
- Node.js 18+
- Supabase account
- Anthropic API key
- Stripe account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd postcraft
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

Edit `.env` with your credentials:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `backend/database/schema.sql`
4. This will create all tables, indexes, RLS policies, and triggers

### 4. Stripe Setup

1. Create products in Stripe Dashboard:
   - **Starter**: Monthly subscription at $19
   - **Pro**: Monthly subscription at $49
2. Copy the Price IDs and update `backend/app/services/stripe_service.py`:
   ```python
   TIER_PRICE_IDS = {
       SubscriptionTierEnum.STARTER: "price_xxx",  # Your Starter Price ID
       SubscriptionTierEnum.PRO: "price_yyy",      # Your Pro Price ID
   }
   ```
3. Set up webhook endpoint in Stripe:
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### 6. Run Development Servers

**Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the app!

## Deployment

### Deploy on Railway

1. **Backend:**
   ```bash
   # From project root
   railway init
   railway add
   # Select backend service
   railway up
   ```

2. **Set environment variables** in Railway dashboard
3. **Frontend:** Deploy to Vercel or Netlify

### Deploy on Render

1. Connect your GitHub repository to Render
2. The `render.yaml` file will automatically configure both services
3. Set environment variables in Render dashboard

### Environment Variables for Production

**Backend:**
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_URL` (production frontend URL)

**Frontend:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL` (production backend URL)

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

### Key Endpoints

- `POST /api/generate` - Generate platform-optimized content
- `GET /api/posts` - List user's generated posts
- `GET /api/usage` - Get current month usage
- `GET /api/profile` - Get user profile and subscription
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhook/stripe` - Stripe webhook handler

## Usage Tiers

| Tier | Price | Posts/Month | Platforms |
|------|-------|-------------|-----------|
| Free | $0 | 10 | LinkedIn, Twitter |
| Starter | $19 | 50 | All 4 platforms |
| Pro | $49 | 200 | All 4 platforms + Analytics* |

*Analytics feature coming soon

## Platform Optimizations

### LinkedIn
- Professional tone
- Max 1300 characters
- 2-3 strategic hashtags
- Business value focus

### Twitter/X
- Punchy thread format
- Conversational tone
- Attention-grabbing hooks
- 2-4 tweets

### Instagram
- Visual-first captions
- Storytelling approach
- 25-30 relevant hashtags
- Clear call-to-action

### Facebook
- Community-focused
- Personal storytelling
- 300-500 words
- Engagement questions

## Security Features

- Row Level Security (RLS) on all Supabase tables
- JWT-based authentication
- Secure API endpoints with token verification
- Environment variable isolation
- CORS protection
- Rate limiting on API endpoints

## Future Enhancements

- [ ] Post scheduling
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] Brand voice customization
- [ ] Image upload and optimization
- [ ] Browser extension
- [ ] Mobile apps

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Email: support@postcraft.app

## Acknowledgments

- Powered by Claude by Anthropic
- Built with FastAPI and React
- Authentication by Supabase
- Payments by Stripe

---

**Made with AI assistance using Claude by Anthropic**
