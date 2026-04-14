import { UIState } from '@/app/actions';
import React from 'react'

interface MessagesProps {
  message: UIState;
}

const ChatList = ({message}: MessagesProps) => {

  if(!message) return null;

  return (
    <div className='relative mx-auto max-w-2xl px-4'>
      {message.map((message, index) => (
        <div key={message.id} className='pb-4'>
          {message.display}
        </div>
      ))}
    </div>
  )
}

export default ChatList