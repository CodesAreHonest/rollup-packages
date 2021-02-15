import Graphin, { Utils } from "@antv/graphin";
import React from "react";
var data = Utils.mock(10).graphin();

var Explorer = function Explorer() {
  return /*#__PURE__*/React.createElement(Graphin, {
    data: data
  });
};

export default Explorer;