export default function() {
  let processId = null
  let processChannel = null
  const originChannel = new BroadcastChannel('origin_bus')
  
  originChannel.onmessage = function(e) {
    processChannel.postMessage({ message: `Worker Received: ${e.data}` })
  }
  
  self.onmessage = function(e) {
    if (e.data.event === 'connect') {
      processId = e.data.id
      processChannel = new BroadcastChannel(`process_bus:${processId}`)
    }
    if (e.data.event === 'push') {
      processChannel.postMessage({ message: 'I click on the iframe button' })
      originChannel.postMessage(`The process id ${processId} received event`)
    }
  }
}