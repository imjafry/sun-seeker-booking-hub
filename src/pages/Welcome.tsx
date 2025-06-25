
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Smartphone, Sun, ChevronRight } from 'lucide-react';

const Welcome = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hotelId, setHotelId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (hotelId.trim()) {
      setIsVerifying(true);
      // Simulate verification animation
      setTimeout(() => {
        navigate('/booking/datetime');
      }, 1500);
    }
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setIsVerifying(true);
    setTimeout(() => {
      setHotelId('POOL001');
      setTimeout(() => {
        navigate('/booking/datetime');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full animate-bounce">
                <Sun className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
              Your spot in the sun
            </h1>
            <h2 className="text-2xl font-semibold text-white/90 mb-4">
              booked before breakfast
            </h2>
            <p className="text-white/80 text-lg">
              To reserve your sunbed, we just need to verify your accommodation.
            </p>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm border-white/30 text-gray-800 h-12">
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

          {/* Main Action Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-6 transform transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-6">
              {!isVerifying ? (
                <>
                  {/* QR Scan Button */}
                  <Button
                    onClick={handleQRScan}
                    variant="outline"
                    className="w-full border-dashed border-2 py-8 px-6 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Smartphone className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">SCAN QR CODE</div>
                        <div className="text-sm text-gray-600">Tap to scan your QR code</div>
                      </div>
                    </div>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Manual ID Input */}
                  <div className="space-y-4">
                    <Input
                      placeholder="Type ID nr"
                      value={hotelId}
                      onChange={(e) => setHotelId(e.target.value)}
                      className="text-center text-lg py-6 border-2 border-gray-200 focus:border-blue-400 transition-colors"
                    />
                    
                    <Button
                      onClick={handleContinue}
                      disabled={!hotelId.trim()}
                      className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all duration-300 group"
                      size="lg"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </>
              ) : (
                /* Verification Animation */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Verifying your hotel stay...
                  </h3>
                  <p className="text-gray-600">
                    We verify your hotel stay instantly
                  </p>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              ← Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
