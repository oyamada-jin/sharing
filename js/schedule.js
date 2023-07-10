function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

// ページの読み込み完了時にモーダルを非表示にする
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
});



function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}