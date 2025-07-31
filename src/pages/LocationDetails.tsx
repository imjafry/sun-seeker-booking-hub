
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
    if (roomNo && email && phone) {
      navigate('/booking/datetime');
    }
  };

  const isFormValid = roomNo && email && phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-turquoise-600 relative overflow-hidden">
      {/* Water-like animated background */}
      <div className="absolute inset-0">
        {/* Animated water waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-300/20 to-teal-300/40 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-cyan-300/30 to-transparent rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 to-transparent rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-radial from-turquoise-300/30 to-transparent rounded-full animate-pulse delay-1500"></div>
            <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Floating bubbles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-white/20 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-1400"></div>
        
        {/* Water ripple effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(6,182,212,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.1)_0%,transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-teal-700 text-sm font-medium">{t('locationDetails.premium') || 'Premium Experience'}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Hotel Venti, Barcelona
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
              {t('locationDetails.subtitle') || 'Let us know where to reach you'}
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Room Number */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Home className="w-4 h-4 text-teal-600" />
                    {t('locationDetails.roomNo') || 'Room Number'}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('locationDetails.roomPlaceholder') || 'Enter room number'}
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    className="border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500/50 rounded-xl h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal-600" />
                    {t('locationDetails.email') || 'Email Address'}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('locationDetails.emailPlaceholder') || 'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500/50 rounded-xl h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    {t('locationDetails.phone') || 'Phone Number'}
                  </label>
                  <Input
                    type="tel"
                    placeholder={t('locationDetails.phonePlaceholder') || 'Enter your phone number'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500/50 rounded-xl h-12"
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
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
