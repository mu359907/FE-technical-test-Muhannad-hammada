import { useState, useCallback } from 'react';
import { EXAM_STATE, TIMER_TYPE, SocketData } from '@/types/socket.type';

const initialSocketData: SocketData = {
  examId: '',
  timerType: TIMER_TYPE.EXAM,
  time: 0,
  timeLeft: 0,
  audioNotificationTime: [],
  breakTime: 0,
  totalRound: 0,
  currentRound: 1,
  isRunning: false,
  isFinished: false,
  state: EXAM_STATE.DEFAULT,
  timer: {
    minutes: '00',
    seconds: '00'
  }
};

const useExamState = () => {
  const [socketData, setSocketData] = useState<SocketData>(initialSocketData);

  const handleExamState = useCallback((data: Partial<SocketData>) => {
    setSocketData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  return {
    socketData,
    setSocketData,
    handleExamState
  };
};

export default useExamState;
