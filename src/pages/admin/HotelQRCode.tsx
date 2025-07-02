
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Printer, Upload } from 'lucide-react';

const HotelQRCode = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Hotel Access & QR Code</h1>
            <p className="text-white/70">Manage hotel identification and QR codes</p>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
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
                    defaultValue="Paradise Resort"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Unique Code</Label>
                  <div className="flex gap-2">
                    <Input
                      defaultValue="PARADISE123"
                      className="bg-white/10 border-white/20 text-white flex-1"
                    />
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Generate New
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Booking URL</Label>
                  <Input
                    defaultValue="https://sunlounge.app/PARADISE123"
                    className="bg-white/10 border-white/20 text-white"
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
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded border-2 border-white/20"></div>
                    <Input
                      type="color"
                      defaultValue="#3B82F6"
                      className="w-16 h-8 bg-transparent border-white/20"
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
                      <Checkbox id="vip" defaultChecked />
                      <Label htmlFor="vip" className="text-white text-sm">VIP Poolside</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sun" defaultChecked />
                      <Label htmlFor="sun" className="text-white text-sm">Sun Area</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="family" />
                      <Label htmlFor="family" className="text-white text-sm">Family Area</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pool" />
                      <Label htmlFor="pool" className="text-white text-sm">Pool Side</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Format</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="label" name="format" defaultChecked className="text-blue-600" />
                      <Label htmlFor="label" className="text-white text-sm">Label per Seat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="poster" name="format" className="text-blue-600" />
                      <Label htmlFor="poster" className="text-white text-sm">One Large Poster</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                    Generate QR Codes
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1">
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
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Spot QR Codes
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
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
                
                <h3 className="text-white text-xl font-bold mb-2">Paradise Resort</h3>
                <p className="text-white/70 mb-4">Scan this code to reserve your spot.</p>
                
                <div className="flex gap-3 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
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
                  <div className="w-8 h-8 bg-blue-600 rounded border-2 border-white/20"></div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-white">Upload Logo</span>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-white/60 mx-auto mb-1" />
                    <p className="text-white/60 text-xs">No logo uploaded</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelQRCode;
