// Example 1: showing that React components can contain JS code

// For functions, we use arrow functions
/* 
const App = () => {
  // a reminder to keep the console open 
  console.log('Hello from component')
  // JS can be written inside the React component
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a+b);
  return (
    <div>
      <p>Hello world</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
*/

// Example 2: multiple components

/* 
- writing components is easy, and writing multiple allows us to combine them to keep a complex app simple
- core philosophy of React is utilizing multiple reusable components
- strong convention is the idea of a root component called App at the top of the tree
- make sure React component names are capitalized
*/

/* Error Example: code that breaks
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}

- nothing appears on the screen. this is why the console needs to stay open.
  - "Objects are not valid as React child"
  - `friends[0]` contains `{ name: 'Peter', age: 4 }`
  - in React, the things rendered in braces must be primitive values (strings/numbers)

Fix: 
- use `friends[0].name friends[0].age` to render the same things. since they're strings they can be rendered

Note:
- React allows arrays to be rendered if their items are primiive.
- if friends = ['Maya', 'Peter'], we can just render {friends}
*/


// can use props to pass data into the component
// can use any number of props and their values can be dynamic or hard-coded
const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name} you are {props.age} years old</p>
    </div>
  )
};

// can use helper functions inside the component
// const HelperFunctionHello = (props) => {
//   // destructuring, so we don't need to define props.age twice
//   // const name = props.name;
//   // const age = props.age;

//   // even further destructuring, we can just do this:
//   const { name, age } = props;

//   // const bornYear = () => {
//   //   const yearNow = new Date.getFullYear();
//   //   return yearNow - props.age;
//   // }

//   // can refactor the above into the following:
//   const bornYear = () => new Date.getFullYear() - age;

//   // so, we can just use name and age here
//   return (
//     <div>
//       <p>Hello, {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// };

// taking the above even further, we can just do this:
// just passing in destructured name and age in as props
const DestructuredHello = ({ name, age }) => {
  const bornYear = () => newDate.getFullYear() - age;

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
};

// The hello component can be used multiple times if we want to
const ExampleApp = () => {
  const name = 'Peter';
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default ExampleApp
