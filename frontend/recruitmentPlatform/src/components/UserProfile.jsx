import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Edit3, 
  Save, 
  X, 
  Github, 
  Linkedin,
  Clock,
  Award,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { userAPI } from '../utils/api';

const UserProfile = () => {
  const { logout, updateUserProfile, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await userAPI.getProfile();
      setProfile(profileData);
      setEditData(profileData);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profile });
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const updatedProfile = await updateUserProfile(editData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-800 shadow-lg border-b border-gray-200 dark:border-dark-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Recruitment Platform
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back, {profile.first_name || profile.username}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? (
                  <span className="text-2xl">🌞</span>
                ) : (
                  <span className="text-2xl">🌙</span>
                )}
              </motion.button>
              
              {/* Logout Button */}
              <motion.button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card card-hover">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <User className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.full_name || profile.username}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.is_recruiter ? 'Recruiter' : 'Job Seeker'}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {profile.experience_years} years
                  </p>
                </motion.div>
                <motion.div
                  className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Skills</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {profile.skills_list?.length || 0}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Profile Details
                </h3>
                {!isEditing ? (
                  <motion.button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={handleSave}
                      disabled={saveLoading}
                      className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                      whileHover={{ scale: saveLoading ? 1 : 1.05 }}
                      whileTap={{ scale: saveLoading ? 1 : 0.95 }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saveLoading ? 'Saving...' : 'Save'}
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="first_name"
                      value={editData.first_name || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.first_name || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="last_name"
                      value={editData.last_name || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.last_name || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">
                      {profile.email}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone_number"
                      value={editData.phone_number || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.phone_number || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editData.location || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.location || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="date_of_birth"
                      value={editData.date_of_birth || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {formatDate(profile.date_of_birth)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Experience Years */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="experience_years"
                      value={editData.experience_years || 0}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.experience_years} years
                      </span>
                    </div>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={editData.company || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.company || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn URL
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="linkedin_url"
                      value={editData.linkedin_url || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.linkedin_url ? (
                          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500">
                            LinkedIn Profile
                          </a>
                        ) : (
                          'Not specified'
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="github_url"
                      value={editData.github_url || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Github className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {profile.github_url ? (
                          <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500">
                            GitHub Profile
                          </a>
                        ) : (
                          'Not specified'
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editData.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                    {profile.bio || 'No bio provided yet.'}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="skills"
                    value={editData.skills || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    placeholder="React, JavaScript, Python (comma-separated)"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills_list?.length ? (
                      profile.skills_list.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </motion.span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">No skills added yet.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
