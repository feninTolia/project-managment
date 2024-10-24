'use client';
import Header from '@/components/Header/Header';
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  PlusSquare,
  Share2,
  Table,
} from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import TabButton from './TabButton';
import ModalNewProject from './ModalNewProject/ModalNewProject';

type Props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-6 xl:px-6">
      {/* MODAL NEW PROJECT */}
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />

      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name={'Project'}
          buttonComponent={
            <button
              className="flex items-start rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" />
              New Project Board
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-2 pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name={'Board'}
            icon={<Grid3X3 className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name={'List'}
            icon={<List className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name={'Timeline'}
            icon={<Clock className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name={'Table'}
            icon={<Table className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary"
            />
            <Grid3X3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
