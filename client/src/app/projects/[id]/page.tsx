'use client';
import { useState } from 'react';
import BoardView from '../components/BoardView/BoardView';
import ListView from '../components/ListView/ListView';
import ProjectHeader from '../components/ProjectHeader';
import TimelineView from '../components/TimelineView/TimelineView';
import TableView from '../components/TableView/TableView';
import ModalNewTask from '../components/ModalNewTask/ModalNewTask';

type Props = {
  params: { id: string };
};

const Projects = ({ params }: Props) => {
  const { id } = params;

  const [activeTab, setActiveTab] = useState('Board');
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        projectId={id}
      />

      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Board' && (
        <BoardView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === 'List' && (
        <ListView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === 'Timeline' && (
        <TimelineView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === 'Table' && (
        <TableView
          projectId={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default Projects;
