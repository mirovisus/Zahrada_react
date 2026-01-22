import { ProfileCard, InfoBanner, GardensList } from '@widgets/profile-dashboard';
import { useAuth } from '@app/providers/auth';
import { useGardens } from '@app/providers/gardens';

const ProfilePage = () => {
  const { user } = useAuth();
  const { gardens } = useGardens();

  return (
    <div className = "dashboard container">
      {/* Sidebar Section */}
      <aside className = "dashboard__sidebar">
        <ProfileCard user={user}/>
      </aside>

      {/* Main Content Section */}
      <main className = "dashboard__content">
        <InfoBanner username={user?.username} />
        <GardensList gardens={gardens} />
      </main>
    </div>
  )
}

export default ProfilePage