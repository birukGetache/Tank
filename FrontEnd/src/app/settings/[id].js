"use client"
import { useRouter } from 'next/navigation';

const settingsDetails = {
  1: { title: 'Account', description: 'Manage your account settings' },
  3: { title: 'Notification and Sounds', description: 'Set your notifications and sound preferences' },
  6: { title: 'Devices', description: 'Manage your connected devices' },
  7: { title: 'Language', description: 'Choose your preferred language' },
  8: { title: 'Ask Question', description: 'Submit your questions or feedback' },
  9: { title: 'Tankwa FAQ', description: 'Frequently Asked Questions' },
  10: { title: 'Invite Friends', description: 'Invite your friends to join' }
};

export default function SettingDetail() {
  const router = useRouter();
  const { id } = router.query;

  const setting = settingsDetails[id];

  if (!setting) {
    return <div className="text-center text-xl font-semibold">Setting not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">{setting.title}</h2>
      <p className="text-lg text-gray-700 mb-6">{setting.description}</p>
      
      {/* You could add more details here, such as forms, toggles, or other interactive elements */}
      <div className="space-y-4">
        {/* Example of a section for adding more specific settings */}
        {setting.title === "Account" && (
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-2xl font-medium text-gray-800">Change Email</h3>
            <p className="text-gray-600">Update your email address for notifications and communication.</p>
            {/* Input or form components would go here */}
          </div>
        )}

        {setting.title === "Notification and Sounds" && (
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-2xl font-medium text-gray-800">Notification Settings</h3>
            <p className="text-gray-600">Adjust your notification preferences and sounds.</p>
            {/* Toggle switches or other components would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
