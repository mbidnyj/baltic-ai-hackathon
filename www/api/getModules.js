// Example data for modules
const modules = [
    {
        moduleId: "1",
        title: "Physics Fundamentals",
        subject: "PHYSICS",
        description: "Learn about the laws of motion.",
        questions: 15,
        grade: 8,
        students: 48,
        moduleCreatorId: "1001" // Example creator ID
    },
    {
        moduleId: "2",
        title: "World History",
        subject: "HISTORY",
        description: "Understand key events in world history.",
        questions: 10,
        grade: 4,
        students: 7,
        moduleCreatorId: "1002" // Example creator ID
    }
];

// Handler for the GET /api/modules route
module.exports = (req, res) => {
    console.log('Received request at /api/modules');
    const { moduleCreatorId } = req.query;

    let filteredModules = modules;
    if (moduleCreatorId) {
        filteredModules = modules.filter(module => module.moduleCreatorId === moduleCreatorId);
    }

    // Return JSON response
    res.json(filteredModules);
};
