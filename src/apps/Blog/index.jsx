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
                // if theres imageType, and if its imageType is portrait,landscape, or square
                style={
                  section.imageType &&
                  (section.imageType === "portrait"
                    ? { height: "100%", width: "auto" }
                    : section.imageType === "landscape"
                    ? { height: "auto", width: "100%" }
                    : { height: "100%", width: "100%" })
                }
                
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
