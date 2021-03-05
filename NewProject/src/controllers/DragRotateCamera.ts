import { component } from "@egret/ecs";
import { Application, Behaviour, Vector3 } from "@egret/engine";
import { InputManager, InputCode } from "@egret/input";
import { deg2rad } from "../helpers";

@component()
export class DragRotateCamera extends Behaviour {

    // 按下时
    private _isDown: boolean = false;
    // 按下时的坐标
    private _onDownPosition: Vector3 = Vector3.create();
    // 按下时的经纬度
    private _onDownLon: float = 0;
    private _onDownLat: float = 0;
    // 经纬度
    private _lon: float = 0;
    private _lat: float = 0;

    public onLateUpdate(dt: float): any {
        const inputManager = Application.instance.globalEntity.getComponent(InputManager)!;
        const input = inputManager.getInput(InputCode.TouchContact);

        // 按下时，记录点击位置和经纬度
        if (input.isDown) {
            this._isDown = true;
            this._onDownPosition.copy(inputManager.getPointer(0).position);
            this._onDownLon = this._lon;
            this._onDownLat = this._lat;
        }

        // 按下并移动
        if (this._isDown && input.isHold) {
            const position = inputManager.getPointer(0).position;
            this._lon = (this._onDownPosition.x - position.x) * 0.1 + this._onDownLon;
            this._lat = (this._onDownPosition.y - position.y) * 0.1 + this._onDownLat;
        }

        // 抬起
        if (input.isUp) {
            this._isDown = false;
        }

        const phi = deg2rad(90 - this._lat);
        const theta = deg2rad(90 - this._lon);
        this.entity.transform.setPosition(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta)
        );
        this.entity.transform.lookAt(Vector3.create());
    }
}