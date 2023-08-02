const pool = require("../../dbConfig.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

const editArticle = async (req, res) => {
  const { art_id } = req.params;
  if (req.user.role !== 1) {
    res.send({
      status: 1,
      message: "Unauthorized. Only admins can edit articles.",
    });
    return;
  }

  try {
    let art_img = null;
    deleteImageOnUpload = false;

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

      const { art_title, art_md, art_sc, tags, delete_image } = req.body;
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
          message: "Article content must have at least 1 character",
        });
        return;
      }

      if (!art_title || !art_md || !art_sc) {
        res.send({ status: 1, message: "All fields are required" });
        return;
      }
      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        if (delete_image === "true") {
          const prevArticle = await client.query(
            "SELECT art_img FROM newz.article WHERE art_id = $1",
            [art_id]
          );
          const prevImage = prevArticle.rows[0]?.art_img;
          if (
            prevImage &&
            fs.existsSync(path.join(__dirname, "../../dist/uploads", prevImage))
          ) {
            fs.unlinkSync(
              path.join(__dirname, "../../dist/uploads", prevImage)
            );
          }
          deleteImageOnUpload = true;
        } else if (req.file) {
          art_img = req.file.filename;
          const prevArticle = await client.query(
            "SELECT art_img FROM newz.article WHERE art_id = $1",
            [art_id]
          );
          const prevImage = prevArticle.rows[0]?.art_img;
          if (
            prevImage &&
            fs.existsSync(path.join(__dirname, "../../dist/uploads", prevImage))
          ) {
            fs.unlinkSync(
              path.join(__dirname, "../../dist/uploads", prevImage)
            );
          }
        }
        if (deleteImageOnUpload) {
          art_img = null;
        }
        const updateArticleQuery1 = `
        UPDATE newz.article
        SET 
          art_title = $1,
          art_md = $2,
          art_sc = $3,
           art_img = $4
        WHERE art_id = $5
      `;
        const updateArticleQuery2 = `
      UPDATE newz.article
      SET 
        art_title = $1,
        art_md = $2,
        art_sc = $3
      WHERE art_id = $4
    `;

        await client.query(
          art_img || deleteImageOnUpload
            ? updateArticleQuery1
            : updateArticleQuery2,
          art_img || deleteImageOnUpload
            ? [art_title.trim(), art_md.trim(), art_sc, art_img, art_id]
            : [art_title.trim(), art_md.trim(), art_sc, art_id]
        );
        const deleteTagLinksQuery = `
          DELETE FROM newz.tags
          WHERE art_id = $1
        `;

        await client.query(deleteTagLinksQuery, [art_id]);

        if (tagsArray && Array.isArray(tagsArray)) {
          const createTagLinksQuery = `
            INSERT INTO newz.tags (art_id, tag)
            VALUES ($1, $2)
          `;

          for (const tag of tagsArray) {
            await client.query(createTagLinksQuery, [art_id, tag]);
          }
        }

        await client.query("COMMIT");

        res.send({
          status: 0,
          message: "Article updated successfully",
        });
      } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error while editing article:", error);
        res.send({ status: 1, message: "Failed to update article" });
      } finally {
        client.release();
      }
    });
  } catch (error) {
    console.error("Error while editing article:", error);
    res.send({ status: 1, message: "Failed to update article" });
  }
};

module.exports = editArticle;
