# Fundamentals of Web Apps
- Rule 1: always keep the developer tab open when developing web apps
  - Most important tabs are "Network" (with 'preserve log' and 'disable cache') and "Console"

## HTTP GET
- HTTP (Hypertext Transfer Protocol): the way the server and web app communicate, shown by network tab
- Network tab shows events that have happened, whether it's fetching or downloading files

#### Response headers tell us:
- The size of the response
- The time stamp of the response
- The type of response (text/html, utf-8 in the example)
  - Browser's way of knowing that it is working with an HTML page and to render the right things

#### Response tab:
```
<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created 100</p>
          <a href='/exampleapp/notes'>notes</a>
          <img src='kuva.png' width='200' />
        </div>
      </body>
    </html>
```
- Response data, in the example it's just a regular HTML page. The `body` shows the structure of what we see
- `<div>`: HTML content division element
- Inside there's a header (`h1`), a paragraph (`p`), a link (`a`) with an href to the page notes, and an image
- Because of the img tag, the browser does a second HTTP request to fetch the image kuva.png from the server
- Image rendered through the content header `Content Type: image/png`, so the browser knows to render the image

#### Sequence diagrams:
![alt text](https://fullstackopen.com/static/22b2a40c65af76b2b4b28e57d186a9af/5a190/7m.png)
- show the flow of browser --> server, and eventually i'm assuming db

## Traditional web browsers
- can serve data dynamically or statically
- are dumb, and only fetch HTML data from the server, and additional logic is on the server. 

## Running application logic on the browser
```
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/exampleapp/main.css" />
  <script type="text/javascript" src="/exampleapp/main.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notes</h1>
    <div id='notes'>
    </div>
    <form action='/exampleapp/new_note' method='POST'>
      <input type="text" name="note"><br>
      <input type="submit" value="Save">
    </form>
  </div>
</body>
</html>
```

- Instead of a hard-coded list of notes, the `<script>` portion of this code actually calls `main.js`
- `main.js` sends the `data.json()` back to the server, which is the last part of the Network tab on the page

## Event handlers and callback functions

`xhttp.onreadystatechange = function () {`
- event handler for when the `onreadystatechange` changes

## Document Object Model (DOM)
- HTML pages can be treated as tree-like structures
- Browser function is based on depicting elements of the tree 
- DOM-API: allows code-based changes of the element trees corresponding to web pages

#### Modifying the `document` object from the console
- `document`: top-most node in an HTML document
  - We can add new nodes from the console
  - Follow similar workflow to `main.js`: 
    - Get a list of notes from the page - `list = document.getElementsByTagName('ul')[0]`. `ul`: unordered list
    - Create a new li (list) element, then add some content - `newElement = document.createElement('li')`, `newElement.textContent = 'Page manipulation from console is easy'`
    - append the new element to the list - `list.appendChild(newElement)`
    - then it shows up on the page!
  - Note that the page will change temporarily, but is not persistent when reloaded. JS code always pulls from `data.json` and we're not modifying that

## CSS
- `head` element of the HTML page contains a `link` tag, which says that the browser must fetch a CSS style sheet from `main.css`
- CSS (Cascading Style Sheets) decides the visual formatting of the web page:
```
.container {
  padding: 10px;
  border: 1px solid;
}

.notes {
  color: blue;
}
```
- Two class selectors (container, notes) that define how to style certain portions of the page
  - class selector always starts with a period and contains the name of the class
- Classes are attributes that can be added to HTML elements
- You can use `Elements --> styles` to temporarily modify the style of a given page. Again, it will be reset after refresh

## Forms and HTTP Post

- `form` element: a place for user input (text, checkbox, etc) to determine some change on the page, triggered by a POST request
- In the example page, clicking "save" triggers 5 API requests
  1. `new_note`: Method: POST, Status code: 302 FOUND, location: exampleapp/notes, Content Type: text/html
    - 302 is a URL redirect --> server asks the browser to perform a new HTTP GET request to the address defined - the address *notes*
  2. So, the browser refreshes the notes page, and this causes three more HTTP requests: the same 3 we saw when we first opened the page

- The form tag `<form action="/exampleapp/new_note" method "POST">` tells us that submitting the form is done as an HTTP POST request to address `new_note`
- The server code called is an `app.post` that just pushes the new JSON note data and essentially refreshes the page
  - Each new note contains the content and date of the note
  - Server does not save the new notes to a database, so they will disappear when the server refreshes

## AJAX (Asynchronous JavaScript and XML) - obsolete
- "new revolutionary approach that enabled the fetching of content to web pages using JavaScript included within the HTML, without the need to rerender the page"
  - Before AJAX, all data had to be generated by the server

## Single page app
- More common recently - where websites don't fetch all their pages separately from the server, but only have one HTML be fetched, then manipulated with JS in the browser
- Difference between Notes page and SPA-style app is that the page still sends data to the server, and the server tells the browser to re-direct

#### SPA example
- Instead of having the API endpoint in the `<form>` tag, the form has no "action" or "method" attributes that say where to send the data
- When creating a new note, there now also only one request to the server (rather than 5)
- SPA version does not traditionally send the form data, but instead uses JS code it fetched from the server

```
// fetch a reference to the HTML form on the element of the page that has id `notes_from`
// and register an event handler to handle the form's submit event
var form = document.getElementById('notes_form')
form.onsubmit = function(e) {
  // prevent default handling (sending data to the server and causing a new GET request)
  e.preventDefault()

  // create a new note
  var note = {
    content: e.target.elements[0].value,
    date: new Date(),
  }
  
  // add to the notes list
  notes.push(note)
  e.target.elements[0].value = ''
  // rerender the note list on the page
  redrawNotes()
  // send the new note to the server
  sendToServer(note)
}
```

