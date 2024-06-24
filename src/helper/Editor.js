import React, { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const Editor = () => {
    const [data, setData] = useState('');
    const editor = useRef(null);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const buttons = [
        "undo", "redo", "|", "bold", "strikethrough", "underline", "italic", "|",
        "superscript", "subscript", "|", "align", "|", "ul", "ol", "outdent", "indent",
        "|", "font", "fontsize", "brush", "paragraph", "|", "image", "link", "table",
        "|", "hr", "eraser", "copyformat", "|", "fullsize", "selectall", "print", "|", "source"
    ];

    const editorConfig = useMemo(() => ({
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: "en",
        toolbarButtonSize: "medium",
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        buttons: buttons,
        uploader: {
            url: "http://localhost:8080/upload/image",
            withCredentials: false,
            pathVariableName: 'path',
            format: 'json',
            method: 'POST',
            prepareData: function (formData) {
                var file = formData.getAll("files[0]")[0];
                formData.append("file", file);
                formData.delete('files[0]');
                formData.delete('path');
                formData.delete('source');
                return formData;
            },
            isSuccess: function (resp) {
                return !resp.error;
            },
            getMessage: function (resp) {
                return resp.msgs.join("\n");
            },
            process: function (resp) {

                return resp;
            },
            defaultHandlerSuccess: async function (data, resp) {
                const imageUrl = data.baseUrl;
                if (editor.current) {
                    this.selection.insertImage(imageUrl);
                }
            },
        },
    }), []);

    return (
        <JoditEditor
            ref={editor}
            value={data}
            config={editorConfig}
            onChange={(newContent) => setData(newContent)}
        />
    );
};

export default Editor;
