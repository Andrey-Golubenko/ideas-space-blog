'use client'

import { useEffect, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'
import { Modal } from '~/components/ui/modal'

interface IAlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
  modalTitle?: string
  modalDescription?: string
}

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  modalTitle = 'Are you sure?',
  modalDescription = 'This action cannot be undone.'
}: IAlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title={modalTitle}
      description={modalDescription}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-6 pt-6">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          {loading ? (
            <div className="flex items-center">
              <ReloadIcon className="mr-4 h-5 w-5 animate-spin" />
              <span>Deleting</span>
            </div>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
