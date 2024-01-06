// Project.js or Project.tsx
import React, { useState } from "react";
import "./Project.scss";

const Project = ({ title, description, image, link, github, tech, about }) => {
  // State to toggle the full description view

  return (
    <div className="project-container interactable">
      <div className="project">
        <img src={image} alt={title} className="project-image" />
        <h1 className="project-title">{title}</h1>
        <p className="project-description">{description}</p>
        {tech && (
          <ul className="project-tech-list">
            {tech.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>

        <div className="project-about">
          <p>{about}</p>
          </div>
      </div>
    </div>
  );
};

export default Project;
