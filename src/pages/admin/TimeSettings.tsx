
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const TimeSettings = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Time Settings</h1>
          <p className="text-white/70">Configure booking time slots and availability</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Operating Hours */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Operating Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">Opening Time</Label>
                  <Input
                    type="time"
                    defaultValue="08:00"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Closing Time</Label>
                  <Input
                    type="time"
                    defaultValue="20:00"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Slots */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Booking Time Slots</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">Slot Duration (hours)</Label>
                  <Input
                    type="number"
                    defaultValue="2"
                    min="1"
                    max="8"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Break Between Slots (minutes)</Label>
                  <Input
                    type="number"
                    defaultValue="30"
                    min="0"
                    max="60"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white text-lg">Available Time Slots</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    '08:00 - 10:00',
                    '10:30 - 12:30',
                    '13:00 - 15:00',
                    '15:30 - 17:30',
                    '18:00 - 20:00'
                  ].map((slot, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                      <span className="text-white text-sm">{slot}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advance Booking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Advance Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">Maximum Days in Advance</Label>
                  <Input
                    type="number"
                    defaultValue="7"
                    min="1"
                    max="30"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Minimum Hours Before Booking</Label>
                  <Input
                    type="number"
                    defaultValue="2"
                    min="0"
                    max="24"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">Free Cancellation (hours before)</Label>
                  <Input
                    type="number"
                    defaultValue="2"
                    min="0"
                    max="24"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Partial Refund (hours before)</Label>
                  <Input
                    type="number"
                    defaultValue="1"
                    min="0"
                    max="24"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Partial Refund Percentage</Label>
                <Input
                  type="number"
                  defaultValue="50"
                  min="0"
                  max="100"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Special Hours */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Special Hours & Holidays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable Holiday Schedule</Label>
                  <p className="text-white/60 text-sm">Set different hours for holidays</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Weekend Extended Hours</Label>
                  <p className="text-white/60 text-sm">Different hours for weekends</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
              Save Time Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TimeSettings;
