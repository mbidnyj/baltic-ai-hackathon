module.exports = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Request successful",
    });
};
