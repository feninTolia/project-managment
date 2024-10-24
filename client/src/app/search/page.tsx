'use client';
import Header from '@/components/Header/Header';
import { useSearchQuery } from '@/state/api';
import { debounce } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import TaskCard from '../projects/components/TaskCard';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import UserCard from '@/components/UserCard/UserCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: searchResult,
    isError,
    isLoading,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 500);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}

        {!isLoading && !isError && searchResult && (
          <div>
            {searchResult.tasks && searchResult.tasks.length > 0 && (
              <h2 className="text-2xl mb-4">Tasks:</h2>
            )}
            {searchResult.tasks?.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}

            {searchResult.projects && searchResult.projects.length > 0 && (
              <h2 className="text-2xl mb-4">Projects:</h2>
            )}
            {searchResult.projects?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}

            {searchResult.users && searchResult.users.length > 0 && (
              <h2 className="text-2xl mb-4">Projects:</h2>
            )}
            {searchResult.users?.map((user) => (
              <UserCard user={user} key={user.userId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
