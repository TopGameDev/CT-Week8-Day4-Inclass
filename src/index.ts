import { Canvas, CircleContainer, Component, RightLeaningContainer } from "./Widget";

const canvas = new Canvas(document.body);
console.log(canvas)

const myComponent = new Component();

canvas.addComponents(myComponent);

// Create a new component with a RightLeaningContainer Shape
const rightComponent = new Component();
rightComponent.shape = new RightLeaningContainer();
rightComponent.locationLeft = 6;
rightComponent.locationTop = 6;
rightComponent.width = 3;
rightComponent.height = 3;
rightComponent.shape.zIndex = 1;

canvas.addComponents(rightComponent)

// Create a new component with a CircleContainer Shape
const circleComponent = new Component();
circleComponent.shape = new CircleContainer();
circleComponent.locationLeft = 1;
circleComponent.locationTop = 5;
circleComponent.width = 4;
circleComponent.height = 4;

canvas.addComponents(circleComponent)