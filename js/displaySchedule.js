function openModal(dayNumber) {
    let numbers = document.getElementById("numbers");
    numbers.innerHTML = dayNumber;
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    localStorage.setItem('dayNumber', dayNumber);
}

// ページの読み込み完了時にモーダルを非表示にする
document.addEventListener("DOMContentLoaded", function() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
});



function onScheduleClick() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";

    let input_field = document.getElementById("input_field").value;

    let numbers = document.getElementById("numbers").textContent;

    let userId = localStorage.getItem('userId');

    if (input_field.trim() !== "") {
    let data = {
        input_field: input_field,
        date_id: numbers,
        user_id: userId
    };

    
    axios.post("http://mute-iki-2515.moo.jp/sharing/display.php", data)
    .then(response => {
      console.log(response.data);
      if (response.data.success == 0) {

        // let date_id = response.data.date_id;
        window.location.href = "display.html";

      }else if(response.data.success == 1) {
        document.getElementById("errorMessage").innerText = "";
      }
    })
    .catch(error => {
      console.error(error);
    });
} else {
    document.getElementById("errorMessage").innerText = "入力されていません";
    }
}