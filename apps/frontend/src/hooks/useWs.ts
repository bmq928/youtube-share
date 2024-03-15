import { useEffect } from 'react'
import io from 'socket.io-client'

export const socket = io()
export function useWs() {
  useEffect(() => {
    socket.on('connect', () => console.log('socket connected'))
    socket.on('disconnect', () => console.log('socket disconnected'))
  }, [])
  return { socket }
}
