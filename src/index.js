import ProcessBus from './ProcessBus'

const bus = new ProcessBus()
bus.on('message', function(e) {
  showMessage(e.data.message)
})

function showMessage(message) {
  const div = document.createElement('div')
  div.textContent = message
  document.body.appendChild(div)
}

showMessage(`Process id: ${bus.id}`)

document.getElementById('push').addEventListener('click', function() {
  bus.emit('push')
})
