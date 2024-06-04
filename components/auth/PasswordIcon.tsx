import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

interface IPasswordIconProps {
  showPassword: boolean
  iconClick: () => void
}

const PasswordIcon = ({ showPassword, iconClick }: IPasswordIconProps) => (
  <span className="absolute right-4 flex h-6 w-6 cursor-pointer select-none items-center justify-center">
    {showPassword ? (
      <IoEyeOutline className="h-6 w-6" onClick={iconClick} />
    ) : (
      <IoEyeOffOutline className="h-6 w-6" onClick={iconClick} />
    )}
  </span>
)

export default PasswordIcon
