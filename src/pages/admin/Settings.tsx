
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Settings as SettingsIcon, Globe, DollarSign, Clock, Users } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    hotelName: 'Sunset Resort & Spa',
    defaultLanguage: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    
    // Booking Settings
    maxBookingsPerDay: 2,
    advanceBookingDays: 7,
    cancellationDeadline: 24,
    enableQRBooking: true,
    enableManualBooking: true,
    
    // Time Slot Settings
    openingTime: '08:00',
    closingTime: '20:00',
    timeSlotDuration: 2,
    breakBetweenSlots: 30,
    
    // Pricing Settings
    standardPrice: 25,
    premiumPrice: 40,
    vipPrice: 60,
    cabanaPrice: 100,
    shadePrice: 35,
    
    // Extra Services
    enableExtras: true,
    cokePrice: 5,
    waterPrice: 3,
    cocktailPrice: 12,
    towelPrice: 10,
    parasolPrice: 15,
    snacksPrice: 8,
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    adminNotifications: true,
    
    // Payment Settings
    enableStripe: true,
    enableReceptionPayment: true,
    stripeKey: '',
    
    // Terms and Policies
    termsAndConditions: 'By booking a lounger, you agree to our terms and conditions...',
    cancellationPolicy: 'Free cancellation up to 24 hours before your booking...',
    privacyPolicy: 'We respect your privacy and protect your personal data...'
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // In real app, this would save to database
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hotelName">Hotel Name</Label>
                <Input
                  id="hotelName"
                  value={settings.hotelName}
                  onChange={(e) => updateSetting('hotelName', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={settings.defaultLanguage} onValueChange={(value) => updateSetting('defaultLanguage', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Booking Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxBookings">Max Bookings/Day</Label>
                  <Input
                    id="maxBookings"
                    type="number"
                    value={settings.maxBookingsPerDay}
                    onChange={(e) => updateSetting('maxBookingsPerDay', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="advanceDays">Advance Booking Days</Label>
                  <Input
                    id="advanceDays"
                    type="number"
                    value={settings.advanceBookingDays}
                    onChange={(e) => updateSetting('advanceBookingDays', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="cancellation">Cancellation Deadline (hours)</Label>
                <Input
                  id="cancellation"
                  type="number"
                  value={settings.cancellationDeadline}
                  onChange={(e) => updateSetting('cancellationDeadline', Number(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="qrBooking">Enable QR Code Booking</Label>
                <Switch
                  id="qrBooking"
                  checked={settings.enableQRBooking}
                  onCheckedChange={(checked) => updateSetting('enableQRBooking', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="manualBooking">Enable Manual ID Booking</Label>
                <Switch
                  id="manualBooking"
                  checked={settings.enableManualBooking}
                  onCheckedChange={(checked) => updateSetting('enableManualBooking', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Slot Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={settings.openingTime}
                    onChange={(e) => updateSetting('openingTime', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={settings.closingTime}
                    onChange={(e) => updateSetting('closingTime', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="slotDuration">Slot Duration (hours)</Label>
                  <Input
                    id="slotDuration"
                    type="number"
                    value={settings.timeSlotDuration}
                    onChange={(e) => updateSetting('timeSlotDuration', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="breakTime">Break Between Slots (minutes)</Label>
                  <Input
                    id="breakTime"
                    type="number"
                    value={settings.breakBetweenSlots}
                    onChange={(e) => updateSetting('breakBetweenSlots', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="standardPrice">Standard Lounger</Label>
                  <Input
                    id="standardPrice"
                    type="number"
                    value={settings.standardPrice}
                    onChange={(e) => updateSetting('standardPrice', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="premiumPrice">Premium Lounger</Label>
                  <Input
                    id="premiumPrice"
                    type="number"
                    value={settings.premiumPrice}
                    onChange={(e) => updateSetting('premiumPrice', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vipPrice">VIP Lounger</Label>
                  <Input
                    id="vipPrice"
                    type="number"
                    value={settings.vipPrice}
                    onChange={(e) => updateSetting('vipPrice', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cabanaPrice">Cabana</Label>
                  <Input
                    id="cabanaPrice"
                    type="number"
                    value={settings.cabanaPrice}
                    onChange={(e) => updateSetting('cabanaPrice', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="shadePrice">Shade Area</Label>
                  <Input
                    id="shadePrice"
                    type="number"
                    value={settings.shadePrice}
                    onChange={(e) => updateSetting('shadePrice', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Services */}
          <Card>
            <CardHeader>
              <CardTitle>Extra Services Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="enableExtras">Enable Extra Services</Label>
                <Switch
                  id="enableExtras"
                  checked={settings.enableExtras}
                  onCheckedChange={(checked) => updateSetting('enableExtras', checked)}
                />
              </div>
              
              {settings.enableExtras && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cokePrice">Cold Coke</Label>
                    <Input
                      id="cokePrice"
                      type="number"
                      value={settings.cokePrice}
                      onChange={(e) => updateSetting('cokePrice', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="waterPrice">Premium Water</Label>
                    <Input
                      id="waterPrice"
                      type="number"
                      value={settings.waterPrice}
                      onChange={(e) => updateSetting('waterPrice', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cocktailPrice">Pool Cocktail</Label>
                    <Input
                      id="cocktailPrice"
                      type="number"
                      value={settings.cocktailPrice}
                      onChange={(e) => updateSetting('cocktailPrice', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="towelPrice">Luxury Towel</Label>
                    <Input
                      id="towelPrice"
                      type="number"
                      value={settings.towelPrice}
                      onChange={(e) => updateSetting('towelPrice', Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableStripe">Enable Stripe Payments</Label>
                <Switch
                  id="enableStripe"
                  checked={settings.enableStripe}
                  onCheckedChange={(checked) => updateSetting('enableStripe', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enableReception">Enable Reception Payment</Label>
                <Switch
                  id="enableReception"
                  checked={settings.enableReceptionPayment}
                  onCheckedChange={(checked) => updateSetting('enableReceptionPayment', checked)}
                />
              </div>
              
              {settings.enableStripe && (
                <div>
                  <Label htmlFor="stripeKey">Stripe API Key</Label>
                  <Input
                    id="stripeKey"
                    type="password"
                    placeholder="sk_test_..."
                    value={settings.stripeKey}
                    onChange={(e) => updateSetting('stripeKey', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Terms and Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Terms and Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="terms">Terms and Conditions</Label>
              <Textarea
                id="terms"
                rows={4}
                value={settings.termsAndConditions}
                onChange={(e) => updateSetting('termsAndConditions', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="cancellation">Cancellation Policy</Label>
              <Textarea
                id="cancellation"
                rows={3}
                value={settings.cancellationPolicy}
                onChange={(e) => updateSetting('cancellationPolicy', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="privacy">Privacy Policy</Label>
              <Textarea
                id="privacy"
                rows={3}
                value={settings.privacyPolicy}
                onChange={(e) => updateSetting('privacyPolicy', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
