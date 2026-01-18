import dgram from 'react-native-udp'
import { Buffer } from 'buffer'

global.Buffer = Buffer

const DISCOVERY_PORT = 4210
//const DISCOVERY_MESSAGE = 'DISCOVER_ESP32'

export function discoverESP32(espName,timeout = 3000) {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket('udp4')

    socket.bind(() => {
      socket.setBroadcast(true)

      const message = Buffer.from(espName)

      socket.send(
        message,
        0,
        message.length,
        DISCOVERY_PORT,
        '255.255.255.255'
      )
    })

    socket.on('message', (msg, rinfo) => {
      const response = msg.toString()
      // očakávame: ESP32LCD;IP;PORT
      console.log(response)
      if (response.startsWith('ESP32LCD')) {
        const [, ip, port] = response.split(';')
        socket.close()
        resolve({ ip, port: Number(port) })
      }
    })

    socket.on('error', err => {
      socket.close()
      reject(err)
    })

    setTimeout(() => {
      socket.close()
      reject(new Error('ESP32 nenájdené'))
    }, timeout)
  })
}
