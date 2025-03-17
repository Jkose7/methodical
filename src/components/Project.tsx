import { useParams } from 'react-router';
import { Card, CardHeader, CardTitle, CardBody, CardActions } from '@progress/kendo-react-layout';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Button } from '@progress/kendo-react-buttons';
import { projects, getStatusColors, getPriorityColors } from '../data/sampleData';

export const Project = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === Number(id));

    if (!project) {
        return <div>Project not found</div>;
    }

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

    return (
        <div className="project-detail" style={{ padding: '20px' }}>
            <Card>
                <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardActions>
                        <Button themeColor={'primary'}>Edit Project</Button>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Project Overview</h3>
                        <p>{project.description}</p>
                        <div style={{ marginTop: '20px' }}>
                            <label>Overall Progress:</label>
                            <ProgressBar value={project.progress} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                            <div>
                                <strong>Status: </strong>
                                <StatusCell dataItem={project} />
                            </div>
                            <div>
                                <strong>Priority: </strong>
                                <PriorityCell dataItem={project} />
                            </div>
                            <div>
                                <strong>Start Date: </strong>
                                {project.startDate.toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Due Date: </strong>
                                {project.dueDate.toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3>Tasks</h3>
                        <Grid 
                            data={project.tasks}
                            style={{ height: '300px' }}
                        >
                            <GridColumn field="title" title="Task" width="200px" />
                            <GridColumn field="description" title="Description" width="300px" />
                            <GridColumn field="status" title="Status" cell={StatusCell} width="120px" />
                            <GridColumn field="priority" title="Priority" cell={PriorityCell} width="120px" />
                            <GridColumn field="completionPercentage" title="Progress" width="120px" 
                                cell={(props) => (
                                    <td>
                                        <ProgressBar value={props.dataItem.completionPercentage} />
                                    </td>
                                )}
                            />
                            <GridColumn field="dueDate" title="Due Date" format="{0:d}" width="150px" />
                        </Grid>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
