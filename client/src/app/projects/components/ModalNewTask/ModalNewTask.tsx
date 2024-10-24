import Modal from '@/components/Modal/Modal';
import { useCreateTaskMutation } from '@/state/api';
import { Priority, Status } from '@/state/types';
import { formatISO } from 'date-fns';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, projectId = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>('To Do');
  const [priority, setPriority] = useState<Priority>('Backlog');
  const [tags, setTags] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [authorUserId, setAuthorUserId] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [manualProjectId, setManualProjectId] = useState('');

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(projectId !== null || manualProjectId))
      return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: 'complete',
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: 'complete',
    });
    await createTask({
      projectId:
        projectId !== null ? Number(projectId) : Number(manualProjectId),
      title,
      description,
      status,
      tags,
      priority,
      assignedUserId: parseInt(assignedUserId),
      authorUserId: parseInt(authorUserId),
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
    });
  };

  const isFormValid = () => {
    return title && authorUserId && !(projectId !== null || manualProjectId);
  };

  const inputStyles =
    'w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none';
  const selectStyles =
    'mb-4 block w-full rounded border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:focus:outline-none';

  return (
    <Modal isOpen={isOpen} onClose={onClose} name={'Add New Task'}>
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="">Select Status</option>
            <option value={'To Do'}>To Do</option>
            <option value={'Work In Progress'}>Work In Progress</option>
            <option value={'Under Review'}>Under Review</option>
            <option value={'Completed'}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="">Select Priority</option>
            <option value={'Urgent'}>Urgent</option>
            <option value={'High'}>High</option>
            <option value={'Medium'}>Medium</option>
            <option value={'Low'}>Low</option>
            <option value={'Backlog'}>Backlog</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User Id"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User Id"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {projectId === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="Project Id"
            value={manualProjectId}
            onChange={(e) => setManualProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
