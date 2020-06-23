import * as React from "react";
import * as ReactDom from "react-dom";

import {Render} from "./render";

import "./index.less";

export interface IIntroProps {
  className?: string;  
}

const wrapper = document.createElement("div");
document.body.append(wrapper);

ReactDom.render(<Render/>, wrapper);
