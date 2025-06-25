
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Calendar, MapPin, Sparkles } from 'lucide-react';

const Welcome = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hotelId, setHotelId] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (hotelId.trim()) {
      navigate('/booking/datetime');
    }
  };

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Select your preferred date and time slot'
    },
    {
      icon: MapPin,
      title: 'Choose Your Spot',
      description: 'Pick from premium loungers and cabanas'
    },
    {
      icon: Sparkles,
      title: 'Add Extras',
      description: 'Enhance your experience with drinks and amenities'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Waves className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Pool Seat Booking
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Reserve your perfect spot by the pool
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hotel ID Input */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">
                Enter Hotel Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Scan the QR code or enter your hotel ID manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="Enter Hotel ID (e.g., POOL001)"
                  value={hotelId}
                  onChange={(e) => setHotelId(e.target.value)}
                  className="text-lg py-6 text-center"
                />
                <div className="text-center">
                  <Button
                    variant="outline"
                    className="border-dashed border-2 py-8 px-12 hover:bg-blue-50"
                  >
                    📱 Scan QR Code
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleContinue}
                disabled={!hotelId.trim()}
                className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                size="lg"
              >
                Continue to Booking
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 hover:bg-white/95 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
