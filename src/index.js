let cards = [
  {id: 1, title: 'Яблоки', price : 20, img: 'https://i.ytimg.com/vi/XaIQgXLeL2Y/hqdefault.jpg'},
  {id: 2, title: 'Апельсины', price : 30, img: 'https://i.ytimg.com/vi/XaIQgXLeL2Y/hqdefault.jpg'},
  {id: 3, title: 'Не Яблоки', price : 40, img: 'https://i.ytimg.com/vi/XaIQgXLeL2Y/hqdefault.jpg'}
]

const toHTML = card => `
<div class="col">
<div class="card">
  <img class="card-img-top" src="${card.img}" alt="${card.title}">
    <div class="card-body">
      <h5 class="card-title">${card.title}</h5>
      <a href="" class="btn btn-primary" data-btn="price" data-id="${card.id}">Узнать цену</a>
      <a href="" class="btn btn-danger" data-btn="remove" data-id="${card.id}">Удалить</a>
    </div>
  </div>
</div>
`

function render() {
  const html = cards.map(toHTML).join('')
  document.querySelector('#cards').innerHTML = html
}


render()
const modal = $.modal({
  title: 'Цена на фрукты',
  closable: true,
  // content: `
  // <h4>Цена на самые вкусный и самый лучший продукт:</h4>
  // <p> руб.</p>
  // `,
  width: '400px',
  footerButtons: [
    {text: 'Ok', type: 'primary', handler() {
      modal.close()
    }},
    // {text: 'Cancel', type: 'danger', handler() {
    //   console.log('Danger btn clicked')
    //   modal.close()
    // }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const card = cards.find(f => f.id === id)

  if (btnType === 'price') {
    modal.setContent(`
      <p>Цена на ${card.title}: <strong>${card.price}руб</strong></p>
    `)
    modal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете товар: <strong>${card.title}</strong></p>`
    }).then(() =>{
      cards = cards.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel')
    })
  }
})
