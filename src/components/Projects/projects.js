import { FaCode, FaDatabase } from "react-icons/fa";

const projects = [
  {
    name: "Movie Ticket Booking System",
    description:
      "A console-based Java application for booking movie tickets, featuring a layered architecture with models, services, and controllers.",
    image: "/images/movieticket.png",
    icon: FaCode
  },
  {
    name: "Parallel Merge Sort Implementation",
    description:
      "A Java application comparing parallel and sequential Merge Sort algorithms using multi-threading for large datasets.",
    image: "/images/mergesort.png",
    icon: FaCode
  },
  {
    name: "Try-Your-Gyan",
    description:
      "An AI-powered quiz platform with real-time participation, user authentication, and quiz sharing via unique links.",
    image: "/icons/try-your-gyan.png",
    icon: FaDatabase
  },
  {
    name: "Social Media Application",
    description:
      "A full-stack MERN social media platform with real-time notifications, post creation, and user authentication.",
    image: "/images/socialmedia.png",
    icon: FaCode
  }
];

export default projects;