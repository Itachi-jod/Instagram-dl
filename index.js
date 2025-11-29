import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Allow only GET
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Only GET allowed"
    });
  }

  // ?url=
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Missing ?url="
    });
  }

  try {
    // Reelsaver API
    const apiUrl = `https://reelsaver.vercel.app/api/video?postUrl=${encodeURIComponent(
      url
    )}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "Accept": "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "Referer": "https://reelsaver.vercel.app/",
        "Origin": "https://reelsaver.vercel.app"
      }
    });

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err.response?.data || null
    });
  }
}
