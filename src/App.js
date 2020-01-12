import React, { useState, useRef } from "react";

import Header from "./components/Header";
import ValueGraph from "./components/ValueGraph";
import Video from "./components/Video";
import Selector from "./components/Selector";
import Info from "./components/Info";
import Checkbox from "./components/Checkbox";

import buildings from "./data/buildings.json";
import values from "./data/values.json";

import "./styles.css";
import uuid from "uuid";

// Get the select options
const options = buildings
  .map(({ id: value, label }) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label));

// Assign a random id to all edges
const idValues = values.map(v => ({ ...v, id: uuid.v4() }));

const getOptions = (network, selected, showAll, buildings, values) => {
  // If a building is selected, show only the buildings that boost it and the related edges
  if (selected && network.current) {
    // Create an object that maps building id to the building object (for easy lookup by id)
    let nodeMap = buildings.reduce(
      (res, node) => ({
        ...res,
        [node.id]: {
          ...node,
          hidden: !showAll,
          muted: true
        }
      }),
      {}
    );

    // Make all connected nodes + the selected node visible
    let connected = network.current.getConnectedNodes(selected, "from");
    connected.forEach(id => {
      nodeMap[id] = { ...nodeMap[id], hidden: false, muted: false };
    });
    nodeMap[selected] = { ...nodeMap[selected], hidden: false, muted: false };

    // Mute all edges
    let edgeMap = values.reduce((res, edge) => {
      return {
        ...res,
        [edge.id]: {
          ...edge,
          muted: true
        }
      };
    }, {});

    // Get all edges connected to the selected node, make edges that point to selected node active
    let connectedEdges = network.current.getConnectedEdges(selected);
    connectedEdges.forEach(id => {
      let edge = edgeMap[id];
      let isActive = edge.to === selected;
      edgeMap[id] = { ...edge, muted: !isActive };
    });

    return {
      buildings: Object.values(nodeMap),
      values: Object.values(edgeMap)
    };
  }

  return { buildings, values };
};

function App() {
  let [selected, setSelected] = useState(null);
  let [showAll, setShowAll] = useState(true);
  let network = useRef(null);

  let selectedBuilding = buildings.find(building => selected === building.id);
  let selectedOption = options.find(o => selected === o.value);

  let handleSelect = option => {
    let id = option ? option.value : null;
    setSelected(id);
  };

  let graphOptions = getOptions(
    network,
    selected,
    showAll,
    buildings,
    idValues
  );

  return (
    <>
      <div className="app">
        <Header />
        <div className="controls">
          <Selector
            value={selectedOption}
            onChange={handleSelect}
            options={options}
            className="controls-select"
          />
          <Checkbox label="Show all" isChecked={showAll} onCheck={setShowAll} />
        </div>
        {selectedBuilding && <Info {...selectedBuilding} />}
        <ValueGraph
          onSelect={setSelected}
          getNetwork={nw => (network.current = nw)}
          {...graphOptions}
        />
      </div>
      <Video />
    </>
  );
}

export default App;
