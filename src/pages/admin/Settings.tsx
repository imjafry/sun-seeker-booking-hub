
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
import { Settings as SettingsIcon, Pool, Clock, DollarSign, Users, Bell, Shield, Palette } from 'lucide-react';

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure pool booking system settings</p>
          </div>
        </div>

        <Tabs defaultValue="pool" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="pool" className="flex items-center gap-2">
              <Pool className="w-4 h-4" />
              <span className="hidden sm:inline">Pool</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* Pool Settings */}
          <TabsContent value="pool" className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Pool className="w-5 h-5" />
                  Pool Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxBookings">Max Bookings Per Day</Label>
                    <Input
                      id="maxBookings"
                      type="number"
                      value={poolSettings.maxBookingsPerDay}
                      onChange={(e) => setPoolSettings({...poolSettings, maxBookingsPerDay: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bookingWindow">Booking Window (days)</Label>
                    <Input
                      id="bookingWindow"
                      type="number"
                      value={poolSettings.bookingWindow}
                      onChange={(e) => setPoolSettings({...poolSettings, bookingWindow: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cancellation">Cancellation Hours</Label>
                    <Input
                      id="cancellation"
                      type="number"
                      value={poolSettings.cancellationPolicy}
                      onChange={(e) => setPoolSettings({...poolSettings, cancellationPolicy: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pool Layout</Label>
                    <Select defaultValue="circular">
                      <SelectTrigger>
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
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-confirm bookings</Label>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <DollarSign className="w-5 h-5" />
                  Pricing Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Seat Prices</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Standard Seat</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.standardSeat}
                            onChange={(e) => setPriceSettings({...priceSettings, standardSeat: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Premium Seat</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.premiumSeat}
                            onChange={(e) => setPriceSettings({...priceSettings, premiumSeat: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>VIP Seat</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.vipSeat}
                            onChange={(e) => setPriceSettings({...priceSettings, vipSeat: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Cabana</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.cabana}
                            onChange={(e) => setPriceSettings({...priceSettings, cabana: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Extra Prices</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Luxury Towel</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.towelPrice}
                            onChange={(e) => setPriceSettings({...priceSettings, towelPrice: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Premium Parasol</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.parasolPrice}
                            onChange={(e) => setPriceSettings({...priceSettings, parasolPrice: parseInt(e.target.value)})}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Pool Cocktail</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={priceSettings.cocktailPrice}
                            onChange={(e) => setPriceSettings({...priceSettings, cocktailPrice: parseInt(e.target.value)})}
                            className="w-20"
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive booking confirmations via email</p>
                  </div>
                  <Switch
                    checked={poolSettings.emailNotifications}
                    onCheckedChange={(checked) => setPoolSettings({...poolSettings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Shield className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
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
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
