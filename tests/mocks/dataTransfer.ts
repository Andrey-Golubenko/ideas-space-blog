/* eslint-disable no-underscore-dangle */
import { MockFileList } from './fileList'

export class MockDataTransfer {
  private _files: File[] = []

  get items() {
    return {
      add: (file: File) => {
        this._files.push(file)
      },
      clear: () => {
        this._files = []
      },
      length: this._files.length
    }
  }

  get files() {
    return new MockFileList(this._files) as unknown as FileList
  }
}
