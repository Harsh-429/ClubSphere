import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo authentication - check email domain/pattern
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate authentication based on email patterns
    const email = formData.email.toLowerCase();
    
    // Store user info in localStorage for demo
    if (email.includes('club') || email.includes('president')) {
      localStorage.setItem('userRole', 'club');
      localStorage.setItem('userName', 'Alex Chen');
      localStorage.setItem('userEmail', formData.email);
      toast.success('Welcome back, Club Head!');
      navigate('/club');
    } else if (email.includes('admin') || email.includes('council')) {
      localStorage.setItem('userRole', 'council');
      localStorage.setItem('userName', 'Sarah Johnson');
      localStorage.setItem('userEmail', formData.email);
      toast.success('Welcome back, Council Member!');
      navigate('/admin');
    } else {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userName', 'John Doe');
      localStorage.setItem('userEmail', formData.email);
      toast.success('Welcome back, Student!');
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="text-white" size={40} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access ClubSphere</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 bg-[#0b1120] border-gray-700 text-white placeholder:text-gray-600 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-[#0b1120] text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-500 hover:text-blue-400">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-gray-400 mb-2 font-semibold">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>• Club Head: club@university.edu</p>
              <p>• Student: student@university.edu</p>
              <p>• Council: council@university.edu</p>
              <p className="mt-2 text-gray-600">Password: any password</p>
            </div>
          </div>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-500 hover:text-blue-400 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          This is a demo authentication system. In production, proper security measures would be implemented.
        </p>
      </div>
    </div>
  );
}
