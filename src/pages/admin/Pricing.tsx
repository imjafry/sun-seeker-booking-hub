
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const [offlinePayment, setOfflinePayment] = useState(true);
  const [serviceFee, setServiceFee] = useState(false);
  const [peakHours, setPeakHours] = useState(false);
  const [showAddZone, setShowAddZone] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZonePrice, setNewZonePrice] = useState('');
  const [zoneToDelete, setZoneToDelete] = useState<string | null>(null);

  const [zones, setZones] = useState([
    { name: 'Standard Poolside', price: 10 },
    { name: 'VIP Poolside', price: 30 },
    { name: 'Family Area', price: 5 },
  ]);

  const handleAddZone = () => {
    if (newZoneName && newZonePrice) {
      setZones([...zones, { name: newZoneName, price: parseInt(newZonePrice) }]);
      setNewZoneName('');
      setNewZonePrice('');
      setShowAddZone(false);
    }
  };

  const handleDeleteZone = (zoneName: string) => {
    setZones(zones.filter(zone => zone.name !== zoneName));
    setZoneToDelete(null);
  };

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
                <Switch 
                  checked={offlinePayment} 
                  onCheckedChange={setOfflinePayment}
                  className={offlinePayment ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Zone Button and Dialog */}
          <div className="flex justify-start">
            <AlertDialog open={showAddZone} onOpenChange={setShowAddZone}>
              <AlertDialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Zone
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-800 border-slate-600">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Add New Zone</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    Create a new pricing zone for your pool area.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Zone Name</Label>
                    <Input
                      value={newZoneName}
                      onChange={(e) => setNewZoneName(e.target.value)}
                      placeholder="e.g., Premium Deck"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Price ($)</Label>
                    <Input
                      type="number"
                      value={newZonePrice}
                      onChange={(e) => setNewZonePrice(e.target.value)}
                      placeholder="25"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleAddZone}
                  >
                    Add Zone
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Zone Prices */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Zone Prices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {zones.map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <Label className="text-white text-base">{zone.name}</Label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">$</span>
                        <Input
                          type="number"
                          defaultValue={zone.price}
                          className="bg-slate-800 border-slate-600 text-white w-20 text-center"
                        />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-800 border-slate-600">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Zone</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/70">
                              Are you sure you want to delete the "{zone.name}" zone? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDeleteZone(zone.name)}
                            >
                              Delete Zone
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
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
                <Switch 
                  checked={serviceFee} 
                  onCheckedChange={setServiceFee}
                  className={serviceFee ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                />
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
                <Switch 
                  checked={peakHours} 
                  onCheckedChange={setPeakHours}
                  className={peakHours ? 'data-[state=checked]:bg-green-600' : 'data-[state=unchecked]:bg-slate-600'}
                />
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
