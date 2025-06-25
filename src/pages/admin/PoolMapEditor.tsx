
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Upload, RotateCcw, Grid, Settings, Plus, Trash2 } from 'lucide-react';

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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pool Map Editor</h1>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveLayout} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Layout
            </Button>
            <Button variant="outline" onClick={exportLayout}>
              <Upload className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={resetLayout}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Edit Mode</label>
                  <Select value={selectedTool} onValueChange={setSelectedTool}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="add">Add Lounger</SelectItem>
                      <SelectItem value="delete">Delete Lounger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTool === 'add' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lounger Type</label>
                    <Select value={selectedLoungerType} onValueChange={setSelectedLoungerType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(loungerTypes).map(([key, type]) => (
                          <SelectItem key={key} value={key}>
                            {type.icon} {type.name} (${type.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Grid Size</label>
                  <Input
                    type="number"
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    min="5"
                    max="20"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lounger Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(loungerTypes).map(([key, type]) => (
                    <div key={key} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${type.color}`}></div>
                        <span className="text-sm font-medium">{type.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">${type.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Loungers:</span>
                    <span className="font-medium">{poolLayout.length}</span>
                  </div>
                  {Object.entries(loungerTypes).map(([key, type]) => {
                    const count = poolLayout.filter(l => l.type === key).length;
                    return (
                      <div key={key} className="flex justify-between text-sm">
                        <span>{type.name}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor Canvas */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  Pool Layout Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 overflow-auto">
                  {/* Pool representation */}
                  <div className="relative mb-8">
                    <div className="mx-auto w-64 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 flex items-center justify-center shadow-2xl">
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
                            aspect-square border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                            ${lounger 
                              ? `${loungerTypes[lounger.type as keyof typeof loungerTypes].color} hover:scale-105 shadow-md` 
                              : 'bg-white hover:bg-gray-50 border-dashed'
                            }
                            ${selectedTool === 'add' && !lounger ? 'hover:bg-blue-100' : ''}
                            ${selectedTool === 'delete' && lounger ? 'hover:bg-red-100' : ''}
                          `}
                          onClick={() => handleGridClick(row, col)}
                        >
                          {lounger && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold text-xs">
                              <div className="text-sm">
                                {loungerTypes[lounger.type as keyof typeof loungerTypes].icon}
                              </div>
                              <div>{lounger.id}</div>
                            </div>
                          )}
                          {selectedTool === 'add' && !lounger && (
                            <div className="w-full h-full flex items-center justify-center">
                              <Plus className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          {selectedTool === 'delete' && lounger && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg">
                              <Trash2 className="w-4 h-4 text-red-600" />
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
    </AdminLayout>
  );
};

export default PoolMapEditor;
