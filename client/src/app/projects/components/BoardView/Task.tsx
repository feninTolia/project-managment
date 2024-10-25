import { Priority, Task as TaskType } from '@/state/types';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';
import Image from 'next/image';
import { EllipsisVertical, MessageSquareMore } from 'lucide-react';

type Props = {
  task: TaskType;
};

const Task = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const taskTagsSplit = task.tags?.split(',') ?? [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), 'P')
    : '';
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), 'P')
    : '';
  const numberOfComments = task.comments?.length ?? 0;

  return (
    <div
      ref={(el) => {
        drag(el);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? ' opacity-50' : 'opacity-100'}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            {task.tags && (
              <div className="flex gap-2">
                {taskTagsSplit.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs dark:text-blue-700"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold">{task.title}</h4>
          {typeof task.points === 'number' && (
            <div className="text-xs font-semibold">{task.points} pts</div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark"></div>

        {/* Users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/${task.assignee.profilePictureUrl}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/${task.author.profilePictureUrl}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>

          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-40 0">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

const PriorityTag = ({ priority = 'Backlog' }: { priority?: Priority }) => {
  const priorityColors: Record<Priority, string> = {
    Urgent: 'bg-red-200 text-red-700',
    High: 'bg-yellow-200 text-yellow-700',
    Medium: 'bg-green-200 text-green-700',
    Low: 'bg-blue-200 text-blue-700',
    Backlog: 'bg-gray-200 text-gray-700',
  };

  return (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityColors[priority]}`}
    >
      {priority}
    </div>
  );
};
