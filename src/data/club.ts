// Static club Data centralized in data folder
export type Club = {
  name: string;
  slug: string;
  description: string;
  image: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  enrolled: boolean;
};

const clubData: Club[] = [
  {
    name: "IEEE",
    slug: "ieee",
    description:
      "IEEE (Institute of Electrical and Electronics Engineers) is the world’s largest technical organization that supports students and professionals in all major engineering fields, including electronics, electrical, computer science, AI, robotics, software development, cybersecurity, and more. For first-year students, IEEE is one of the best platforms to learn beyond the syllabus through workshops, hands-on sessions, seminars, hackathons, competitions, and technical events. It helps you build essential skills like coding, project development, teamwork, leadership, communication, and event management while connecting you with industry experts, seniors, and a global community of engineers. Through the IEEE Student Branch, you get access to international competitions, research resources, journals, and opportunities to take up leadership roles that strengthen your resume and boost your career. In simple terms, IEEE is the perfect place to grow technically, gain confidence, make friends, and kickstart your engineering journey from the very first year",
    image: "/club_image/ieee.jpg",
    socials: {
      instagram:
        "https://www.instagram.com/ieeelink?igsh=MXZzM25wbjB1dWxxcA==",
      linkedin: "https://linkedin.com/company/ieee",
      whatsapp: "https://wa.me/919876543210",
    },
    enrolled: true,
  },
  {
    name: "SAE",
    slug: "SAE",
    description:
      "SAE India, formerly the Society of Automotive Engineers India, is an affiliate of SAE International and operates collegiate clubs across India. These clubs emphasize skill development, knowledge sharing, competitions, networking, and professional growth to advance automotive and mobility engineering. SAE India contributes to technology advancement, safety standards, and sustainable mobility through industry-academia collaboration. [SAE India context, general knowledge",
    image: "/club_image/sae.png",
    socials: {
      instagram: "https://instagram.com/mulearn",
      linkedin:
        "https://www.instagram.com/mulearn.official?utm_source=ig_web_button_share_sheet&igsh=MTVxY2I4YWgxMjQ3",
      whatsapp: "https://wa.me/919876543210",
    },
    enrolled: false,
  },
  {
    name: "Mulearn",
    slug: "uuu",
    description:
      " μLearn is a community-driven learning platform that helps students build real skills through a structured, peer-based learning culture. Unlike traditional clubs, μLearn focuses on self-paced skill development combined with guided challenges in areas like programming, AI, cybersecurity, design, web development, problem-solving, soft skills, productivity habits, and more. For first-year students, μLearn is one of the fastest ways to grow because it uses a micro-learning model—learning small concepts daily through tasks, Discord challenges, and community interactions. It connects you with seniors, mentors, and learners across Kerala, gives you opportunities to earn skill points, badges, and recognition, and encourages you to work on projects, portfolios, and challenges that directly improve your career readiness. Along with technical growth, μLearn also teaches discipline, consistency, teamwork, and leadership through its community-based activities. In simple words, μLearn is the best place for first-years to start building skills, discover interests, stay consistent, and grow with a supportive student community.",
    image: "/club_image/mulearn.png",
    socials: {
      instagram: "https://instagram.com/mulearn",
      linkedin: "https://linkedin.com/company/mulearn",
      whatsapp: "https://wa.me/919876543210",
    },
    enrolled: true,
  },
];

export default clubData;
