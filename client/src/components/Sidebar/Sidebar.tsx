'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { useGetAuthUserQuery, useGetProjectsQuery } from '@/state/api';
import { signOut } from 'aws-amplify/auth';
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ISidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SideBarLink = ({ href, icon: Icon, label }: ISidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href} className="w-full">
      <div
        className={`flex relative cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''} justify-start px-8 py-3 `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200"> </div>
        )}
        <Icon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [isShowProjects, setIsShowProjects] = useState(true);
  const [isShowPriority, setIsShowPriority] = useState(true);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const { data: projects } = useGetProjectsQuery();
  const { data: currentUser } = useGetAuthUserQuery({});
  const currentUserDetails = currentUser?.userDetails;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const sidebarClassnames = `fixed flex flex-col justify-between shadow-xl 
  transition-all duration-300 h-full z-40 dark:bg-black overflow-auto bg-white
  ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}
  `;

  return (
    <div className={sidebarClassnames}>
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            FTLIST
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => dispatch(setIsSidebarCollapsed(true))}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* TEAMS */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src={
              'https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/logo.png'
            }
            alt="logo"
            width={40}
            height={40}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-white">
              TOLIK TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="h-3 w-3 mt-[0.1rem] text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/* Navbar links */}
        <nav className="z-10 w-full">
          <SideBarLink href={'/'} icon={Home} label={'Home'} />
          <SideBarLink href={'/timeline'} icon={Briefcase} label={'Timeline'} />
          <SideBarLink href={'/search'} icon={Search} label={'Search'} />
          <SideBarLink href={'/settings'} icon={Settings} label={'Settings'} />
          <SideBarLink href={'/users'} icon={User} label={'Users'} />
          <SideBarLink href={'/teams'} icon={Users} label={'Teams'} />
        </nav>

        {/* Projects links */}
        <button
          onClick={() => setIsShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Projects</span>
          <ChevronDown
            className={`h-5 w-5 transition-all ${isShowProjects ? 'rotate-180' : ''}`}
          />
        </button>
        {isShowProjects &&
          projects?.map((project) => (
            <SideBarLink
              key={project.id}
              href={'/projects/' + project.id}
              icon={Briefcase}
              label={project.name}
            />
          ))}

        {/* Priorities links */}
        <button
          onClick={() => setIsShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Priority</span>
          <ChevronDown
            className={`h-5 w-5 transition-all ${isShowPriority ? 'rotate-180' : ''}`}
          />
        </button>
        {isShowPriority && (
          <>
            <SideBarLink
              href={'/priority/urgent'}
              icon={AlertCircle}
              label={'Urgent'}
            />
            <SideBarLink
              href={'/priority/high'}
              icon={ShieldAlert}
              label={'High'}
            />
            <SideBarLink
              href={'/priority/medium'}
              icon={AlertTriangle}
              label={'Medium'}
            />
            <SideBarLink
              href={'/priority/low'}
              icon={AlertOctagon}
              label={'Low'}
            />
            <SideBarLink
              href={'/priority/backlog'}
              icon={Layers3}
              label={'Backlog'}
            />
          </>
        )}
      </div>

      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
          <div className="items-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username ?? 'User Profile Picture'}
                width={100}
                height={50}
                className="h-auto w-full rounded-t-md"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
