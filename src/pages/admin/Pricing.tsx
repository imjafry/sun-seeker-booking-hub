
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';

const Pricing = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Pricing</h1>
          <p className="text-white/70">Zone Settings</p>
          <p className="text-white/60 text-sm">Configure pricing options</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Payment Options */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white text-base">Enable offline payment</Label>
                  <p className="text-white/60 text-sm">Allow customers to pay at reception</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Add Zone Button */}
          <div className="flex justify-start">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Zone
            </Button>
          </div>

          {/* Zone Prices */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Zone Prices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <Label className="text-white text-base">Standard Poolside</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">$</span>
                    <Input
                      type="number"
                      defaultValue="10"
                      className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <Label className="text-white text-base">VIP Poolside</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">$</span>
                    <Input
                      type="number"
                      defaultValue="30"
                      className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <Label className="text-white text-base">Family Area</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">$</span>
                    <Input
                      type="number"
                      defaultValue="5"
                      className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Additional Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <Label className="text-white text-base">Luxury Towel</Label>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">$</span>
                  <Input
                    type="number"
                    defaultValue="5"
                    className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <Label className="text-white text-base">Premium Parasol</Label>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">$</span>
                  <Input
                    type="number"
                    defaultValue="8"
                    className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Fee */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Service Fee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white text-base">Enable Service Fee</Label>
                  <p className="text-white/60 text-sm">Add a service fee to all bookings</p>
                </div>
                <Switch />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Fee Type</Label>
                  <select className="w-full bg-white/10 border-white/20 text-white p-2 rounded-md">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Amount</Label>
                  <Input
                    type="number"
                    defaultValue="10"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours Pricing */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Peak Hours Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white text-base">Enable Peak Hours</Label>
                  <p className="text-white/60 text-sm">Higher prices during peak hours</p>
                </div>
                <Switch />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Peak Start Time</Label>
                  <Input
                    type="time"
                    defaultValue="12:00"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Peak End Time</Label>
                  <Input
                    type="time"
                    defaultValue="16:00"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Peak Multiplier</Label>
                  <Input
                    type="number"
                    step="0.1"
                    defaultValue="1.5"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Pricing;
