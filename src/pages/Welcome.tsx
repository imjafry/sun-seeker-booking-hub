
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Smartphone, Sun, ChevronRight, QrCode, Upload, Sparkles } from 'lucide-react';

const Welcome = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hotelId, setHotelId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContinue = () => {
    if (hotelId.trim()) {
      setIsVerifying(true);
      setTimeout(() => {
        navigate('/booking/datetime');
      }, 1500);
    }
  };

  const handleQRScan = () => {
    if (isMobile) {
      // Mobile QR scanning functionality
      setIsVerifying(true);
      setTimeout(() => {
        setHotelId('POOL001');
        setTimeout(() => {
          navigate('/booking/datetime');
        }, 1000);
      }, 1000);
    } else {
      // Desktop - file upload for QR image
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          setIsVerifying(true);
          setTimeout(() => {
            setHotelId('POOL001');
            setTimeout(() => {
              navigate('/booking/datetime');
            }, 1000);
          }, 1000);
        }
      };
      input.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/3 animate-bounce delay-500">
          <Sparkles className="w-4 h-4 text-yellow-300/60" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-bounce delay-1500">
          <Sparkles className="w-3 h-3 text-blue-300/60" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Premium Hero Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce shadow-2xl">
                  <Sun className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent animate-fade-in leading-tight">
                Your Perfect Spot
              </h1>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent">
                Awaits in Paradise
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-blue-100/90 text-lg leading-relaxed px-4">
              Reserve your exclusive sunbed experience with just a few taps
            </p>
          </div>

          {/* Premium Language Selector */}
          <div className="mb-6">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white h-14 text-base hover:bg-white/15 transition-all duration-300 shadow-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-white/20">
                <SelectItem value="en" className="text-white hover:bg-white/10">🇺🇸 English</SelectItem>
                <SelectItem value="es" className="text-white hover:bg-white/10">🇪🇸 Español</SelectItem>
                <SelectItem value="fr" className="text-white hover:bg-white/10">🇫🇷 Français</SelectItem>
                <SelectItem value="de" className="text-white hover:bg-white/10">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Premium Main Action Card */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-6 transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardContent className="p-6 space-y-6">
              {!isVerifying ? (
                <>
                  {/* Premium QR Scan Button */}
                  <Button
                    onClick={handleQRScan}
                    variant="outline"
                    className="w-full border-2 border-dashed border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm py-8 px-6 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/70 transition-all duration-300 group text-white"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                          {isMobile ? (
                            <QrCode className="w-8 h-8 text-white" />
                          ) : (
                            <Upload className="w-8 h-8 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-white text-base mb-1">
                          {isMobile ? 'SCAN QR CODE' : 'UPLOAD QR IMAGE'}
                        </div>
                        <div className="text-sm text-blue-200">
                          {isMobile ? 'Tap to open camera scanner' : 'Select QR code image from your device'}
                        </div>
                      </div>
                    </div>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-slate-800/50 text-blue-200 font-medium">or enter manually</span>
                    </div>
                  </div>

                  {/* Premium Manual ID Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Enter your accommodation ID"
                        value={hotelId}
                        onChange={(e) => setHotelId(e.target.value)}
                        className="text-center text-lg py-6 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-md pointer-events-none"></div>
                    </div>
                    
                    <Button
                      onClick={handleContinue}
                      disabled={!hotelId.trim()}
                      className="w-full py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group shadow-2xl font-semibold"
                      size="lg"
                    >
                      <span className="flex items-center justify-center">
                        Continue to Paradise
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </>
              ) : (
                /* Premium Verification Animation */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-50"></div>
                      <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-cyan-400 shadow-lg"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    Verifying Your Stay
                  </h3>
                  <p className="text-blue-100/80 text-base px-4 mb-4">
                    Connecting you to your perfect poolside experience
                  </p>
                  <div className="mt-4">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Premium Back Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              className="text-blue-200/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-base backdrop-blur-sm px-6 py-3"
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
