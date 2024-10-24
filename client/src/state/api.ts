import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISearchResult, ITeam, Project, Status, Task, User } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['Projects', 'Tasks', 'Users', 'Teams'],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => 'projects',
      providesTags: ['Projects'],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id }))]
          : [{ type: 'Tasks' as const }],
    }),
    getTasksByUser: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id }))]
          : [{ type: 'Tasks' as const }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: Status }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Tasks', id: taskId },
      ],
    }),

    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),

    getTeams: build.query<ITeam[], void>({
      query: () => 'teams',
      providesTags: ['Teams'],
    }),

    search: build.query<ISearchResult, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useGetTasksByUserQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
} = api;
