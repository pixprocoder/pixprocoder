'use client';

import { useAnalytics } from '@/src/hooks/useAnalytics';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

/**
 * Link component with automatic outbound link tracking
 * Usage: <TrackedLink href="https://external.com">Link</TrackedLink>
 */
export const TrackedLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'>
>(({ href, onClick, children, ...props }, ref) => {
  const { trackOutboundLink } = useAnalytics();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call existing onClick if provided
    onClick?.(e);

    // Track outbound links
    if (href && href.startsWith('http') && !href.includes(window.location.host)) {
      trackOutboundLink(href, children?.toString() || href);
    }
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

TrackedLink.displayName = 'TrackedLink';

/**
 * Button component with automatic click tracking
 * Usage: <TrackedButton eventName="signup_click">Sign Up</TrackedButton>
 */
export const TrackedButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & { eventName?: string }
>(({ eventName = 'button_click', onClick, children, ...props }, ref) => {
  const { trackEvent } = useAnalytics();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    trackEvent(eventName, {
      element: 'button',
      text: children?.toString(),
    });
  };

  return (
    <button ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  );
});

TrackedButton.displayName = 'TrackedButton';
