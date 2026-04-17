import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft,
  User,
  ShieldIcon
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
import { Checkbox } from '../ui/checkbox';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative z-10"
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
              <ShieldIcon className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-heading font-black italic text-white tracking-tighter uppercase">Join Homelux</CardTitle>
            <CardDescription className="text-white/60 font-light text-xs">Elevate your living. Create an account for exclusive access to premium collections.</CardDescription>
          </CardHeader>

          <CardContent className="p-10 space-y-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-xs uppercase tracking-widest font-bold text-gray-400">First Name</Label>
                  <div className="relative">
                    <Input id="firstName" placeholder="John" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-xs uppercase tracking-widest font-bold text-gray-400">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required className="h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-gray-400">Email Address</Label>
                <div className="relative">
                  <Input id="email" type="email" placeholder="john@example.com" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-gray-400">Create Password</Label>
                <div className="relative">
                  <Input id="password" type="password" placeholder="••••••••" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="flex items-start gap-3 px-2">
                <Checkbox id="terms" required className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-gray-500 font-light leading-relaxed">
                  I agree to the <Link to="#" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
                </Label>
              </div>

              <Button type="submit" className="w-full bg-accent text-white py-8 rounded-[2rem] font-bold text-lg shadow-xl hover:bg-primary transition-all active:scale-95 h-auto group">
                Create My Account <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>

          </CardContent>

          <CardFooter className="p-12 pt-0 justify-center">
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
