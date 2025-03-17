import { Card, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { useNavigate } from 'react-router';
import { projects, getStatusColors, getPriorityColors } from '../data/sampleData';

export const Projects = () => {
    const navigate = useNavigate();

    const StatusCell = (props: any) => {
        const { dataItem } = props;
        return (
            <span style={{
                backgroundColor: getStatusColors(dataItem.status),
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white'
            }}>
                {dataItem.status}
            </span>
        );
    };

    const PriorityCell = (props: any) => {
        const { dataItem } = props;
        return (
            <span style={{
                backgroundColor: getPriorityColors(dataItem.priority),
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white'
            }}>
                {dataItem.priority}
            </span>
        );
    };

    const ActionCell = (props: any) => {
        const { dataItem } = props;
        return (
            <Button
                onClick={() => navigate(`/projects/${dataItem.id}`)}
                themeColor={'primary'}
            >
                View Details
            </Button>
        );
    };

    return (
        <div className="projects-container" style={{ padding: '20px' }}>
            <h1>Projects Overview</h1>
            <Card >
                <CardTitle>tittulos</CardTitle>
                <CardBody>Hola</CardBody>
            </Card>
        </div>
    );
};
