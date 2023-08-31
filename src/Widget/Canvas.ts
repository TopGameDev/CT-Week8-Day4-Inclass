import Component from "./Component";
import { State } from "./types";

export default class Canvas{

    constructor(
        private parent:HTMLElement,
        private _components: Component[] = [],
        private _state: State = {}
    ){
        this.parent.innerHTML = '';
        this.parent.id = 'canvas';
        const newStyle:Partial<CSSStyleDeclaration> ={
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(12, 1fr)',
            height: '100vh',
            columnGap: '5px',
            rowGap: '5px',
            aspectRatio: '1 / 1',
            margin: 'auto' // center
        }
        Object.assign(this.parent.style, newStyle)
    }

    public get state(): State {
        return this._state;
    }
    public set state(value: State) {
        this._state = {...this.state, ...value};
        this.rerender();
    }

    public get components():Component[]{
        return this._components
    }

    public addComponents(component:Component):void{
        this.components.push(component);
        component.canvas = this;
        this.render()
    }

    private render():void{
        this.parent.innerHTML = '';
        for (const component of this.components){
            // build the component
            this.buildComponent(component)
        }
    }

    private rerender():void{
        for (const component of this.components){
            let div = document.getElementById(component.id) as HTMLDivElement
            if (this.injectContent(component, div)){
                this.buildComponent(component)
            }

        }
    }

    private injectContent(component:Component, div:HTMLDivElement):boolean{
        div.innerHTML = component.content
        let changeState = false;
        let key: keyof State;
        for (key in this.state){
            if (div.innerHTML.includes(` {{ ${key} }}`)){
                div.innerHTML = div.innerHTML.split(`{{ ${key} }}`).join(this.state[key])
                changeState = true
            }
        }
        return changeState
    }

    private buildComponent(component:Component):void{
        let div = this.initializeComponentDiv(component);
        this.buildContainerShape(component, div);
        this.placeComponent(component, div);
        this.injectContent(component, div);
        this.parent.append(div);
    }

    private initializeComponentDiv(component:Component):HTMLDivElement{
        const div = document.createElement('div');
        div.id = component.id;
        const newStyle:Partial<CSSStyleDeclaration> = {
            margin: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '3%',
            aspectRatio: '1 / 1'
        };
        Object.assign(div.style, newStyle);
        return div;
    }

    private buildContainerShape(component:Component, div:HTMLDivElement):void{
        Object.assign(div.style, component.shape.attributes)
    }

    private placeComponent(component:Component, div:HTMLDivElement):void{
        const newStyle: Partial<CSSStyleDeclaration> = {
            gridColumnStart: component.locationLeft.toString(),
            gridColumnEnd: "span " + component.width,
            gridRowStart: component.locationTop.toString(),
            gridRowEnd: "span " + component.height
        }
        Object.assign(div.style, newStyle)
    }
}