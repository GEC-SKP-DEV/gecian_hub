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
      "IEEE is a professional club focused on advancing technology and innovation through workshops, seminars, and projects.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
    name: "MuLearn",
    slug: "mulearn",
    description:
      "MuLearn focuses on peer learning, encouraging students to explore and grow through collaborative knowledge sharing.",
    image: "/club_image/mulearn.png",
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
      "   on peer learning, encouraging students to explore and grow through collaborative knowledge sharing.",
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
