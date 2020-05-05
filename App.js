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

let App: () => React$Node = () => {
  const [isname, setisname] = useState(false);
  const [status, setStatus] = useState(true);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);
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

  const getOrgList = async () => {
    let url = `http://www.khcaresys.com/api/CaseReportApi/RequestOrganizationData`;
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
        <SafeAreaView>
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
              {isname && (
                <Button
                  title={nowOrgChi}
                  titleStyle={{fontSize: 25,paddingEnd:25}}
                  buttonStyle={{backgroundColor: 'orange'}}
                  icon={<Icon name="refresh" size={25} color="white" />}
                  iconRight
                  onPress={() => {
                    setisname(false);
                  }}
                />
              )}
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
        </SafeAreaView>
      </>
    );
  } else if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size="large" />
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
