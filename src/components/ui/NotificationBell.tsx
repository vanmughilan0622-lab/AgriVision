"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { getNotifications, markNotificationAsRead } from "@/app/actions/notification-actions";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifs() {
      const res = await getNotifications();
      if (res.success && res.data) {
        setNotifications(res.data);
      }
    }
    fetchNotifs();
    // In a real app, you might poll or use websockets here
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed sm:absolute top-[4.5rem] sm:top-full left-4 right-4 sm:left-auto sm:right-0 sm:mt-2 w-auto sm:w-80 max-w-sm sm:max-w-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                {unreadCount} New
              </span>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">No notifications</div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={cn(
                      "p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                      !notif.isRead && "bg-emerald-50/50 dark:bg-emerald-950/10"
                    )}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                      {!notif.isRead && (
                        <button onClick={() => handleMarkAsRead(notif.id)} className="text-emerald-500 hover:text-emerald-600" title="Mark as read">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {format(new Date(notif.createdAt), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
