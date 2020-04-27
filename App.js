/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  Alert,
  BackHandler,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PeopleOpen from './src/PeopleOpen.js';
import {request, PERMISSIONS} from 'react-native-permissions';

const App: () => React$Node = () => {
  const [status, setStatus] = useState(true);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);
  const [people, setpeople] = useState({});
  const [orgId, setorgId] = useState('SIHU');

    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        console.log('PERMISSION?', result);
      })
      .then(() => {
        request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
          .then(result => {
            console.log('PERMISSION2?', result);
          })

      });
  const getPeopleList = async (input) => {
    let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/Api/CaseReportApi/RequestOrgCaseData`;
    console.log(`Making List request to: ${url}`);

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: input,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('List AJAX', res);
        if (res.ErrorCode === 'E00') {
          setdata(res);
          setloading(false);
        } else {
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {
                console.log(res);
                getPeopleList();
              },
            },
          ]);
        }
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {
              console.log('ERR2',err);
              getPeopleList();
            },
          },
        ]),
      );
  };

  useEffect(() => {
    getPeopleList('SIHU');
    console.log('INTO LIST');
    const backAction = () => {
      Alert.alert('確定要離開APP?', ' ', [
        {
          text: '取消',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '確定', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      console.log('LEAVE LIST');
      backHandler.remove();
    };
  }, []);

 if (!loading && status) {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Button
                title={orgId==='SIHU'?'西湖':'內湖'}
                titleStyle={{fontSize: 25}}
                buttonStyle={{backgroundColor: 'orange'}}
                onPress={() => {
                  let change = orgId==='SIHU'?'NEIHU':'SIHU';
                  setorgId(change);
                  setloading(true);
                  getPeopleList(change);

                }}
              />
              {data.CaseData.map((val, index) => {
                return (
                  <View style={styles.sectionContainer}>
                  <Button
                    title={val.CaseName}
                    titleStyle={{fontSize: 25}}
                    onPress={() => {
                      setStatus(false);
                      setpeople(val);
                    }}
                  />
                  </View>
                );
              })}


            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  else if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size='large' />
      </View>
    );
  }else {
    return <PeopleOpen setStatus={setStatus} getPeopleList={getPeopleList} temp={orgId} people={people}/>;
  }
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
    marginTop: 10,
    marginBottom: 10,
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
