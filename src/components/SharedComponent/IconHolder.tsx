import {ReactElement} from "react"
import {IconType} from "react-icons"

function HeaderIcon({
  Icon,
  active,
  IconSolid,
}: {
  active: boolean
  Icon: IconType
  IconSolid: IconType
}) {
  return (
    <div
      className={`select-none relative flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl  ${
        active ? "border-purple-500" : ""
      } group`}
    >
      <IconSolid
        size={24}
        className={`h-7  text-gray-500 text-center sm:h-7 mx-auto group-hover:text-purple-500 ${
          active ? "text-purple-500" : ""
        } `}
      />
    </div>
  )
}

export default HeaderIcon
