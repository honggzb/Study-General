[React学习-upload files](#top)

- [upload single file](#upload-single-file)
- [Uploading multiple files](#uploading-multiple-files)

--------------------------------------------------------------------

### upload single file

```ts
import { useState } from 'react';
function FileUploadSingle() {
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { setFile(e.target.files[0]); }
  };
  const handleUploadClick = () => {
    if (!file) { return; }
    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
export default FileUploadSingle;
```

### Uploading multiple files

```ts
import { ChangeEvent, useState } from 'react';
function FileUploadMultiple() {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };
  const handleUploadClick = () => {
    if (!fileList) { return; }
    // 👇 Create new FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    // 👇 Uploading the files using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];
  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <ul>
        {files.map((file, i) => (
          <li key={i}> {file.name} - {file.type} </li>
        ))}
      </ul>
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
export default FileUploadMultiple;
```

> [How to Upload Files With React](https://codefrontend.com/file-upload-reactjs/)

[⬆ back to top](#top)
