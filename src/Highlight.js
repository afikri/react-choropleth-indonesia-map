import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import statesData from "./id-density.json";
import { style } from "./utils.js";

const Highlight = () => {
  const map = useMap();

  useEffect(() => {
    // control that shows state info on hover
    const info = L.control();

    info.onAdd = () => {
      info._div = L.DomUtil.create("div", "info");
      info.update();
      return info._div;
    };

    info.update = (props) => {
      info._div.innerHTML =
        "<h4>Indonesia Population Density</h4>" +
        (props
          ? "<b>" +
            props.province +
            "</b><br />" +
            props.density +
            " people / mi<sup>2</sup>"
          : "Hover over a province");
    };

    info.addTo(map);

    const highlightFeature = (e) => {
      const layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    };

    let geojson;

    const resetHighlight = (e) => {
      geojson.resetStyle(e.target);
      info.update();
    };

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    };

    geojson = L.geoJson(statesData, {
      style,
      onEachFeature: onEachFeature,
    }).addTo(map);

// Cleanup function
return () => {
  // Remove event listeners
  geojson.eachLayer((layer) => {
    layer.off({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  });

  // Remove the control from the map
  info.remove();
};
  }, [map]);

  return null;
};

export default Highlight;
