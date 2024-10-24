'use client';

import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { ReactNode, useEffect } from 'react';
import StoreProvider, { useAppSelector } from './redux';

type Props = { children: ReactNode };

const DashboardLayout = ({ children }: Props) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50  dark:bg-gray-900 ${isSidebarCollapsed ? '' : 'md:pl-64'}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export const DashboardWrapper = ({ children }: Props) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
