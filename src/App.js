import React, { Component } from 'react';
import './App.css'
import Car from './Car/Car'
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Counter from "./Counter/Counter";

export const ClickedContext = React.createContext(false)

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clicked: false,
            cars: [
                {name: 'Ford', year: 2015},
                {name: 'Audi', year: 2016},
                {name: 'Mazda', year: 2012}
            ],
            pageTitle: 'React components',
            showCars: false
        }
    }

    toggleCarsHandler = () => {

        this.setState({
            showCars: !this.state.showCars
        })
    }

    onChangeName (name, index) {
        const car = this.state.cars[index]
        car.name = name
        const cars = [...this.state.cars]
        cars[index] = car

        this.setState({
            cars
        })
    }

    deleteHandler(index){
        const cars = this.state.cars.concat()
        cars.splice(index, 1)

        this.setState({cars})
    }

    UNSAFE_componentWillMount(){
        console.log('App UNSAFE_componentWillMount')
    }

    componentDidMount() {
        console.log('App componentDidMount')
    }

    render() {

        console.log('App render')

        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if (this.state.showCars){
         cars =  this.state.cars.map((car,index) => {
                return (
                    <ErrorBoundary key={index} >
                        <Car
                            name={car.name}
                            year={car.year}
                            index={index}
                            onDelete={this.deleteHandler.bind(this, index)}
                            onChangeName={event => this.onChangeName(event.target.value, index)}
                        />
                    </ErrorBoundary>
                )
            } )
        }

        return (
            <div style={divStyle}>
                {/*<h1>{this.state.pageTitle}</h1>*/}
                <h1>{this.props.title}</h1>

                <hr/>
                    <ClickedContext.Provider value={this.state.clicked}>
                        <Counter />
                    </ClickedContext.Provider>
                <hr/>

                <button
                    style={{marginTop: 20}}
                    onClick={this.toggleCarsHandler}
                    className={'AppButton'}
                >Toggle cars</button>

                <button onClick={() => this.setState({clicked: true})}>Change clicked</button>

                <div style={{ width: 400, margin: 'auto', paddingTop: '20px'}}>
                    { cars }
                </div>


            </div>
        );

    }
}
export default App;
