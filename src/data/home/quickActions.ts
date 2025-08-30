export type QuickAction =
  | { text: string; type: "external"; url: string }
  | { text: string; type: "route"; path: string }
  | { text: string; type: "alert"; message: string };

export const quickActions: QuickAction[] = [
  { text: "College Login", type: "external", url: "https://gecskp.etlab.in/user/login" },
  { text: "Bus Time", type: "route", path: "/bus" },
  { text: "Lost & Found", type: "route", path: "/lost" },
  { text: "SGPA Calculator", type: "external", url: "https://ktugpa.web.app/" },
  { text: "Hackathon", type: "external", url: "https://devpost.com/hackathons" },
  { text: "College Map", type: "route", path: "/floor" },
  { text: "Project Collobaration", type: "alert", message: "Project Collobaration feature coming soon!" },
  { text: "Club", type: "route", path: "/club" },
  { text: "Anonymous Complaint", type: "route", path: "/complaint" },
  { text: "Private Hostel", type: "alert", message: "Private Hostel information coming soon!" },
  { text: "Repeto", type: "external", url: "https://codecompasss.github.io/repeto/" },
  { text: "Project Showcase", type: "external", url: "https://codecompasss.github.io/project_archive/" },
];
