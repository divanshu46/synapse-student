import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { NewsSection } from '@/components/dashboard/NewsSection';
import { ChatWindow } from '@/components/chatbot/ChatWindow';

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_350px] gap-6">
        <div className="space-y-6">
          <UpcomingTasks />
          <CalendarWidget />
        </div>

        <div className="flex items-start justify-center">
          <div className="w-full h-[calc(100vh-6rem)]">
            <ChatWindow />
          </div>
        </div>

        <div>
          <NewsSection />
        </div>
      </div>
    </div>
  );
}
