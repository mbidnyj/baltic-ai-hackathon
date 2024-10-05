module.exports = async (req, res) => {
    const user = {
        user_id: "1",
        username: "maksym-bidnyi",
        password: "password",
        name: "Maksym",
        surname: "Bidnyi",
        email: "maksym-bidnyi@gmail.com",
        role: "student",
    };
    res.json(user);
};
