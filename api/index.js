const axios = require("axios");
const FormData = require("form-data");

// Helper to send pretty JSON responses
function sendPretty(res, data, status = 200) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendPretty(res, { error: "Method not allowed" }, 405);
  }

  const path = req.url.split("?")[0];
  const query = req.query;

  // Root endpoint
  if (path === "/download/" || path === "/download") {
    return sendPretty(res, {
      success: true,
      endpoint: "/",
      author: "ItachiXD",
      message:
        "Welcome to the Instagram Downloader API. Use /download?url=<MEDIA_URL> to download videos/photos.",
    });
  }

  // Download endpoint
  if (path === "/api/download") {
    const mediaUrl = query.url;

    if (!mediaUrl) {
      return sendPretty(res, { error: "Missing ?url=" }, 400);
    }

    try {
      const form = new FormData();
      form.append("url", mediaUrl);

      const response = await axios.post(
        "https://tools.xrespond.com/api/social/all/downloader",
        form,
        {
          headers: {
            ...form.getHeaders(),
            authority: "tools.xrespond.com",
            accept: "application/json",
            origin: "https://downsocial.io",
            referer: "https://downsocial.io/",
            "sec-ch-ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": `"Android"`,
            "user-agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
          },
          timeout: 15000,
        }
      );

      return sendPretty(res, {
        success: true,
        endpoint: "/download",
        author: "ItachiXD",
        data: response.data,
      });
    } catch (error) {
      return sendPretty(res, {
        success: false,
        message: "Upstream API failed",
        error: error.message,
      }, 500);
    }
  }

  // Not found
  return sendPretty(res, { error: "Endpoint not found" }, 404);
};
