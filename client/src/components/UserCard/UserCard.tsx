import { User } from '@/state/types';
import React from 'react';

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="mb-3 bg-white dark:bg-dark-secondary shadow rounded-md p-6 flex flex-col gap-2">
      <p>
        <strong>ID: </strong>
        {user.userId}
      </p>
      <p>
        <strong>Name: </strong>
        {user.username}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
    </div>
  );
};

export default UserCard;
