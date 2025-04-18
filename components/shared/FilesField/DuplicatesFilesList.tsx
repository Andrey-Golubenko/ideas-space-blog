import NotificationError from '~/components/notifications/NotificationError'

interface IDuplicatesFilesListProps {
  filesDuplicates: string[]
}

const DuplicatesFilesList = ({
  filesDuplicates
}: IDuplicatesFilesListProps) => {
  const duplicatedFilesNames =
    !!filesDuplicates.length && filesDuplicates.join(', ')

  const wordEnd =
    !!filesDuplicates && filesDuplicates.length > 1 ? 's' : ''

  const message = `You tried to upload file${wordEnd} with duplicated name${wordEnd}: '${duplicatedFilesNames}'`

  return (
    <div>
      <NotificationError message={message} />
    </div>
  )
}

export default DuplicatesFilesList
