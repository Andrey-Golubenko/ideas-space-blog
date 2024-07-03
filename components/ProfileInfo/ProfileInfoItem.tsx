interface IProfileInfoItemProps {
  label: string
  item?: string | null | React.ReactElement
}

const ProfileInfoItem = ({ label, item }: IProfileInfoItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
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
