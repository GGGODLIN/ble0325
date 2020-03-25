/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: () => React$Node = () => {
  const [count, setCount] = useState('0.0');
  const [count2, setCount2] = useState('0.0');
  const [count3, setCount3] = useState('0.0');
  const [count4, setCount4] = useState('0.0');
  const [count5, setCount5] = useState('0.0');


  const nativeEventListener = DeviceEventEmitter.addListener('onStop',
  (e)=>{
    console.log("NATIVE_EVENT",e.event);
    console.log("NATIVE_EVENT2",e.event2);
    setCount(e.event);
    setCount2(e.event2);
});
const nativeEventListener2 = DeviceEventEmitter.addListener('blood',
(e)=>{
  console.log("NATIVE_EVENT3",e.event3);
  console.log("NATIVE_EVENT4",e.event4);
  console.log("NATIVE_EVENT5",e.event5);
  setCount3(e.event3);
  setCount4(e.event4);
  setCount5(e.event5);
});
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
            <Button title={`額溫:    ${count}`} titleStyle={{fontSize: 25}}/>
            <Button title={`環境溫度:    ${count2}`} titleStyle={{fontSize: 25}}/>


            </View>



          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
            <Button title={`收縮壓:    ${count3}`} titleStyle={{fontSize: 25}}/>
            <Button title={`舒張壓:    ${count4}`} titleStyle={{fontSize: 25}}/>
            <Button title={`心率值:    ${count5}`} titleStyle={{fontSize: 25}}/>


            </View>



          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
