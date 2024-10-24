import { Task } from '@/state/types';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const [isAttachmentShow, setIsAttachmentShow] = useState(false);

  return (
    <div className="mb-3 bg-white dark:bg-dark-secondary shadow rounded-md p-6 flex flex-col gap-2">
      <p>
        <strong>ID: </strong>
        {task.id}
      </p>
      <p>
        <strong>Title: </strong>
        {task.title}
      </p>
      <p>
        <strong>Description: </strong>
        {task.description || 'No description provided'}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status}
      </p>
      <p>
        <strong>Priority: </strong>
        {task.priority}
      </p>
      <p>
        <strong>Tags: </strong>
        {task.tags || 'No tags'}
      </p>
      <p>
        <strong>Start Date: </strong>
        {task.startDate ? format(new Date(task.startDate), 'P') : 'Not set'}
      </p>
      <p>
        <strong>Due Date: </strong>
        {task.dueDate ? format(new Date(task.dueDate), 'P') : 'Not set'}
      </p>
      <p>
        <strong>Author: </strong>
        {task.author?.username ?? 'Unknown'}
      </p>
      <p>
        <strong>Assignee: </strong>
        {task.assignee?.username ?? 'Unassigned'}
      </p>
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <div className="flex gap-4 items-center">
            <strong>Attachments:</strong>
            <ChevronDown
              size={16}
              onClick={() => setIsAttachmentShow(!isAttachmentShow)}
              className={`transition-all hover:scale-110 hover:cursor-pointer ${isAttachmentShow ? 'rotate-180 ' : ''}`}
            />
          </div>

          <div className="flex flex-wrap">
            {isAttachmentShow && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="h-auto w-full rounded-md mt-2"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;