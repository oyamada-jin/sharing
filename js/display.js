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
  