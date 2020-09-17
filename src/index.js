const worker = new Worker('./worker.js')
const id = Math.floor((Math.random() * 100) + 1)
const processChannel = new BroadcastChannel(`process_bus:${id}`)

worker.postMessage({
  event: 'connect',
  id
})

function showMessage(message) {
  const div = document.createElement('div')
  div.textContent = message
  document.body.appendChild(div)
}

showMessage(`Process id: ${id}`)

document.getElementById('push').addEventListener('click', function() {
  worker.postMessage({
    event: 'push'
  })
})

processChannel.onmessage = function(e) {
  showMessage(e.data.message)
}