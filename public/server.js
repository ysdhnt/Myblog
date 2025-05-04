const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 静的ファイルの配信
app.use(express.static('public'));

const viewsFile = 'views.json';

// 初期化（ファイルがなければ作る）
if (!fs.existsSync(viewsFile)) {
  fs.writeFileSync(viewsFile, JSON.stringify({}));
}

// 閲覧数の加算API
app.get('/api/view', (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send('記事IDが必要です');

  const data = JSON.parse(fs.readFileSync(viewsFile));
  data[id] = (data[id] || 0) + 1;

  fs.writeFileSync(viewsFile, JSON.stringify(data, null, 2));
  res.json({ views: data[id] });
});

// 閲覧数の取得API
app.get('/api/get-views', (req, res) => {
  const id = req.query.id;
  const data = JSON.parse(fs.readFileSync(viewsFile));
  res.json({ views: data[id] || 0 });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} でサーバーが起動中`);
});
