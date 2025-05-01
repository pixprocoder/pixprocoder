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
      <SelectTrigger className="w-[100px] md:w-[180px] border border-gray-800">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent className="border border-gray-800">
        <SelectGroup className="bg-background text-foreground">
          <SelectLabel>Technology</SelectLabel>
          <SelectItem value="React.js">React.js</SelectItem>
          <SelectItem value="Node.js">Node.js</SelectItem>
          <SelectItem value="Next.js">Next.js</SelectItem>
          <SelectItem value="HTML">HTML</SelectItem>
          <SelectItem value="CSS">CSS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategoryPage;
