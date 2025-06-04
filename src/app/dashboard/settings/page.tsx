import React from 'react';
import UpdateProfileForm from '@/components/account/UpdateProfileForm';
import ChangePasswordForm from '@/components/account/ChangePasswordForm';
import NotificationPreferencesForm from '@/components/account/NotificationPreferencesForm';

const AccountSettingsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left text-foreground">
        Account Settings
      </h1>

      <div className="max-w-2xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Update Personal Information</h2>
        <UpdateProfileForm />
      </div>

      {/* Placeholder for other settings sections like Change Password, Notification Preferences */}

      <div className="max-w-2xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
        <ChangePasswordForm />
      </div>

      <div className="max-w-2xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
        <NotificationPreferencesForm />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
