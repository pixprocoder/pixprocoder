import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

type Props = {
  children?: React.ReactNode;
  title?: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  bgColor?: string;
  textColor?: string;
  href?: string;
  value?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type,
  bgColor,
  textColor,
  href,
  value,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
      className={`  gap-3 px-4 py-3 font-montserrat font-bold 
      ${textColor || "text-white"}
      ${bgColor || "bg-[#0084FF]"} rounded-xl  max-md:w-full
      `}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {href && <Link href={href}>{value}</Link>}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
