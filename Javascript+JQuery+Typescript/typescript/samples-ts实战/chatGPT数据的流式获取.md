```typescript
// chatGPT 数据的流式获取
const url = 'xxx';
async function getResponse(content) {
  const resp = await fetch(url, {     // await: 获得header
    method: 'POST',
    header: { 'Content-type': 'application/json' },
    body: JSON.stringify({ content })
  });
  //const data = await resp.text();    // await: 获得body
  // console.log(data)
  // 重写 recode
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  while(1) {
    const { done, value } = await reader.read();
    if(done) {
      break;
    }
    const txt = decoder.decode(value);
    console.log(done, txt)
  }
}
```
