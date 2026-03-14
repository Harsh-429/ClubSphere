import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  label?: string;
  to?: string;
}

export function BackButton({ label = 'Back', to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className="text-gray-400 hover:text-white hover:bg-gray-800 mb-4"
    >
      <ArrowLeft size={18} className="mr-2" />
      {label}
    </Button>
  );
}
