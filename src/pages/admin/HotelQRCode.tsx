
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Printer, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

const HotelQRCode = () => {
  const [qrGenerated, setQrGenerated] = useState(false);
  const [hotelName, setHotelName] = useState('Paradise Resort');
  const [uniqueCode, setUniqueCode] = useState('PARADISE123');
  const [bookingUrl, setBookingUrl] = useState('https://sunlounge.app/PARADISE123');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [selectedZones, setSelectedZones] = useState({
    vip: true,
    sun: true,
    family: false,
    pool: false
  });
  const [labelFormat, setLabelFormat] = useState('label');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const generateNewCode = () => {
    const newCode = 'HOTEL' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setUniqueCode(newCode);
    setBookingUrl(`https://sunlounge.app/${newCode}`);
    console.log('New code generated:', newCode);
  };

  const generateQRCode = () => {
    setQrGenerated(true);
    console.log('QR Code generated for:', hotelName);
  };

  const generateQRCodes = () => {
    const selectedZoneList = Object.entries(selectedZones)
      .filter(([_, selected]) => selected)
      .map(([zone, _]) => zone);
    console.log('Generating QR codes for zones:', selectedZoneList);
  };

  const generateLabels = () => {
    console.log('Generating labels in format:', labelFormat);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log('Logo uploaded:', file.name);
    }
  };

  const handleLogoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log('Logo dropped:', file.name);
    }
  };

  const handleZoneChange = (zone: string, checked: boolean) => {
    setSelectedZones(prev => ({
      ...prev,
      [zone]: checked
    }));
  };

  const downloadQR = () => {
    console.log('Downloading QR code as PNG');
    // In a real implementation, this would generate and download the actual QR code
  };

  const printQR = () => {
    console.log('Printing QR code');
    // In a real implementation, this would open print dialog
  };

  const printSpotQRCodes = () => {
    console.log('Printing spot QR codes');
  };

  const orderStickerLabels = () => {
    console.log('Ordering sticker labels');
  };

  const saveSettings = () => {
    console.log('Saving settings:', {
      hotelName,
      uniqueCode,
      bookingUrl,
      primaryColor,
      uploadedLogo: !!uploadedLogo,
      selectedZones,
      labelFormat
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Hotel Access & QR Code</h1>
            <p className="text-white/70">Manage hotel identification and QR codes</p>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            Log Out
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Side - Hotel Information */}
          <div className="space-y-6">
            {/* Hotel Identification */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Hotel Identification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Hotel Name</Label>
                  <Input
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Unique Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={uniqueCode}
                      onChange={(e) => setUniqueCode(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={generateNewCode}
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      Generate New
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Booking URL</Label>
                  <Input
                    value={bookingUrl}
                    onChange={(e) => setBookingUrl(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Upload Logo</Label>
                  <div 
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={handleLogoDragOver}
                    onDrop={handleLogoDrop}
                  >
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    {uploadedLogo ? (
                      <div className="space-y-2">
                        <img 
                          src={uploadedLogo} 
                          alt="Uploaded logo" 
                          className="w-16 h-16 object-contain mx-auto"
                        />
                        <p className="text-white/60 text-sm">Click to change logo</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                        <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-8 rounded border-2 border-white/20"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-8 bg-transparent border-white/20 cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Stickers */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">QR Stickers for the spots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-white">Zones</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="vip" 
                        checked={selectedZones.vip}
                        onCheckedChange={(checked) => handleZoneChange('vip', checked as boolean)}
                      />
                      <Label htmlFor="vip" className="text-white text-sm">VIP Poolside</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sun" 
                        checked={selectedZones.sun}
                        onCheckedChange={(checked) => handleZoneChange('sun', checked as boolean)}
                      />
                      <Label htmlFor="sun" className="text-white text-sm">Sun Area</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="family" 
                        checked={selectedZones.family}
                        onCheckedChange={(checked) => handleZoneChange('family', checked as boolean)}
                      />
                      <Label htmlFor="family" className="text-white text-sm">Family Area</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pool" 
                        checked={selectedZones.pool}
                        onCheckedChange={(checked) => handleZoneChange('pool', checked as boolean)}
                      />
                      <Label htmlFor="pool" className="text-white text-sm">Pool Side</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Format</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="label" 
                        name="format" 
                        value="label"
                        checked={labelFormat === 'label'}
                        onChange={(e) => setLabelFormat(e.target.value)}
                        className="text-blue-600" 
                      />
                      <Label htmlFor="label" className="text-white text-sm">Label per Seat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="poster" 
                        name="format" 
                        value="poster"
                        checked={labelFormat === 'poster'}
                        onChange={(e) => setLabelFormat(e.target.value)}
                        className="text-blue-600" 
                      />
                      <Label htmlFor="poster" className="text-white text-sm">One Large Poster</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={generateQRCodes}
                  >
                    Generate QR Codes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white flex-1"
                    onClick={generateLabels}
                  >
                    Generate Labels
                  </Button>
                </div>

                {/* Sample QR Codes */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {['Seat A1', 'Seat A2', 'Seat A3'].map((seat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black rounded grid grid-cols-8 gap-px p-1">
                          {[...Array(64)].map((_, i) => (
                            <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-white text-xs font-medium">{seat}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={printSpotQRCodes}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Spot QR Codes
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={orderStickerLabels}
                  >
                    Order Sticker Labels
                  </Button>
                </div>

                <p className="text-red-400 text-xs mt-2">
                  We will print and send all stickers to the location
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - QR Code Display */}
          <div className="space-y-6">
            {/* Main QR Code */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">QR Code to place at reception or rooms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-40 h-40 bg-black rounded grid grid-cols-16 gap-px p-2">
                    {[...Array(256)].map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-white text-xl font-bold mb-2">{hotelName}</h3>
                <p className="text-white/70 mb-4">Scan this code to reserve your spot.</p>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={downloadQR}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={printQR}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print QR
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Branding Preview */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Primary Color</span>
                  <div 
                    className="w-8 h-8 rounded border-2 border-white/20"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-white">Upload Logo</span>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    {uploadedLogo ? (
                      <img 
                        src={uploadedLogo} 
                        alt="Logo preview" 
                        className="w-12 h-12 object-contain mx-auto"
                      />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-white/60 mx-auto mb-1" />
                        <p className="text-white/60 text-xs">No logo uploaded</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              onClick={saveSettings}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelQRCode;
