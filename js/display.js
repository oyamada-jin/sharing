let taskArray;

function showDeleteConfirmation(taskId) {
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
        // 削除処理を実行するコードを追加
        deleteTask(taskId);
      }
    });
  }

  function deleteTask(taskId) {
    // タスクを削除するための処理を実装
    // ここでAjaxを使ってサーバーに対して削除リクエストを送信すると良いです
    axios.post("http://mute-iki-2515.moo.jp/sharing/delete_task.php", { task_id: taskId })
        .then(response => {
            console.log(response.data);
            if (response.data.success == 0) {
                // 削除成功時の処理
                console.log("削除成功");

              // 削除成功時の処理: タスクの要素を取り除く
              removeTaskElement(taskId);

                // ここでタスクの表示を更新するなどの処理を行うと良いです
            } else if (response.data.success == 1) {
                // 削除失敗時の処理
                console.log("削除失敗");
            }
        })
        .catch(error => {
            console.error(error);
        });
}


// タスク要素を削除する関数
function removeTaskElement(taskId) {
  let taskElement = document.getElementById(`task_${taskId}`);
  if (taskElement) {
      taskElement.remove();
  }
}



  function openModal(taskDetail,taskId) {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    let number = document.getElementById("numbers");
    let date_id = localStorage.getItem('dayNumber');
    let editText = document.getElementById("edit_text");
    number.innerHTML=date_id;
    editText.value = taskDetail;

    window.editingTask = {
      task_id: taskId,
      task_detail: taskDetail
  };

}

  // ページの読み込み完了時にモーダルを非表示にする
document.addEventListener("DOMContentLoaded", function() {

  let modal = document.getElementById("modal");
  modal.style.display = "none";

  let number = document.getElementById("number");
  let date_id = localStorage.getItem('dayNumber');
  number.innerHTML=date_id;


  console.log(document.getElementById("scroll_box"));

  // JavaScriptコード（display.js）で、受け取った日付をHTMLに表示する
// このコードは日付を表示する部分です。



axios.post("http://mute-iki-2515.moo.jp/sharing/display.php", {date_id: date_id})
    .then(response => {
      console.log(response.data);
      if (response.data.success == 0) {

      taskArray = response.data.task_array;
         // taskArray内の各タスクに対して処理を行う
      taskArray.forEach((task, index) => {
      let taskDetail = task.task_detail; // タスクの詳細

      // 新しい要素を作成し、タスクの詳細を設定
      let taskElement = document.createElement("div");
      
      taskElement.classList.add("letter");
      taskElement.innerHTML = `
        <img src="../svg/edit image.svg" alt="編集ボタン" class="editimage" onclick="(() => { openModal('${taskDetail}', ${index}); })()">
        <span>${taskDetail}</span>
        <img src="../svg/dust.svg" alt="ゴミ箱" class="dust" onclick="showDeleteConfirmation(${index})">
      `;
      let content = document.getElementById("content");
      content.appendChild(taskElement);
    });
        // window.location.href = "display.html";
      }else if(response.data.success == 1) {
        document.getElementById("errorMessage").innerText = "";
      }
    })
    // .catch(error => {
    //   console.error(error);
    // });
});

function closeModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}



function updateTask() {
  // let modal = document.getElementById("modal");
  let editText = document.getElementById("edit_text");
  let number = document.getElementById("numbers"); // 修正: id を "number" から "numbers" に変更
  let date_id = localStorage.getItem('dayNumber');

  // グローバル変数からタスク情報を取得
  let editingTask = window.editingTask;


  let data = {
      task_detail: editText.value,
      date_id: number.textContent,
      task_id: taskArray[editingTask.task_id].task_id // グローバル変数から取得したtask_idを使用
  };


  axios.post("http://mute-iki-2515.moo.jp/sharing/update_task.php", data)
      .then(response => {
          console.log(response.data);
          if (response.data.success == 0) {
            // window.location.href = "display.html";
              closeModal();
              // 修正: タスクを再取得して表示を更新
              axios.post("http://mute-iki-2515.moo.jp/sharing/display.php", { date_id: date_id })
                  .then(response => {
                      if (response.data.success == 0) {
                          let content = document.getElementById("content");
                          content.innerHTML = ""; // 修正: 既存のタスクをクリア
                          let taskArray = response.data.task_array;
                          taskArray.forEach(task => {
                              let taskDetail = task.task_detail;
                              let taskElement = document.createElement("div");
                              taskElement.classList.add("letter");
                              taskElement.innerHTML = `
                                  <img src="../svg/edit image.svg" alt="編集ボタン" class="editimage" onclick="openModal('${taskDetail}')">
                                  <span>${taskDetail}</span>
                                  <img src="../svg/dust.svg" alt="ゴミ箱" class="dust" onclick="showDeleteConfirmation()">
                              `;
                              content.appendChild(taskElement);
                          });
                      }
                  });
          } else if (response.data.success == 1) {
              document.getElementById("errorMessage").innerText = "";
          }
      })
      .catch(error => {
          console.error(error);
      });
}

  