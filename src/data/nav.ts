import {
  Book,
  Calendar,
  CalendarDays,
  Home,
  Wallet,
  Building2
} from "lucide-react";

export const bottomTabs = [
  { name: "home", icon: Home, href: "/", label: "Home" },
  { name: "studymaterial", icon: Book, href: "https://www.ktunotes.in/", label: "Study" },
  { name: "attendance", icon: Calendar, href: "/attendance/calendar", label: "Attendance" },
  { name: "finance", icon: Wallet, href: "/expense", label: "Finance" },
  { name: "department", icon: Building2, href: "/department", label: "Department" },
  { name: "event", icon: CalendarDays, href: "/events", label: "Event" },
];