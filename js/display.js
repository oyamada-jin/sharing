function showDeleteConfirmation() {
    Swal.fire({
      title: '削除の確認',
      text: 'ゴミ箱ボタンを押すと削除されます。削除してもよろしいですか？',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'キャンセル',
      confirmButtonText: '削除する',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // 削除処理を実行するコードを追加
        console.log("削除処理を実行します");
      }
    });
  }

  // JavaScriptコード（display.js）で、受け取った日付をHTMLに表示する
// このコードは日付を表示する部分です。

document.addEventListener("DOMContentLoaded", function() {
  let numbers = document.getElementById("numbers");
   // PHPから渡された日付を表示
  let date_id = numbers.innerHTML; // 日付を取得



axios.post("http://mute-iki-2515.moo.jp/sharing/display.php", {date_id: date_id})
    .then(response => {
      console.log(response.data);
      if (response.data.success == 0) {
        // window.location.href = "display.html";
      }else if(response.data.success == 1) {
        document.getElementById("errorMessage").innerText = "";
      }
    })
    .catch(error => {
      console.error(error);
    });

  });
  