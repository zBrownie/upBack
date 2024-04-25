export const authMiddleware = async (req, res) => {
  const userAuth = req.headers["jwt"];
  if (!userAuth) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
