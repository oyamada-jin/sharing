function sinup(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;


    axios.post("http://mute-iki-2515.moo.jp/sharing/sinup.php", { email: email, password: password, username: username })
    .then(response => {
      console.log(response.data);
      if (response.data.success == 0) {
        window.location.href = "login.html";
      }else if(response.data.success == 1) {
        document.getElementById("errorMessage").innerText = "必須フィールドが入力されていません";
      }
    })
    .catch(error => {
      console.error(error);
    });


}