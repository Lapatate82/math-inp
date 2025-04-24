import React from 'react';
import DOMPurify from 'dompurify';
import CirclePackingMathML from './circlePackingMathML';
import MathEditor from './MathEditor';

class MyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: '',
            k: 0
        };
    }

    // Cette fonction met à jour `input` (textarea) et `output`
    handleMathMLChange = (mathML) => {
        const wrapped = `<math xmlns="http://www.w3.org/1998/Math/MathML">${mathML}</math>`;
        this.setState({ input: wrapped }); // ← NE MET PAS À JOUR `output`
    }
    

    handleInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    handleClick = () => {
        const clean = DOMPurify.sanitize(this.state.input);
        this.setState({ output: clean });
        this.state.k += 1;
    }
    //fonction pour clear le mathMl
    handleClear = () => {
        this.setState({ input: '' });
    }


    render() {
        const { input, output } = this.state;

        return (
            <>
                <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-blue-100 rounded-2xl shadow-xl mt-10">
                    <div className="p-8">
                        <MathEditor onMathMLChange={this.handleMathMLChange} />
                        
                    </div>

                    <div className="mb-8">
                        <label htmlFor="inputMathML" className="block text-base sm:text-lg font-semibold text-blue-900 mb-3">
                            Saisissez votre expression MathML
                        </label>
                        <textarea
                            id="inputMathML"
                            className="w-full px-4 py-2 text-sm sm:text-base border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            style={{ height: '200px' }}
                            type="textarea"
                            name="inputMathML"
                            value={input}
                            onChange={this.handleInputChange}
                            placeholder="Exemple : <math><mi>x</mi><mo>=</mo><mn>5</mn></math>"
                        />
                    </div>

                    <div className="flex w-full px-8 py-2 justify-center mb-8">
                        <button
                            type="button"
                            className="sm:px-8 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                            onClick={this.handleClear}
                        >
                            Effacer
                        </button>
                        <button
                            type="button"
                            className="sm:px-8 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                            onClick={this.handleClick}
                        >
                            Convertir
                        </button>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-300 shadow-inner">
                        <label className="block text-sm sm:text-md font-medium text-gray-700 mb-2">
                            Résultat :
                        </label>
                        <output className="block w-full min-h-[3rem] text-gray-800 bg-gray-100 p-2 rounded-md text-sm sm:text-base overflow-auto">
                            <div dangerouslySetInnerHTML={{ __html: output }} />
                        </output>
                    </div>
                </section>

                

                <section className='p-8'>
                    {output && <CirclePackingMathML key={this.state.k} mathml={output} />}
                </section>
            </>
        );
    }
}

export default MyConverter;