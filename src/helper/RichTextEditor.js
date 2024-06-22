import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { UploadAdaptorPlugin } from "./uploadAdaptorPlugin"

const RichTextEditor=()=>{
    return (<>
    <CKEditor
        editor={ClassicEditor}
        config={{
            extraPlugins:[UploadAdaptorPlugin],
            
        }}
    >

    </CKEditor>
    </>)
}

export default RichTextEditor;