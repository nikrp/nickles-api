var express = require('express');
var router = express.Router();

var axios = require("axios");

let memes = {
    coding: [
        "https://github.com/nikrp/nikrp/assets/76831568/341747c4-64c6-4656-8327-f7e49df69731", 
        "https://github.com/nikrp/nikrp/assets/76831568/8540c696-3760-4d12-b0f6-3e80eeb28396", 
        "https://github.com/nikrp/nikrp/assets/76831568/3e8c0f1a-5d60-44f1-a8d1-0e3147b66007", 
        "https://github.com/nikrp/nikrp/assets/76831568/8eaa3d61-d33f-4fff-ab99-2c724a717189", 
        "https://github.com/nikrp/nikrp/assets/76831568/0be3a60a-7351-4c60-b63a-b331b7190d68", 
        "https://github.com/nikrp/nikrp/assets/76831568/7cd4d887-0136-46eb-b8ff-864ec81067e5", 
        "https://github.com/nikrp/nikrp/assets/76831568/804ad4fc-f3b8-4a58-b5ec-eada6f6c4d2e", 
        "https://github.com/nikrp/nikrp/assets/76831568/b5822348-e3ed-4ba7-8682-0cba1ad3cd5a", 
        "https://github.com/nikrp/nikrp/assets/76831568/16e96670-23ee-406a-a520-45980abc1286", 
        "https://github.com/nikrp/nikrp/assets/76831568/79a7534d-8a36-426c-b1d4-fb6aef4f7714",
        "https://github.com/nikrp/nikrp/assets/76831568/f5d03080-0ea5-4465-ba4e-9d3f636b6619",
        "https://github.com/nikrp/nikrp/assets/76831568/fc7aee50-9342-4f84-b8d2-708982efa7c3",
        "https://github.com/nikrp/nikrp/assets/76831568/51b09179-61ea-422d-a6d3-0e699e2226c2",
        "https://github.com/nikrp/nikrp/assets/76831568/e7095f7d-9b8b-4678-b95a-2900943589d1",
        "https://github.com/nikrp/nikrp/assets/76831568/80cc48e9-4389-46c2-a4b5-b304452b339c",
    ],
}

router.get('/random-meme', async function(req, res, next) {
  let genre = req.query.g;
  
  try {
    const meme_url = memes[genre][(Math.floor(Math.random() * memes[genre].length))];

    const response = await axios.get(meme_url, { responseType: 'arraybuffer' });
    
    if (req.query.url = "false") {
      if (response.status === 200) {
        // Set the content type based on the image format (e.g., 'image/jpeg' or 'image/png')
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust as needed
  
        // Send the image data as the response
        res.send(Buffer.from(response.data, 'binary'));
      } else {
        // Handle errors if the image couldn't be fetched
        res.status(response.status).send('Failed to fetch image');
      }
    } else if (res.query.url = "true") {
      res.send(meme_url);
    } else {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json({ meme_url: meme_url });
    }
  } catch (e) {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.json({ meme_url: "Invalid Meme Genre"});
  }
});

module.exports = router;
