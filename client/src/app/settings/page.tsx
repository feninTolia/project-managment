import Header from '@/components/Header/Header';

const Settings = () => {
  const userSettings = {
    username: 'JohnDoe',
    email: 'johndoe@gmail.com',
    teamName: 'Development Team',
    roleName: 'Development',
  };
  const labelStyles = 'block text-sm font-medium dark:text-white';
  const textStyles =
    'mt-1 block w-full border border-gray-300 rounded-d shadow-sm p-2 dark:text-white';
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className=" space-y-4">
        <div>
          <span className={labelStyles}>Username</span>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div>
          <span className={labelStyles}>Email</span>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div>
          <span className={labelStyles}>Team</span>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <span className={labelStyles}>Role</span>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
