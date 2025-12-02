```ts
const messagesRef = React.useRef<any>(null);
useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
}, [messages]);
//
<div ref={messagesRef}> ... </div>
```
