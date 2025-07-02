
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import PoolLayoutView from '@/components/PoolLayoutView';

const LayoutEditor = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Layout Editor</h1>
          <p className="text-white/70">Design and organize your pool layout</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Side - Layout Canvas */}
          <div className="xl:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Pool Layout</CardTitle>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Background Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg p-8 min-h-[500px] flex items-center justify-center">
                  <PoolLayoutView />
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-white/70 text-sm">
                    Drag and drop seats to organize zones
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Save Layout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Zone Layout */}
          <div className="space-y-6">
            {/* Zone Layout */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Zone Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-green-500 rounded"></div>
                    <span className="text-white text-sm">Sun Area</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-orange-500 rounded"></div>
                    <span className="text-white text-sm">Family Area</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-blue-500 rounded"></div>
                    <span className="text-white text-sm">VIP Poolside</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-purple-500 rounded"></div>
                    <span className="text-white text-sm">Pool Side</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Assignment */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Zone Assignment</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 space-y-2">
                <div className="text-sm">• Click on seats to select them</div>
                <div className="text-sm">• Choose zone color to assign</div>
                <div className="text-sm">• Drag to select multiple seats</div>
                <div className="text-sm">• Save changes when complete</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LayoutEditor;
