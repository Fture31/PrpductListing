import { LucideIcon } from "lucide-react"

interface ButtonProps{
  onClick?: ()=>void,
  title?: string,
  containerStyles? :string
  Icon?: LucideIcon,
  colorIcon?: string
}


export const Button = ({ onClick, containerStyles, title, Icon, colorIcon }: ButtonProps) => {
  return (
    <div
      className={`${containerStyles} h-10 w-40 bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center rounded-full text-center gap-2 px-4 cursor-pointer`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4 bg-white-600 text-white " stroke={colorIcon || "#000"} />}
      <span className="font-medium">{title}</span>
    </div>
  )
}
