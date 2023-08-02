const pool = require("../../dbConfig.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "dist/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."), false);
    }
  },
}).single("art_img");

const addArticle = async (req, res) => {
  if (req.user.role !== 1) {
    res.send({
      status: 1,
      message: "Unauthorized. Only admins can add articles.",
    });
    return;
  }
  try {
    let art_img = null;
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error("Error while uploading image:", err);
        res.send({ status: 1, message: "Error uploading image" });
        return;
      } else if (err) {
        console.error("Error while uploading image:", err);
        res.send({ status: 1, message: "Error uploading image" });
        return;
      }
      if (req.file) {
        art_img = req.file.filename;
      }

      const { art_title, art_md, art_sc, tags } = req.body;
      const author = req.user.user_id;
      const tagsArray = tags
        ? tags.split(",").map((tag) => tag.trim().toLowerCase())
        : [];

      if (
        !art_title ||
        art_title.trim().length < 1 ||
        art_title.trim().length > 60
      ) {
        res.send({
          status: 1,
          message: "Title must have between 1 and 60 characters",
        });
        return;
      }

      if (!art_md || art_md.trim().length < 1) {
        res.send({
          status: 1,
          message: "Article content must at least 1 character",
        });
        return;
      }

      if (!art_sc) {
        res.send({ status: 1, message: "All fields are required" });
        return;
      }
      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        const createArticleQuery = `
          INSERT INTO newz.article (art_title, art_md, art_sc, author, art_img)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING art_id
        `;

        const articleResult = await client.query(createArticleQuery, [
          art_title.trim(),
          art_md.trim(),
          art_sc,
          author,
          art_img,
        ]);
        const articleId = articleResult.rows[0].art_id;
        if (tagsArray && Array.isArray(tagsArray)) {
          const createTagLinksQuery = `
            INSERT INTO newz.tags (art_id, tag)
            VALUES ($1, $2)
          `;

          for (const tag of tagsArray) {
            await client.query(createTagLinksQuery, [articleId, tag]);
          }
        }

        await client.query("COMMIT");

        res.send({
          status: 0,
          message: "Article added successfully",
          art_id: articleId,
        });
      } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error while adding article:", error);
        res.send({ status: 1, message: "Failed to add article" });
      } finally {
        client.release();
      }
    });
  } catch (error) {
    console.error("Error while adding article:", error);
    res.send({ status: 1, message: "Failed to add article" });
  }
};

module.exports = addArticle;
