import React, { useEffect, useRef } from "react";
import "./FloatingIcons.css";

const cIcon = "/icons/1553099_blue_c_letter_alphabet_letters_icon.png";
const cppIcon = "/icons/7564189_c_logo_plus plus_plus_+ +_icon.png";
const goIcon =
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743407/rlhqksnnj1ndjfv9qxb9.png";
const reactIcon = "/icons/1174949_js_react js_logo_react_react native_icon.png";
const jsIcon =
  "/icons/652581_code_command_develop_javascript_language_icon.png";
const pythonIcon =
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743408/ywg74hajrrmt6uaztxoi.png";
const javaIcon =
  "https://res.cloudinary.com/dvsutdpx2/image/upload/v1742743408/ct7w70vs76xthgyotqpw.png";

const icons = [cppIcon, cIcon, goIcon, reactIcon, jsIcon, pythonIcon, javaIcon];

const FloatingIcons = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const iconElementsRef = useRef([]);
  const headerHeightRef = useRef(0);

  useEffect(() => {
    const numIcons = 10;
    const iconSize = 50;

    // Get header height on mount
    const header = document.querySelector("header");
    headerHeightRef.current = header ? header.offsetHeight : 0;

    const loadImages = async (srcList) => {
      const imagePromises = srcList.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
      });
      return Promise.all(imagePromises);
    };

    const initializeIcons = async () => {
      try {
        const images = await loadImages(icons);
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";
        iconElementsRef.current = [];

        for (let i = 0; i < numIcons; i++) {
          const img = images[i % images.length].cloneNode();
          img.className = "floating-icon";
          img.style.width = `${iconSize}px`;
          img.style.height = `${iconSize}px`;

          // Initial position
          const x = Math.random() * (window.innerWidth - iconSize);
          const y =
            headerHeightRef.current +
            Math.random() *
              (window.innerHeight - headerHeightRef.current - iconSize); //(start below header)
          img.style.left = `${x}px`;
          img.style.top = `${y}px`;

          // Initial velocity
          img.dataset.dx = (Math.random() - 0.5) * 2;
          img.dataset.dy = (Math.random() - 0.5) * 2;

          containerRef.current.appendChild(img);
          iconElementsRef.current.push(img);
        }

        animateIcons();
      } catch (error) {
        console.error("Error loading icons:", error);
      }
    };

    const animateIcons = () => {
      const icons = iconElementsRef.current;
      if (!icons.length) return;

      icons.forEach((icon) => {
        let x = parseFloat(icon.style.left);
        let y = parseFloat(icon.style.top);
        let dx = parseFloat(icon.dataset.dx);
        let dy = parseFloat(icon.dataset.dy);

        // Bounce off boundaries (use header height for top boundary)
        if (x + iconSize >= window.innerWidth || x <= 0) {
          dx = -dx;
        }
        if (
          y + iconSize >= window.innerHeight ||
          y <= headerHeightRef.current
        ) {
          dy = -dy;
        }

        // Update position
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

    //Update header height on resize
    const handleResize = () => {
      const header = document.querySelector("header");
      headerHeightRef.current = header ? header.offsetHeight : 0;
    };
    window.addEventListener("resize", handleResize);

    //Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      iconElementsRef.current = [];
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-icons-container bg-gray-200 dark:bg-gray-800"
    ></div>
  );
};

export default FloatingIcons;
