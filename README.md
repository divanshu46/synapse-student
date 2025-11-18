# Student Learning Management System (LMS)

A comprehensive, production-ready Student Learning Management System built with Next.js 16, React 19, TypeScript, and shadcn/ui components.

## Features

### Core Functionality
- **Dashboard**: 3-column layout with calendar, upcoming tasks, news feed, and AI chatbot
- **Courses**: Browse and manage enrolled courses with detailed course pages
- **Assignments**: View, submit, and track assignments with file upload support
- **Quizzes**: Take interactive quizzes with multiple question types (multiple-choice, true/false, short answer, essay)
- **Grades**: Track academic performance with detailed grade breakdowns and analytics
- **AI Chatbot**: Get instant help with courses, assignments, and academic questions
- **Calendar**: View all course events, assignments, and quizzes in one place
- **Authentication**: Secure login and registration system

### Technical Features
- **Next.js 16** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style)
- **React Query** for data fetching and caching
- **Axios** for API communication
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Responsive Design** with mobile navigation

## Design System

### Theme
- **Color Scheme**: Stone (neutral, professional)
- **Primary Font**: DM Sans (400, 500, 700)
- **Secondary Font**: Inter
- **Border Radius**: 10px (0.625rem)
- **Transitions**: 150ms cubic-bezier

### Gradient Utilities
- `.gradient-blue`: Stone gradient 1
- `.gradient-purple`: Stone gradient 2
- `.gradient-pink`: Stone gradient 3
- `.gradient-green`: Stone gradient 4
- `.gradient-page`: Page background gradient

## Project Structure

```
student-lms/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── page.tsx                    # Landing page
│   │   ├── courses/
│   │   │   ├── page.tsx                # All courses
│   │   │   └── [courseId]/
│   │   │       ├── page.tsx            # Course home
│   │   │       ├── assignments/
│   │   │       ├── quizzes/
│   │   │       └── grades/
│   │   ├── chatbot/
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                             # shadcn components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   ├── dashboard/
│   ├── courses/
│   ├── assignments/
│   ├── quizzes/
│   ├── grades/
│   ├── chatbot/
│   └── shared/
├── lib/
│   ├── api/                            # API client & endpoints
│   ├── utils.ts
│   └── constants.ts
├── types/                              # TypeScript definitions
└── hooks/                              # Custom React hooks
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-lms
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Python backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

### API Endpoints Expected

The frontend expects the following API endpoints from your Python backend:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/notices` - Get course notices
- `GET /api/courses/:id/classes` - Get class sessions

#### Assignments
- `GET /api/courses/:courseId/assignments` - Get course assignments
- `GET /api/assignments/:id` - Get assignment details
- `POST /api/assignments/:id/submit` - Submit assignment (multipart/form-data)
- `GET /api/assignments/:id/submission` - Get submission details

#### Quizzes
- `GET /api/courses/:courseId/quizzes` - Get course quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `GET /api/quizzes/:id/questions` - Get quiz questions
- `POST /api/quizzes/:id/attempt` - Start quiz attempt
- `POST /api/quizzes/:id/submit` - Submit quiz answers

#### Grades
- `GET /api/grades` - Get all grades
- `GET /api/courses/:courseId/grades` - Get course grades

#### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot
- `GET /api/chatbot/history` - Get chat history
- `DELETE /api/chatbot/history` - Clear chat history

### API Client Configuration

The API client is configured in `lib/api/client.ts` and includes:
- Automatic JWT token injection from localStorage
- 401 redirect to login page
- Base URL configuration from environment variables

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Component Usage Examples

### Using the FileUpload Component
```tsx
import { FileUpload } from '@/components/shared/FileUpload';

<FileUpload
  onFilesChange={(files) => console.log(files)}
  maxFiles={5}
  accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg'] }}
/>
```

### Using React Query Hooks
```tsx
import { useCourses } from '@/hooks/use-courses';

function MyComponent() {
  const { data: courses, isLoading } = useCourses();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>{courses?.map(course => ...)}</div>;
}
```

## Customization

### Changing Theme Colors
Edit `app/globals.css` to modify the color scheme:
```css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... other colors */
}
```

### Adding New Routes
1. Create a new folder in `app/(dashboard)/`
2. Add `page.tsx` for the route
3. Update navigation in `components/layout/Sidebar.tsx`

### Connecting to Your Backend
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Implement the expected API endpoints in your Python backend
3. The frontend will automatically use your API

## Mock Data

The application currently uses mock data for demonstration. To connect to a real backend:
1. Remove mock data from page components
2. Uncomment the React Query hooks
3. Ensure your backend implements the expected API endpoints

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
