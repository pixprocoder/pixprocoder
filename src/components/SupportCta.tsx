import { BUY_ME_A_COFFEE_URL } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { Coffee } from 'lucide-react';
import { Button } from './ui/button';

export function SupportCta({
  variant = 'card',
  className,
}: {
  variant?: 'card' | 'button';
  className?: string;
}) {
  const link = (
    <a
      href={BUY_ME_A_COFFEE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Coffee className="mr-2 size-4" />
      Buy me a coffee
    </a>
  );

  if (variant === 'button') {
    return (
      <Button asChild variant="outline" className={cn('h-11 rounded-xl px-6', className)}>
        {link}
      </Button>
    );
  }

  return (
    <aside
      className={cn(
        'rounded-2xl border border-border bg-card px-5 py-5 sm:px-6',
        className,
      )}
    >
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Support
      </p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        If this helped, you can buy me a coffee. It keeps the writing going.
      </p>
      <Button asChild className="mt-4 h-10 rounded-xl px-5">
        {link}
      </Button>
    </aside>
  );
}
