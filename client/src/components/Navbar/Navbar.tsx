import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { useGetAuthUserQuery } from '@/state/api';
import { signOut } from 'aws-amplify/auth';
import { Menu, Moon, Search, Settings, Sun, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  console.log(currentUser, 'currentUser');

  const currentUserDetails = currentUser?.userDetails;
  console.log(currentUserDetails, 'currentUserDetails');

  if (!currentUser) return null;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Searchbar */}
      <div className="flex items-center gap-8">
        {isSidebarCollapsed ? (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        ) : null}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            placeholder="Search..."
            className={`w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white`}
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          className={
            isDarkMode
              ? 'rounded p-2 dark:hover:bg-gray-700'
              : 'rounded p-2 hover:bg-gray-100'
          }
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href={'/settings'}
          className={
            isDarkMode
              ? 'h-min w-min rounded p-2 dark:hover:bg-gray-700'
              : 'h-min w-min rounded p-2 hover:bg-gray-100'
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

        <div className="hidden items-center justify-between md:flex">
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
            {currentUserDetails?.username ?? currentUser.user.username}
          </span>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
