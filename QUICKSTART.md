# Quick Start Guide - Student LMS

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- A Python backend API (optional for development)

### Step 1: Install Dependencies
```bash
cd student-lms
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Login
Use the mock login (any email/password will work in development):
- Email: `student@university.edu`
- Password: `password`

## 📱 What You'll See

### Landing Page (Dashboard)
- **Left Column**: Calendar widget
- **Center Column**: Upcoming tasks and news
- **Right Column**: AI Chatbot

### Navigation (Sidebar)
1. **Dashboard** - Home page with overview
2. **Courses** - Browse all enrolled courses
3. **Assignments** - View and submit assignments
4. **Quizzes** - Take interactive quizzes
5. **Grades** - Track academic performance
6. **Calendar** - View all events
7. **Messages** - Communication (placeholder)
8. **AI Assistant** - Full chatbot interface

## 🎯 Key Features to Try

### 1. Browse Courses
- Click "Courses" in sidebar
- View 4 mock courses
- Click any course to see details

### 2. View Assignments
- Navigate to a course
- Click "Assignments" tab
- See active and submitted assignments

### 3. Take a Quiz
- Navigate to a course
- Click "Quizzes" tab
- Click "Start Quiz" on any active quiz
- Answer questions and submit

### 4. Check Grades
- Navigate to a course
- Click "Grades" tab
- View grade breakdown by category

### 5. Chat with AI
- Click "AI Assistant" in sidebar
- Try suggested prompts
- Ask questions about courses

## 🔧 Connecting Your Backend

### Step 1: Update API URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

### Step 2: Implement Required Endpoints
Your Python backend needs these endpoints:

#### Authentication
```python
POST /api/auth/login
POST /api/auth/register
```

#### Courses
```python
GET /api/courses
GET /api/courses/{id}
GET /api/courses/{id}/notices
```

#### Assignments
```python
GET /api/courses/{courseId}/assignments
POST /api/assignments/{id}/submit
```

#### Quizzes
```python
GET /api/courses/{courseId}/quizzes
GET /api/quizzes/{id}/questions
POST /api/quizzes/{id}/submit
```

#### Grades
```python
GET /api/grades
GET /api/courses/{courseId}/grades
```

#### Chatbot
```python
POST /api/chatbot/message
```

### Step 3: Test Integration
1. Restart the dev server
2. Try logging in with real credentials
3. Navigate through the app
4. Check browser console for API errors

## 📝 Mock Data Locations

Currently using mock data in these files:
- `app/(dashboard)/page.tsx` - Dashboard data
- `app/(dashboard)/courses/page.tsx` - Courses list
- `app/(dashboard)/courses/[courseId]/page.tsx` - Course details
- `app/(dashboard)/courses/[courseId]/assignments/page.tsx` - Assignments
- `app/(dashboard)/courses/[courseId]/quizzes/page.tsx` - Quizzes
- `app/(dashboard)/courses/[courseId]/grades/page.tsx` - Grades

To use real data, replace mock data with React Query hooks:
```tsx
// Before (mock data)
const mockCourses = [...];

// After (real data)
import { useCourses } from '@/hooks/use-courses';
const { data: courses, isLoading } = useCourses();
```

## 🎨 Customization

### Change Theme Colors
Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.205 0 0);  /* Change this */
  --secondary: oklch(0.97 0 0);  /* And this */
}
```

### Add New Navigation Item
Edit `components/layout/Sidebar.tsx`:
```tsx
const navigation = [
  // ... existing items
  { name: 'New Feature', href: '/new-feature', icon: Star },
];
```

### Modify Landing Page Layout
Edit `app/(dashboard)/page.tsx` to change the 3-column layout.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API Connection Issues
1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify backend is running
3. Check CORS settings on backend
4. Open browser console for error details

### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run dev
```

## 📚 Next Steps

### For Developers
1. Read `PROJECT_SUMMARY.md` for architecture details
2. Review `README.md` for full documentation
3. Check `types/` folder for TypeScript definitions
4. Explore `components/` for reusable components

### For Backend Integration
1. Implement authentication endpoints
2. Add course management endpoints
3. Implement assignment submission
4. Add quiz functionality
5. Implement grade calculation
6. Add chatbot integration

### For Deployment
1. Build for production: `npm run build`
2. Test production build: `npm run start`
3. Deploy to Vercel/AWS/other platform
4. Configure environment variables
5. Set up domain and SSL

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React Query
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/overview)

### shadcn/ui
- [Component Documentation](https://ui.shadcn.com)
- [Installation Guide](https://ui.shadcn.com/docs/installation)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

## 💡 Tips

1. **Use TypeScript**: All types are defined in `types/` folder
2. **Leverage React Query**: Automatic caching and refetching
3. **Follow Component Structure**: Keep components small and focused
4. **Use shadcn/ui**: Pre-built accessible components
5. **Test Responsively**: Check mobile, tablet, and desktop views

## 🤝 Getting Help

- Check the README.md for detailed documentation
- Review PROJECT_SUMMARY.md for architecture overview
- Open an issue on GitHub for bugs
- Contact the development team for support

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Dev server running
- [ ] Can access http://localhost:3000
- [ ] Can login to the app
- [ ] Can navigate between pages
- [ ] Backend API URL configured (if applicable)
- [ ] API endpoints implemented (if applicable)

## 🎉 You're Ready!

Start exploring the Student LMS and building amazing features!
