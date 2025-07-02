
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

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
                  {/* Pool Layout Visualization */}
                  <div className="relative w-full max-w-md">
                    {/* Sun Area */}
                    <div className="absolute top-4 left-4 text-sm font-medium text-gray-600">Sun Area</div>
                    
                    {/* Pool representation */}
                    <div className="relative mx-auto w-64 h-64 bg-blue-400 rounded-[50px] flex items-center justify-center">
                      <div className="text-white font-bold text-xl">POOL</div>
                      
                      {/* Seat indicator */}
                      <div className="absolute top-20 left-20 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium">
                        Seat A12 - Available
                      </div>
                    </div>
                    
                    {/* Family Area */}
                    <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-600">Family Area</div>
                    
                    {/* Dots around pool representing seats */}
                    <div className="absolute inset-0">
                      {/* Top dots */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                      
                      {/* Left dots */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                      
                      {/* Right dots */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                      
                      {/* Bottom dots */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Drag instruction */}
                  <div className="absolute top-4 right-4 text-sm text-gray-600">
                    <div className="font-medium mb-1">Standard pool side</div>
                    <div className="font-medium mb-1">Family area</div>
                    <div className="text-xs">Drag and drop to organize the area</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-white/70 text-sm">
                    Open question: How do we manage design on Zone level?
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

          {/* Right Side - Zone Layout and Suggestions */}
          <div className="space-y-6">
            {/* Suggestions */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 space-y-2">
                <div className="text-sm">1. Add zone area</div>
                <div className="text-sm">2. Design layout</div>
                <div className="text-sm">3. Dots are zone divided</div>
                <div className="text-sm">4. Drag and drop to the layout</div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Vision:</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 space-y-2">
                <div className="text-sm">Visual Editor</div>
                <div className="text-sm">A drag and drop interface to:</div>
                <div className="text-sm">Assign seats to zones visually</div>
                <div className="text-sm">Color code zones</div>
                <div className="text-sm">Adjust zone boundaries</div>
              </CardContent>
            </Card>

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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LayoutEditor;
