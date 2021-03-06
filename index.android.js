/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FigureView from './FigureView';
import imageData from './ImageData.json';

export default class FigureViewMain extends Component {


   onPageClick(index){
      console.log("点击了".concat(index));
  }


  render() {
    return (
      <View style={styles.container}>
        <FigureView
            imgArr={imageData.data}
            figureHeight={120}
            dotPlace='right'
            dotDefaultColor="white"
            dotSelectedColor="blue"
            dotRadius={5}
            dotMargin={5}
            dotParentStyle={{paddingRight:10}}
            isHasDotBackground={true}
            dotBackgroundHeight={30}
            dotBackgroundColor="#55555599"
            autoTime={2000}
            isAutoPlay={true}
            onPageClick={this.onPageClick}
            isHasTitle={true}
            titleStyle={{color:'orange',fontSize:12,fontWeight:'400',paddingLeft:10}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('FigureView', () => FigureViewMain);
