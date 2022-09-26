// Write your code here

import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    text: '',
    calendars: '',
    arrayList: [],
    isTrue: false,
  }

  textChange = e => {
    this.setState({text: e.target.value})
  }

  dateChange = e => {
    this.setState({calendars: e.target.value})
  }

  formSubmit = e => {
    e.preventDefault()
    const {text, calendars} = this.state
    const rightFormat = calendars
      ? format(new Date(calendars), 'dd MMMM yyyy, EEEE')
      : ''
    const object = {
      id: uuidv4(),
      title: text,
      dateTime: rightFormat,
      isFavorite: false,
    }
    this.setState(prevState => ({
      arrayList: [...prevState.arrayList, object],
      text: '',
      calendars: '',
    }))
  }

  starFavorite = id => {
    this.setState(prevState => ({
      arrayList: prevState.arrayList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, isFavorite: !eachValue.isFavorite}
        }
        return eachValue
      }),
    }))
  }

  activeStar = () => {
    const {isTrue} = this.state
    if (isTrue) {
      this.setState({isTrue: false})
    } else {
      this.setState({isTrue: true})
    }
  }

  render() {
    const {text, calendars, isTrue} = this.state
    let {arrayList} = this.state
    if (isTrue) {
      const newList = arrayList.filter(
        eachValue => eachValue.isFavorite === true,
      )
      arrayList = newList
    }
    return (
      <div className="main-container">
        <div className="inner-container">
          <div className="divider">
            <div className="content-holder">
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.formSubmit} className="form-element">
                <label htmlFor="input1" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input-element"
                  id="input1"
                  placeholder="Title"
                  onChange={this.textChange}
                  value={text}
                />
                <label htmlFor="input2" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-element"
                  id="input2"
                  onChange={this.dateChange}
                  value={calendars}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="joint">
            <h1 className="appointments">Appointments</h1>
            {isTrue && (
              <button
                type="button"
                className="starred-names"
                onClick={this.activeStar}
              >
                Starred
              </button>
            )}
            {!isTrue && (
              <button
                type="button"
                className="starred-name"
                onClick={this.activeStar}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="appointment-holder">
            {arrayList.map(eachObject => (
              <AppointmentItem
                objectList={eachObject}
                key={eachObject.id}
                starFavorite={this.starFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
