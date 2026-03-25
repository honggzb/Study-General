export interface Section {
  title: string;
  description: string;
  image: string;
  services: string[];
}

export const sections: Section[] = [
  {
    title: "Product",
    description: "Discover the features and benefits of our product.",
    image: "/images/project1.png",
    services: [
      "Feature 1: AI-powered room design",
      "Feature 2: Real-time collaboration",
      "Feature 3: Extensive furniture library",
      "Feature 4: Customizable design templates",
      "Feature 5: Augmented reality visualization",
    ],
  },
  { title: "Pricing",
    description: "Choose the plan that suits your needs.",
    image: "/images/project2.png",
    services: [
      "Free Plan: Basic features for personal use",
      "Pro Plan: Advanced features for professionals",
      "Enterprise Plan: Custom solutions for businesses",
    ],
  },
  { title: "Community",
    description: "Join our community of interior design enthusiasts.",
    image: "/images/project3.png",
    services: [
      "Forum: Connect with other users and share ideas",
      "Events: Participate in webinars and workshops",
      "Resources: Access design tips and inspiration",
    ],
  },
  {
    title: "Enterprise",
    description: "Tailored solutions for businesses of all sizes.",
    image: "/images/project1.png",
    services: [
      "Custom Integrations: Seamlessly integrate with your existing tools",
      "Dedicated Support: Get personalized assistance from our team",
      "Scalable Solutions: Grow your business with our flexible plans",
      "Security: Ensure the safety of your data with our robust security measures",
    ],
  },
];