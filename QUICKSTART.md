# PostCraft Quick Start Guide

Get PostCraft up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Get Your API Keys

**Anthropic (Required)**
1. Go to https://console.anthropic.com/
2. Create an API key
3. Copy it for later

**Supabase (Required)**
1. Go to https://supabase.com/
2. Create a new project
3. Go to Settings > API
4. Copy:
   - Project URL
   - anon/public key
   - service_role key (secret)

**Stripe (Required for payments)**
1. Go to https://dashboard.stripe.com/
2. Get your Secret Key from Developers > API Keys
3. Create products:
   - Starter: $19/month recurring
   - Pro: $49/month recurring
4. Copy the Price IDs

### 2. Set Up Database

1. In Supabase Dashboard, go to SQL Editor
2. Copy all content from `backend/database/schema.sql`
3. Paste and run it
4. Done! Tables are created with security policies

### 3. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your keys:
```env
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_KEY=eyJh...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
```

Update Stripe Price IDs in `backend/app/services/stripe_service.py`:
```python
TIER_PRICE_IDS = {
    SubscriptionTierEnum.STARTER: "price_xxx",  # Your Starter Price ID
    SubscriptionTierEnum.PRO: "price_yyy",      # Your Pro Price ID
}
```

Install and run:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend running at http://localhost:8000 ✅

### 4. Configure Frontend

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...
VITE_API_URL=http://localhost:8000
```

Install and run:
```bash
npm install
npm run dev
```

Frontend running at http://localhost:3000 ✅

### 5. Test It Out!

1. Open http://localhost:3000
2. Click "Sign Up" and create an account
3. Go to "Generate" page
4. Enter some content:
   ```
   Just launched our new AI-powered analytics dashboard!
   It helps teams make data-driven decisions 10x faster.
   ```
5. Select platforms and tone
6. Click "Generate Content"
7. Watch the magic happen! ✨

## 🎯 What You Get

- **Free Tier**: 10 posts/month on LinkedIn + Twitter
- **Starter ($19/mo)**: 50 posts/month on all 4 platforms
- **Pro ($49/mo)**: 200 posts/month on all 4 platforms

## 🔧 Troubleshooting

**Backend won't start?**
- Check Python version: `python --version` (need 3.9+)
- Activate virtual environment
- Verify all env variables are set

**Frontend won't start?**
- Check Node version: `node --version` (need 18+)
- Delete `node_modules` and run `npm install` again
- Check env variables

**Database errors?**
- Make sure you ran the schema.sql in Supabase
- Check Supabase connection in browser console

**Authentication not working?**
- Verify Supabase keys are correct
- Check CORS settings in main.py
- Clear browser cache and cookies

## 📚 Next Steps

1. **Set up Stripe Webhook**:
   - Use ngrok for local testing: `ngrok http 8000`
   - Add webhook in Stripe Dashboard
   - Point to: `https://your-ngrok-url/api/webhook/stripe`

2. **Customize Brand Voice**:
   - Update prompts in `backend/app/services/claude_service.py`
   - Add your brand guidelines

3. **Deploy to Production**:
   - See README.md for Railway/Render instructions
   - Update environment variables
   - Set up custom domain

## 🎨 Customization Ideas

- Change color scheme in `frontend/tailwind.config.js`
- Add more platforms (TikTok, Pinterest, etc.)
- Customize landing page copy
- Add team collaboration features
- Implement post scheduling

## 💡 Tips

- Start with Free tier to test
- Use "professional" tone for business content
- LinkedIn works best for long-form content
- Instagram needs visual-first thinking
- Twitter is great for quick updates

## 🆘 Need Help?

- Check the full README.md
- Review API docs at http://localhost:8000/docs
- Open an issue on GitHub

Happy posting! 🚀
