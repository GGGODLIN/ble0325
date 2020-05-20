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
import codePush from 'react-native-code-push';
import AsyncStorage from '@react-native-community/async-storage';

let App: () => React$Node = () => {
  const [isname, setisname] = useState(false);
  const [status, setStatus] = useState(true);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);
  const [countDown, setcountDown] = useState('讀取中...');
  const [people, setpeople] = useState({});
  const [orgId, setorgId] = useState([]);
  const [nowOrg, setnowOrg] = useState('');
  const [nowOrgChi, setnowOrgChi] = useState('');


  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then(result => {
      console.log('PERMISSION?', result);
    })
    .then(() => {
      request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
        console.log('PERMISSION2?', result);
      });
    });

  const getAllKeys = async () => {
    let keys = [];
    let url = `http://www.khcaresys.com/api/CaseReportApi/RequestService`;
    //let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestService`;
    let url2 = `http://slllc.health.1966.org.tw/api/CaseReport`;
    let isError = false;

    try {
      setloading(true);
      keys = await AsyncStorage.getAllKeys();
      console.log('ASYNC KEYS', keys,keys.length);
      let keyLength = keys.length;
      setcountDown(keyLength);
      for (let i in keys) {
        //console.log(keys[i]);
        let res = await AsyncStorage.getItem(keys[i]);
        let jsonRes = JSON.parse(res);
        let allRequest = Object.keys(jsonRes);
        //console.log(allRequest);
        if (jsonRes.todo == 1) {
          for (let j in allRequest) {
            let req = allRequest[j];
            if (req !== 'todo') {
              let promise = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonRes[req]),
              })
                .then(function(response) {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  //console.log(response);
                  return response.json(); // 轉換成 JSON 再傳入下一個 then 中處理
                })
                .catch(function(error) {
                  console.warn(error);
                  isError = true;
                });

              let promise2 = await fetch(url2, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonRes[req]),
              })
                .then(function(response) {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  //console.log(response);
                  return response.json(); // 轉換成 JSON 再傳入下一個 then 中處理
                })
                .catch(function(error) {
                  console.warn(error);
                  isError = true;
                });
              console.log('todo===1', jsonRes[req],promise,promise2);
            }
          }
        } else {
          for (let j in allRequest) {
            let req = allRequest[j];
            if (req !== 'todo') {
              let promise = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonRes[req]),
              })
                .then(function(response) {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  //console.log(response);
                  return response.json(); // 轉換成 JSON 再傳入下一個 then 中處理
                })
                .catch(function(error) {
                  console.warn(error);
                  isError = true;
                });

              let promise2 = await fetch(url2, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonRes[req]),
              })
                .then(function(response) {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  //console.log(response);
                  return response.json(); // 轉換成 JSON 再傳入下一個 then 中處理
                })
                .catch(function(error) {
                  console.warn(error);
                  isError = true;
                });

              console.log('todo===3', jsonRes[req],promise,promise2);
            }
          }
        }
        keyLength -= 1;
        setcountDown(keyLength);
      }
      if (isError){
        throw new Error("網路異常");
      }
      Alert.alert('批次上傳完成!', `總共上傳了${keys.length}筆資料`, [
        {
          text: '確定',
          onPress: () => {
            clearAll();
          },
        },
      ]);
    } catch (e) {
      Alert.alert('批次上傳失敗!!!', e.message, [
        {
          text: '確定',
          onPress: () => {
            
          },
        },
      ]);
      console.warn(e);
      // read key error
    }
    setloading(false);
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.warn(e);
      // clear error
    }
    setcountDown('讀取中...');
    console.log('Done.');
  };

  const getOrgList = async () => {
    let url = `http://www.khcaresys.com/api/CaseReportApi/RequestOrganizationData`;
    //let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestOrganizationData`;
    console.log(`Making ORG request to: ${url}`);

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ParentId: 'SLLLC',
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('ORG AJAX', res);
        if (res?.ErrorCode === 'E00') {
          setorgId(res?.OrgData);
          setloading(false);
        } else {
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {
                console.log(res);
                getOrgList();
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
              console.log('ERR2', err);
              getOrgList();
            },
          },
        ]),
      );
  };

  const getPeopleList = async input => {
    let url = `http://www.khcaresys.com/api/CaseReportApi/RequestOrgCaseData`;
    //let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestOrgCaseData`;
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
                getPeopleList(input);
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
              console.log('ERR2', err);
              getPeopleList(input);
            },
          },
        ]),
      );
  };

  useEffect(() => {
    getOrgList();
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
        {isname && (
          <View>
            <React.Fragment>
              <Button
                title={nowOrgChi}
                titleStyle={{fontSize: 25, paddingEnd: 25}}
                buttonStyle={{backgroundColor: 'orange'}}
                icon={<Icon name="refresh" size={25} color="white" />}
                iconRight
                onPress={() => {
                  setisname(false);
                }}
              />
              <Button
                title="批次上傳"
                titleStyle={{fontSize: 25, paddingEnd: 25}}
                buttonStyle={{backgroundColor: 'green'}}
                icon={<Icon name="cloud-upload" size={25} color="white" />}
                iconRight
                onPress={() => {
                  Alert.alert('確定上傳?', '', [
                  {
                    text: '取消',
                    onPress: () => {},
                  },
                  {
                    text: '確定',
                    onPress: () => {
                      getAllKeys();
                    },
                  },
                ]);
                }}
              />
            </React.Fragment>
          </View>
        )}
        <View style={{flex: 1}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              {!isname &&
                orgId?.map((val, index) => {
                  return (
                    <View style={styles.sectionContainer}>
                      <Button
                        title={val.OrgName}
                        titleStyle={{fontSize: 25}}
                        onPress={() => {
                          setisname(true);
                          getPeopleList(val.OrgId);
                          setloading(true);
                          setnowOrg(val.OrgId);
                          setnowOrgChi(val.OrgName);
                        }}
                      />
                    </View>
                  );
                })}

              {isname &&
                data?.CaseData?.map((val, index) => {
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
        </View>
      </>
    );
  } else if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{fontSize:36}}>{countDown}</Text>
      </View>
    );
  } else {
    return (
      <PeopleOpen
        setStatus={setStatus}
        getPeopleList={getPeopleList}
        temp={nowOrg}
        people={people}
      />
    );
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

App = codePush({
  updateDialog: {
    title: 'APP有新版本，是否更新?',
    descriptionPrefix: '版本號',
    optionalUpdateMessage: ' ',
    optionalIgnoreButtonLabel: '下次再說',
    optionalInstallButtonLabel: '立即安裝並重啟!',
  },
  installMode: codePush.InstallMode.IMMEDIATE,
})(App);

export default App;
