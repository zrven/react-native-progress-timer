import React, { Component } from 'react'
import {
    View,
    TouchableHighlight
} from 'react-native'
import * as moment from 'moment';
require('moment-duration-format')
import * as Progress from 'react-native-progress';
import timer from 'react-native-timer';

class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
          counter: 0,
          originalCounter: 0,
          initialState: true,
          progress:0,
          play: true,
          pause: false,
          stop: true,
          resume: false,
        };
        this.defaultStyles = {
            view: {
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                margin: 10
              },
              highlight: {
                backgroundColor: '#ffffff'
              },
              play: {
                underlayColor: '#ffffff',
                borderColor: '#d9dcdd',
                textStyle:{
                  color: '#000000'
                },
                style: {
                  backgroundColor: '#ffffff'
                }
              },
              cancel: {
                underlayColor: '#ffffff',
                borderColor: '#d9dcdd',
                textStyle:{
                  color: '#000000'
                },
                style: {
                  backgroundColor: '#ffffff'
                }
              }
          };
        this.tick = this.tick.bind(this);
    }

    tick() {  
        if(this.state.initialState) {
          this.setState({ 
            initialState: false,
            counter: this.state.interval, 
            originalCounter: this.state.interval,
            play: false, 
            stop: !this.state.stop, 
            pause: true,
            resume: false
          });
        }

        if(this.state.counter <= 0) {
            this.setState({ 
                counter: 0,
                progress: 0,
                play: true,
                pause: false,
                resume: false
            });
            this.releaseResources();
        } else {
            this.setState({ 
                counter: this.state.counter - 1,
                progress: 1 - this.state.counter/this.state.originalCounter
            });

            timer.setInterval(this, 'tick', () => this.tick(), 1000);
        }  
            
    }

    _displayText(){
        return moment.duration(this.state.counter, 'seconds').format('hh:mm:ss', { trim: false });
    }

    _play(){
        if(this.state.play){
            //this._stop();
            this.setState({
                initialState: true,
                interval: this.props.remainingTime,
                play: false,
                pause: true,
                resume: false
              })
        } else if(this.state.pause){
            this.releaseResources()
            this.setState({
                counter: this.state.counter,
                originalCounter: this.state.originalCounter,
                progress: this.state.progress,
                play: false,
                pause: false,
                resume: true
              })
            return;
        } else if(this.state.resume){
            this.setState({
                counter: this.state.counter,
                originalCounter: this.state.originalCounter,
                progress: this.state.progress,
                play: false,
                pause: true,
                resume: false
              })
        }

        timer.setInterval(this, 'tick', () => this.tick(), 1000);
    }

    _cancel(){
        this.releaseResources()
    }

    _showActionText(){
        if(this.state.pause)
            return 'Pause'
        else if(this.state.resume)
            return 'Resume'
        else 
            return 'Start'
    }

    releaseResources() {
        try{
            timer.clearTimeout(this);
            timer.clearInterval(this);
            timer.cancelAnimationFrame(this);
            this.setState({
            counter: 0,
                originalCounter: 0,
                progress: 0,
                pause: false,
                resume: false,
            })
        }catch(err){console.log(err)}
    }

    render() {
        const {
            remainingTime,
            options = (options==null) ? this.defaultStyles : options,
            animated,
            borderColor,
            borderWidth,
            color,
            children,
            direction,
            fill,
            formatText,
            indeterminate,
            progress,
            rotation,
            showsText,
            size,
            style,
            strokeCap,
            textStyle,
            thickness,
            unfilledColor,
            endAngle,
            allowFontScaling,
            ...restProps
          } = this.props;

        return (
            <View style={options.container}>
              <View style={options.view}>
                <Progress.Circle
                    animated={animated}
                    borderColor= {borderColor}
                    borderWidth= {borderWidth}
                    color={color}
                    children={children}
                    direction={direction}
                    fill={fill}
                    formatText={(progress) => this._displayText(progress)}
                    indeterminate={this.props.indeterminate}
                    progress={this.state.progress}
                    rotation={rotation}
                    showsText={showsText}
                    size={size}
                    style={style}
                    strokeCap={strokeCap}
                    textStyle={textStyle}
                    thickness={thickness}
                    unfilledColor={unfilledColor}
                    endAngle={unfilledColor}
                    allowFontScaling={allowFontScaling}
                  />
              </View>
              <View style={options.view}>
                <TouchableHighlight style={options.highlight.style} underlayColor={options.play.underlayColor} activeOpacity={1} onPress={() => this._cancel()}>
                        <Progress.Circle
                            textStyle={options.play.textStyle}
                            style={options.play.style}
                            size={100}
                            showsText={showsText}
                            animated={animated}
                            progress={0}
                            borderColor={options.play.borderColor}
                            borderWidth={options.play.borderWidth}
                            thickness={options.play.thickness}
                            formatText={(progress) => 'Cancel'}
                            indeterminate={false}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={options.highlight.style} activeOpacity={1} underlayColor={options.cancel.underlayColor} onPress={() => this._play()}>
                        <Progress.Circle
                            textStyle={options.cancel.textStyle}
                            style={options.cancel.style}
                            size={100}
                            showsText={showsText}
                            animated={animated}
                            progress={0}
                            borderColor={options.cancel.borderColor}
                            borderWidth={options.cancel.borderWidth}
                            thickness={options.cancel.thickness}
                            formatText={(progress) => this._showActionText()}
                            indeterminate={false}
                        />
                    </TouchableHighlight>
                </View>
          </View>
        );
    }
}

export default Timer