# React Components: Converting Functions to Classes

## Learning Objectives:

By the end of this lesson, students should be able to:
- create a React class component
- use `this.state` and `this.setState()` to create and manipulate state
- create class methods in a React component

## Functional vs. Class Components

So far, we've been working with functional components with React Hooks, such as `useState`, and `useEffect` from React, as well as `useParams` from React Router. In order to get a better understanding of legacy codebases and the other way of writing components, we'll examine our first Class Component.

Let's explore the codebase in this repository, and see what we find!

## What's In A Class Component?

Here is the App.js from this repo:

```jsx
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }

  changeMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    return (
      <div className="app">
        <div className={this.state.darkMode ? "dark" : "light"}>
          <div className="glow">
            <h1>Dragonfly Diner</h1>
            <h2>A Classy Restaurant</h2>
          </div>
          <button onClick={() => this.changeMode()}>Change Mode</button>
        </div>
      </div>
    );
  }
}

export default App;
```

Let's break down what's going on here:

```js
import React, { Component } from "react";
import "./App.css";

class App extends Component {
```

As we learned from classes yesterday, we can create a subclass by using the `extends` keyword. Here, we're extending React's `Component` class to create a new class component, and giving it the name "App".

```js
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }
```

We're using the Component's constructor (via the `super` keyword), and passing it the `props` object. In addition, we're creating a property called `state`. Just like any other class, we can access the state property with the keyword `this.state`, and we can access the darkMode property of state by using `this.state.darkMode`.

```js
  changeMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }
```

We've created a class method called `changeMode`. The purpose of this method is to change the `darkMode` property in state to its opposite. The `this.setState` function is built into class components, and takes either an object with the properties to change (such as assigning darkMode to its opposite), or a callback function. The callback function syntax is nearly identical to the useState hook callback function syntax—if we wanted to accomplish the same functionality as above, we could do this:

```js
  changeMode() {
    this.setState(prevState => {
      return {
        darkMode: !prevState.darkMode,
      };
    })
  }
```

But what if you have a state that has nested objects / arrays? You can then handle it with this syntax:

```js
  changeMode() {
    this.setState(prevState => {
      return {
        ...prevState,
        darkMode: !prevState.darkMode,
      };
    })
  }
```

We're spreading out our previous state for two reasons:
1. As with functional components, if we have `<React.StrictMode />` surrounding our application, React will render it twice to make sure it is properly rendered.
2. Even though we don't have anything else in our state, we're spreading out prevState so that if we add more items in state, we won't have to rewrite our function.

```jsx
  render() {
    return (
      <div className="app">
        <div className={this.state.darkMode ? "dark" : "light"}>
          <div className="glow">
            <h1>Dragonfly Diner</h1>
            <h2>A Classy Restaurant</h2>
          </div>
          <button onClick={() => this.changeMode()}>Change Mode</button>
        </div>
      </div>
    );
  }
```

`render()` is the only required method in a class component. React has configured the `Component` class so that, provided there is no state, the constructor in not necessary. All the render method must do is return some JSX for the component to display. In this case, we have a className on our div determined by `this.state.darkMode`'s value. 

In addition, we're using an arrow function to trigger the onClick for changeMode.

```jsx
<button onClick={() => this.changeMode()}>Change Mode</button>
```

This is to make sure that the `this` context is properly bound. Another way to confirm the `this` context would be to use `.bind()` in the constructor, like so:

```jsx
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
    this.changeMode = this.changeMode.bind(this);
  }
```

Depending on the situation, there are advantages and disadvantages to either method. While `.bind()` calls can start to clutter our `constructor`, arrow functions can add obscurity if we need to pass an argument to the function, such as `() => this.changeMode('dark')`.
