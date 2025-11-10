# Feedback Feature Setup Guide

This guide helps you set up the feedback form for the Design System Builder plugin.

## Prerequisites

- Vercel account (free tier is fine)
- SendGrid account (free tier is fine)
- SendGrid API key

## Step 1: Create Vercel Account & Project

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Create a new project or use an existing one
3. You can create a simple repo or just use Vercel's quick deploy

## Step 2: Set Up SendGrid

1. Go to [sendgrid.com](https://sendgrid.com) and sign up (free)
2. Go to **Settings > API Keys** and create a new API key
3. Copy the API key (you'll need it for environment variables)

## Step 3: Deploy the Feedback Function

1. In your Vercel project, create this folder structure:
```
api/
  └── feedback.ts
```

2. Copy the `feedback.ts` code from this folder into `api/feedback.ts`

3. Add environment variables in Vercel dashboard:
   - Go to **Settings > Environment Variables**
   - Add `SENDGRID_API_KEY` with your SendGrid API key
   - Add `RECIPIENT_EMAIL` as `d.fuchs@method.me`

4. Deploy! (Vercel auto-deploys when you push)

## Step 4: Update Plugin Config

In the plugin code, update this line in `code.ts`:

```typescript
const FEEDBACK_API_URL = 'https://your-vercel-project.vercel.app/api/feedback';
```

Replace `your-vercel-project` with your actual Vercel project URL.

## Step 5: How to Update Later

**To change the recipient email:**
- Go to Vercel dashboard > Settings > Environment Variables
- Edit `RECIPIENT_EMAIL`
- No code changes needed!

**To change SendGrid behavior:**
- Edit `api/feedback.ts` in your Vercel project
- Make your changes
- Auto-deploys on push

## Testing

1. Open the plugin in Figma
2. Click the "Feedback" link at the bottom
3. Fill out the form and submit
4. Check your email to confirm it works

## Troubleshooting

- **Function returns 401**: Check your SendGrid API key
- **Email not sending**: Verify `RECIPIENT_EMAIL` environment variable is set
- **Plugin can't reach API**: Make sure `FEEDBACK_API_URL` in plugin matches your Vercel URL
