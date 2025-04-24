import React from "react";
import "https://esm.run/mathlive";

class MathEditor extends React.Component {
    constructor(props) {
        super(props);
        this.mathFieldRef = React.createRef();
    }

    componentDidMount() {
        const mathField = this.mathFieldRef.current;
        if (mathField) {
            mathField.addEventListener("input", this.handleInput);
        }
    }

    componentWillUnmount() {
        const mathField = this.mathFieldRef.current;
        if (mathField) {
            mathField.removeEventListener("input", this.handleInput);
        }
    }

    handleInput = () => {
        const mathField = this.mathFieldRef.current;
        if (mathField) {
            // Récupère le MathML de MathLive
            const mathML = mathField.getValue("math-ml");
            // Envoie cette valeur au parent (via onMathMLChange)
            this.props.onMathMLChange(mathML);
        }
    }

    render() {
        return (
            <div>
                <math-field ref={this.mathFieldRef} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', virtualKeyboardMode: 'onfocus', smartMode: true}}></math-field>

            </div>
        );
    }
}

export default MathEditor;
