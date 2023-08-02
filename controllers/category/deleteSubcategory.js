const pool = require("../../dbConfig.js");

const deleteSubcategory = async (req, res) => {
  if (req.user.role === 1) {
    const sc_id = req.params.sc_id;
    if (!sc_id) {
      res.send({ status: 4, message: "Subcategory ID not provided" });
      return;
    }

    const client = await pool.connect();
    try {
      const deleteQuery = "DELETE FROM newz.subcat WHERE sc_id = $1";
      const result = await client.query(deleteQuery, [sc_id]);

      if (result.rowCount === 0) {
        res.send({ status: 5, message: "Subcategory not found" });
      } else {
        res.send({ status: 0, message: "Subcategory deleted successfully" });
      }
    } catch (error) {
      res.send({ status: 1, message: "Error while deleting subcategory" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = deleteSubcategory;
