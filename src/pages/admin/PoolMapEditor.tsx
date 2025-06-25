
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Upload, RotateCcw, Grid, Settings, Plus, Trash2, Eye, Edit } from 'lucide-react';

const PoolMapEditor = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedLoungerType, setSelectedLoungerType] = useState('standard');
  const [gridSize, setGridSize] = useState(10);
  
  const loungerTypes = {
    standard: { name: 'Standard', price: 25, color: 'bg-blue-400', icon: '🪑' },
    premium: { name: 'Premium', price: 40, color: 'bg-purple-400', icon: '🛏️' },
    vip: { name: 'VIP', price: 60, color: 'bg-yellow-400', icon: '👑' },
    cabana: { name: 'Cabana', price: 100, color: 'bg-green-400', icon: '🏖️' },
    shade: { name: 'Shade', price: 35, color: 'bg-gray-400', icon: '☂️' }
  };

  const [poolLayout, setPoolLayout] = useState([
    { id: 'V1', type: 'vip', row: 1, col: 2, price: 60 },
    { id: 'V2', type: 'vip', row: 1, col: 3, price: 60 },
    { id: 'V3', type: 'vip', row: 1, col: 4, price: 60 },
    { id: 'V4', type: 'vip', row: 1, col: 5, price: 60 },
    { id: 'D1', type: 'premium', row: 2, col: 1, price: 40 },
    { id: 'D2', type: 'premium', row: 2, col: 2, price: 40 },
    { id: 'D3', type: 'premium', row: 2, col: 6, price: 40 },
    { id: 'S1', type: 'standard', row: 3, col: 1, price: 25 },
    { id: 'S2', type: 'standard', row: 3, col: 2, price: 25 },
    { id: 'S3', type: 'standard', row: 3, col: 3, price: 25 },
    { id: 'S4', type: 'standard', row: 3, col: 4, price: 25 },
    { id: 'S5', type: 'standard', row: 3, col: 5, price: 25 },
    { id: 'S6', type: 'standard', row: 3, col: 6, price: 25 },
    { id: 'C1', type: 'cabana', row: 4, col: 1, price: 100 },
    { id: 'SH1', type: 'shade', row: 4, col: 3, price: 35 },
    { id: 'C2', type: 'cabana', row: 4, col: 7, price: 100 },
  ]);

  const handleGridClick = (row: number, col: number) => {
    const existingLounger = poolLayout.find(l => l.row === row && l.col === col);
    
    if (selectedTool === 'delete' && existingLounger) {
      setPoolLayout(poolLayout.filter(l => l.id !== existingLounger.id));
    } else if (selectedTool === 'add' && !existingLounger) {
      const newId = generateLoungerID(selectedLoungerType);
      const newLounger = {
        id: newId,
        type: selectedLoungerType,
        row,
        col,
        price: loungerTypes[selectedLoungerType as keyof typeof loungerTypes].price
      };
      setPoolLayout([...poolLayout, newLounger]);
    }
  };

  const generateLoungerID = (type: string) => {
    const prefix = type.charAt(0).toUpperCase();
    const existing = poolLayout.filter(l => l.type === type);
    return `${prefix}${existing.length + 1}`;
  };

  const saveLayout = () => {
    console.log('Saving pool layout:', poolLayout);
    // In real app, this would save to database
  };

  const resetLayout = () => {
    if (confirm('Are you sure you want to reset the layout?')) {
      setPoolLayout([]);
    }
  };

  const exportLayout = () => {
    const dataStr = JSON.stringify(poolLayout, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pool-layout.json';
    link.click();
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Pool Map Editor</h1>
              <p className="text-blue-100 text-sm">Design and customize your pool layout</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={saveLayout} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
                <Save className="w-4 h-4 mr-2" />
                Save Layout
              </Button>
              <Button variant="outline" onClick={exportLayout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Upload className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={resetLayout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full grid lg:grid-cols-4 gap-6 p-6">
            {/* Tools Panel */}
            <div className="lg:col-span-1 space-y-4 overflow-y-auto">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <label className="text-sm font-semibold mb-3 block text-gray-700">Edit Mode</label>
                    <Select value={selectedTool} onValueChange={setSelectedTool}>
                      <SelectTrigger className="border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-xl border-0">
                        <SelectItem value="select" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Select Mode
                        </SelectItem>
                        <SelectItem value="add" className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Lounger
                        </SelectItem>
                        <SelectItem value="delete" className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Lounger
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTool === 'add' && (
                    <div className="animate-fade-in">
                      <label className="text-sm font-semibold mb-3 block text-gray-700">Lounger Type</label>
                      <Select value={selectedLoungerType} onValueChange={setSelectedLoungerType}>
                        <SelectTrigger className="border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-xl border-0">
                          {Object.entries(loungerTypes).map(([key, type]) => (
                            <SelectItem key={key} value={key} className="flex items-center gap-2">
                              <span className="text-lg mr-2">{type.icon}</span>
                              {type.name} (${type.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold mb-3 block text-gray-700">Grid Size</label>
                    <Input
                      type="number"
                      value={gridSize}
                      onChange={(e) => setGridSize(Number(e.target.value))}
                      min="5"
                      max="20"
                      className="border-2 border-gray-200 hover:border-indigo-300 transition-colors"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Lounger Types</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {Object.entries(loungerTypes).map(([key, type]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors bg-white shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${type.color} shadow-sm`}></div>
                          <span className="text-sm font-semibold text-gray-700">{type.name}</span>
                        </div>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-semibold">
                          ${type.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-600">Total Loungers:</span>
                      <Badge className="bg-blue-100 text-blue-800 font-bold">{poolLayout.length}</Badge>
                    </div>
                    {Object.entries(loungerTypes).map(([key, type]) => {
                      const count = poolLayout.filter(l => l.type === key).length;
                      return (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm font-semibold text-gray-600">{type.name}:</span>
                          <Badge className="bg-gray-100 text-gray-700 font-bold">{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Editor Canvas */}
            <div className="lg:col-span-3 overflow-hidden">
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Grid className="w-5 h-5" />
                    Pool Layout Editor
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-full overflow-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 min-h-full">
                    {/* Pool representation */}
                    <div className="relative mb-8">
                      <div className="mx-auto w-64 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-90 flex items-center justify-center shadow-2xl">
                        <span className="text-white font-bold text-xl">POOL</span>
                      </div>
                    </div>
                    
                    {/* Grid */}
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
                      {Array.from({ length: gridSize * 8 }, (_, index) => {
                        const row = Math.floor(index / gridSize) + 1;
                        const col = (index % gridSize) + 1;
                        const lounger = poolLayout.find(l => l.row === row && l.col === col);
                        
                        return (
                          <div
                            key={`${row}-${col}`}
                            className={`
                              aspect-square border-2 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden
                              ${lounger 
                                ? `${loungerTypes[lounger.type as keyof typeof loungerTypes].color} hover:scale-105 shadow-lg border-white` 
                                : 'bg-white hover:bg-gray-50 border-gray-200 border-dashed'
                              }
                              ${selectedTool === 'add' && !lounger ? 'hover:bg-blue-100 hover:border-blue-300' : ''}
                              ${selectedTool === 'delete' && lounger ? 'hover:bg-red-100 hover:border-red-300' : ''}
                            `}
                            onClick={() => handleGridClick(row, col)}
                          >
                            {lounger && (
                              <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold text-xs relative">
                                <div className="text-sm mb-1">
                                  {loungerTypes[lounger.type as keyof typeof loungerTypes].icon}
                                </div>
                                <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
                                  {lounger.id}
                                </div>
                              </div>
                            )}
                            {selectedTool === 'add' && !lounger && (
                              <div className="w-full h-full flex items-center justify-center">
                                <Plus className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            {selectedTool === 'delete' && lounger && (
                              <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-xl backdrop-blur-sm">
                                <Trash2 className="w-4 h-4 text-red-700" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PoolMapEditor;
