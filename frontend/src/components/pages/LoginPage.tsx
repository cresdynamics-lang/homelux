import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '../ui/card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Store
        </Link>

        <Card className="rounded-[2rem] border-2 border-[#F5E6C8] shadow-2xl shadow-primary/5 overflow-hidden bg-white">
          <CardHeader className="bg-primary p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-white/10 rounded-[1.25rem] flex items-center justify-center mx-auto mb-2 text-accent">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-heading font-black italic text-white tracking-tighter uppercase">Welcome Back</CardTitle>
            <CardDescription className="text-white/60 font-light text-xs">Enter your credentials to access your Homelux account</CardDescription>
          </CardHeader>

          <CardContent className="p-10 space-y-6">


            <form className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-gray-400">Email Address</Label>
                <div className="relative">
                  <Input id="email" type="email" placeholder="john@example.com" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-gray-400">Password</Label>
                   <Link to="#" className="text-xs font-bold text-accent hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input id="password" type="password" placeholder="••••••••" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent text-white py-8 rounded-[2rem] font-bold text-lg shadow-xl hover:bg-primary transition-all active:scale-95 h-auto group">
                Sign In Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-12 pt-0 justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
