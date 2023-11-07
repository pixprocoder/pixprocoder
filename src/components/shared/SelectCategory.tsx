import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectCategoryPage = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-black text-white">
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
