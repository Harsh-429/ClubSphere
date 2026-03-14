import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, UserCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Landing() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'club',
      title: 'Club Head',
      icon: UserCircle,
      description: 'Manage your club',
      color: 'blue',
      path: '/club',
    },
    {
      id: 'student',
      title: 'Student',
      icon: Users,
      description: 'Explore clubs & events',
      color: 'green',
      path: '/student',
    },
    {
      id: 'admin',
      title: 'Council',
      icon: Shield,
      description: 'Oversee all clubs',
      color: 'purple',
      path: '/admin',
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      const role = roles.find((r) => r.id === selectedRole);
      if (role) {
        navigate(role.path);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="text-white" size={40} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to ClubSphere</h1>
          <p className="text-gray-400 text-lg">Select your role to access the portal</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-gray-800 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-[#111827] border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-4 rounded-2xl ${
                        role.color === 'blue'
                          ? 'bg-blue-500/10'
                          : role.color === 'green'
                          ? 'bg-green-500/10'
                          : 'bg-purple-500/10'
                      }`}
                    >
                      <Icon
                        size={48}
                        className={
                          role.color === 'blue'
                            ? 'text-blue-500'
                            : role.color === 'green'
                            ? 'text-green-500'
                            : 'text-purple-500'
                        }
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-gray-400">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full max-w-2xl py-6 text-lg font-semibold transition-all ${
              selectedRole
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Portal
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          This is a demo system. In production, authentication would be required.
        </p>
      </div>
    </div>
  );
}
