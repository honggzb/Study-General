## High Contrast 

- The Web Content Accessibility Guidelines (WCAG) recommend
  - A minimum contrast ratio of **4.5:1** for normal text: Black text (#000000) on a white background (#FFFFFF) has a contrast ratio of 21:1
  - **3:1** for large text (18pt and larger): 
  - Higher ratios (e.g., 7:1) for enhanced accessibility
- [WebAIM’s Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Define Accessible Colors in Tailwind

```
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        highContrast: {
          background: "#1a1a1a", // Dark gray
          text: "#ffffff", // White
          primary: "#ffcc00", // Bright yellow
          secondary: "#0077cc", // Bright blue
        },
      },
    },
  },
};
```

## use High-Contrast in component

```html
<div className="bg-highContrast-background text-highContrast-text p-6 rounded-lg shadow-lg">
   <h1 className="text-2xl font-bold">High-Contrast Accessible Card</h1>
   <p className="mt-2 text-highContrast-text">
        This card is styled with high-contrast colors to ensure readability for all users.
   </p>
   <button className="bg-highContrast-primary text-highContrast-background px-4 py-2 rounded mt-4">
        Learn More
   </button>
</div>
```

