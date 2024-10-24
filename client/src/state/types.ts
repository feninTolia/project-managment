export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface User {
  userId: number;
  cognitoId?: string;
  username: string;
  profilePictureUrl?: string;
  teamId?: number;
  email?: string;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export type Status =
  | 'To Do'
  | 'Work In Progress'
  | 'Under Review'
  | 'Completed';
export type Priority = 'Urgent' | 'High' | 'Medium' | 'Low' | 'Backlog';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  attachments?: Attachment[];
  comments?: Comment[];
}

export interface ISearchResult {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface ITeam {
  id: number;
  teamName: string;
  productOwnerUsername?: string;
  projectManagerUsername?: string;
  productOwnerUserId?: number;
  productManagerUserId?: number;
}
