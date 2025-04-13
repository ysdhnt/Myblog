// Firebase設定（自分のものを入れてね）
const firebaseConfig = {
  apiKey: "AIzaSyA974kQAXG_l3j2EP0wSRs_M-P8BAhjYvk",
  authDomain: "my-blog-comments-31d2a.firebaseapp.com",
  projectId: "my-blog-comments-31d2a",
  storageBucket: "my-blog-comments-31d2a.firebasestorage.app",
  messagingSenderId: "947054447547",
  appId: "1:947054447547:web:1a5599ae0e1638c5c7929e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 記事ID（URLから取得）
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id") || "default";

// コメント送信
function postComment() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  if (username && message) {
    const newRef = db.ref("comments/" + articleId).push();
    newRef.set({
      name: username,
      message: message,
      time: new Date().toLocaleString()
    });
    document.getElementById("message").value = "";
  }
}

// コメント表示
db.ref("comments/" + articleId).on("value", (snapshot) => {
  const data = snapshot.val();
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";

  for (let id in data) {
    const { name, message, time } = data[id];
    commentsDiv.innerHTML += `
      <div class="comment">
        <strong>${name}</strong><br>
        ${message}<br>
        <small>${time}</small>
        <hr>
      </div>`;
  }
});
