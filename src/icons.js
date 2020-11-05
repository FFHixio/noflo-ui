const TheGraph = require('the-graph');

exports.getIcon = (iconName, fallback = '') => {
  const iconMap = window.TheGraph != null ? window.TheGraph.FONT_AWESOME : undefined;
  if (!iconMap) {
    return iconName;
  }
  if (!iconMap[iconName]) {
    if (!fallback) { return fallback; }
    return iconMap[fallback];
  }
  return iconMap[iconName];
};

exports.getIcons = () => {
  const iconMap = TheGraph.FONT_AWESOME;
  if (!iconMap) {
    return {};
  }
  return iconMap;
};
