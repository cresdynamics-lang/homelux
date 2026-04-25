import React, { useState } from 'react';
import { 
  Box, 
  MapPin, 
  History, 
  AlertTriangle, 
  ArrowRight, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Plus,
  RefreshCcw,
  Warehouse
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

// Dummy Data
const INVENTORY_ITEMS = [
  {
    id: 'SKU-001-HLY',
    name: 'Hollyann 3-Seater Sofa',
    location: 'Central Warehouse',
    stock: 12,
    reserved: 4,
    available: 8,
    status: 'Stable',
    unitPrice: '145,000'
  },
  {
    id: 'SKU-002-FNC',
    name: 'Finch Bedroom Set',
    location: 'Mombasa Showroom',
    stock: 5,
    reserved: 2,
    available: 3,
    status: 'Critical',
    unitPrice: '285,000'
  },
  {
    id: 'SKU-003-MSH',
    name: 'Mesh Office Chair',
    location: 'Nairobi Westlands',
    stock: 45,
    reserved: 10,
    available: 35,
    status: 'Overstocked',
    unitPrice: '24,500'
  },
  {
    id: 'SKU-004-MBL',
    name: 'Marble Dining Table',
    location: 'Central Warehouse',
    stock: 0,
    reserved: 0,
    available: 0,
    status: 'Out of Stock',
    unitPrice: '112,000'
  }
];

const STOCK_MOVEMENTS = [
  { id: 'MOV-101', type: 'Incoming', item: 'Finch Bed', qty: 10, from: 'Factory', to: 'Central', date: '10 mins ago' },
  { id: 'MOV-102', type: 'Outgoing', item: 'Hollyann Sofa', qty: 1, from: 'Central', to: 'Customer #4521', date: '25 mins ago' },
  { id: 'MOV-103', type: 'Transfer', item: 'Mesh Chair', qty: 5, from: 'Central', to: 'Westlands', date: '1 hr ago' },
];

export const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Inventory <span className="text-accent underline decoration-4 underline-offset-8">& Stock</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Monitoring 428 Total SKUs
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 glass-card rounded-xl text-admin-muted hover:text-primary transition-all">
            <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            Inventory Audit
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-admin-bg rounded-2xl flex items-center justify-center">
              <Warehouse className="w-8 h-8 text-primary" />
           </div>
           <div>
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Main Warehouse</p>
              <h3 className="text-2xl font-black text-primary italic uppercase tracking-tighter">84% <span className="text-xs font-bold font-body text-admin-muted">Full</span></h3>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
           </div>
           <div>
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Low Stock Alerts</p>
              <h3 className="text-2xl font-black text-primary italic uppercase tracking-tighter">12 <span className="text-xs font-bold font-body text-red-500">Urgent</span></h3>
           </div>
        </div>
        <div className="bg-admin-navy p-8 rounded-[2rem] text-white flex items-center gap-6">
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <History className="w-8 h-8 text-accent" />
           </div>
           <div>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Transfers Today</p>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">24 <span className="text-xs font-bold font-body text-accent">Active</span></h3>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40">
             <div className="relative group flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Search by SKU or Product..."
                  className="w-full h-11 pl-12 pr-4 glass-input rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
             </div>
             <button className="flex items-center gap-2 h-11 px-6 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest ml-4">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
             </button>
          </div>

          <div className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/30 border-b border-white/40">
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Item / SKU</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Location</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Stock Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Available</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {INVENTORY_ITEMS.map((item) => (
                    <tr key={item.id} className="hover:bg-white/40 transition-all duration-300 group cursor-pointer">
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-primary uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{item.id}</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-xs font-bold text-admin-muted">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={cn(
                           "premium-badge",
                           item.status === 'Stable' && "bg-green-100 text-green-700 border-green-200",
                           item.status === 'Critical' && "bg-red-100 text-red-700 border-red-200",
                           item.status === 'Overstocked' && "bg-blue-100 text-blue-700 border-blue-200",
                           item.status === 'Out of Stock' && "bg-admin-bg text-admin-muted border-admin-border",
                         )}>
                           {item.status}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-primary">{item.available} <span className="text-[10px] text-admin-muted font-black">/ {item.stock}</span></span>
                            <div className="w-16 h-1 bg-admin-bg rounded-full mt-1 overflow-hidden">
                               <div 
                                 className="h-full bg-primary" 
                                 style={{ width: `${(item.available / item.stock) * 100 || 0}%` }}
                               />
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-primary italic uppercase tracking-tighter">
                        KShs {item.unitPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Movement Logs */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm">
              <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase mb-6 flex items-center justify-between">
                 Stock Feed
                 <History className="w-5 h-5 text-accent" />
              </h2>
              <div className="space-y-8">
                 {STOCK_MOVEMENTS.map((mov) => (
                    <div key={mov.id} className="relative pl-8 border-l-2 border-dashed border-admin-border pb-2 last:pb-0">
                       <div className={cn(
                         "absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg",
                         mov.type === 'Incoming' && "bg-green-500",
                         mov.type === 'Outgoing' && "bg-red-500",
                         mov.type === 'Transfer' && "bg-blue-500",
                       )}>
                          {mov.type === 'Incoming' ? <ArrowDownLeft className="w-3 h-3" /> : mov.type === 'Outgoing' ? <ArrowUpRight className="w-3 h-3" /> : <RefreshCcw className="w-3 h-3" />}
                       </div>
                       <div>
                          <p className="text-xs font-black text-primary uppercase tracking-tight">{mov.item}</p>
                          <p className="text-[10px] text-admin-muted font-bold mt-1">
                             <span className="font-black text-primary">{mov.qty} Units</span> • {mov.from} › {mov.to}
                          </p>
                          <p className="text-[9px] text-admin-muted font-black uppercase tracking-widest mt-2">{mov.date}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 bg-admin-bg rounded-xl text-[10px] font-black text-admin-navy hover:bg-admin-navy hover:text-white transition-all uppercase tracking-widest">
                 View All Movements
              </button>
           </div>

           <div className="bg-accent p-8 rounded-[2rem] shadow-xl text-white overflow-hidden relative group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-2">Inventory Health</p>
                 <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">92.4%</h3>
                 <p className="text-xs font-bold leading-relaxed text-white/80">Your stock turnover is 12% higher than last quarter. Keep it up!</p>
                 <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                    Run Report <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
