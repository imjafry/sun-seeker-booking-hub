
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { MapPin, Home, Mail, Phone, Sparkles } from 'lucide-react';

const LocationDetails = () => {
  const [location, setLocation] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (location && roomNo && email && phone) {
      navigate('/booking/datetime');
    }
  };

  const isFormValid = location && roomNo && email && phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">{t('locationDetails.premium') || 'Premium Experience'}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('locationDetails.title') || 'Your Details'}
            </h1>
            <p className="text-blue-200 text-lg">
              {t('locationDetails.subtitle') || 'Let us know where to reach you'}
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {t('locationDetails.location') || 'Location Name'}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('locationDetails.locationPlaceholder') || 'Enter your location'}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 rounded-xl h-12"
                  />
                </div>

                {/* Room Number */}
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Home className="w-4 h-4 text-blue-400" />
                    {t('locationDetails.roomNo') || 'Room Number'}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('locationDetails.roomPlaceholder') || 'Enter room number'}
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 rounded-xl h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    {t('locationDetails.email') || 'Email Address'}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('locationDetails.emailPlaceholder') || 'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 rounded-xl h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    {t('locationDetails.phone') || 'Phone Number'}
                  </label>
                  <Input
                    type="tel"
                    placeholder={t('locationDetails.phonePlaceholder') || 'Enter your phone number'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 rounded-xl h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {t('locationDetails.continue') || 'Continue to Date & Time'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
