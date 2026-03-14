import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Mail, Lock, Eye, EyeOff, User, Phone, Building, UserCircle, Users as UsersIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'club' | 'student' | 'council' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    clubName: '',
    studentId: '',
    position: '',
  });

  const roles = [
    {
      id: 'club' as const,
      title: 'Club Head',
      icon: UserCircle,
      description: 'Manage your club',
      color: 'blue',
    },
    {
      id: 'student' as const,
      title: 'Student',
      icon: UsersIcon,
      description: 'Explore clubs & events',
      color: 'green',
    },
    {
      id: 'council' as const,
      title: 'Council Member',
      icon: Shield,
      description: 'Oversee all clubs',
      color: 'purple',
    },
  ];

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!selectedRole) {
      toast.error('Please select your role');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Store user info in localStorage for demo
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('userName', formData.fullName);
    localStorage.setItem('userEmail', formData.email);

    if (selectedRole === 'club') {
      localStorage.setItem('clubName', formData.clubName || 'My Club');
    }
    if (selectedRole === 'student') {
      localStorage.setItem('studentId', formData.studentId);
    }
    if (selectedRole === 'council') {
      localStorage.setItem('position', formData.position || 'Council Member');
    }

    toast.success('Account created successfully!');

    // Navigate to appropriate portal
    if (selectedRole === 'club') {
      navigate('/club');
    } else if (selectedRole === 'council') {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="text-white" size={32} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400">Join ClubSphere and get started</p>
        </div>

        {/* Signup Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Your Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? role.color === 'blue'
                            ? 'border-blue-500 bg-blue-500/10'
                            : role.color === 'green'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 bg-[#0b1120] hover:border-gray-600'
                      }`}
                    >
                      <Icon
                        size={28}
                        className={
                          isSelected
                            ? role.color === 'blue'
                              ? 'text-blue-500 mx-auto mb-2'
                              : role.color === 'green'
                              ? 'text-green-500 mx-auto mb-2'
                              : 'text-purple-500 mx-auto mb-2'
                            : 'text-gray-500 mx-auto mb-2'
                        }
                      />
                      <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {role.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Role-specific fields */}
            {selectedRole === 'club' && (
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-gray-300 mb-2">
                  Club Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="e.g., Tech Innovation Club"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                    className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'student' && (
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-300 mb-2">
                  Student ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="e.g., 2024001"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'council' && (
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="position"
                    type="text"
                    placeholder="e.g., Council President"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 rounded border-gray-700 bg-[#0b1120] text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <button type="button" className="text-blue-500 hover:text-blue-400">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:text-blue-400 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          This is a demo system. In production, proper authentication and data validation would be implemented.
        </p>
      </div>
    </div>
  );
}
