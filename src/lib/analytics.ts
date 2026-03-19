/**
 * Google Analytics 4 Utility
 * Best practices implementation for Next.js
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Send page view event to GA4
 */
export const pageview = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

/**
 * Send custom event to GA4
 * @param eventName - Name of the event (e.g., 'click', 'form_submit')
 * @param eventParams - Additional event parameters
 */
export const event = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag?.('event', eventName, {
    measurement_id: GA_MEASUREMENT_ID,
    ...eventParams,
  });
};

/**
 * Common E-commerce Events for Google Ads integration
 */
export const ecommerceEvents = {
  /**
   * Track when a user views a product
   */
  viewItem: (itemId: string, itemName: string, price?: number) => {
    event('view_item', {
      currency: 'USD',
      value: price,
      items: [{ item_id: itemId, item_name: itemName }],
    });
  },

  /**
   * Track when a user adds item to cart
   */
  addToCart: (itemId: string, itemName: string, price: number, quantity = 1) => {
    event('add_to_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{ item_id: itemId, item_name: itemName, quantity }],
    });
  },

  /**
   * Track when a user initiates checkout
   */
  beginCheckout: (value: number, items: Array<{ item_id: string; item_name: string; quantity: number }>) => {
    event('begin_checkout', {
      currency: 'USD',
      value,
      items,
    });
  },

  /**
   * Track successful purchase
   */
  purchase: (
    transactionId: string,
    value: number,
    items: Array<{ item_id: string; item_name: string; quantity: number }>
  ) => {
    event('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value,
      items,
    });
  },
};

/**
 * Common User Engagement Events
 */
export const engagementEvents = {
  /**
   * Track outbound link clicks
   */
  outboundLink: (url: string, linkText: string) => {
    event('click', {
      event_category: 'outbound',
      event_label: linkText,
      url,
    });
  },

  /**
   * Track file downloads
   */
  download: (fileName: string, fileType: string) => {
    event('download', {
      file_name: fileName,
      file_type: fileType,
    });
  },

  /**
   * Track video interactions
   */
  video: (action: 'play' | 'pause' | 'complete', videoTitle: string) => {
    event('video', {
      action,
      video_title: videoTitle,
    });
  },

  /**
   * Track form submissions
   */
  formSubmit: (formName: string, success: boolean) => {
    event(success ? 'form_submit' : 'form_error', {
      form_name: formName,
      success,
    });
  },

  /**
   * Track search queries
   */
  search: (searchTerm: string, resultCount?: number) => {
    event('search', {
      search_term: searchTerm,
      result_count: resultCount,
    });
  },

  /**
   * Track newsletter signups
   */
  newsletterSignup: (source: string) => {
    event('sign_up', {
      method: 'newsletter',
      source,
    });
  },

  /**
   * Track contact form submissions
   */
  contact: (method: 'email' | 'phone' | 'form') => {
    event('contact', {
      method,
    });
  },
};

/**
 * Track scroll depth (call this when user scrolls)
 */
export const trackScrollDepth = (depth: number) => {
  event('scroll', {
    scroll_depth: depth,
  });
};

/**
 * Track time on page (call this after specific time intervals)
 */
export const trackTimeOnPage = (seconds: number) => {
  event('time_on_page', {
    seconds,
  });
};

export { GA_MEASUREMENT_ID };
