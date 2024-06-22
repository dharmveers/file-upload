const API_URL="http://localhost:8000/upload/image"


export function UploadAdaptorPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter=(loader)=>{
        return new UploadAdapter(loader,API_URL);
    }
}

class UploadAdapter {
    constructor(loader, url) {
        this.loader = loader;
        this.url = url;
    }

    upload() {
        return this.loader.file.then((file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('upload', file);

                fetch(this.url, {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        resolve({data});
                    })
                    .catch((error) => {
                        reject(error.message);
                    });
            });
        });
    }
}