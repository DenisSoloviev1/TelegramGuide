export interface IChannel {
  id?: number;
  name?: string;
  userName: string;
  description?: string;
  categoryId?: number;
  imageId?: number;
  keywords: string[];
  membersCount?: number;
}

export interface IStatistics {
  today: number;
  yesterday: number;
  allTime: number;
}
