'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  ComponentPropsWithoutRef
} from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const Editor = forwardRef<
  Quill,
  ComponentPropsWithoutRef<'div'> & {
    readOnly?: boolean
    value?: string
    onTextChange?: (text: string) => void
    onSelectionChange?: (range: any, oldRange: any, source: any) => void
  }
>(
  (
    { readOnly = false, value = '', onTextChange, onSelectionChange },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const quillRef = useRef<Quill>()
    const onTextChangeRef = useRef(onTextChange)
    const onSelectionChangeRef = useRef(onSelectionChange)

    // Saving the original value
    const initial = useRef<string>(value)

    // Update of callback refs
    useEffect(() => {
      onTextChangeRef.current = onTextChange
      onSelectionChangeRef.current = onSelectionChange
    }, [onTextChange, onSelectionChange])

    // Quill initialization + first content rendering
    useEffect(() => {
      if (!containerRef.current) return

      // Creating a wrapper for the editor
      const editorDiv = document.createElement('div')
      containerRef.current.appendChild(editorDiv)

      // Initializing Quill
      const quill = new Quill(editorDiv, {
        theme: 'snow',
        readOnly
      })
      quillRef.current = quill
      if (ref && typeof ref !== 'function') ref.current = quill

      // Insert the initial HTML (the string saved before any changes)
      const delta = quill.clipboard.convert({ html: initial.current })
      quill.setContents(delta)

      // Subscribe to the changes
      quill.on('text-change', () => {
        onTextChangeRef.current?.(quill.root.innerHTML)
      })
      quill.on('selection-change', (...args) => {
        onSelectionChangeRef.current?.(...args)
      })

      return () => {
        // Cleaning at anmount
        if (ref && typeof ref !== 'function') ref.current = null
        quillRef.current = undefined
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }
    }, [])

    // Switching readOnly
    useEffect(() => {
      quillRef.current?.enable(!readOnly)
    }, [readOnly])

    // Only for dynamic updates of value **after** initialization.
    // DOES NOT touch the initial content.
    useEffect(() => {
      const quill = quillRef.current
      if (!quill) return

      const html = quill.root.innerHTML
      if (value !== html) {
        const range = quill.getSelection()
        const delta = quill.clipboard.convert({ html: value })
        quill.setContents(delta)
        if (range) quill.setSelection(range)
      }
    }, [value])

    return (
      <div
        ref={containerRef}
        className="
          [_&_.ql-container]:rounded-b-lg
          [_&_.ql-editor]:min-h-[7.5rem]
          [_&_.ql-toolbar]:rounded-t-lg
        "
      />
    )
  }
)

Editor.displayName = 'Editor'
export default Editor
