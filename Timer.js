import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import * as moment from 'moment'
//import PropTypes from 'prop-types';

import momentDurationFormatSetup from 'moment-duration-format'
import * as Progress from 'react-native-progress'
import timer from 'react-native-timer'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            originalCounter: 0,
            initialState: true,
            progress: 0,
            play: true,
            pause: false,
            stop: true,
            resume: false,
            interval: 0,
            remainingTime: 10,
        }

        this.defaultStyles = {
            view: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
            },
            play: {
                underlayColor: '#ffffff',
                borderColor: '#d9dcdd',
                textStyle: {
                    color: '#000000',
                },
                style: {
                    backgroundColor: '#ffffff',
                },
            },
            cancel: {
                underlayColor: '#ffffff',
                borderColor: '#d9dcdd',
                textStyle: {
                    color: '#000000',
                },
                backgroundColor: '#ffffff',
            },
        }
        momentDurationFormatSetup(moment)
        this.tick = this.tick.bind(this)
    }

    componentDidMount() {
        const remainingTime =
            typeof this.props.remainingTime === 'undefined'
                ? this.state.remainingTime
                : this.props.remainingTime

        this.setState({
            counter: remainingTime,
            originalCounter: remainingTime,
            initialState: true,
            progress: 0,
            play: true,
            pause: false,
            stop: true,
            resume: false,
            interval: remainingTime,
            remainingTime: remainingTime,
        })
    }

    componentDidUpdate(prevProps) {
        const remainingTime = this.state.remainingTime
        if (this.state.originalCounter != remainingTime) {
            this.setState({
                counter: remainingTime,
                originalCounter: remainingTime,
                initialState: true,
                progress: 0,
                play: true,
                pause: false,
                stop: true,
                resume: false,
                interval: remainingTime,
            })
        }
        if (
            typeof this.props.remainingTime !== 'undefined' &&
            typeof prevProps.remainingTime !== 'undefined' &&
            prevProps.remainingTime !== this.props.remainingTime
        ) {
            this.setState({
                counter: this.props.remainingTime,
                originalCounter: this.props.remainingTime,
                interval: this.props.remainingTime,
                remainingTime: this.props.remainingTime,
            })
        }
    }

    tick() {
        if (this.state.initialState) {
            const originalCounter = this.state.interval
            const initCounter = originalCounter > 0 ? originalCounter - 1 : 0
            const initProgress =
                originalCounter > 0 ? 1 - initCounter / originalCounter : 0

            this.setState({
                initialState: false,
                counter: initCounter,
                originalCounter: originalCounter,
                play: false,
                stop: !this.state.stop,
                pause: true,
                resume: false,
                progress: initProgress,
            })
            return
        }

        if (this.state.counter <= 0) {
            this.setState({
                counter: 0,
                progress: 0,
                play: true,
                pause: false,
                resume: false,
            })
            this.releaseResources()
        } else {
            const counter = this.state.counter - 1
            const progress = 1 - counter / this.state.originalCounter
            this.setState({
                counter: counter,
                progress: progress,
            })
        }
    }

    _displayText() {
        return moment
            .duration(this.state.counter, 'seconds')
            .format('hh:mm:ss', { trim: false })
    }

    _play() {
        if (this.state.play) {
            this.setState({
                initialState: true,
                play: false,
                pause: true,
                resume: false,
            })
        } else if (this.state.pause) {
            this.releaseResources()
            this.setState({
                counter: this.state.counter,
                originalCounter: this.state.originalCounter,
                progress: this.state.progress,
                play: false,
                pause: false,
                resume: true,
            })
            return
        } else if (this.state.resume) {
            this.setState({
                counter: this.state.counter,
                originalCounter: this.state.originalCounter,
                progress: this.state.progress,
                play: false,
                pause: true,
                resume: false,
            })
        }

        timer.setInterval(this, 'tick', () => this.tick(), 1000)
    }

    _cancel() {
        this.releaseResources()
    }

    _showActionText() {
        if (this.state.pause) return 'Pause'
        else if (this.state.resume) return 'Resume'
        else return 'Start'
    }

    releaseResources() {
        try {
            timer.clearTimeout(this)
            timer.clearInterval(this)
            timer.cancelAnimationFrame(this)
            this.setState({
                counter: this.state.originalCounter,
                progress: 0,
                play: true,
                pause: false,
                stop: true,
                resume: false,
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {
            options = options == null ? this.defaultStyles : options,
            animated,
            borderColor,
            borderWidth,
            color,
            direction,
            fill,
            indeterminate,
            rotation,
            strokeCap,
            textStyle,
            thickness,
            unfilledColor,
            endAngle,
            allowFontScaling,
        } = this.props

        const size =
            typeof this.props.size === 'undefined' ? 350 : this.props.size
        const showsText =
            typeof this.props.showsText === 'undefined'
                ? true
                : this.props.showsText
        const formatText =
            typeof this.props.formatText === 'undefined'
                ? 'library'
                : this.props.formatText
        const formatTextFlag =
            typeof this.props.formatText === 'undefined' ? false : true

        const hideCancelCircle =
            typeof this.props.hideCancelCircle === 'undefined'
                ? false
                : this.props.hideCancelCircle
        const textCancelCircle =
            typeof this.props.textCancelCircle === 'undefined'
                ? 'Cancel'
                : this.props.textCancelCircle
        const sizeCancelCircle =
            typeof this.props.sizeCancelCircle === 'undefined'
                ? 100
                : this.props.sizeCancelCircle
        const underlayColorCancelCircle =
            typeof this.props.underlayColorCancelCircle === 'undefined'
                ? '#ffffff'
                : this.props.underlayColorCancelCircle

        const hideStartCircle =
            typeof this.props.hideStartCircle === 'undefined'
                ? false
                : this.props.hideStartCircle
        const textStartCircle =
            typeof this.props.textStartCircle === 'undefined'
                ? 'Start'
                : this.props.textStartCircle
        const sizeStartCircle =
            typeof this.props.sizeStartCircle === 'undefined'
                ? 100
                : this.props.sizeStartCircle
        const underlayColorStartCircle =
            typeof this.props.underlayColorStartCircle === 'undefined'
                ? '#ffffff'
                : this.props.underlayColorStartCircle

        const textStartCircleFlag =
            typeof this.props.textStartCircle === 'undefined' ? false : true

        return (
            <View>
                <View style={options.view}>
                    <Progress.Circle
                        animated={animated}
                        borderColor={borderColor}
                        borderWidth={borderWidth}
                        color={color}
                        direction={direction}
                        fill={fill}
                        formatText={(progress) =>
                            !formatTextFlag
                                ? this._displayText(progress)
                                : formatText
                        }
                        indeterminate={indeterminate}
                        progress={this.state.progress}
                        rotation={rotation}
                        showsText={showsText}
                        size={size}
                        strokeCap={strokeCap}
                        textStyle={textStyle}
                        thickness={thickness}
                        unfilledColor={unfilledColor}
                        endAngle={endAngle}
                        allowFontScaling={allowFontScaling}
                    />
                </View>
                <View style={options.view}>
                    {!hideCancelCircle && (
                        <TouchableHighlight
                            style={options.cancel}
                            underlayColor={underlayColorCancelCircle}
                            activeOpacity={1}
                            onPress={() => this._cancel()}
                        >
                            <Progress.Circle
                                animated={animated}
                                borderColor={borderColor}
                                borderWidth={borderWidth}
                                color={color}
                                direction={direction}
                                fill={fill}
                                formatText={() => textCancelCircle}
                                indeterminate={indeterminate}
                                progress={0}
                                rotation={rotation}
                                showsText={showsText}
                                size={sizeCancelCircle}
                                textStyle={textStyle}
                                thickness={thickness}
                                unfilledColor={unfilledColor}
                                endAngle={endAngle}
                                allowFontScaling={allowFontScaling}
                            />
                        </TouchableHighlight>
                    )}
                    {!hideStartCircle && (
                        <TouchableHighlight
                            style={options.play}
                            activeOpacity={1}
                            underlayColor={underlayColorStartCircle}
                            onPress={() => this._play()}
                        >
                            <Progress.Circle
                                animated={animated}
                                borderColor={borderColor}
                                borderWidth={borderWidth}
                                color={color}
                                direction={direction}
                                fill={fill}
                                formatText={() =>
                                    !textStartCircleFlag
                                        ? this._showActionText()
                                        : textStartCircle
                                }
                                indeterminate={indeterminate}
                                progress={0}
                                rotation={rotation}
                                showsText={showsText}
                                size={sizeStartCircle}
                                textStyle={textStyle}
                                thickness={thickness}
                                unfilledColor={unfilledColor}
                                endAngle={endAngle}
                                allowFontScaling={allowFontScaling}
                            />
                        </TouchableHighlight>
                    )}
                </View>
            </View>
        )
    }
}

export default React.memo(Timer)
