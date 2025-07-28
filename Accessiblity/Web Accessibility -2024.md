[Web Accessibility -2024](#top)

- [General](#general)
  - [Standards and Definitions](#standards-and-definitions)
  - [Accessibility principles - POUR](#accessibility-principles---pour)
  - [Accessibility Tree](#accessibility-tree)
- [Screen Readers and Assistive Technologies](#screen-readers-and-assistive-technologies)
- [Accessibility Debugging](#accessibility-debugging)
  - [Steps](#steps)
  - [Debugging tools](#debugging-tools)
  - [Working with Teams](#working-with-teams)
- [Accessible HTML](#accessible-html)
  - [Semantic HTML](#semantic-html)
  - [Setting the Language and Fixing Markup](#setting-the-language-and-fixing-markup)
- [ARIA](#aria)
  - [ARIA Attributes - Roles, States, and Properties](#aria-attributes---roles-states-and-properties)
  - [Five rules of ARIA - When to use ARIA](#five-rules-of-aria---when-to-use-aria)
  - [Tools to check support for ARIA attritues](#tools-to-check-support-for-aria-attritues)
  - [Using ARIA in CSS selectors](#using-aria-in-css-selectors)
  - [Accessible Names and Descriptions](#accessible-names-and-descriptions)
  - [Live Regions](#live-regions)
- [Focus Management](#focus-management)
  - [Keyboard focus](#keyboard-focus)
  - [Skip links](#skip-links)
  - [Active Element](#active-element)
- [Visual Considerations](#visual-considerations)
  - [Color/Visual Contrast](#colorvisual-contrast)
  - [Reflow, Zoom, Magnification](#reflow-zoom-magnification)
  - [Reducig Motion](#reducig-motion)
- [Tips](#tips)
  - [sr-only class](#sr-only-class)
  - [Alt text for CSS background images](#alt-text-for-css-background-images)

---------------------------------------------------

## General

- Accessibility ensures that all people—regardless of ability—can interact with the information or services you provide. In the digital environment, accessible software can enable a person with a vision, hearing, or other disability to participate in and contribute to the web
- Overlapping Areas
  - Search-Engine Optimization (SEO)
    - semantic structure and actual text content in it (think alternative text for images)   --> easier for search engines to detect what's on it and improve searchability
    - more anchor links   -->  the more of a network graph you create to establish credibility
  - Performance
  - Security: don't force to make a choice between access and security
  - Customer/Business growth

### Standards and Definitions

|Standards||
|---|---|
|WCAG(**W**eb **C**ontent **A**ccessibility **G**uidelines)|- org/TR/[WCAG2.2 ORG](https://www.w3.org/TR/WCAG22/)<br>- [WCAG on GitHub](https://github.com/w3c/wcag)|
|ARIA(**A**ccessible **R**ich **I**nternet **A**pplications)|- [ARIA1.2 on github](https://github.com/w3c/aria)<br>- [ARIA in HTML](https://www.w3.org/TR/html-aria/)<br>- [older classic "Rules of ARIA use"](https://www.w3.org/TR/using-aria/)|
|Normative vs. non-normative|- **Normative** references are typically references to established standards previously published by recognized groups or to work in parallel in W3C. These references are used for measuring compliance<br>- **Non-normative** material is meant to be informative, developed under a variety of processes, copyrights, and patent policies. They were not approved for compliance|
|A11y (numeronym for accessibility)|There are 11 letters between the letters A and Y in accessibility, and this shorthand version has historically been helpful on social media platforms and in accessibility culture|

### Accessibility principles - POUR

- [POUR](https://www.w3.org/WAI/fundamentals/accessibility-principles/) — **P**erceivable, **O**perable, **U**nderstandable, and **R**obust
- **P**erceivable: users must be able to perceive all essential information on the screen, and it must be conveyed to multiple senses
- **O**perable:
  -  users must be able to perceive all essential information on the screen, and it must be conveyed to multiple senses, such as
  - Adding text alternatives to all non-decorative images and essential icons
  - Adding captions, transcripts, and audio descriptions to videos
  - Ensuring color is not the only method of conveying meaning
- **U**nderstandable:
  - users must be able to operate the digital product's interface. The interface cannot require interaction that a user cannot perform, such as
  - Adding keyboard and touchscreen support to all active elements.
  - Ensuring slideshows and videos have all of the necessary controls available
  - Giving users enough time to fill out a form or a method to extend the time
- **R**obust:
  - supporting assistive technologies and ensuring that, as devices and user agents evolve, the digital product remains accessible, such as
  - Test keyboard-only navigation.
  - Test with different screen reader technologies.
  - Ensure all of the content and functions can be accessed, regardless of device size or orientation

### Accessibility Tree

- Browsers create an **accessibility tree** based on the <mark>DOM tree</mark>, which is used by platform-specific <mark>Accessibility APIs</mark> to provide a representation that can be understood by assistive technologies, such as screen readers
- ![Accessibility Tree](accessibility-tree.png)
- It contains information about the hierarchy of accessible nodes, roles, accessible names, states, and more
- four properties in an accessibility tree object(**Accessibility Object Model-AOM**)
  - name
  - description
  - role
  - state
- https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree

[⬆ back to top](#top)

## Screen Readers and Assistive Technologies

- a type of Assistive Technology (AT): through text-to-speech
- Primary Screen Reader
  - <mark>VoiceOver</mark> for MacOS(built-in)
  - <mark>NNVDA</mark> and JAWS for Windows
  - <mark>TalkBack</mark>/Deque/Evinced for Android
- [WebAIM's screen readers survey data](https://webaim.org/projects/screenreadersurvey9/)

|Screen Reader|toggle on/off command|cheat sheet|
|---|---|---|
|VoiceOver for Mac|Fn Command (⌘) F5|[desktop cheat sheet](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
|VoiceOver for iOS|- 'Settings' --> 'Accessibility' to set up VoiceOver<br> - Switch Control to launch with a triple tap of the power button|[iOS cheat sheet](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)|
|NVDA|Control + Alt + N/Insert + Q|[NVDA cheat sheet](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)|
|JAWS|Ins + ⬇️|[JAWS cheat sheet](https://dequeuniversity.com/assets/pdf/screenreaders/jaws.pdf)|
|TalkBack||[TalkBack cheat sheet](https://dequeuniversity.com/screenreaders/talkback-shortcuts)<br>[Tips for testing with Android](https://developer.android.com/guide/topics/ui/accessibility/testing)|

- [Setting up NVDA on Parallels with macOS](https://jerryjones.dev/2020/08/06/setting-up-nvda-on-parallels-with-macos/)

[⬆ back to top](#top)

## Accessibility Debugging

### Steps

test a site for accessibility on a regular basis
1. ⌨Use your Tab key to navigate through the page.
     - Can you reach and operate every interactive control (button, link, dropdown, etc.)?
     - Can you see where your focus point is on screen?
     - Do you get trapped anywhere that you can't escape, or behind a modal layer?
     - Can you use other common key commands like the Arrow keys, Escape key, Space key?
2. 💻Open a browser DevTools extension like Axe for Chrome, Firefox, or Edge.
     - Run the extension for each page state, including open modals and menus.
     - Debug issues using the Elements inspector, Styles, and Accessibility panes in Chrome.
     - Prioritize accessibility violations over best practices
3. 🔎Zoom the page in your browser to at least 200%.
     - Make sure layouts reflow and components are still operable.
4. Test other visual modes.
     - Test light and dark mode. Windows High Contrast Mode can be helpful, too.
     - Ensure animation and motion can be turned off with Reduced Motion.
5. 🗣️Run a screen reader like VoiceOver or NVDA.
     - Follow cheat sheets to use common commands.
     - Double-check that an issue is really an issue, as it could be operator error!
     - Work with people who use screen readers regularly whenever possible.
6. 📝Gather missing transcripts or captions.
     - Make note of any missing transcripts, captions, and other alternative content.
     - Ensure media players and pages can accommodate this content.
- Accessibility Statements
  - Make it possible to receive user feedback for accessibility with an [Accessibility Statement](https://www.w3.org/WAI/planning/statements/)

### Debugging tools

|tools||
|---|---|
|**Built-in Browser DevTools**|- <mark>Chrome</mark>: Elements inspector, Styles pane, Accessibilty Information Tab, Responsive Device Toolbar, Lighthouse, and Console<br>- <mark>Firefox</mark>: color picker(has a contrast ratio inspectorCSS), flexbox, grid layout visualizer<br>- <mark>Safari</mark>: Accessibility inspector, Audit feature, and Responsive Design Mode, for desktop Safari, you can also debug mobile Safari webpages.|
|**Chrome Lighthouse**|Tool built-into Chrome that includes categories on Performance, Accessibility, Best Practices, SEO, and Progressive Web Apps. The accessibility section uses the **axe-core JavaScript API** and other rules to return|
|**Browser Extensions**|- [Axe by Deque Systems- Chrome](https://www.deque.com/axe/devtools/)<br>- [Accessibility Insights for Web- Microsoft](https://accessibilityinsights.io/docs/web/overview/)<br>- [The Web Developer Toolbar- Firefox and Chrome](https://chrispederick.com/work/web-developer/)<br>- [Headings Map](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?pli=1)|
|ESLint and other text editor plugins|- [ESLint-Plugin-JSX-A11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y): a standard eslint plugin for React applications<br>- [Axe Linter](https://www.deque.com/axe/devtools/linter/): tooling suite from Deque including GitHub actions and other integrations|

1. Axe by Deque Systems
   - You can check the rendered source of a page at runtime, and again with components opened or active to surface more issues.
   - Observe the labels and tags for issues returned, including WCAG violations versus optional best practices.
   - Debug issues by clicking through to source elements and highlighting nodes.
   - The [axe-core engine](https://github.com/dequelabs/axe-core) powers other free and paid tools for the Software Development Lifecycle, so it can provide some nice consistency in larger organizations.
2. Accessibility Insights for Web from Microsoft
   - It uses the axe-core automation engine under the hood, along with its own manual evaluation tools.
   - I like the Tab Stops tool for visualizing the keyboard tab order.
3. The Web Developer Toolbar for Firefox and Chrome
   - The Headings visualizer under Information --> View Document Outlineshows the overall heading structure in a useful way

### Working with Teams

- <mark>Make accessibility part of the definition of done</mark>
  - Investigate how accessibility is handled in UI development. Aim to have accessibility requirements listed up front to spread the skill-building around
  - When accessibility issues are found in development and testing, solve them in place where possible. For larger issues, open issues in the backlog to be prioritized and fixed
  - Break problems down into smaller, solvable parts and phases. Is there a simpler way to build something for an earlier phase?
  - There is a need for accountability up the leadership chain. Who takes responsibility if an inaccessible product is the subject of a lawsuit? Can you provide honest assessments of the job to be done with accessibility when the blocker is in design or product management?
- <mark>Surface accessibility issues in Pull Requests</mark>
  - PR Reviews are an excellent time to provide accessibility feedback. Perhaps you or your teammate forgot to do some manual checks, or perhaps your automated tooling missed something. It might not always be convenient, but this is what review cycles are for. Normalize thorough and effective code reviews!
  - Advocate for deploy preview URLs as infrastructure to make it easier to review UIs in a browser. This makes testing in general easier for reviewers, but particularly for regular accessibility testing.
  - Make time for blocking accessibility fixes during review cycles wherever possible and file new tickets in the backlog if something is too large to solve in the current cycle
- <mark>Use consistent tooling and processes across an organization</mark>
  - Share your process with your teammates to gain some consistency and spread the accessibility knowledge around
  - For more mature development and accessibility teams, using the same tools and auditing rulesets will help to solidify consistent issues and processes. It’s worth mentioning that many teams also use multiple tools

[⬆ back to top](#top)

## Accessible HTML 

- [structural elements](https://www.w3.org/WAI/tutorials/page-structure/)
- [Content structure](https://web.dev/learn/accessibility/structure)
  
### Semantic HTML

- Landmarks elments
  - Landmarks ensure content is in navigable regions
  - Use `aria-label` or `aria-labelledby` to give unique labels to nav and section elements
  - [ARIA and HTML landmarks](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/landmark_role#best_practices)
  - [landmarks browser support](https://stevefaulkner.github.io/HTML5accessibility/)
- Headings
  - Use h1-h6 headings to create an overall page outline
  - Avoid the [HTML5 heading algorithm](https://html5doctor.com/computer-says-no-to-html5-document-outline/) as it was never implemented for Assistive Tech (AT)
- Lists
  - `ul, li, ol, dl, dt, dd`
  - `<ul role="list"> <!-- add the list role to the <ul> -->`: [Safari might need a little help - "Fixing" Lists](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html)
- Forms
  - `<form>` `<fieldset>` and` <legend>`
  - Labels are essential for inputs/textareas/etc. in AT
  - Explicit labels use for and id. Implicit is when a label wraps an input
- Buttons and Links
  - HTML buttons give a lot of behavior for free: focusability, built-in role, and keyboard click events.
  - Links also have a ton of built-in behavior, like history
  - Links need href to be keyboard accessible
  - Buttons toggle things, while links navigate
- Details and Summary
  - HTML details and summary elements are a built-in accordion-style disclosure widget

|HTML landmark element	|ARIA landmark role|
|---|---|
|`<header>`	|banner|
|`<aside>`|	complementary|
|`<footer>`|	contentinfo|
|`<nav>`|	navigation|
|`<main>`|	main|
|`<form>`| 	form|
|`<section>`| region|

```html
<header>
    <nav>...</nav>
</header>
<main>
    <section aria-label="Introduction to stamp collecting">
      <p>Stamp collecting, also known as philately, is
    the study of postage stamps, stamped envelopes,
    postmarks, postcards, and other materials relating
    to postal delivery.</p>
    </section>
</main>
<footer>
<p>© 2022 - Stamps R Awesome</p>
</footer>
```

### Setting the Language and Fixing Markup

- `<html lang="en">`
- Element level vs. page level language

```html
<html lang="en">
    <body>
        <p lang="fr"></p>
    </body>
</html>
```

[⬆ back to top](#top)

## ARIA

- <mark>**A**ccessible **R**ich **I**nternet **A**pplications</mark>
- The current version of ARIA (as of Winter 2023) is **1.2**: https://www.w3.org/TR/wai-aria-1.2/
- docs
  - The [WAI-ARIA standard](https://www.w3.org/TR/wai-aria-1.2/) from the W3C itself is the best source of truth
    - [ARIA is also developed in the open on GitHub](https://github.com/w3c/aria) where you can search the archives and ask new questions.
  - [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) is a great resource for learning about ARIA as they seem to care about keeping things up to date
  - [Web.dev](https://web.dev/articles/semantics-aria?hl=en) also has some great ARIA information.
  - [HTML5 Doctor](https://html5doctor.com/) has historically included some helpful details about ARIA and HTML that could aid in understanding

### ARIA Attributes - Roles, States, and Properties

- The [ARIA specification](https://www.w3.org/TR/wai-aria-1.2/) details all of the concepts and details of attributes

### Five rules of ARIA - When to use ARIA

- [five rules of ARIA](https://www.w3.org/TR/using-aria/)

|rule|👎Don't|👍Do|
|---|---|---|
|Rule 1: Don't use ARIA|`<a role="button">Submit</a>`|`<button>Submit</button>`|
|Rule 2: Don't add (unnecessary) ARIA to HTML|`<h2 role="tab">Heading tab</h2>`|`<div role="tab"><h2>Heading tab</h2></div>`|
|Rule 3: Always support keyboard navigation|`<span role="button" tabindex="1">Submit</span>`|Set the tabindex to 0<br>`<span role="button" tabindex="0">Submit</span>`|
|Rule 4: Don't hide focusable elements|`<div aria-hidden="true"><button>Submit</button></div>`|`<div><button>Submit</button></div>`|
|Rule 5: Use accessible names for interactive elements|||

### Tools to <mark>check</mark> support for ARIA attritues
  
1. Check [A11ySupport.io](https://a11ysupport.io/) to see if the attribute is listed
2. Test it in the screen readers that are [commonly used](https://webaim.org/projects/screenreadersurvey9/#browsercombos) with your most popular browsers.
3. Read up on mailing lists like the [WAI-ARIA GitHub](https://github.com/w3c/aria/issues), [NVDA GitHub](https://github.com/nvaccess/nvda/issues) and [WebAIM Email Archives](https://webaim.org/discussion/)

### Using ARIA in CSS selectors
### Accessible Names and Descriptions

- The text content or value exposed from a default button, link, form input, or even a heading is referred to as an <mark>“accessible name”</mark>
- Text exposed on an element with a title attribute is called an <mark>“accessible description”</mark>
- **Aria-label, aria-labelledby, aria-describedby**
- DevTools for labeling: <mark>Chrome Accessibility Inspector</mark> in DevTools

### Live Regions

- Dynamic content which updates without a page reload is generally either a region or a widget
- create ARIA live regions
  - role attribute, such as `role="status"`, `role="log"` or `role="alert"`
  - make any other role into a live region with property attributes: `aria-live="polite"` or `aria-live="assertive"`
  - put a CSS class on a live region to hide it visually while still technically rendering it accessible to Assistive Technology
- [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

[⬆ back to top](#top)

## Focus Management

### Keyboard focus

- principles
  1. Can I navigate to and operate all interactive controls?
  2. Can I see where my focus point is on the screen?
  3. Is my focus moved into new content and restored when tasks are complete?
- <mark>Focus order - Tabindex</mark>: or called tab or navigation order
  - **begin with** elements that have a positive tabindex -->
  - **moves from** the smallest positive number **to** the largest (such as 1, 2, 3) -->
  - then **proceeds through** elements with a tabindex of zero
  - **note**: a <mark>**negative</mark> tabindex <mark>(tabindex="-1")**</mark>: is unfocusable
- [web.dev Keyboard focus](https://web.dev/learn/accessibility/focus)

### Skip links

### Active Element

[⬆ back to top](#top)

## Visual Considerations

### Color/Visual Contrast

### Reflow, Zoom, Magnification

### Reducig Motion


[⬆ back to top](#top)

## Tips

### sr-only class

- In React, the `sr-only` class is applied to elements to make them visually hidden from sighted users while remaining accessible to screen readers and other assistive technologies
- `.visually-hidden`: bootstrap
- `aria-hidden="true"` to an element and `tabIndex="-1"`

### Alt text for CSS background images

- Skipping over images with empty `alt=""`
- [W3C’s Alt Decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- **APIs or tools for generating alt text**
  - https://alttext.ai/
  - https://www.sentisight.ai/automated-alt-text-api/

```html
<!-- tip: using visually-hidden css class-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Home</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <style type="text/css">
      .visually-hidden {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }
      .dog-image {
        background-size: contain;
        background-repeat: no-repeat;
        height: 600px;
        width: 600px;
      }
    </style>
  </head>
  <body>
    <div style="background-image: url(https://assets.codepen.io/68133/dog-breed-graph.jpg);" role="img" class="dog-image" aria-labelledby="dog-background-text">
      <div class="visually-hidden" id="dog-background-text">
        <h2>Most popular licensed dog breeds in town</h2>
        <p>Source: Hutchinson Police Department</p>
        <p>Graph with six bars, showing different dog breeds: Labrador retriever, at 54; Mixed breed, at 36; Chihuahua, at 20; Shih-tzu, at 19; German Shepard, at 14; and Golden Retriever, at 13. </p>
      </div>
    </div>
  </body>
</html>
```

[⬆ back to top](#top)

> References
- [Web Accessibility v3](https://web-accessibility-v3.vercel.app/topics)
- https://github.com/marcysutton/frontend-masters-web-accessibility-v3
- [Enterprise Accessibility](https://enterprise-accessibility.vercel.app/topics)
- https://github.com/marcysutton/frontend-masters-enterprise-accessibility

| Resources||
|---|---|
|Study||
|[Learn Accessibility](https://web.dev/learn/accessibility)|
