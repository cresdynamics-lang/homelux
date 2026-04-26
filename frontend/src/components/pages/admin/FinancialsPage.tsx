import React from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  PieChart as PieChartIcon, 
  Download,
  Calendar,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

// Dummy Data
const REVENUE_DATA = [
  { name: 'Mon', revenue: 42000, expenses: 12000 },
  { name: 'Tue', revenue: 38000, expenses: 15000 },
  { name: 'Wed', revenue: 65000, expenses: 18000 },
  { name: 'Thu', revenue: 48000, expenses: 14000 },
  { name: 'Fri', revenue: 82000, expenses: 22000 },
  { name: 'Sat', revenue: 95000, expenses: 25000 },
  { name: 'Sun', revenue: 75000, expenses: 20000 },
];

const TRANSACTIONS = [
  { id: 'TX-9901', customer: 'Grace W.', method: 'M-Pesa', amount: '145,000', status: 'Success', date: 'Today, 14:20' },
  { id: 'TX-9902', customer: 'John O.', method: 'Visa', amount: '84,995', status: 'Success', date: 'Today, 12:45' },
  { id: 'TX-9903', customer: 'Sarah M.', method: 'M-Pesa', amount: '232,540', status: 'Pending', date: 'Yesterday' },
  { id: 'TX-9904', customer: 'David K.', method: 'Bank', amount: '412,000', status: 'Failed', date: '2 days ago' },
];

export const FinancialsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Financial <span className="text-accent underline decoration-4 underline-offset-8">Metrics</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Real-time Cash Flow Monitoring
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest hover:bg-white transition-all">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '4.2M', trend: '+12.5%', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Net Profit', value: '2.8M', trend: '+8.2%', icon: CircleDollarSign, color: 'text-blue-500' },
          { label: 'Avg Sale', value: '84.5K', trend: '-2.1%', icon: CreditCard, color: 'text-purple-500' },
          { label: 'Expenses', value: '1.4M', trend: '+4.5%', icon: PieChartIcon, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-admin-bg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-black px-2 py-1 rounded-md",
                stat.trend.startsWith('+') ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
              )}>{stat.trend}</span>
            </div>
            <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-black text-primary mt-1 uppercase tracking-tight italic">KShs {stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-admin-border shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h2 className="text-lg font-black text-primary uppercase tracking-tight">Revenue vs Expenses</h2>
                 <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mt-1">Weekly Performance Analysis</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Revenue</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Expenses</span>
                 </div>
              </div>
           </div>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={REVENUE_DATA}>
                    <defs>
                       <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1B3A5C" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1B3A5C" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F99D1C" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#F99D1C" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#A0AEC0' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#A0AEC0' }} tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontWeight: 800 }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#1B3A5C" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="expenses" stroke="#F99D1C" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-admin-border shadow-sm">
           <h2 className="text-lg font-black text-primary uppercase tracking-tight mb-2">Payment Methods</h2>
           <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-8">Preferred settlement channels</p>
           
           <div className="space-y-6">
              {[
                { name: 'M-Pesa Paybill', value: 65, color: 'bg-green-500' },
                { name: 'Credit Card', value: 24, color: 'bg-blue-500' },
                { name: 'Bank Transfer', value: 8, color: 'bg-purple-500' },
                { name: 'Cash/Other', value: 3, color: 'bg-orange-500' },
              ].map((method) => (
                <div key={method.name}>
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{method.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">{method.value}%</span>
                   </div>
                   <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", method.color)} style={{ width: `${method.value}%` }} />
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 p-6 bg-admin-bg rounded-[2rem] border border-admin-border text-center">
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-2">Projected Monthly</p>
              <h4 className="text-2xl font-black text-primary italic uppercase tracking-tighter">KShs 12.8M</h4>
              <p className="text-[9px] text-green-500 font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                 <ArrowUpRight className="w-3 h-3" />
                 Trend is Upward
              </p>
           </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40">
        <div className="p-8 border-b border-white/40 flex items-center justify-between">
           <h2 className="text-lg font-black text-primary uppercase tracking-tight">Recent Transactions</h2>
           <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest">
              <Filter className="w-4 h-4" />
              Filter Transactions
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/40">
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Transaction ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Client</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/40 transition-all duration-300">
                  <td className="px-8 py-6 text-sm font-black text-primary">{tx.id}</td>
                  <td className="px-8 py-6 text-sm font-bold text-admin-text">{tx.customer}</td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-admin-bg/50 rounded-lg">
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-primary italic">KShs {tx.amount}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "premium-badge",
                      tx.status === 'Success' && "bg-green-100 text-green-700 border-green-200",
                      tx.status === 'Pending' && "bg-amber-100 text-amber-700 border-amber-200",
                      tx.status === 'Failed' && "bg-red-100 text-red-700 border-red-200",
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-widest">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
