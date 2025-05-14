// app/not-found.tsx
import { Home } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-6xl font-bold tracking-tighter text-primary">
            404
          </CardTitle>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Page Not Found
          </h2>
        </CardHeader>

        <CardContent className="py-4 text-center text-muted-foreground">
          <p>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild className="group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
