function fileListFrom(files){
  const b = new ClipboardEvent("").clipboardData || new DataTransfer()
  for (const file of files) b.items.add(file)
  return b.files
}
export default fileListFrom;
// const fileList = fileListFrom([
//   new File(['content'], 'sample1.txt'),
//   new File(['abc'], 'sample2.txt')
// ])
