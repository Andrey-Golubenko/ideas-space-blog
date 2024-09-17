import { useCallback, useEffect, useState } from 'react'
import { getImageNameFromUrl, urlToFile } from '~/utils/helpers/helpers'

export const useLoadFilesFromUrls = (imageUrls: string[]) => {
  const [editPostState, setEditPostState] = useState({
    prevFiles: [] as File[],
    success: undefined as string | undefined,
    error: undefined as string | undefined,
    filesLoaded: false
  })

  const loadFilesFromUrls = useCallback(async (urls: string[]) => {
    const imageFiles: File[] = []

    const filesPromises = urls?.map((url) => {
      const fileName = getImageNameFromUrl(url) || ''
      return urlToFile(url, fileName)
    })

    const loadResults = await Promise.allSettled(filesPromises)

    loadResults.forEach((result) => {
      if (result.status === 'rejected') {
        setEditPostState((prevState: any) => {
          return {
            ...prevState,
            error: result.reason
          }
        })
        return null
      }

      return imageFiles.push(result.value.success!)
    })

    setEditPostState((prevState: any) => {
      return {
        ...prevState,
        prevFiles: imageFiles,
        filesLoaded: true
      }
    })
  }, [])

  // Uploading files
  useEffect(() => {
    if (imageUrls?.length) {
      loadFilesFromUrls(imageUrls)
    }
  }, [imageUrls, loadFilesFromUrls])

  return { editPostState }
}
