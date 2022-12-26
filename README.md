# react-native-progress-timer

React Native Timer component with progress indicator

![progress-timer-demo-1](https://gist.githubusercontent.com/zrven/95ca4faf2a470525e40decc27b1bc5d8/raw/08be119d6a72df1dbf615ea9e3ffbe51e3943b43/screenshot-1.png)
![progress-timer-demo-2](https://gist.githubusercontent.com/zrven/357e0464e05ee7588e4244a368e9f8b6/raw/e4b75ece824bc3f2be2a27a07da913c49ebb6b5e/screenshot-2.png)

## Installation

`$ npm install --save react-native-progress react-native-svg @react-native-community/art react-native-progress-timer`

## Usage

```js
import Timer from 'react-native-progress-timer';
<Timer
    remainingTime={10}
    size={350}
    showsText={true}
    animated={true}
    direction={'counter-clockwise'}
    borderColor={'#d9dcdd'}
    borderWidth={3}
    thickness={5}
    color={'#faac02'}
    style={options.style}
    textStyle={options.textStyle}
    options={options}
></Timer>
```

### Properties for Options

| Prop            | Description                             | Default                                                                                                              |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **`view`**      | Style for Container                     | `{flexDirection: 'row', justifyContent: 'space-between', margin: 10}`                                                |
| **`highlight`** | Style for Touchable Highlight component | `{backgroundColor: '#ffffff'}`                                                                                       |
| **`play`**      | Style for Play component                | `{underlayColor: '#ffffff',borderColor: '#d9dcdd',textStyle:{color: '#000000'},style: {backgroundColor: '#ffffff'}}` |
| **`cancel`**    | Style for Cancel component              | `{underlayColor: '#ffffff',borderColor: '#d9dcdd',textStyle:{color: '#000000'},style: {backgroundColor: '#ffffff'}}` |

### Properties for Timer Component (for more information refer to react-native-progress)

| Prop                                 | Description                                                                                                                  | Default                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **`animated`**                       | Whether or not to animate changes to `progress`.                                                                             | `true`                 |
| **`indeterminate`**                  | If set to true, the indicator will spin and `progress` prop will be ignored.                                                 | `false`                |
| **`indeterminateAnimationDuration`** | Sets animation duration in milliseconds when indeterminate is set.                                                           | `1000`                 |
| **`color`**                          | Fill color of the indicator.                                                                                                 | `rgba(0, 122, 255, 1)` |
| **`unfilledColor`**                  | Color of the remaining progress.                                                                                             | _None_                 |
| **`borderWidth`**                    | Width of outer border, set to `0` to remove.                                                                                 | `1`                    |
| **`borderColor`**                    | Color of outer border.                                                                                                       | `color`                |
| **`size`**                           | Diameter of the circle.                                                                                                      | `350`                   |
| **`endAngle`**                       | Determines the endAngle of the circle. A number between `0` and `1`. The final endAngle would be the number multiplied by 2π | `0.9`                  |
| **`thickness`**                      | Thickness of the inner circle.                                                                                               | `3`                    |
| **`showsText`**                      | Whether or not to show a text representation of current progress.                                                            | `true`                |
| **`textStyle`**                      | Styles for progress text, defaults to a same `color` as circle and `fontSize` proportional to `size` prop.                   | `{ color: '#000000'}`                 |
| **`allowFontScaling`**               | Whether or not to respect device font scale setting.                                                                         | `true`                 |
| **`direction`**                      | Direction of the circle `clockwise` or `counter-clockwise`.                                                                  | `clockwise`            |
| **`strokeCap`**                      | Stroke Cap style for the circle `butt`, `square` or `round`.                                                                 | `butt`                 |
| **`fill`**                           | Fill color of the inner circle.                                                                                              | `None` (transparent)     |
| **`remainingTime`**                           | Timer countdown - Mandatory                                                                                             | `0`     |
| **`hideCancelCircle`**                           | Hide cancel circle                                                                                             | `false`     |
| **`textCancelCircle`**                           | Cancel circle text                                                                                             | `Cancel`     |
| **`sizeCancelCircle`**                           | Cancel circle size                                                                                             | `100`     |
| **`underlayColorCancelCircle`**                 | Cancel circle underlay color Mandatory                                                                                             | `#ffffff`     |
| **`hideStartCircle`**                           | Hide start circle                                                                                             | `false`    |
| **`textStartCircle`**                           | Start circle text                                                                                              | `Start`     |
| **`sizeStartCircle`**                           | Start circle size                                                                                             | `100`     |
| **`underlayStartCancelCircle`**                 | Cancel circle underlay color               |     `#ffffff`      |

## Example

```js
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Timer from 'react-native-progress-timer'

const App: () => React$Node = () => {
    return (
        <>
            <SafeAreaView>
                <View style={styles.body}>
                    <Timer
                        remainingTime={10}
                        size={350}
                        showsText={true}
                        animated={true}
                        direction={'counter-clockwise'}
                        borderColor={'#d9dcdd'}
                        borderWidth={3}
                        thickness={5}
                        color={'#faac02'}
                        style={options.style}
                        textStyle={options.textStyle}
                    ></Timer>
                </View>
            </SafeAreaView>
        </>
    )
}

const options = {
    style: {
        margin: 'auto',
    },
    textStyle: {
        color: '#000000',
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    highlight: {
        backgroundColor: '#ffffff',
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
        style: {
            backgroundColor: '#ffffff',
        },
    },
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        alignContent: 'center',
    },
})
```
