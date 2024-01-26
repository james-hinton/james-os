import React from "react";
import "./Blog.scss";

const Blog = ({ title, sections }) => {
  return (
    <div className="blog-container interactable">
      <div className="blog">
        <h1 className="blog-title">{title}</h1>
        {sections.map((section, index) => (
          <div key={index} className="blog-section">
            {section.subtitle && (
              <h2 className="section-title">{section.subtitle}</h2>
            )}
            {section.content && (
              <p className="section-content">{section.content}</p>
            )}
            {section.image && (
              <img
                src={section.image}
                alt={`Section Image ${index}`}
                className="blog-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
