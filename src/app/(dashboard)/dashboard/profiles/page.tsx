// app/(dashboard)/profile/page.tsx
'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { cn } from '@/src/lib/utils';
import { AuthContext } from '@/src/providers/AuthProviders';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiLock,
  FiTwitter,
  FiUpload,
} from 'react-icons/fi';

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      phone: '',
      bio: '',
      website: '',
      twitter: '',
      github: '',
      linkedin: '',
      address: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        website: user.website || '',
        twitter: user.twitter || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        address: user.address || '',
      });
    }
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const updatedData = { ...data };
      // Add actual image upload implementation here
      toast({ description: 'Profile updated successfully 🎉' });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Update failed. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-start"
      >
        <div className="space-y-4 w-full md:max-w-[300px]">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-2 border-primary/20 mx-auto">
                  {preview || user?.photoURL ? (
                    <AvatarImage src={preview || user?.photoURL} />
                  ) : (
                    <AvatarFallback className="text-3xl bg-muted">
                      {user?.displayName?.[0] || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-2 right-2 bg-background p-2 rounded-full border border-border cursor-pointer hover:bg-muted"
                >
                  <FiUpload className="w-5 h-5" />
                  <input
                    type="file"
                    id="photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold">{user?.displayName}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge
                  variant={isAdmin ? 'premium' : 'default'}
                  className="mt-2"
                >
                  {isAdmin ? 'Administrator' : 'Standard User'}
                </Badge>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  View Public Profile
                </Button>
                {isAdmin && (
                  <>
                    <Button variant="outline" className="w-full">
                      Admin Dashboard
                    </Button>
                    <Button variant="outline" className="w-full">
                      Audit Logs
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 w-full space-y-6"
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent text-center py-4">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    {...register('displayName', {
                      required: 'Name is required',
                    })}
                    className={cn(errors.displayName && 'border-destructive')}
                  />
                  {errors.displayName && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.displayName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={cn(errors.email && 'border-destructive')}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input {...register('phone')} type="tel" />
                </div>

                <div>
                  <Label>Website</Label>
                  <Input {...register('website')} prefix="https://" />
                </div>
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea
                  {...register('bio')}
                  className="min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Social profiles */}
          {/* <Card className="border-border">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Social Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FiTwitter className="w-5 h-5 text-blue-400" />
                  <Input
                    {...register('twitter')}
                    placeholder="Twitter username"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <FiGithub className="w-5 h-5" />
                  <Input
                    {...register('github')}
                    placeholder="GitHub username"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <FiLinkedin className="w-5 h-5 text-blue-600" />
                  <Input
                    {...register('linkedin')}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* security */}
          {/* <Card className="border-border w-full">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiLock className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Password</span>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              {isAdmin && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FiGlobe className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">
                      Two-Factor Authentication
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline">Enable 2FA</Button>
                    <span className="text-sm text-muted-foreground">
                      Recommended for admin accounts
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card> */}

          <div className="flex gap-4 justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
