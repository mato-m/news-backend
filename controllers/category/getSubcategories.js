const pool = require("../../dbConfig.js");

const getSubcategories = async (req, res) => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM newz.subcat";
    const result = await client.query(query);
    const subcategories = result.rows;
    res.send({ status: 0, subcategories });
  } catch (error) {
    res.send({ status: 1, message: "Error while fetching subcategories" });
  } finally {
    client.release();
  }
};

module.exports = getSubcategories;
