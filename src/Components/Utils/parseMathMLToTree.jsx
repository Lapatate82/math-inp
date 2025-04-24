export function parseMathMLToTree(mathml) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(`<root>${mathml}</root>`, 'application/xml');

    
    let key =0;
    function wrapInMathTag(content) {
        key += 1;
        const cleanedContent = content.replace(/xmlns="[^"]*"/g, '');
        return `<math xmlns="http://www.w3.org/1998/Math/MathML" id="${key}" mathsize="40pt">${cleanedContent}</math>`;
        
    }

    function walk(node) {
        const tag = node.tagName;
        if (!tag) return null;

        switch (tag) {
            case 'mo':
                return{}
            case 'mi':
            case 'mn':
                return { name: wrapInMathTag(node.outerHTML), value: 10 + Math.random() * 20 };
            case 'msup':
                if (node.children.length === 2) {
                    return {
                        name: wrapInMathTag(node.outerHTML),
                        children: [walk(node.children[0]), walk(node.children[1])]
                    };
                }
                break;

            case 'mfrac':
                if (node.children.length === 2) {
                    return {
                        name: wrapInMathTag(node.outerHTML),
                        children: [walk(node.children[0]), walk(node.children[1])]
                    };
                }
                break;

            case 'msqrt':

                return {
                    name: wrapInMathTag(node.outerHTML),
                    children: [walkGroup(Array.from(node.children))]
                };
            

            case 'mrow':
            case 'math':
                const children = Array.from(node.children);
                let groups = [], currentGroup = [];

                for (let child of children) {
                    const content = child.textContent.trim();
                    const isOp = child.tagName === 'mo' && ['=', '+', '-', '*', '/', '^'].includes(content);
                    if (isOp) {
                        if (currentGroup.length) groups.push(currentGroup);
                        groups.push([child]);
                        currentGroup = [];
                    } else {
                        currentGroup.push(child);
                    }
                }
                if (currentGroup.length) groups.push(currentGroup);
                
                const result = groups.length === 1
                    ? walkGroup(groups[0])
                    : { 
                        name: wrapInMathTag(node.outerHTML), 
                        children: groups.map(walkGroup) 
                      };
                return result;

            default:
                const defaultChildren = Array.from(node.children).map(walk).filter(Boolean);
                return {
                    name: wrapInMathTag(node.outerHTML),
                    children: defaultChildren.length > 0 ? defaultChildren : undefined,
                    value: defaultChildren.length === 0 ? 10 + Math.random() * 20 : undefined,
                };
        }
    }

    function walkGroup(nodes) {
        if (nodes.length === 1) return walk(nodes[0]);
        const groupHTML = nodes.map(n => n.outerHTML).join('');
        return {
            name: wrapInMathTag(groupHTML),
            children: nodes.map(walk).filter(Boolean)
        };
    }

    const parsedChildren = Array.from(xml.documentElement.children).map(walk).filter(Boolean);

    if (parsedChildren.length === 1) {
        return parsedChildren[0];
    }

    return {
        name: wrapInMathTag(mathml),
        children: parsedChildren
    };

}