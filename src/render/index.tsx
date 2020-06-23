import * as React from "react";

import {Scene} from "./scene";

import "./index.less";

export class Render extends React.PureComponent {
  
  private canvasWrapperRef: HTMLDivElement | null = null;
  private scene: Scene | null = null;

  public componentDidMount(): void {
    if (this.canvasWrapperRef == null) {
      throw new Error("canvasRef is null");
    }

    this.scene = new Scene();
    if (this.scene == null) {
      return;
    }

    this.scene.init();
    this.scene.addToParent(this.canvasWrapperRef);
    this.scene.render();
  }

  public componentWillUnmount(): void {
    if (this.scene) {
      this.scene.dispose();
    }
  }

  public render(): JSX.Element {
    return <div
      className="game-canvas-wrapper"
      ref={(r) => this.canvasWrapperRef = r}
    />;
  }

}
