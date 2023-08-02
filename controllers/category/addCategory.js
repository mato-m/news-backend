const pool = require("../../dbConfig.js");

const addCategory = async (req, res) => {
  if (req.user.role === 1) {
    const client = await pool.connect();
    try {
      const { cat_name } = req.body;
      if (cat_name.trim().length < 1 || cat_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Category name must have between 1 and 20 characters",
        });
        return;
      }
      await client.query("INSERT INTO newz.cat (cat_name) VALUES ($1)", [
        cat_name.trim(),
      ]);
      res.send({ status: 0, message: "Successfully added category" });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding category" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addCategory;
