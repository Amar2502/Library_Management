import React from "react";

const About = () => {
  return (
    <div className="p-8 space-y-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        About Me
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
        {/* Introduction Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Hi, I’m <strong className="text-blue-500">Amar</strong>. I’m an
            enthusiastic developer, AI/ML enthusiast, and an aspiring creator of
            innovative projects like a Jarvis-like AI system and a functional
            Iron Man suit. I have a passion for learning and a strong commitment
            to mastering advanced technologies to solve real-world problems.
          </p>
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Proficient in Python, C++, and JavaScript</li>
            <li>Experience in web development (HTML, CSS, React.js)</li>
            <li>Data structures and algorithms for data science</li>
            <li>Basics of AI/ML and computer vision</li>
            <li>Researching in fields like aerodynamics, propulsion, and robotics</li>
          </ul>
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong>Book Library System:</strong> A React-based application
              for managing books and student details efficiently.
            </li>
            <li>
              <strong>Smart Plant Watering System:</strong> An IoT project for
              automated plant care.
            </li>
            <li>
              <strong>Jarvis-like AI System:</strong> A work-in-progress AI
              assistant with advanced NLP and computer vision capabilities.
            </li>
          </ul>
        </section>

        {/* Goals Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Future Goals</h2>
          <p className="text-gray-600 leading-relaxed">
            I aim to become a master in electronics, AI/ML, and mechatronics
            while contributing to revolutionary projects like creating a
            real-life functional Iron Man suit. My current focus includes
            advancing in DSA, web development, and preparing for GATE while
            exploring fields like propulsion and AR/HUD design.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
