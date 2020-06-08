import React, {Component} from 'react';
import {Redirect} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import './Start.css';
import bmr from '../img/activities/BMR.jpg'
import sedentary from '../img/activities/SEDENTARY.jpg';
import light from '../img/activities/LIGHT.jpg';
import moderate from '../img/activities/MODERATE.jpg';
import active from '../img/activities/ACTIVE.jpg';
import veryActive from '../img/activities/VERY_ACTIVE.jpg';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import gain from '../img/activities/Gain.jpg'
import lose from '../img/activities/Lose.jpg'
import stay from '../img/activities/Stay.jpg'

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivityLevel: {active: "BMR", goal: "LOSE"},
            goal: "LOSE",
            gender: "MALE"
        }
    }

    handleSelectedActivity = selection => {
        this.setState({selectedActivityLevel: {active: selection}});
    };
    handleSelectedGoal = selection => {
        this.setState({selectedActivityLevel: {goal: selection}});
    };


    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        return (
            <div className={"container"}>
                <div className="start-container parent_div_1">
                    <div className="start-content child_div_2">
                        <h1 className="start-title">Fill up starter form!</h1>
                        <StartForm handleSelectedActivity={this.handleSelectedActivity}
                                   handleSelectedGoal={this.handleSelectedGoal}
                                   selectedActivityLevel={this.state.selectedActivityLevel}/>
                    </div>
                </div>
                <ActivityBox className={"parent_div_1"} selectedActivityLevel={this.state.selectedActivityLevel}/>
            </div>
        );
    }
}

class StartForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        startDate: new Date("01/01/1990"),
        goal: "LOSE",
        gender: "MALE"
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeGender = data => {
        this.setState({
            gender: data
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });
    }


    render() {
        const heightTest = /^[4-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^250$/i;
        const weightTest = /^[3-9][0-9]$|^[1-2][0-9][0-9]$|^300$/i;
        const minDate = new Date("01/01/1950");
        const maxDate = new Date(moment(new Date()).subtract(16, 'years').format("DD/MM/YYYY"));
        return (
            <Formik
                initialValues={{
                    birthDate: "",
                    gender: "MALE",
                    height: "",
                    weight: "",
                    activityLevel: "BMR",
                    goal: "LOSE"
                }}
                validate={values => {
                    let errors = {};
                    if (values.height === "") {
                        errors.height = "Height required"
                    } else if (!heightTest.test(values.height)) {
                        errors.height = "Invalid height - Correct value form 40cm - 250cm"
                    }
                    if (values.weight === "") {
                        errors.weight = "Weight required"
                    } else if (!weightTest.test(values.weight)) {
                        errors.weight = "Invalid weight - Correct value form 30kg - 300kg"
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    alert("Form is validated! Submitting the form...");
                    setSubmitting(false);
                    values.birthDate = this.state.startDate;
                    console.log(values)
                }}
            >
                {({touched, errors, isSubmitting}) => (
                    <Form>
                        <div className="form-group field">
                            <label htmlFor="birthDate">Birth date</label>
                            <DatePicker
                                name="birthDate"
                                className="form-control dateContainer"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="gender">Gender</label>
                            <Field as="select"
                                   name="gender"
                                   value={this.state.gender}
                                   onChange={e => {
                                       this.handleChangeGender(e.target.value);
                                   }}
                                   className="form-control"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </Field>
                            <ErrorMessage
                                component="div"
                                name="gender"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="height">Height in cm</label>
                            <Field
                                type="text"
                                name="height"
                                placeholder="Enter height"
                                className={`form-control ${
                                    touched.height && errors.height ? "is-invalid" : ""
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="height"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="weight">Weight in kg</label>
                            <Field
                                type="weight"
                                name="weight"
                                placeholder="Choose weight"
                                className={`form-control ${
                                    touched.weight && errors.weight ? "is-invalid" : ""
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="weight"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="activityLevel">Activity Level</label>
                            <Field as="select"
                                   name="activityLevel"
                                   className="form-control"
                                   value={this.props.selectedActivityLevel.active}
                                   onChange={e => {
                                       this.props.handleSelectedActivity(e.target.value);
                                   }}
                            >
                                <option value="BMR">Basal Metabolic Rate (BMR)</option>
                                <option value="SEDENTARY">Sedentary</option>
                                <option value="LIGHT">Light</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="ACTIVE">Active</option>
                                <option value="VERY_ACTIVE">Very active</option>
                            </Field>
                        </div>
                        <div className="form-group field">
                            <label htmlFor="goal">Goal</label>
                            <Field as="select"
                                   name="goal"
                                   placeholder="Choose goal"
                                   className="form-control"
                                   value={this.props.selectedActivityLevel.goal}
                                   onChange={e => {
                                       this.props.handleSelectedGoal(e.target.value);
                                   }}
                            >
                                <option value="GAIN">Weight gain</option>
                                <option value="STAY">Weight maintenance</option>
                                <option value="LOSE">Weight lose</option>
                            </Field>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        );
    }
}

class ActivityBox extends React.Component {

    parseHeader = header => {
        return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase().replace('_', ' ')
    };
    parseActivityLevel = level => {
        if (level === 'BMR') {
            return level
        }
        return this.parseHeader(level)
    };
    

    render() {
        const {selectedActivityLevel} = this.props;

        if (selectedActivityLevel.active === undefined) {
            selectedActivityLevel.active = 'BMR';
        }

        if (selectedActivityLevel.goal === undefined) {
            selectedActivityLevel.goal = 'LOSE';
        }
        let imageActive;
        let imageGoal;
        let header = "Activity level: " + this.parseActivityLevel(selectedActivityLevel.active);
        let headerGoal = "Goal: " + this.parseHeader(selectedActivityLevel.goal);
        switch (selectedActivityLevel.active) {
            case "BMR":
                imageActive = bmr;
                break;
            case "SEDENTARY":
                imageActive = sedentary;
                break;
            case "LIGHT":
                imageActive = light;
                break;
            case "MODERATE":
                imageActive = moderate;
                break;
            case "ACTIVE":
                imageActive = active;
                break;
            case "VERY_ACTIVE":
                imageActive = veryActive;
                break;
            default:
                imageActive = bmr;

        }

        switch (selectedActivityLevel.goal){
            case "LOSE":
                imageGoal = lose;
                break;
            case "STAY":
                imageGoal = stay;
                break;
            case "GAIN":
                imageGoal = gain;
                break;
            default:
                imageGoal = lose;
        }


        return (
            <div className="start-container ">
                <div className="start-content child_div_1">
                    <h2 className="start-title">{header}</h2>
                    <img src={imageActive} height={300} alt={"picture describing activity level"}/>
                    <h2 className="start-title">{headerGoal}</h2>
                    <img src={imageGoal} height={150} alt={"picture describing goal"}/>
                </div>
            </div>)
    }
}


export default Start