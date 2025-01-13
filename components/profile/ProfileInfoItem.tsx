interface IProfileItemProps {
  label: string
  item?: string | null | React.ReactElement
}

const ProfileInfoItem = ({ label, item }: IProfileItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-1.5 shadow-sm lg:p-3 ">
      <p className="text-sm font-medium">{label}</p>
      {typeof item === 'object' ? (
        item
      ) : (
        <div className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
          {item}
        </div>
      )}
    </div>
  )
}

export default ProfileInfoItem
