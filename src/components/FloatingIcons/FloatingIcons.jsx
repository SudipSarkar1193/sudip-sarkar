import React, { useEffect, useRef } from "react";
import "./FloatingIcons.css";

const icons = [
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743408/ywg74hajrrmt6uaztxoi.png", // Python
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743408/ct7w70vs76xthgyotqpw.png", // Java
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743407/rlhqksnnj1ndjfv9qxb9.png", // Go
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743408/mgom2cduzznfw33ckrbi.png" ,// C++
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743407/vipvbehyoqlkhra9rugy.png", // C
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743407/wdyqymoailo9vtfrv1ee.png" ,// React
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743407/dbfaiy4ldi2ka68uukzu.png" ,// js

  
];

const FloatingIcons = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const iconElementsRef = useRef([]);
  const headerHeightRef = useRef(0);

  useEffect(() => {
    const numIcons = 10;
    const iconSize = 50;

    const header = document.querySelector("header");
    headerHeightRef.current = header ? header.offsetHeight : 0;

    const initializeIcons = () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
      iconElementsRef.current = [];

      for (let i = 0; i < numIcons; i++) {
        const img = document.createElement("img");
        img.src = icons[i % icons.length];
        img.className = "floating-icon";
        img.style.width = `${iconSize}px`;
        img.style.height = `${iconSize}px`;

        const x = Math.random() * (window.innerWidth - iconSize);
        const y =
          headerHeightRef.current +
          Math.random() * (window.innerHeight - headerHeightRef.current - iconSize);
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        img.dataset.dx = (Math.random() - 0.5) * 2;
        img.dataset.dy = (Math.random() - 0.5) * 2;

        containerRef.current.appendChild(img);
        iconElementsRef.current.push(img);
      }

      animateIcons();
    };

    const animateIcons = () => {
      iconElementsRef.current.forEach((icon) => {
        let x = parseFloat(icon.style.left);
        let y = parseFloat(icon.style.top);
        let dx = parseFloat(icon.dataset.dx);
        let dy = parseFloat(icon.dataset.dy);

        if (x + iconSize >= window.innerWidth || x <= 0) dx = -dx;
        if (y + iconSize >= window.innerHeight || y <= headerHeightRef.current) dy = -dy;

        x += dx;
        y += dy;
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        icon.dataset.dx = dx;
        icon.dataset.dy = dy;
      });

      animationFrameRef.current = requestAnimationFrame(animateIcons);
    };

    initializeIcons();

    const handleResize = () => {
      const header = document.querySelector("header");
      headerHeightRef.current = header ? header.offsetHeight : 0;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      iconElementsRef.current = [];
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="floating-icons-container bg-gray-200 dark:bg-gray-800"></div>;
};

export default FloatingIcons;
