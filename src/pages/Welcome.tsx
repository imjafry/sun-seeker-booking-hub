import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Smartphone, Sun, ChevronRight, QrCode, Upload, Sparkles, X, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/locales/index';

const Welcome = () => {
  const { t, currentLanguage, setLanguage, getAvailableLanguages } = useLanguage();
  const [hotelId, setHotelId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessingQR, setIsProcessingQR] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        navigate('/booking/location-details');
      }, 1500);
    }
  };

  const processQRCode = async (file: File) => {
    setIsProcessingQR(true);
    setQrError(null);
    setQrResult(null);

    try {
      // Create a canvas to process the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Get image data for QR processing
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        
        if (imageData) {
          // Simulate QR code processing
          // In a real implementation, you would use a QR code library like jsQR
          setTimeout(() => {
            // For demo purposes, we'll simulate finding a QR code
            const simulatedQRResult = 'POOL001'; // This would be the actual QR code content
            setQrResult(simulatedQRResult);
            setHotelId(simulatedQRResult);
            setIsProcessingQR(false);
            
            // Auto-proceed after successful QR scan
            setTimeout(() => {
              setIsVerifying(true);
              setTimeout(() => {
                navigate('/booking/location-details');
              }, 1500);
            }, 1000);
          }, 2000);
        }
      };

      img.src = URL.createObjectURL(file);
      setUploadedImage(URL.createObjectURL(file));
    } catch (error) {
      setQrError(t('welcome.errors.qrProcessingFailed'));
      setIsProcessingQR(false);
    }
  };

  const handleQRScan = () => {
    if (isMobile) {
      // Mobile QR scanning functionality
      setIsVerifying(true);
      setTimeout(() => {
        setHotelId('POOL001');
        setTimeout(() => {
          navigate('/booking/location-details');
        }, 1000);
      }, 1000);
    } else {
      // Desktop - file upload for QR image
      fileInputRef.current?.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setQrError(t('welcome.errors.invalidImageFile'));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setQrError(t('welcome.errors.imageTooLarge'));
        return;
      }

      processQRCode(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setQrResult(null);
    setQrError(null);
    setHotelId('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetryQR = () => {
    setQrError(null);
    setQrResult(null);
    setUploadedImage(null);
    setHotelId('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-turquoise-600 relative overflow-hidden">
      {/* Hidden file input for QR upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

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
              <h1 className="text-4xl font-bold text-white drop-shadow-lg leading-tight">
                {t('welcome.title')}
              </h1>
            </div>
            
            <p className="text-white/90 text-lg leading-relaxed px-4 drop-shadow">
              {t('welcome.subtitle')}
            </p>
          </div>

          {/* Premium Language Selector */}
          <div className="mb-6">
            <Select value={currentLanguage} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-white/90 backdrop-blur-xl border border-white/30 text-gray-900 h-14 text-base hover:bg-white/95 transition-all duration-300 shadow-lg rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
                {getAvailableLanguages().map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50">
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Premium Main Action Card */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl mb-6 transform transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-6 space-y-6">
              {!isVerifying && !isProcessingQR ? (
                <>
                  {/* QR Code Upload Section */}
                  {!uploadedImage ? (
                    <>
                      {/* Premium QR Scan Button */}
                      <Button
                        onClick={handleQRScan}
                        variant="outline"
                        className="bg-transparent hover:bg-transparent min-h-[200px] w-full border-2 border-dashed border-teal-400/50 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm py-8 px-6 hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-400/70 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg group-hover:scale-110 transition-transform">
                              {isMobile ? (
                                <QrCode className="w-8 h-8 text-white" />
                              ) : (
                                <Upload className="w-8 h-8 text-white" />
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 text-base mb-1">
                              {isMobile ? t('welcome.scanQR') : t('welcome.uploadQR')}
                            </div>
                            <div className="text-sm text-teal-600">
                              {isMobile ? t('welcome.scanDescription') : t('welcome.uploadDescription')}
                            </div>
                          </div>
                        </div>
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-3 bg-white text-teal-600 font-medium">{t('welcome.orEnterManually')}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Uploaded Image Preview */
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded QR Code" 
                          className="w-full h-48 object-cover rounded-lg border-2 border-teal-300"
                        />
                        <Button
                          onClick={handleRemoveImage}
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-8 h-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {qrError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                          <p className="text-red-600 text-sm mb-3">{qrError}</p>
                          <Button
                            onClick={handleRetryQR}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            {t('welcome.errors.tryAgain')}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Premium Manual ID Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder={t('welcome.placeholder')}
                        value={hotelId}
                        onChange={(e) => setHotelId(e.target.value)}
                        className="text-center text-lg py-6 border-2 border-teal-300 bg-white text-gray-900 placeholder:text-teal-400 focus:border-teal-500 focus:ring-teal-500/50 transition-all duration-300 shadow-lg rounded-xl"
                      />
                    </div>
                    
                    <Button
                      onClick={handleContinue}
                      disabled={!hotelId.trim()}
                      className="w-full py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group shadow-2xl font-semibold rounded-xl"
                      size="lg"
                    >
                      <span className="flex items-center justify-center">
                        {t('welcome.continueButton')}
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </>
              ) : isProcessingQR ? (
                /* QR Processing Animation */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"></div>
                      <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-teal-500 shadow-lg"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('welcome.processing.title')}
                  </h3>
                  <p className="text-teal-600 text-base px-4 mb-4">
                    {t('welcome.processing.description')}
                  </p>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Premium Verification Animation */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"></div>
                      <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-teal-500 shadow-lg"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('welcome.verifying.title')}
                  </h3>
                  <p className="text-teal-600 text-base px-4 mb-4">
                    {t('welcome.verifying.description')}
                  </p>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
