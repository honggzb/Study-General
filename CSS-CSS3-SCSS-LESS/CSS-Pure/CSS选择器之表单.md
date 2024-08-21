- focus时候背景改变: `:focus-within`
- focus时候加*号:  `:has(+input[data-required])::after`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .form-container {
      width: 50%;
      margin: 10% auto;
    }
    .txt:focus {
      border-color: blue;
    }
    .form-block {
      transition: 0.5s;
      padding: 10px;
    }
    .form-block:focus-within {
      background-color: #eee;
    }
    .label span:has(+input[data-required])::after {
      content: '*';
      color: #f40;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <div class="form-block">
      <label class="label">
        <span>Name</span>
        <input data-required type="text" class="txt">
      </label>
    </div>
    <div class="form-block">
      <label class="label">
        <span>Address</span>
        <input data-required type="text" class="txt">
      </label>
    </div>
  </div>
</body>
</html>
```
