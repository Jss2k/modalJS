$.confirm = function(options) {
  return new Promise((resolve, reject) => {
    const confirmModal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,
      onClose() {
        confirmModal.destroy()
      },
      footerButtons: [
        {text: 'Отменить', type: 'secondary', handler() {
          confirmModal.close()
          reject()
        }},
        {text: 'Удалить', type: 'danger', handler() {
          confirmModal.close()
          resolve()
        }}
      ]
    })

    setTimeout(() => confirmModal.open(), 100)
  })
}
