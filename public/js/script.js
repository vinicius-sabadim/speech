const socket = io()

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.interimResults = false

const synthVoice = (text) => {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text

  synth.speak(utterance)
}

document.querySelector('button').addEventListener('click', () => {
  recognition.start()
})

recognition.addEventListener('result', (e) => {
  const last = e.results.length - 1
  const text = e.results[last][0].transcript

  socket.emit('chat message', text)
})

socket.on('bot reply', synthVoice)
