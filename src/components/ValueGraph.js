import React, { useRef } from "react";
import PropTypes from "prop-types";

import Graph from "react-graph-vis";

import { primary, font } from "../data/theme.json";
import { motion, AnimatePresence } from "framer-motion";

import positions from "../data/positions.json";

// @see https://visjs.github.io/vis-network/docs/network/#options
const defaultOptions = {
  height: "100%",
  autoResize: true,
  nodes: {
    shape: "box",
    margin: { top: 5, right: 20, bottom: 5, left: 20 },
    font: {
      size: 24,
      color: font
    },
    shadow: true
  },
  edges: {
    smooth: true,
    scaling: {
      label: false,
      min: 1,
      max: 5,
      customScalingFunction: (min, max, total, value) => Math.abs(value) / 10
    },
    font: {
      size: 24,
      color: font,
      strokeColor: "#333"
    },
    shadow: {
      color: "#111"
    }
  },
  physics: {
    enabled: false,
    stabilization: {
      enabled: false,
      iterations: 2000
    }
  },
  interaction: {
    hover: true
  }
};

const getEdgeColor = (value, isActive) => {
  // value > 0 ? green : red
  let rgb = value >= 0 ? "76, 175, 80" : "244, 67, 54";
  let opacity = isActive ? "1" : "0.1";
  return `rgba(${rgb}, ${opacity})`;
};

// Create HTMLElement from string
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const ValueGraph = ({ buildings, values, onSelect, options, getNetwork }) => {
  // Stores the VisJS network instance
  let network = useRef(null);
  let container = useRef(null);

  const events = {
    selectNode: ({ nodes: [node] }) => {
      if (!node) return;
      onSelect && onSelect(node);
    }
    // initRedraw: () => {
    //   console.log("DONE");
    //   if (container.current && network.current) {
    //     let { width, height } = container.current.getBoundingClientRect();
    //     network.current.setSize(width + "px", height + "px");
    //   }
    // }
  };

  let displayNodes = buildings.map(building => ({
    ...building,
    color: building.muted ? "rgba(200,200,200,0.2)" : primary,
    ...positions[building.id],
    title: htmlToElement(`
      <div>
        <h3><span class="tooltip-title">${building.label}</span></h3>
        <p>${building.title}</p>
      </div>
    `)
  }));

  let displayEdges = values.map(edge => ({
    ...edge,
    color: getEdgeColor(edge.value, edge.muted === false),
    label: edge.muted === false && String(edge.value)
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="graph"
        ref={container}
      >
        <Graph
          graph={{ nodes: displayNodes, edges: displayEdges }}
          options={{ ...defaultOptions, ...options }}
          events={events}
          getNetwork={nw => {
            network.current = nw;
            if (getNetwork) {
              getNetwork(nw);
            }
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

let IdType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
let BuildingType = PropTypes.shape({
  id: IdType,
  label: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  group: PropTypes.string
});

let ValueType = PropTypes.shape({
  from: IdType,
  to: IdType,
  value: PropTypes.number
});

ValueGraph.propTypes = {
  buildings: PropTypes.arrayOf(BuildingType),
  values: PropTypes.arrayOf(ValueType),
  options: PropTypes.object,
  onSelect: PropTypes.func,
  getNetwork: PropTypes.func
};

export default ValueGraph;
