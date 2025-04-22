const firebaseConfig = {
  apiKey: "AIzaSyA974kQAXG_l3j2EP0wSRs_M-P8BAhjYvk",
  authDomain: "my-blog-comments-31d2a.firebaseapp.com",
  projectId: "my-blog-comments-31d2a",
  storageBucket: "my-blog-comments-31d2a.firebasestorage.app",
  messagingSenderId: "947054447547",
  appId: "1:947054447547:web:1a5599ae0e1638c5c7929e",
  databaseURL: "https://my-blog-comments-31d2a-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 記事ID（URLから取得）
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id") || "default";

// コメント投稿
function postComment() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  if (username && message) {
    const newRef = db.ref(`comments/${articleId}`).push();
     newRef.set({
      name: username,
      message: message,
      time: new Date().toLocaleString()
    });
    document.getElementById("message").value = "";
  }
}

const myName = "マイルドマインド";

// コメント表示の部分だけ変更
db.ref(`comments/${articleId}`).on("value", (snapshot) => {
  const data = snapshot.val();
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";
  for (let id in data) {
    const { name, message, time } = data[id];

    // アイコンのURLを名前で分岐
    const iconUrl = name === myName
      ? "img/プロフィール用アイコン.png"      // 専用アイコン
      : "img/丸アイコン人型.jpeg"; // それ以外の人のアイコン

    commentsDiv.innerHTML += `
      <div class="comment">
        <div class="comment-icon" style="background-image: url('${iconUrl}');"></div>
        <div class="comment-content">
          <strong>${name}</strong><br>
          ${message}
          <small>${time}</small>
          <button onclick="deleteComment('${id}')">削除</button>
        </div>
      </div>`;
  }
});
const DELETE_PASSWORD = "hinata200615"; 

function deleteComment(commentId) {
  const input = prompt("削除パスワードを入力してください:");
  if (input === DELETE_PASSWORD) {
    db.ref(`comments/${articleId}/${commentId}`).remove()
      .then(() => {
        console.log("コメントを削除しました");
      })
      .catch((error) => {
        console.error("削除エラー:", error);
      });
  } else {
    alert("パスワードが間違っています");
  }
}
window.deleteComment = deleteComment;
window.postComment = postComment;

const likeRef = db.ref(`likes/${articleId}`); // 記事IDごとに保存

// ボタン押下時
document.getElementById("like-btn").addEventListener("click", () => {
  likeRef.transaction(current => (current || 0) + 1);
});

// リアルタイムで反映
likeRef.on("value", snapshot => {
  const count = snapshot.val() || 0;
  document.getElementById("like-count").textContent = count;
});