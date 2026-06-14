import {
  Book,
  Calendar2,
  Calendar,
  Home2,
  Money,
  Buildings
} from "iconsax-react";

export const bottomTabs = [
  { name: "home", icon: Home2, href: "/", label: "Home" },
  { name: "studymaterial", icon: Book, href: "https://www.ktunotes.in/", label: "Study" },
  { name: "attendance", icon: Calendar2, href: "/attendance/calendar", label: "Attendance" },
  { name: "finance", icon: Money, href: "/expense", label: "Finance" },
  { name: "department", icon: Buildings, href: "/department", label: "Department" },
  { name: "event", icon: Calendar, href: "/events", label: "Event" },
  
];