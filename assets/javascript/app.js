var firstGranim = new Granim({
    element: "#first",
    name: "first-gradient",
    direction: "diagonal",
    opacity: [1, 1],
    states: {
      "default-state": {
        gradients: [["#8BC34A", "#FF9800"]]
      }
    }
  });
  
  var secondGranim = new Granim({
    element: "#second",
    name: "second-gradient",
    elToSetClassOn: ".wrapper",
    direction: "top-bottom",
    opacity: [1, 1],
    states: {
      "default-state": {
        gradients: [["#9C27B0", "#E91E63"], ["#009688", "#8BC34A"]],
        transitionSpeed: 2000
      }
    }
  });