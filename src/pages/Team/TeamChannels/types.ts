export interface IDataChannel {
  description: string;
  tasks: [
    {
      id: number;
      taskName: string;
      description: string;
      status: string;
      userId: number;
    }
  ];
}

export interface ITeamProps {
  setShowForm: boolean;
  setDataChannels: IDataChannel;
}

export interface INameChannel {
  id: number;
  channelTheme: string;
  description: string;
}

export interface IDataChannelTasks {
  id: number;
  channelTheme: string;
  description: string;
}

export interface IAddTask {
  setShowFormAddTask: boolean;
  channelId: number;
  setDataChannelsTasks: IDataChannelTasks;
}

export interface ITask {
  id: number;
  taskName: string;
  description: string;
  status: string;
  userId: number;
}

export interface ITaskDataForEdit {
  setActiveFormEditTask: boolean;
  selectedTask: ITask;
  setDataChannelsTasks: IDataChannel;
  admin: boolean;
}
