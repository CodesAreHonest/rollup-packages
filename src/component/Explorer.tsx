import Graphin, { GraphinData, Utils } from "@antv/graphin";
import React  from "react";

const data: GraphinData = Utils.mock(10).graphin();

const Explorer = () => {
  return (
    <Graphin data={data} />
  )
}

export default Explorer