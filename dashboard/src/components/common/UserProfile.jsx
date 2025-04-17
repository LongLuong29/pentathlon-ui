const UserProfile = ({ isSidebarOpen, user }) => {
  return (
    <div className="user flex items-center gap-2.5">
      <div className={`avatar ${!isSidebarOpen ? 'lg:mx-auto': ''}`}>
        <img
          className="w-12 h-12 rounded-full flex items-center justify-center"
          src={user.avatar || "../../public/messi.jpg"}
          alt={user.name || "User avatar"}
        />
      </div>
      <div className={`name-email ${!isSidebarOpen ? 'lg:hidden': ''}`}>
        <p className="font-semibold text-xs text-gray-900 mb-0.5">
          {user.name || "Admin"}
        </p>
        <p className="font-medium text-xs text-gray-500">
          {user.username || "@admin"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile; 