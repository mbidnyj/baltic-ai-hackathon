import React from 'react';
import { useParams } from 'react-router-dom';

const ModulePreview = () => {
  const { moduleId } = useParams();

  return (
    <div>
      <h1>Module Preview for Module {moduleId}</h1>
      {/* Fetch and display module details based on moduleId */}
    </div>
  );
};

export default ModulePreview;
