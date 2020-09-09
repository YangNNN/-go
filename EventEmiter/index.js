
import EventEmiter from './EventEmiter.js'

const emiter = new EventEmiter()

emiter.emit({
  type: 'eat',
  message: 'breakfast!!'
})

emiter.on('eat', function (message) {
  console.log(message)
}, {
  isPrevious: true,
  once: true
})

emiter.on('study', function (message) {
  console.log(message)
}, {
  isPrevious: true,
  once: true
})

emiter.emit({
  type: 'eat',
  message: 'lunch!!'
})

emiter.emit({
  type: 'study',
  message: 'study!!'
})

emiter.emit({
  type: 'eat',
  message: 'dinner!!'
})