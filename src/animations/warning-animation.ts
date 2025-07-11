import { Color, Group, Mesh,  Object3D } from "three";
import type { Animation } from "./abstractions/i-animation";

export class WarningAnimation implements Animation {
    public target: Object3D;
    colorGenerator: Generator<Color, void, unknown>;
    animate(): void {
       const color = this.colorGenerator.next().value;
        if (this.target instanceof Mesh && this.target.material.color) {
            this.target.material.color = color;
        }

        if (this.target instanceof Group){
            this.target.children.forEach(children =>{
                if(children instanceof Mesh && children.material.color){
                    children.material.color = (color);
                }
            })
        }

    }

    constructor(target: Object3D) {
        this.target = target;
        this.colorGenerator = this.getColor();
    }

    
    *getColor()  {
        const COLOR_YELLOW = new Color(0xfcf403);
        const COLOR_RED = new Color(0xfc0317);
        let redToYellow = true;
        let interpolation_step = 0;
        while (true) {
            interpolation_step += 0.05;
            if(redToYellow){
                yield COLOR_RED.clone().lerp(COLOR_YELLOW, interpolation_step);
            }else{
                yield COLOR_YELLOW.clone().lerp(COLOR_RED, interpolation_step);
            }

            if(interpolation_step >= 1 || interpolation_step <= 0){
                redToYellow = !redToYellow;
                interpolation_step = 0;
            }
        }
    }
}