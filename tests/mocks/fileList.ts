export class MockFileList {
  private files: File[]

  constructor(files: File[]) {
    this.files = files
  }

  item(index: number) {
    return this.files[index]
  }

  get length() {
    return this.files.length
  }
}
