export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    progress: number;
    status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    teamMembers: TeamMember[];
    tasks: Task[];
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    assignedTo: number;
    status: 'Todo' | 'In Progress' | 'Review' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    dueDate: Date;
    completionPercentage: number;
}

export interface ChartData {
    category: string;
    value: number;
} 