import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-sotano1',
  templateUrl: './sotano1.component.html',
  styleUrls: ['./sotano1.component.css']
})
export class Sotano1Component implements OnInit {
  output: string[] = [];
  canvas: any
  pausePanning = false;
    zoomStartScale = 0;
    currentX;
    currentY;
    xChange;
    yChange;
    lastX;
    lastY;
    constructor() {}
    ngOnInit(): void {
      this.canvas = new fabric.Canvas('canvas',{
        backgroundColor: 'rgb(255, 255, 255)',
      })

      document.getElementById('square').addEventListener('click', () => {
        this.canvas.add(new fabric.Rect({
          stroke: 'green',
          fill: 'green',
          width: 50,
          height: 50,
          left: 100,
          top: 100
        }));
      });

      document.getElementById('circle').addEventListener('click', () => {
        this.canvas.add(new fabric.Circle({
          radius: 30,
          stroke: 'red',
          fill: 'red',
          left: 100,
          top: 100
        }));
      });

      fabric.Image.fromURL('../../../../assets/sotano1.png', (img) =>{
        img.scale(0.5).set({
        });
        this.canvas.add(img).setActiveObject(img);
      })

      this.canvas.on('touch:gesture', e => {
        //this.output.push(`touch:gesture (${e.e.touches.length})`);
        if (e.e.touches && e.e.touches.length == 2) {
            this.pausePanning = true;
            var point = new fabric.Point(e.self.x, e.self.y);
            if (e.self.state == "start") {
                this.zoomStartScale = this.canvas.getZoom();
            }
            var delta = this.zoomStartScale * e.self.scale;
            this.canvas.zoomToPoint(point, delta);
            this.output.push(`zoom`);
            this.pausePanning = false;
        }
      });

      this.canvas.on('selection:created', e => {
        this.output.push(`selection:created`);
        this.pausePanning = true;
      });

      this.canvas.on('selection:cleared', e => {
        this.output.push(`selection:cleared`);
        this.pausePanning = false;
      });

      this.canvas.on('touch:drag', e => {
        //this.output.push(`touch:drag`);
        if (this.pausePanning == false && undefined != e.self.x && undefined != e.self.y) {
            this.currentX = e.self.x;
            this.currentY = e.self.y;
            this.xChange = this.currentX - this.lastX;
            this.yChange = this.currentY - this.lastY;

            if( (Math.abs(this.currentX - this.lastX) <= 50) && (Math.abs(this.currentY - this.lastY) <= 50)) {
                var delta = new fabric.Point(this.xChange, this.yChange);
                this.canvas.relativePan(delta);
                this.output.push(`pan`);
            }

            this.lastX = e.self.x
            this.lastY = e.self.y;
          }
      });

      this.canvas.on('mouse:wheel', opt => {
        this.output.push(`ss`);
        const delta = opt.e.deltaY;
        let zoom = this.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
        this.canvas.requestRenderAll();
      });
    }

    clear(){
      this.canvas.clear();
      if(this.canvas.isEmpty()){
        fabric.Image.fromURL('../../../../assets/sotano1.png', (img) =>{
          img.scale(0.5).set({
          });
          this.canvas.add(img).setActiveObject(img);
        })
      }
    }

    descargar(){
      const pngdata = this.canvas.toDataURL("png");
      const descargar = document.createElement("a");
      const nombre = `plano.png`

      descargar.href = pngdata;
      descargar.download = nombre;
      descargar.click();
    }
}
