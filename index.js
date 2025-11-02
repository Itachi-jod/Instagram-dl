import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to extract direct video URL from Instatik HTML
function extractVideoUrl(html) {
  const matches = [...html.matchAll(/<a[^>]+href="dl\.php\?url=([^"]+)"/g)];
  if (!matches || matches.length === 0) return null;
  const encodedUrl = matches[matches.length - 1][1];
  return decodeURIComponent(encodedUrl);
}

// Main Instagram API route
app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url)
    return res.status(400).json({ status: false, message: "URL is required" });

  try {
    const response = await axios.post(
      "https://instatik.app/core/ajax.php",
      new URLSearchParams({ url, host: "instagram" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const html = response.data;
    const videoUrl = extractVideoUrl(html);

    if (!videoUrl)
      return res
        .status(404)
        .json({ status: false, message: "Video not found" });

    return res.json({ status: true, url: videoUrl });
  } catch (err) {
    console.error("Axios error:", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch video" });
  }
});

// Test via GET
app.get("/download", async (req, res) => {
  const { url } = req.query;
  if (!url)
    return res.status(400).json({ status: false, message: "URL is required" });

  try {
    const response = await axios.post(
      "https://instatik.app/core/ajax.php",
      new URLSearchParams({ url, host: "instagram" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const html = response.data;
    const videoUrl = extractVideoUrl(html);

    if (!videoUrl)
      return res
        .status(404)
        .json({ status: false, message: "Video not found" });

    return res.json({ status: true, url: videoUrl });
  } catch (err) {
    console.error("Axios error:", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch video" });
  }
});

app.get("/", (req, res) => {
  res.send("Instagram Downloader API is running fine.");
});

export default app;
