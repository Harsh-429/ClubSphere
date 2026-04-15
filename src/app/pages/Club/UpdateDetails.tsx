import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BackButton } from '../../components/BackButton';
import { Upload, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export function UpdateDetails() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop'
  );

  const [formData, setFormData] = useState({
    clubName: 'Coding Club',
    category: 'Technology',
    description: 'Building software projects and participating in competitive programming.',
    president: 'Alex Chen',
    vicePresident: 'Jamie Lee',
    treasurer: 'Sam Wilson',
    email: 'coding.club@college.edu',
    phone: '+1 234-567-8900',
    meetingDay: 'Wednesday',
    meetingTime: '6:00 PM',
    socialMedia: {
      instagram: '@codingclub_official',
      twitter: '@codingclub',
      linkedin: 'coding-club-college',
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success('Club details submitted for admin review!');
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <BackButton to="/club" />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Update Club Details</h1>
        <p className="text-gray-400 mt-2">Submit changes for admin approval</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Club Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Club Logo"
                    className="w-32 h-32 rounded-lg object-cover border-2 border-gray-700"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Upload className="text-gray-500" size={32} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="logo" className="text-white mb-2 block">
                  Upload New Logo
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: Square image, minimum 200x200px
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clubName" className="text-white">
                  Club Name
                </Label>
                <Input
                  id="clubName"
                  value={formData.clubName}
                  onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-white">
                  Category
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Leadership */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="president" className="text-white">
                  President
                </Label>
                <Input
                  id="president"
                  value={formData.president}
                  onChange={(e) => setFormData({ ...formData, president: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="vicePresident" className="text-white">
                  Vice President
                </Label>
                <Input
                  id="vicePresident"
                  value={formData.vicePresident}
                  onChange={(e) => setFormData({ ...formData, vicePresident: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="treasurer" className="text-white">
                  Treasurer
                </Label>
                <Input
                  id="treasurer"
                  value={formData.treasurer}
                  onChange={(e) => setFormData({ ...formData, treasurer: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Schedule */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Meeting Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meetingDay" className="text-white">
                  Meeting Day
                </Label>
                <Input
                  id="meetingDay"
                  value={formData.meetingDay}
                  onChange={(e) => setFormData({ ...formData, meetingDay: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="meetingTime" className="text-white">
                  Meeting Time
                </Label>
                <Input
                  id="meetingTime"
                  value={formData.meetingTime}
                  onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="instagram" className="text-white">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={formData.socialMedia.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, instagram: e.target.value },
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-white">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, twitter: e.target.value },
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-white">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="company-name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/club')}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {submitting ? (
              'Submitting...'
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Submit for Approval
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}