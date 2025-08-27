export enum EXAM_STATE {
  DEFAULT = 'DEFAULT',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED'
}

export enum TIMER_TYPE {
  EXAM = 'EXAM',
  BREAK = 'BREAK'
}

export interface SocketData {
  examId: string;
  timerType: TIMER_TYPE;
  time: number;
  timeLeft: number;
  audioNotificationTime: number[];
  breakTime: number;
  totalRound: number;
  currentRound: number;
  isRunning: boolean;
  isFinished: boolean;
  state: EXAM_STATE;
  timer: {
    minutes: string;
    seconds: string;
  };
}

export interface ExamSocketHook {
  socketData: SocketData;
  setSocketData: (data: SocketData | ((prev: SocketData) => SocketData)) => void;
  handleExamState: (data: Partial<SocketData>) => void;
}
