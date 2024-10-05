import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ModulePreview = () => {
  const { moduleId } = useParams(); // Get moduleId from the URL
  const location = useLocation(); // Get the module data from the state passed by navigate
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/quiz?moduleId=${moduleId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch module data');
        }
        const data = await response.json();
        setModuleData(data); // Set the fetched module data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Module Preview for Module ID: {moduleId}</h1>
      
      {/* Display loading, error, or module data */}
      {loading && <p>Loading module data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {/* Show the module information passed from the previous page */}
      <h2 className="text-xl font-semibold mb-2">Initial Module Data (from navigation):</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(location.state, null, 2)}
      </pre>

      {/* Show the data fetched from the API */}
      <h2 className="text-xl font-semibold mb-2 mt-6">Module Data from API:</h2>
      {moduleData && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(moduleData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ModulePreview;
