import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SelectCategoryPage = () => {
  return (
    <Select>
      <SelectTrigger className="w-[120px] md:w-[200px] border-border bg-muted/10 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider h-10 rounded-xl">
        <SelectValue placeholder="All_Categories" />
      </SelectTrigger>
      <SelectContent className="border-border bg-background font-mono text-[10px] md:text-xs">
        <SelectGroup>
          <SelectLabel className="text-muted-foreground uppercase tracking-tighter border-b border-border mb-2 pb-1">Filter_by_Stack</SelectLabel>
          <SelectItem value="React.js" className="cursor-pointer hover:text-primary transition-colors">./react_js</SelectItem>
          <SelectItem value="Node.js" className="cursor-pointer hover:text-primary transition-colors">./node_js</SelectItem>
          <SelectItem value="Next.js" className="cursor-pointer hover:text-primary transition-colors">./next_js</SelectItem>
          <SelectItem value="HTML" className="cursor-pointer hover:text-primary transition-colors">./html_core</SelectItem>
          <SelectItem value="CSS" className="cursor-pointer hover:text-primary transition-colors">./css_styles</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategoryPage;
