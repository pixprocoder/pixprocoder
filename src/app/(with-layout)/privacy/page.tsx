'use client';
import { motion } from 'framer-motion';
import { Terminal, Shield, Eye, Cookie, Lock, FileText, Bell } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Introduction',
      icon: <Terminal className="text-primary" size={20} />,
      content: 'At PixProcoder, accessible from pixprocoder.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PixProcoder and how we use it.'
    },
    {
      title: 'Information Collection',
      icon: <Eye className="text-primary" size={20} />,
      content: 'We collect several different types of information for various purposes to provide and improve our service to you, including personal data like email addresses when you subscribe to our newsletter or contact us.'
    },
    {
      title: 'Google AdSense & DoubleClick Cookie',
      icon: <Shield className="text-primary" size={20} />,
      content: 'Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to pixprocoder.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.'
    },
    {
      title: 'Log Files',
      icon: <FileText className="text-primary" size={20} />,
      content: 'PixProcoder follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services\' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.'
    },
    {
      title: 'Cookie Policy',
      icon: <Cookie className="text-primary" size={20} />,
      content: 'Like any other website, PixProcoder uses "cookies". These cookies are used to store information including visitors\' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users\' experience by customizing our web page content based on visitors\' browser type and/or other information.'
    },
    {
      title: 'Data Security',
      icon: <Lock className="text-primary" size={20} />,
      content: 'The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.'
    }
  ];

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="space-y-4 mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <Terminal size={14} />
              <span>~/legal/privacy_policy.md</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Privacy <span className="text-primary font-mono italic">protocol.</span>
            </h1>
            <p className="text-muted-foreground text-lg font-mono">
              Last Updated: March 30, 2026
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-muted/5 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background border border-white/10 text-primary">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold font-mono tracking-tight text-white uppercase italic">
                    {section.title.replace(/ /g, '_')}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-mono text-sm md:text-base">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
              <Bell size={12} className="text-primary" />
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
