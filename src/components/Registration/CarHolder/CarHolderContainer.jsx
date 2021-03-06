import React from 'react';
import {connect} from "react-redux";
import CarHolder from "./CarHolder";
import {checkInnThunk, setHolderType, setInn, setInnSam} from "../../../redux/registration/carHolderReducer";

class CarHolderContainer extends React.Component {
    render() {
        return (
            <CarHolder state={this.props.state}
                       setHolderType={this.props.setHolderType}
                       setInn={this.props.setInn}
                       setInnSam={this.props.setInnSam}
                       checkInnThunk={this.props.checkInnThunk}/>
        );
    };
}

let mapStateToProps = (state) => ({
    state: state.carHolderReducer
});

export default connect(mapStateToProps, {setHolderType, setInn, setInnSam, checkInnThunk})(CarHolderContainer);