import type { Object3D } from "three";
import type { Animation } from "./abstractions/i-animation";

export class RotateYAnimation implements Animation{
    target: Object3D;
    rotationSpeed : number;

    constructor(target: Object3D, speed?: number){
        this.target = target;
        this.rotationSpeed = speed || 0.01;
    }

    animate(): void {
        this.target.rotation.y += this.rotationSpeed;
    }

}