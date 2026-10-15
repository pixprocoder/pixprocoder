'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { blogListHref } from '@/src/lib/blog-listing';
import { useRouter } from 'next/navigation';

type TagOption = {
  value: string;
  label: string;
  count: number;
};

export function BlogFilters({
  tags,
  activeTag,
}: {
  tags: TagOption[];
  activeTag?: string;
}) {
  const router = useRouter();
  const value = activeTag ?? 'all';

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        router.push(
          blogListHref({
            tag: next === 'all' ? undefined : next,
          }),
        );
      }}
    >
      <SelectTrigger className="h-11 w-full rounded-xl border-border bg-background text-sm sm:w-56">
        <SelectValue placeholder="All topics" />
      </SelectTrigger>
      <SelectContent className="border-border bg-background">
        <SelectItem value="all">All topics</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.value} value={tag.value}>
            {tag.label}
            <span className="ml-2 text-muted-foreground">{tag.count}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
