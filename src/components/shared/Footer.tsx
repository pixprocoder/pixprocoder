'use client';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTerminal, FiCode } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Newsletter signup:", data);
    reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Minimal Newsletter */}
          <div className="w-full md:w-auto max-w-sm space-y-4">
             <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground tracking-widest uppercase">
                <FiTerminal className="text-primary" />
                <span>./newsletter.sh</span>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <Input 
                  {...register('email', { required: true })}
                  placeholder="user@pixprocoder.dev"
                  className="bg-muted/10 border-border focus:border-primary/50 font-mono text-xs h-10 rounded-md"
                />
                <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-mono text-[10px] font-bold px-4">
                   EXEC <FiCode className="ml-1" />
                </Button>
             </form>
             {errors.email && <p className="text-[10px] font-mono text-destructive">Error: Email required</p>}
          </div>

          {/* Social Command Flags */}
          <div className="flex flex-wrap gap-6 md:gap-8">
             {[
               { icon: <FiGithub />, label: '--github', href: 'https://github.com/pixprocoder' },
               { icon: <FiLinkedin />, label: '--linkedin', href: 'https://linkedin.com/in/pixprocoder' },
             ].map((social) => (
               <Link 
                 key={social.label} 
                 href={social.href} 
                 target="_blank"
                 className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors group"
               >
                 <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                 <span>{social.label}</span>
               </Link>
             ))}
          </div>
        </div>

        {/* System Bottom Row */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono text-muted-foreground">
           <div className="flex flex-wrap items-center justify-center gap-4">
              <span>© {currentYear} PIXPROCODER_SYSTEMS</span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="italic">designed_for_the_future.exe</span>
           </div>
           
           <div className="flex items-center gap-6 uppercase">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/license" className="hover:text-primary transition-colors">License</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
