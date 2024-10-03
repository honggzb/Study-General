[image-ai](#top)

- [AI image generator](#ai-image-generator)
- [图片格式转换](#图片格式转换)
- [拖拽上传](#拖拽上传)

---------------------------------------------------

```
   project     |       Tech Stack       |     function           |  implementation
---------------|------------------------|------------------------|--------------------------
               | @clerk/nextjs          | authentication         | login/logout auth
               | Shadcn ui              | ui library             | toggle theme
               | OpenAI(DALL-E-3)       | AI image generator     |
image-ai       | Sharp, pdf-lib         | image format transform |
               | jszip, file-saver      | image zip download     | package files
               | react-dropzone         | drag/drop upload files |
               | Axios                  | http request           |
```

- `npx create-next-app@latest`
- `npx shadcn@latest init`
- `npx shadcn@latest add input button textarea sheet`

```
├── 📂app/
│   ├── 📂ai-image-generator/
│   │    └── 📄page.tsx
│   ├── 📂image-format-convert/
│   │    └── 📄page.tsx
│   ├── 📂api/
│   │    ├── 📂convert/
│   │    │   └── 📄route.ts
│   │    ├── 📂generate-image/
│   │    │   └── 📄route.ts
│   │    └── 📂generate-prompt/
│   │        └── 📄route.ts 
│   ├── 📂image-compress/
│   │    └── 📄page.tsx
│   ├── 📂image-format-convert/
│   │    └── 📄page.tsx
│   ├── 📂image-resize/
│   │    └── 📄page.tsx
│   ├── 📂svg-generator/
│   │    └── 📄page.tsx
│   ├── 📂text-card-generator/
│   │    └── 📄page.tsx
│   ├── 📄globals.css
│   ├── 📄layout.tsx
│   └── 📄page.tsx                       - home page
├── 📂 components/
│   │    ├── 📂card/
│   │    │      └── 📄main-card.tsx
│   │    ├── 📂nav/
│   │    │      ├── 📄mobile-nav.tsx
│   │    │      ├── 📄side-nav.tsx
│   │    │      ├── 📄theme-toggle.tsx
│   │    │      └── 📄top-nav.tsx
│   │    └── 📂ui/
│   ├── 📄loadingSpinner.tsx
│   └── 📄theme-provider.tsx             - theme toggle provider
├── 📄 middleware.ts                     - clerkMiddleware
```

## AI image generator

- https://openai.com/index/dall-e-3/

```ts
// app\api\generate-image\route.ts
async function makeRequest(prompt: string, retries = 3) {
  try {
    const client = new OpenAI();
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024"
    });
    return response?.data[0].url;
  } catch (error) {
    console.error('Image generation error:', error);
  }
}
```

## 图片格式转换

- [sharp](https://sharp.pixelplumbing.com/)
- [pdf-lib](https://github.com/Hopding/pdf-lib)
- 'app\api\convert\route.ts'

[⬆ back to top](#top)

## 拖拽上传

- https://react-dropzone.js.org/#!/Examples
- https://react-dropzone.js.org/

```ts
// app\image-format-convert\page.tsx
const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => file.size <= MAX_FILE_SIZE).slice(0, MAX_FILES);
    if (validFiles.length < acceptedFiles.length) {
      setError(`${MAX_FILES} files exceed 10MB or the number of files, filtered automatically`);
    }
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': supportedFormats.filter(format => format !== 'pdf').map(format => `.${format}`),
      'application/pdf': ['.pdf']
    },
    maxSize: MAX_FILE_SIZE
});
<section {...getRootProps()}>
  <input {...getInputProps()} />
    <p>
      {isDragActive ? 'Release the file for upload' : 'Drag and drop files here, or click to select files'}
    </p>
    <Button>Choose files</Button>
</section>
```

[⬆ back to top](#top)

> References
- image-ai
- https://github.com/alchaincyf/img2046/tree/main
- https://www.img2046.com
