
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Waves, Clock, DollarSign, Users, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const [poolSettings, setPoolSettings] = useState({
    maxBookingsPerDay: 2,
    bookingWindow: 7,
    cancellationPolicy: 2,
    autoConfirm: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [priceSettings, setPriceSettings] = useState({
    standardSeat: 25,
    premiumSeat: 40,
    vipSeat: 60,
    cabana: 100,
    shadeSeat: 35,
    towelPrice: 10,
    parasolPrice: 15,
    cocktailPrice: 12,
  });

  return (
    <AdminLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl shadow-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
              <p className="text-purple-100 text-sm">Configure pool booking system settings</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Tabs defaultValue="pool" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg">
              <TabsTrigger value="pool" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Waves className="w-4 h-4" />
                <span className="hidden sm:inline">Pool</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Pricing</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">System</span>
              </TabsTrigger>
            </TabsList>

            {/* Pool Settings */}
            <TabsContent value="pool" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="w-5 h-5" />
                    Pool Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxBookings" className="text-gray-700 font-semibold">Max Bookings Per Day</Label>
                      <Input
                        id="maxBookings"
                        type="number"
                        value={poolSettings.maxBookingsPerDay}
                        onChange={(e) => setPoolSettings({...poolSettings, maxBookingsPerDay: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 hover:border-blue-300 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bookingWindow" className="text-gray-700 font-semibold">Booking Window (days)</Label>
                      <Input
                        id="bookingWindow"
                        type="number"
                        value={poolSettings.bookingWindow}
                        onChange={(e) => setPoolSettings({...poolSettings, bookingWindow: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 hover:border-blue-300 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cancellation" className="text-gray-700 font-semibold">Cancellation Hours</Label>
                      <Input
                        id="cancellation"
                        type="number"
                        value={poolSettings.cancellationPolicy}
                        onChange={(e) => setPoolSettings({...poolSettings, cancellationPolicy: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 hover:border-blue-300 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold">Pool Layout</Label>
                      <Select defaultValue="circular">
                        <SelectTrigger className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="circular">Circular Layout</SelectItem>
                          <SelectItem value="rectangular">Rectangular Layout</SelectItem>
                          <SelectItem value="custom">Custom Layout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100">
                      <div>
                        <Label className="text-gray-700 font-semibold">Auto-confirm bookings</Label>
                        <p className="text-sm text-gray-500">Automatically confirm bookings without manual approval</p>
                      </div>
                      <Switch
                        checked={poolSettings.autoConfirm}
                        onCheckedChange={(checked) => setPoolSettings({...poolSettings, autoConfirm: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Settings */}
            <TabsContent value="pricing" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 text-lg">Seat Prices</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Standard Seat</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.standardSeat}
                              onChange={(e) => setPriceSettings({...priceSettings, standardSeat: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Premium Seat</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.premiumSeat}
                              onChange={(e) => setPriceSettings({...priceSettings, premiumSeat: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">VIP Seat</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.vipSeat}
                              onChange={(e) => setPriceSettings({...priceSettings, vipSeat: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Cabana</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.cabana}
                              onChange={(e) => setPriceSettings({...priceSettings, cabana: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 text-lg">Extra Prices</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Luxury Towel</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.towelPrice}
                              onChange={(e) => setPriceSettings({...priceSettings, towelPrice: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Premium Parasol</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.parasolPrice}
                              onChange={(e) => setPriceSettings({...priceSettings, parasolPrice: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                          <Label className="text-gray-700 font-semibold">Pool Cocktail</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">$</span>
                            <Input
                              type="number"
                              value={priceSettings.cocktailPrice}
                              onChange={(e) => setPriceSettings({...priceSettings, cocktailPrice: parseInt(e.target.value)})}
                              className="w-20 border-2 border-gray-200 hover:border-green-300 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100">
                    <div>
                      <Label className="text-gray-700 font-semibold">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive booking confirmations via email</p>
                    </div>
                    <Switch
                      checked={poolSettings.emailNotifications}
                      onCheckedChange={(checked) => setPoolSettings({...poolSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100">
                    <div>
                      <Label className="text-gray-700 font-semibold">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive booking alerts via SMS</p>
                    </div>
                    <Switch
                      checked={poolSettings.smsNotifications}
                      onCheckedChange={(checked) => setPoolSettings({...poolSettings, smsNotifications: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-700 font-semibold">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-gray-700 font-semibold">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="da">Danish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 shadow-xl"
            >
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
