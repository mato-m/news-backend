const pool = require("../../dbConfig.js");

const deleteCategory = async (req, res) => {
  if (req.user.role === 1) {
    const cat_id = req.params.cat_id;
    if (!cat_id) {
      res.send({ status: 4, message: "Category ID not provided" });
      return;
    }

    const client = await pool.connect();
    try {
      const deleteQuery = "DELETE FROM newz.cat WHERE cat_id = $1";
      const result = await client.query(deleteQuery, [cat_id]);

      if (result.rowCount === 0) {
        res.send({ status: 5, message: "Category not found" });
      } else {
        res.send({ status: 0, message: "Category deleted successfully" });
      }
    } catch (error) {
      res.send({ status: 1, message: "Error while deleting category" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = deleteCategory;
