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
