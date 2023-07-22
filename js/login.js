// フォーム送信時のイベントを取得
document.getElementById("loginForm").addEventListener("submit", function (event) {
    // デフォルトのフォーム送信を防止
    event.preventDefault();
  
    // 入力値を取得
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // エラーメッセージをリセット
    document.getElementById("errorMessage").textContent = "";
  
    // 入力チェック
    if (!email || !password) {
      displayErrorMessage("メールアドレスとパスワードを入力してください。");
    } else {
      window.location.replace("schedule.html");
    }
  });
  
  // エラーメッセージを表示する関数
  function displayErrorMessage(message) {
    document.getElementById("errorMessage").textContent = message;
  }