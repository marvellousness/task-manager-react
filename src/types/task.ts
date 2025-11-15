export interface Task {
    id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
}

export type FilterType = 'all' | 'active' | 'completed';
