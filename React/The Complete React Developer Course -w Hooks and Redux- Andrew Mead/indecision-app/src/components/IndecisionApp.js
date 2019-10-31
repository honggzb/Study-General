import React from 'react';

import Header from './Header';
import Options from './Options';
import AddOption from './AddOption';
import Action from './Action';
import OptionModel from './OptionModal';

//class-based components
export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    componentDidMount(){
        console.log('Indecision componentDidMount, fetching data');
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if(options) {
                this.setState(() => ({ options: options}));
            }
        } catch(e){
            // Do nothing at all if there is error of JSON.parse
        }

    }
    componentDidUpdate(prevProps, prevState){
        // console.log('Indecision componentDidUpdate! Saving data');
        // console.log('Indecision componentDidUpdate: Props: ', prevProps );
        // console.log('Indecision componentDidUpdate: State: ', this.state );
        try {
            if(prevProps.options.length !== this.state.options.length){
                localStorage.setItem('options', JSON.stringify(this.state.options));
            }
        }catch(e){
            // Do nothing at all if there is error of JSON.parse
        }
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: []} ));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState((prevState) => ({
            options:  prevState.options.concat(option)
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
        //console.log(option);
    }
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    render() {
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <Header subTitle={subTitle} />
                <div className="container">
                    <Action hasOptions={this.state.options && (this.state.options.length > 0)} handlePick={this.handlePick} />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModel selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }

}
