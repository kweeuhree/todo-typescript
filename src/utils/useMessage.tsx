import { useState } from 'react';

const useMessage = (): [string, (newMessage: string) => void] => {
    // initialize state to store new recipe status message
  const [message, setMessage] = useState<string>('');

  // handle update status message
  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  }

  return [message, updateMessage];
};

export default useMessage;
