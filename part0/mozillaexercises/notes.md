# HTML

## What is HTML?

*markup language* to wrap "elements" in a tree-like structure to have it behave in a certain way

```
<p>Instructions for life:<p>
<ul>
  <li>Eat</li>
  <li>Sleep</li>
  <li>Repeat</li>
<ul>
```

- `<p>` for paragraph, `<li>` for the three bullet points
- HTML can make text/images link to other web pages, embed images/videos, create data tables, etc

## First website

`exercise0.1/index.html`:

# CSS

- style sheet language - used to style HTML elements

## CSS is all about boxes
- Most HTML pages can be thought of boxes that sit on top of (or alongside) other boxes: the box model 
  - padding: space around the content or paragraph text
  - border: line outside the padding
  - margin: space outside the header

# Web forms
- one of the main points of interaction between a user and website/app
- allows users to enter data

## `<form>` element
- defines a form. default behavior is to at least set `action` and `merhod` attributes
  - `action`: location where the collected data should be sent
  - `method`: which HTTP method to send the data (GET or POST)