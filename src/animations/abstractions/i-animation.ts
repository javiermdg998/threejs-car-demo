import type { Object3D } from "three";

export interface Animation {
    target: Object3D;
    animate() : void;
}