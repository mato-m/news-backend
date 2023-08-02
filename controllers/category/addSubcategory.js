const pool = require("../../dbConfig.js");

const addSubcategory = async (req, res) => {
  if (req.user.role === 1) {
    const { sc_name, cat_id } = req.body;

    if (!sc_name || !cat_id) {
      res.send({
        status: 4,
        message: "Subcategory name and category ID are required",
      });
      return;
    }

    if (sc_name.trim().length < 1 || sc_name.trim().length > 50) {
      res.send({
        status: 5,
        message: "Subcategory name must have between 1 and 50 characters",
      });
      return;
    }

    const client = await pool.connect();
    try {
      const insertQuery =
        "INSERT INTO newz.subcat (sc_name, cat_id) VALUES ($1, $2)";
      await client.query(insertQuery, [sc_name.trim(), cat_id]);

      res.send({ status: 0, message: "Successfully added subcategory" });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding subcategory" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addSubcategory;
