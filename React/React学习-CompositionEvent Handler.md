[React学习-CompositionEvent Handler](#top)

- [Example − Special Character App](#example--special-character-app)
- [Example − Emoji Picker App](#example--emoji-picker-app)
- [Example − Counting Words App](#example--counting-words-app)

-------------------------------------------------

- CompositionEvent deal with **languages** that might have accents or other complex characters. It is just like a behind-the-scenes event that helps web developers manage the text input process effectively
- Syntax

```ts
<input
   onCompositionStart={e => console.log('run on Composition Start')}
   onCompositionUpdate={e => console.log('run on Composition Update')}
   onCompositionEnd={e => console.log('run on Composition End')}
/>
```

## Example − Special Character App

```ts
const App = () => {
   const [textInput, setTextInput] = useState("");
   const handleCompositionStart = (e) => {
      console.log("Composition Start");
   };
   const handleCompositionUpdate = (e) => {    // when user type with another language keyboard
      if (e instanceof CompositionEvent) {    // Check if it is a CompositionEvent
         // Update the state
         setTextInput(e.data);
      }
   };
   const handleCompositionEnd = (e) => {
      console.log("Composition End");
   };
   const handleInput = (e) => {
      setTextInput(e.target.value);    // This event handles regular text input
   };
   return (
      <div>
         <input
            type="text"
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={handleCompositionUpdate}
            onCompositionEnd={handleCompositionEnd}
            onInput={handleInput}
         />
         <p>Text Input: {textInput}</p>
      </div>
   );
}
export default App;
```

[🚀back to top](#top)

## Example − Emoji Picker App

```ts
// defines a EmojiPicker component that fetches emoji data
// app.js
import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
const App = () => {
   const [text, setText] = useState('');
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);   
   const handleChange = (event) => {
      setText(event.target.value);
   };   
   const handleEmojiPick = (emoji) => {
      setText(text + emoji);
      setShowEmojiPicker(false);
   };   
   const handleCompositionStart = () => {
      setShowEmojiPicker(false);    // Hide emoji picker if composition starts
   };   
   const toggleEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
   };   
   return (
      <div>
         <input
            value={text}
            onChange={handleChange}
            onCompositionStart={handleCompositionStart}
         />
         <button onClick={toggleEmojiPicker}>Toggle Emoji Picker</button>
         {showEmojiPicker && <EmojiPicker onEmojiPick={handleEmojiPick} />}
      </div>
   );
}
export default App;
// EmojiPicker.js
import React, { useState, useEffect } from 'react';
const EmojiPicker = ({ onEmojiPick }) => {
   const [emojiList, setEmojiList] = useState([]);   
   useEffect(() => {
      fetch('https://api.github.com/emojis')   // Fetch emoji data from an API 
      .then((response) => response.json())
      .then((data) => setEmojiList(Object.keys(data)));
   }, []);   
   const handleEmojiClick = (emoji) => {
      onEmojiPick(emoji);
   };   
   return (
      <div className="emoji-picker">
      {emojiList.map((emoji) => (
         <button key={emoji} onClick={() => handleEmojiClick(emoji)}>
            {emoji}
         </button>
      ))}
      </div>
   );
};
export default EmojiPicker;
```

[🚀back to top](#top)

## Example − Counting Words App

- use composition events to count words in real-time

```ts
import React, { useState } from 'react';
function App() {
   const [currentText, setCurrentText] = useState('');
   const [wordCount, setWordCount] = useState(0);   
   const handleChange = (event) => {
      setCurrentText(event.target.value);
   };   
   const handleCompositionStart = () => {
      console.log('Composition Start');
   };   
   const handleCompositionUpdate = (event) => {
      if (event instanceof CompositionEvent) {
         setCurrentText(event.target.value);
      }
   };
   const handleCompositionEnd = () => {
      const words = currentText.split(/\s+/);
      setWordCount(words.filter((word) => word !== '').length);
      console.log('Composition End');
   };   
   return (
      <div>
         <h2>Word Counter</h2>
         <textarea
            value={currentText}
            onChange={handleChange}
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={handleCompositionUpdate}
            onCompositionEnd={handleCompositionEnd}
         />
         <p>Words: {wordCount}</p>
      </div>
   );
}
export default App;
```

[🚀back to top](#top)
