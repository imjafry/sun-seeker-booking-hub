
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const TimeSettings = () => {
  const [mondayEnabled, setMondayEnabled] = useState(true);
  const [tuesdayEnabled, setTuesdayEnabled] = useState(true);
  const [wednesdayEnabled, setWednesdayEnabled] = useState(true);
  const [thursdayEnabled, setThursdayEnabled] = useState(true);
  const [fridayEnabled, setFridayEnabled] = useState(true);
  const [saturdayEnabled, setSaturdayEnabled] = useState(true);
  const [sundayEnabled, setSundayEnabled] = useState(false);
  const [advanceBooking, setAdvanceBooking] = useState(true);
  const [cancellationPolicy, setCancellationPolicy] = useState(true);

  const days = [
    { name: 'Monday', enabled: mondayEnabled, setEnabled: setMondayEnabled },
    { name: 'Tuesday', enabled: tuesdayEnabled, setEnabled: setTuesdayEnabled },
    { name: 'Wednesday', enabled: wednesdayEnabled, setEnabled: setWednesdayEnabled },
    { name: 'Thursday', enabled: thursdayEnabled, setEnabled: setThursdayEnabled },
    { name: 'Friday', enabled: fridayEnabled, setEnabled: setFridayEnabled },
    { name: 'Saturday', enabled: saturdayEnabled, setEnabled: setSaturdayEnabled },
    { name: 'Sunday', enabled: sundayEnabled, setEnabled: setSundayEnabled },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Time Settings</h1>
          <p className="text-white/70">Configure operating hours and booking policies</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Operating Hours */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Operating Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div key={day.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={day.enabled} 
                      onCheckedChange={day.setEnabled}
                      className={day.enabled ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                    />
                    <Label className="text-white text-base w-20">{day.name}</Label>
                  </div>
                  {day.enabled && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-white text-sm">Open:</Label>
                        <Input
                          type="time"
                          defaultValue="09:00"
                          className="bg-slate-800 border-slate-600 text-white w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-white text-sm">Close:</Label>
                        <Input
                          type="time"
                          defaultValue="18:00"
                          className="bg-slate-800 border-slate-600 text-white w-32"
                        />
                      </div>
                    </div>
                  )}
                  {!day.enabled && (
                    <span className="text-white/60">Closed</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Time Slots</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Slot Duration (minutes)</Label>
                  <Input
                    type="number"
                    defaultValue="60"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Break Between Slots (minutes)</Label>
                  <Input
                    type="number"
                    defaultValue="15"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advance Booking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Advance Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white text-base">Enable Advance Booking</Label>
                  <p className="text-white/60 text-sm">Allow customers to book in advance</p>
                </div>
                <Switch 
                  checked={advanceBooking} 
                  onCheckedChange={setAdvanceBooking}
                  className={advanceBooking ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                />
              </div>
              
              {advanceBooking && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Maximum Days in Advance</Label>
                    <Input
                      type="number"
                      defaultValue="30"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Minimum Hours in Advance</Label>
                    <Input
                      type="number"
                      defaultValue="2"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white text-base">Allow Cancellations</Label>
                  <p className="text-white/60 text-sm">Enable booking cancellations</p>
                </div>
                <Switch 
                  checked={cancellationPolicy} 
                  onCheckedChange={setCancellationPolicy}
                  className={cancellationPolicy ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                />
              </div>
              
              {cancellationPolicy && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Free Cancellation (hours before)</Label>
                    <Input
                      type="number"
                      defaultValue="24"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Cancellation Fee (%)</Label>
                    <Input
                      type="number"
                      defaultValue="10"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TimeSettings;
