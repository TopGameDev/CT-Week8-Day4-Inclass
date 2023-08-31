import { Canvas, CircleContainer, Component, RightLeaningContainer } from "./Widget";

const canvas = new Canvas(document.body);
canvas.state = {firstName: 'Trevon', city: 'Houston'}
console.log(canvas)

const myComponent = new Component();
myComponent.content = '<h3> Hello {{ firstName }} from {{ city }}</h3>'
myComponent.shape.backgroundColor = 'orange'

canvas.addComponents(myComponent);

canvas.state = {className: 'Kekambas'}
console.log(canvas.state)

// Create a new component with a RightLeaningContainer Shape
const rightComponent = new Component();
rightComponent.shape = new RightLeaningContainer();
rightComponent.locationLeft = 6;
rightComponent.locationTop = 6;
rightComponent.width = 3;
rightComponent.height = 3;
rightComponent.shape.backgroundColor = 'red';
rightComponent.shape.borderWidth = '5px';
rightComponent.shape.zIndex = 1;

canvas.addComponents(rightComponent)

// Create a new component with a CircleContainer Shape
const circleComponent = new Component();
circleComponent.shape = new CircleContainer();
circleComponent.locationLeft = 1;
circleComponent.locationTop = 5;
circleComponent.width = 4;
circleComponent.height = 4;
circleComponent.shape.backgroundColor = 'green'
circleComponent.content = '<h4> {{ className }}</h4>'

canvas.addComponents(circleComponent)