# Deploy to Netlify

## Prerequisites
- GitHub account
- Netlify account

## Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variable:
     - Key: `OPENROUTER_API_KEY`
     - Value: `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`
   - Click "Deploy site"

3. **Done!**
   Your site will be live at: `https://your-site-name.netlify.app`

## Features Included
- ✅ Student LMS with chatbot
- ✅ OpenRouter AI integration
- ✅ Conversation history (localStorage)
- ✅ Markdown rendering with tables
- ✅ Student profile context
