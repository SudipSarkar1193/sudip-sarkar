import { FaCode, FaDatabase } from "react-icons/fa";

const projects = [
  {
    name: "Social Media App",
    description: "A social media platform with authentication and real-time updates.",
    image: "/images/social-media-app.png",
  },
  {
    name: "E-commerce Website",
    description: "A fully functional e-commerce website with cart and payment integration.",
    image: "/images/ecommerce.png",
  },
  {
    name: "Portfolio Website",
    description: "A modern personal portfolio website built with React and Tailwind.",
    icon: FaCode, // Store the reference, not JSX
  },
  {
    name: "Database Management System",
    description: "A DBMS project with SQL and MongoDB for optimized data handling.",
    icon: FaDatabase, // Store the reference, not JSX
  },
];

export default projects;
