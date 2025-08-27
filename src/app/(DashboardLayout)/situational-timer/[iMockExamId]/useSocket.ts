import { useCallback } from 'react';
import { EXAM_STATE, TIMER_TYPE, SocketData } from '@/types/socket.type';

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: remainingSeconds.toString().padStart(2, '0')
  };
};

export const useExamSocket = (examId: string, handleExamState: (data: Partial<SocketData>) => void) => {
  const initializeSocket = useCallback(() => {
    // Mock socket initialization
    console.log('Socket initialized for exam:', examId);
    
    // Simulate connection
    setTimeout(() => {
      handleExamState({
        state: EXAM_STATE.CONNECTED
      });
    }, 1000);
  }, [examId, handleExamState]);

  return {
    initializeSocket
  };
};
