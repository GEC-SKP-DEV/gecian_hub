export type ClubCategory = 'tech' | 'non-tech' | 'other';

export type Club = {
  name: string;
  slug: string;
  description: string;
  category: string[];
  logo: string;
  lead?: {
    name?: string;
    phone?: string;
  };
  socials?: {
    instagram?: string;
    whatsapp?: string;
    linkedin?: string;
    website?: string;
  };
}

const clubData: Club[] = [
  {
    name: "IEEE",
    slug: "ieee",
    description:
      "IEEE (Institute of Electrical and Electronics Engineers) is the world's largest technical organization that supports students and professionals in all major engineering fields, including electronics, electrical, computer science, AI, robotics, software development, cybersecurity, and more. For first-year students, IEEE is one of the best platforms to learn beyond the syllabus through workshops, hands-on sessions, seminars, hackathons, competitions, and technical events. It helps you build essential skills like coding, project development, teamwork, leadership, communication, and event management while connecting you with industry experts, seniors, and a global community of engineers.",
    logo: "/club_image/ieee.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/ieeelink?igsh=MXZzM25wbjB1dWxxcA==",
      linkedin: "https://linkedin.com/company/ieee",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Engineering"],
  },
  {
    name: "SAE",
    slug: "sae",
    description:
      "SAE India, formerly the Society of Automotive Engineers India, is an affiliate of SAE International and operates collegiate clubs across India. These clubs emphasize skill development, knowledge sharing, competitions, networking, and professional growth to advance automotive and mobility engineering. SAE India contributes to technology advancement, safety standards, and sustainable mobility through industry-academia collaboration.",
    logo: "/club_image/sae.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/mulearn",
      linkedin: "https://www.linkedin.com/company/saeindia",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Engineering"],
  },
  {
    name: "μLearn",
    slug: "mulearn",
    description:
      "μLearn is a community-driven learning platform that helps students build real skills through a structured, peer-based learning culture. Unlike traditional clubs, μLearn focuses on self-paced skill development combined with guided challenges in areas like programming, AI, cybersecurity, design, web development, problem-solving, soft skills, productivity habits, and more. For first-year students, μLearn is one of the fastest ways to grow because it uses a micro-learning model—learning small concepts daily through tasks, Discord challenges, and community interactions.",
    logo: "/club_image/mulearn.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/mulearn",
      linkedin: "https://linkedin.com/company/mulearn",
      whatsapp: "https://chat.whatsapp.com/FvoLhftysm04LdsYt2S5Zt",
      website: "https://campus-chapter-mulearn.vercel.app/",
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "IEDC",
    slug: "iedc",
    description:
      "IEDC (Innovation and Entrepreneurship Development Centre) is a flagship initiative of Kerala Startup Mission to promote innovation and entrepreneurship among students in Kerala colleges. It serves as the first launchpad for student entrepreneurs, providing access to cutting-edge technology, world-class infrastructure, high-quality mentorship, early risk capital, and global exposure. Perfect for first-years wanting to transform innovative ideas into viable prototypes through workshops, hackathons, and startup incubation support.",
    logo: "/club_image/iedc.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Startup"],
  },
  {
    name: "GDG",
    slug: "gdg",
    description:
      "Google Developer Group (GDG) is a worldwide community of developers passionate about Google technologies. Learn Android development, Flutter, Firebase, Google Cloud, ML Kit, and more through workshops, study jams, and Google hackathons. Connect with Google Developer Experts, build real apps, and get certified while growing your developer network.",
    logo: "/club_image/gdg.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/gdgkerala",
      linkedin: "https://linkedin.com/company/gdg-kerala",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "FOSS",
    slug: "foss",
    description:
      "Free and Open Source Software Club promotes FOSS philosophy and contributes to real open source projects through ICFOSS initiatives. Learn Git, Linux, Python scripting, and contribute to GitHub repositories used by millions. Perfect for first-years wanting to build a GitHub profile with meaningful contributions, master terminal, and join global FOSS communities.",
    logo: "/club_image/foss.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/foss_kerala",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    description:
      "Blockchain Club dives deep into cryptocurrency, smart contracts, DeFi, NFTs, and Web3 development through Kerala Blockchain Academy initiatives. Learn Solidity, Ethereum, IPFS, and build DApps through workshops and blockchain hackathons. Perfect for first-years interested in the future of finance, decentralized apps, and cutting-edge crypto projects.",
    logo: "/club_image/blockchain.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/blockchain_kerala",
      linkedin: "https://linkedin.com/company/kba-kerala",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical"],
  },
  {
    name: "Machine Learning",
    slug: "ml",
    description:
      "Machine Learning Club covers TensorFlow, PyTorch, Computer Vision, NLP, and ML deployment. Participate in Kaggle competitions, build AI projects for hackathons, and learn MLOps. Ideal for first-years wanting to master AI/ML fundamentals and build portfolio projects that impress tech recruiters.",
    logo: "/club_image/ml.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/mlclub_kerala",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical"],
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    description:
      "Cybersecurity Club teaches ethical hacking, penetration testing, CTFs, cryptography, and network security. Compete in national capture-the-flag tournaments, learn tools like Wireshark, Metasploit, and Burp Suite. Perfect for first-years interested in becoming cybersecurity professionals with hands-on practical skills.",
    logo: "/club_image/cybersecurity.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/cybersec_kerala",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "Void Minds",
    slug: "void-minds",
    description:
      "Void Minds is the CSE Department Club at GEC Palakkad focusing on advanced CS concepts, competitive programming, tech events, and department projects. Participate in coding competitions, tech talks, and build connections within the CSE community. Perfect for CSE students wanting department-specific growth and networking.",
    logo: "/club_image/void minds.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://instagram.com/void__minds",
      whatsapp: "https://wa.me/919876543210",
    },
    category: ["Technical"],
  },
  {
    name: "Tinkerhub",
    slug: "tinkerhub",
    description:
      "Kerala’s largest student-led maker community focused on hardware, IoT, robotics, AI, and product development.",
    category: ["Technical", "Maker"],
    logo: "/club_image/tinkerhub.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      whatsapp: "https://wa.me/919876543210",
      linkedin: "https://linkedin.com/company/tinkerhub",
      instagram: "https://instagram.com/tinkerhub",
      website: "https://tinkerhub.org"
    },
  },
  {
    name: "Arts and Cultural Society",
    slug: "arts-club",
    description:
      "Void Minds is the CSE Department Club at GEC Palakkad focusing on advanced CS concepts, competitive programming, tech events, and department projects. Participate in coding competitions, tech talks, and build connections within the CSE community. Perfect for CSE students wanting department-specific growth and networking.",
    logo: "/club_image/arts-club.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/arts_and_cultural_club_gecp/",
      whatsapp: "https://wa.me/919876543210", // to be updated
    },
    category: ["Non-Technical", "Cultural"],
  },
  {
    name: "Robotics",
    slug: "robotics",
    description:
      "A club dedicated to robotics-related activities and projects.",
    logo: "/club_image/robotics.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/arts_and_cultural_club_gecp/", // to be updated
      whatsapp: "https://wa.me/919876543210", // to be updated
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "ISTE Student Chapter",
    slug: "iste",
    description:
      "The local chapter of the Indian Society for Technical Education.",
    logo: "/club_image/iste.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/arts_and_cultural_club_gecp/", // to be updated
      whatsapp: "https://wa.me/919876543210", // to be updated
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "EMRC",
    slug: "emrc",
    description:
      "Electrical Maintenance and Research Club (EMRC), associated with the Electrical Engineering department, conducting maintenance work and technical events.",
    logo: "/club_image/emrc.png",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/arts_and_cultural_club_gecp/", // to be updated
      whatsapp: "https://wa.me/919876543210", // to be updated
    },
    category: ["Technical", "Learning"],
  },
  {
    name: "Tecknow",
    slug: "tecknow",
    description:
      "Associated with the Electronics and Communication Engineering (ECE) department.",
    logo: "/club_image/tecknow.jpg",
    lead: {
      name: "Club Lead",
      phone: "+91XXXXXXXXXX"
    },
    socials: {
      instagram: "https://www.instagram.com/arts_and_cultural_club_gecp/", // to be updated
      whatsapp: "https://wa.me/919876543210", // to be updated
    },
    category: ["Technical"],
  },
];

export default clubData;
