import { Project, TeamMember } from '../interfaces/types';

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Project Manager',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 2,
        name: 'Mike Chen',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: 3,
        name: 'Emma Wilson',
        role: 'Designer',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        id: 4,
        name: 'Alex Rodriguez',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/150?img=4'
    }
];

export const projects: Project[] = [
    {
        id: 1,
        name: 'Website Redesign',
        description: 'Modernize company website with new design and features',
        startDate: new Date(2024, 2, 1),
        dueDate: new Date(2024, 4, 30),
        progress: 65,
        status: 'In Progress',
        priority: 'High',
        teamMembers: [teamMembers[0], teamMembers[2], teamMembers[3]],
        tasks: [
            {
                id: 1,
                title: 'Design System',
                description: 'Create new design system components',
                assignedTo: 3,
                status: 'Done',
                priority: 'High',
                dueDate: new Date(2024, 3, 15),
                completionPercentage: 100
            },
            {
                id: 2,
                title: 'Frontend Implementation',
                description: 'Implement new design in React',
                assignedTo: 2,
                status: 'In Progress',
                priority: 'High',
                dueDate: new Date(2024, 4, 15),
                completionPercentage: 60
            }
        ]
    },
    {
        id: 2,
        name: 'Mobile App Development',
        description: 'Develop new mobile app for customer engagement',
        startDate: new Date(2024, 3, 1),
        dueDate: new Date(2024, 6, 30),
        progress: 25,
        status: 'In Progress',
        priority: 'Medium',
        teamMembers: [teamMembers[0], teamMembers[1], teamMembers[2]],
        tasks: [
            {
                id: 3,
                title: 'UI/UX Design',
                description: 'Design mobile app interfaces',
                assignedTo: 3,
                status: 'In Progress',
                priority: 'Medium',
                dueDate: new Date(2024, 4, 1),
                completionPercentage: 75
            },
            {
                id: 4,
                title: 'API Integration',
                description: 'Integrate backend APIs',
                assignedTo: 2,
                status: 'Todo',
                priority: 'Medium',
                dueDate: new Date(2024, 5, 15),
                completionPercentage: 0
            }
        ]
    }
];

export const getStatusColors = (status: string): string => {
    const colors: { [key: string]: string } = {
        'Not Started': '#6c757d',
        'In Progress': '#007bff',
        'On Hold': '#ffc107',
        'Completed': '#28a745',
        'Todo': '#6c757d',
        'Review': '#17a2b8',
        'Done': '#28a745'
    };
    return colors[status] || '#6c757d';
};

export const getPriorityColors = (priority: string): string => {
    const colors: { [key: string]: string } = {
        'Low': '#28a745',
        'Medium': '#ffc107',
        'High': '#dc3545'
    };
    return colors[priority] || '#6c757d';
}; 