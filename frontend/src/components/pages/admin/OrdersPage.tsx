import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Download, MoreVertical, RefreshCw, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useOrders, type Order } from '../../../hooks/useOrders';
import { OrderFilters } from '../../admin/orders/OrderFilters';
import { OrderDetailsDrawer } from '../../admin/orders/OrderDetailsDrawer';

export const OrdersPage: React.FC = () => {
  const [filters, setFilters] = useState({ status: 'ALL', search: '' });
  const { orders, loading, error, refresh, updateOrderStatus } = useOrders(filters);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  return (
    <div className="space-y-8 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Orders <span className="text-accent underline decoration-4 underline-offset-8">Hub</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Connected to live commerce engine
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => refresh()}
            className="p-3 glass-card rounded-xl text-admin-muted hover:text-primary hover:bg-white transition-all group"
            title="Refresh Data"
          >
            <RefreshCw className={cn("w-5 h-5 transition-transform duration-700", loading && "animate-spin")} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <OrderFilters 
          onSearch={handleSearch} 
          onStatusChange={handleStatusChange} 
          currentStatus={filters.status} 
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="relative">
        {/* Error State */}
        {error && (
          <div className="p-12 bg-red-50/50 backdrop-blur-md rounded-[2.5rem] border border-red-100 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-heading font-black text-red-900 uppercase">Synchronization Error</h3>
            <p className="text-sm text-red-600 font-bold max-w-md mx-auto">{error}</p>
            <button onClick={() => refresh()} className="px-8 py-3 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors">
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading / Table Section */}
        {!error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40",
              loading && "opacity-50 pointer-events-none"
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/30 border-b border-white/40">
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Order ID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Customer</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Date & Time</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Total Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-white/40 transition-all duration-300 group cursor-pointer"
                        onClick={() => handleViewOrder(order)}
                      >
                        <td className="px-8 py-6 font-heading font-black text-sm text-primary tracking-tight italic uppercase group-hover:text-accent transition-colors">
                          {order.order_id}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-black text-accent italic">
                              {order.customer_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary">{order.customer_name}</p>
                              <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{order.customer_email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs text-admin-muted font-bold">
                          {new Date(order.created_at).toLocaleDateString('en-KE', { 
                            day: 'numeric', month: 'short', year: 'numeric', 
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-primary italic uppercase tracking-tighter">KShs {order.total_amount}</p>
                          <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{order.payment_method}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "premium-badge",
                            order.status === 'DELIVERED' && "bg-green-100 text-green-700 border-green-200",
                            order.status === 'PENDING' && "bg-amber-100 text-amber-700 border-amber-200",
                            order.status === 'PROCESSING' && "bg-blue-100 text-blue-700 border-blue-200",
                            order.status === 'SHIPPED' && "bg-purple-100 text-purple-700 border-purple-200",
                            order.status === 'CANCELLED' && "bg-red-100 text-red-700 border-red-200",
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleViewOrder(order); }}
                              className="p-2 hover:bg-white rounded-lg transition-all group/btn"
                            >
                              <Eye className="w-4 h-4 text-admin-muted group-hover/btn:text-accent" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-all">
                              <MoreVertical className="w-4 h-4 text-admin-muted" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : !loading && (
                    <tr>
                      <td colSpan={6} className="px-8 py-32 text-center">
                        <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <ShoppingBag className="w-10 h-10 text-admin-muted/40" />
                        </div>
                        <h3 className="text-xl font-heading font-black text-primary italic uppercase tracking-tighter">No Orders Found</h3>
                        <p className="text-sm text-admin-muted font-bold mt-2">Adjust your filters or search criteria to find what you're looking for.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="p-6 bg-white/30 border-t border-white/40 flex items-center justify-between">
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-[0.2em]">Showing {orders.length} Results</p>
              <div className="flex gap-2">
                <button className="p-2 glass-card rounded-lg opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-2 glass-card rounded-lg"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        order={selectedOrder}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};

