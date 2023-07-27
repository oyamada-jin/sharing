const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // PHPファイルにログイン情報を送信
  axios.post("http://mute-iki-2515.moo.jp/sharing/login.php", { email: email, password: password })
    .then(response => {
        console.log(response.data);
      if (response.data) {
        // ログイン成功
        window.location.href = "schedule.html"; // ログイン後のページにリダイレクト
      } else {
        // ログイン失敗
        displayErrorMessage("ログイン情報が間違っています。");
      }
    })
    .catch(error => {
      alert("Error:", error);
      displayErrorMessage("サーバーエラーが発生しました。");
    });
});

function displayErrorMessage(message) {
  errorMessage.textContent = message;
}