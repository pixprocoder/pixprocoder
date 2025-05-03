// app/(dashboard)/settings/page.tsx
'use client';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Badge } from '@/src/components/ui/badge';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiLock,
  FiBell,
  FiMail,
  FiGlobe,
  FiTrash2,
  FiUpload,
  FiUsers,
} from 'react-icons/fi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Separator } from '@/src/components/ui/separator';
import { Switch } from '@/src/components/ui/switch';
import { cn } from '@/src/lib/utils';
import { ThemeToggle } from '@/src/components/shared/ThemeToggle';

const SettingsPage = () => {
  const isAdmin = true; // Replace with actual admin check

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and security
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback className="text-3xl">JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="gap-2">
                <FiUpload className="w-4 h-4" />
                Change Avatar
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="John Doe" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" defaultValue="john@example.com" />
              </div>
              <div>
                <Label>Timezone</Label>
                <Input defaultValue="UTC+01:00 (London)" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FiLock className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Last changed 2 weeks ago
                  </p>
                </div>
                <Button variant="outline">Change</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add extra security
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Active Sessions</Label>
                  <p className="text-sm text-muted-foreground">
                    3 devices connected
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FiBell className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Theme</Label>
                <ThemeToggle />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" />
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push-notifications" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Management (Admin Only) */}
        {isAdmin && (
          <Card className="border-border lg:col-span-2">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <FiUsers className="w-5 h-5" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Team Members</Label>
                    <p className="text-sm text-muted-foreground">
                      Manage access levels
                    </p>
                  </div>
                  <Button variant="outline">Invite Member</Button>
                </div>

                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/user-avatar.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Owner</p>
                      </div>
                    </div>
                    <Badge variant="outline">Administrator</Badge>
                  </div>
                  <Separator />
                  {/* Add more team members here */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Danger Zone */}
        <Card className="border-border lg:col-span-3 border-red-500/20">
          <CardHeader className="border-b border-red-500/20">
            <CardTitle className="flex items-center gap-2 text-red-500">
              <FiTrash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <Label className="text-red-500">Delete Account</Label>
                <p className="text-sm text-red-500/70">
                  Permanently remove your account and all associated data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
