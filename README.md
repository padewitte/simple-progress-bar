# simple-progress-bar
A simple progress bar to demo the beauty of custom elements. The only goal here is to explore and understand what can be done with custom element spec.

See it in action : [https://padewitte.github.io/simple-progress-bar/](https://padewitte.github.io/simple-progress-bar/)

This component was build only for learning purpose and has not intention to be used in production. It was inspired by [Eric Bidelman](https://twitter.com/ebidel) brilliant article ["Custom Elements v1: Reusable Web Components"](https://developers.google.com/web/fundamentals/getting-started/primers/customelements). To understand what's next, we assume that you already knows what a custom element is and that you are familiar with component base approach

The second goal of this repo is to demo the possible interactions between frameworks thanks to custom elements. Consider browsing [https://github.com/padewitte/custom-element-to-rule-them-all](https://github.com/padewitte/custom-element-to-rule-them-all) to see how custom element are easy to integrate in a React, Angular, VueJS, CycleJS and Polymer project.

## Hello world
Github is full of hello world, let's add one more.
````
<!-- Import the custom element in your page. It will register it. -->
<script type="text/javascript" src="simple-progress-bar.js"></script>

<!-- -->
<simple-progress-bar max="5" current="4"></simple-progress-bar>

````
## Run
No build, just launch a local server after cloning this repo.
`python -m SimpleHTTPServer`

## Specification
This custom element demo all the possibility of custom element API:

- Attribute definition : max and current are the two attributes exposed by this components. 
- Attribute modification : each time max and/or current attributes are modified, a custom event maxChange or currentChange is fired. Also take a look in the debugger to see dom modification. Both attributes and properties are sync like a well designed component always should ([understand the difference between an attribute and a property](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html) )
- Listen to events inside the component : Left click increment the max value. Any other click decrease it.
- Fire custom events : When the limit is reached a `limit-reach` event is fired. If current is lower than max an `under-limit` event is send.
- Method are exposed and allows interaction with the component :  `increaseLimit()`, `decreaseLimit()`, `increase()`, `decrease()`, `reset()`

## Use it
Add `"simple-progress-bar": "github:padewitte/simple-progress-bar"` as a dependency in your `package.json` file, then include 

## TODO 
- Rewrite the custom element with Polymer2
- Rewrite the custom element with SkateJS
- Describe what the custom element could do in the index.html

## Feedback
Please open an issue or [tweet me](https://twitter.com/padewitte) to share your opinion.

