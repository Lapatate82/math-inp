import React from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { parseMathMLToTree } from './Utils/parseMathMLToTree';
import { text } from 'd3';

class CirclePackingMathML extends React.Component {
  constructor(props) {
    
      super(props);
      const { mathml } = this.props;
      this.state = {
          zoomedId: mathml,
          profondeurNode: 0
      };
  }

  handleClick = (node) => {
      const { mathml } = this.props;
      this.setState((prevState) => ({
          zoomedId: prevState.zoomedId === node.id ? mathml : node.id,
          profondeurNode: prevState.zoomedId === node.id ? 0 : node.depth
      }));
  }

  filterLabels = (label) => {
      const { profondeurNode } = this.state;
      return (label.node.depth < 2 + profondeurNode && (label.node.depth > profondeurNode || label.node.height == 0));
  }


  hidelabels = () => {
    const textElements = [...document.querySelectorAll("text")];

    textElements.forEach(textEl => {

        textEl.setAttribute("visibility", "hidden");
    })
  }

  renderMathML = () => {
      const svg = document.querySelector("svg");
      if (!svg || !svg.getScreenCTM) return;

      const textElements = [...document.querySelectorAll("text")];

      textElements.forEach(textEl => {
          if (!textEl.textContent.trim()) return;



          const mathMLString = textEl.textContent;
          const position = textEl.getBoundingClientRect();

          const parser = new DOMParser();
          const mathDoc = parser.parseFromString(mathMLString, "application/xml");
          const mathElement = mathDoc.documentElement;

          const SVG_NS = "http://www.w3.org/2000/svg";
          const container = document.createElementNS(SVG_NS, "foreignObject");
          container.setAttribute("width", 500);
          container.setAttribute("height", 500);

          const pt = svg.createSVGPoint();
          pt.x = position.left + position.width / 2 - 250;
          pt.y = position.top + position.height / 2 - 30;

          const ctm = svg.getScreenCTM();
          if (!ctm) return;

          const svgPt = pt.matrixTransform(ctm.inverse());

          container.setAttribute("x", svgPt.x);
          container.setAttribute("y", svgPt.y);
          container.style.pointerEvents = "none";

          const htmlContainer = document.createElement("div");
          htmlContainer.appendChild(mathElement);
          container.appendChild(htmlContainer);

          
          svg.appendChild(container);
          textEl.setAttribute("visibility", "hidden");
      });
  }

  clearMathML = () => {
      const svg = document.querySelector("svg");
      if (!svg) return;

      const mathElements = [...svg.querySelectorAll("foreignObject")];
      mathElements.forEach(el => svg.removeChild(el));
  }

  renderMathWithDelay = () => {
      // Toujours clear d'abord pour éviter les doublons
      this.clearMathML();
      this.hidelabels();
      // Petit délai pour laisser le DOM se stabiliser
      setTimeout(() => {
          this.renderMathML();
      }, 100);
      
  }

  componentDidMount() {
    this.renderMathWithDelay();
  }

  componentDidUpdate() { 
    this.renderMathWithDelay();
  }

  wrapInMathTag(content) {
    const cleanedContent = content.replace(/xmlns="[^"]*"/g, '');
    return `<math xmlns="http://www.w3.org/1998/Math/MathML" mathsize="40pt">${cleanedContent}</math>`; 
  }


  render() {
      const { mathml } = this.props;
      const data = parseMathMLToTree(mathml);

      let {zoomedId} = this.state;
      return (
        <>
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-300 shadow-inner">
            <label className="block text-sm sm:text-md font-medium text-gray-700 mb-2">
                Bulle sélectionnée :
            </label>
            <output className="block w-full min-h-[3rem] text-gray-800 bg-gray-100 p-2 rounded-md text-sm sm:text-base overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: this.wrapInMathTag(zoomedId) }} />      
            </output>
          </div>
          <div style={{ height: 1000 }}>
              <ResponsiveCirclePacking
                  data={data}
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  id="name"
                  value="value"
                  colors={{ scheme: 'pastel1' }}
                  childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
                  padding={4}
                  enableLabels={true}
                  labelsSkipRadius={10}
                  labelsFilter={this.filterLabels}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
                  zoomedId={zoomedId}
                  onClick={this.handleClick}
                  motionConfig="slow"
                  animate={false}
                  tooltip={({id}) => null} 
              />
          </div>
        </>
      );
  }
}
export default CirclePackingMathML;