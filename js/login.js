
function loginClick() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

  axios.post("http://mute-iki-2515.moo.jp/sharing/login.php", { email: email, password: password })
    .then(response => {
      console.log(response.data);
      if (response.data.success == 0) {
        window.location.href = "schedule.html";
      }else if(response.data.success == 1) {
        document.getElementById("errorMessage").innerText = "パスワードが一致しない";
      }else if(response.data.success == 2) {
        document.getElementById("errorMessage").innerText = "メールアドレスが存在しない";
      }
    })
    .catch(error => {
      console.error(error);
    });
}
