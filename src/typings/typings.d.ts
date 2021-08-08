declare module 'ckeditor4-react' {
  const CKEditor: React.FC<CKEDITOR>

  export default CKEditor
}

interface CKEDITOR {
  [key: string]: unknown
}
