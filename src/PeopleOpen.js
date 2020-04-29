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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';

import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import md5 from 'md5';
import moment from 'moment';
import DialogInput from 'react-native-dialog-input';

const PeopleOpen = props => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);
  const [IsAllDay, setIsAllDay] = useState(false);
  const [IsDinner, setIsDinner] = useState(false);
  const [IsBathe, setIsBathe] = useState(false);
  const [IsAccommodation, setIsAccommodation] = useState(false);
  const [todo, settodo] = useState(0);

  const [isADialogVisible, setisADialogVisible] = useState(false);
  const [isBDialogVisible, setisBDialogVisible] = useState(false);
  const [isCDialogVisible, setisCDialogVisible] = useState(false);
  const [isDDialogVisible, setisDDialogVisible] = useState(false);
  console.log("QQ",props.temp);


  const testApi = async () => {
    let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestService`;

    console.log(`Making submit request to: ${url}`);
    let md5People = md5(props.people.CaseIdentity);
    let now = new Date();
    let formatNow = moment(now).format('YYYY-MM-DDTHH:mm:ss');
    console.log('before hash', props.people.CaseIdentity);
    console.log('md5 Hash is', md5People);
    console.log('NOW', now, typeof now);
    console.log('FORMAT', formatNow, typeof formatNow);

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S01',
        Reporting: true,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('TEST AJAX', res);
        Alert.alert('成功', res.Message, [
          {
            text: '確定',
            onPress: () => {},
          },
        ]);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );
  };

  const testApi2 = async () => {
    let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestService`;

    console.log(`Making submit request to: ${url}`);
    let md5People = md5(props.people.CaseIdentity);
    let now = new Date();
    let formatNow = moment(now).format('YYYY-MM-DDTHH:mm:ss');
    console.log('before hash', props.people.CaseIdentity);
    console.log('md5 Hash is', md5People);
    console.log('NOW', now, typeof now);
    console.log('FORMAT', formatNow, typeof formatNow);

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S02',
        SignOut: true,
        AllDay: true,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('TEST2 AJAX', res);
        Alert.alert('成功', res.Message, [
          {
            text: '確定',
            onPress: () => {},
          },
        ]);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );
  };

  const postDataApi = async () => {
    let url = `http://daycare.southeastasia.cloudapp.azure.com:9800/api/CaseReportApi/RequestService`;
    let url2 = `http://slllc.health.1966.org.tw/api/CaseReport`;
    console.log(`Making submit 生理量測 request to: ${url}`);
    let md5People = md5(props.people.CaseIdentity);
    let now = new Date();
    let formatNow = moment(now).format('YYYY-MM-DDTHH:mm:ss');
    let IsHeartbeat = count5 === 0 ? false : true;
    let IsBloodPressure = count4 === 0 || count3 === 0 ? false : true;
    let IsTemperature = count === 0 ? false : true;
    console.log('before hash', props.people.CaseIdentity);
    console.log('md5 Hash is', md5People);
    console.log('FORMAT', formatNow, typeof formatNow);

    if (todo === 1) {
      const dataIn = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrgId: props.temp,
          IdentityId: md5People,
          ServiceDate: formatNow,
          ServiceCode: 'S01',
          Reporting: true,
          AllDay: IsAllDay,
        }),
      })
        .then(response => response.json())
        .then(res => {
          console.log('In AJAX', res);
        })
        .catch(err =>
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]),
        );

      const dataIn2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrgId: props.temp,
          IdentityId: md5People,
          ServiceDate: formatNow,
          ServiceCode: 'S01',
          Reporting: true,
          AllDay: IsAllDay,
        }),
      })
        .then(response => response.json())
        .then(res => {
          console.log('In AJAX', res);
        })
        .catch(err =>
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]),
        );

        const data2 = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S03',
        IsDinner: IsDinner,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA2222222 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data22 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S03',
        IsDinner: IsDinner,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA2 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data3 = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S04',
        IsBathe: IsBathe,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA3 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data32 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S04',
        IsBathe: IsBathe,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA3 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data4 = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S05',
        IsAccommodation: IsAccommodation,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA4444444 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data42 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S05',
        IsAccommodation: IsAccommodation,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA4 AJAX', res);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );
    }

    if (todo === 3) {
      const dataOut = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrgId: props.temp,
          IdentityId: md5People,
          ServiceDate: formatNow,
          ServiceCode: 'S02',
          SignOut: true,
          AllDay: true,
        }),
      })
        .then(response => response.json())
        .then(res => {
          console.log('Out AJAX', res);
        })
        .catch(err =>
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]),
        );

      const dataOut2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrgId: props.temp,
          IdentityId: md5People,
          ServiceDate: formatNow,
          ServiceCode: 'S02',
          SignOut: true,
          AllDay: true,
        }),
      })
        .then(response => response.json())
        .then(res => {
          console.log('Out AJAX', res);
        })
        .catch(err =>
          Alert.alert('網路異常，請稍後再試...', ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]),
        );
    }
    

    

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OrgId: props.temp,
        IdentityId: md5People,
        ServiceDate: formatNow,
        ServiceCode: 'S06',
        IsHeartbeat: IsHeartbeat,
        HeartbeatValue: count5,
        IsBloodPressure: IsBloodPressure,
        SystolicValue: count3,
        DiastolicValue: count4,
        IsTemperature: IsTemperature,
        TemperatureValue: count,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('POST S06 AJAX', res);
        Alert.alert('成功', res.Message, [
          {
            text: '確定',
            onPress: () => {
              goBackToPeople();
            },
          },
        ]);
      })
      .catch(err =>
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]),
      );

    const data10 = await fetch(
      'http://slllc.health.1966.org.tw/api/CaseReport',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrgId: props.temp,
          IdentityId: md5People,
          ServiceDate: formatNow,
          ServiceCode: 'S06',
          IsHeartbeat: IsHeartbeat,
          HeartbeatValue: count5,
          IsBloodPressure: IsBloodPressure,
          SystolicValue: count3,
          DiastolicValue: count4,
          IsTemperature: IsTemperature,
          TemperatureValue: count,
        }),
      },
    )
      .then(response => response.json())
      .then(res => {
        console.log('POST DATA10 AJAX', res);
        Alert.alert('成功', res.Message, [
          {
            text: '確定',
            onPress: () => {
              goBackToPeople();
            },
          },
        ]);
      })
      .catch(err => console.log('GGWP', err));
  };

  const goBackToPeople = () => {
    props.getPeopleList(props.temp);
    props.setStatus(true);
  };

  useEffect(() => {
    console.log('INTO PEOPLE');
    const nativeEventListener = DeviceEventEmitter.addListener('onStop', e => {
      console.log('NATIVE_EVENT', e.event);
      console.log('NATIVE_EVENT2', e.event2);
      setCount(Number(e.event));
      setCount2(Number(e.event2));
    });
    const nativeEventListener2 = DeviceEventEmitter.addListener('blood', e => {
      console.log('NATIVE_EVENT3', e.event3);
      console.log('NATIVE_EVENT4', e.event4);
      console.log('NATIVE_EVENT5', e.event5);
      setCount3(Number(e.event3));
      setCount4(Number(e.event4));
      setCount5(Number(e.event5));
    });

    return () => {
      console.log('LEAVE PEOPLE');
      nativeEventListener.remove();
      nativeEventListener2.remove();
    };
  }, []);

  const onButtonPress = () => {
    console.log('TESWQ');
    Alert.prompt(
      'Enter password',
      'Enter your password to claim your $1.5B in lottery winnings',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: password => console.log('OK Pressed, password: ' + password),
        },
      ],
      'secure-text',
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <DialogInput
          isDialogVisible={isADialogVisible}
          title={'請輸入額溫'}
          
          hintInput={'請在此輸入額溫'}
          cancelText={'取消'}
          submitText={'確定'}
          submitInput={inputText => {
            setCount(Number(inputText));
            setisADialogVisible(false);
          }}
          closeDialog={() => {
            setisADialogVisible(false);
          }}
        />
        <DialogInput
          isDialogVisible={isBDialogVisible}
          title={'請輸入收縮壓'}
          
          hintInput={'請在此輸入收縮壓'}
          cancelText={'取消'}
          submitText={'確定'}
          submitInput={inputText => {
            setCount3(Number(inputText));
            setisBDialogVisible(false);
          }}
          closeDialog={() => {
            setisBDialogVisible(false);
          }}
        />
        <DialogInput
          isDialogVisible={isCDialogVisible}
          title={'請輸入舒張壓'}
          
          hintInput={'請在此輸入舒張壓'}
          cancelText={'取消'}
          submitText={'確定'}
          submitInput={inputText => {
            setCount4(Number(inputText));
            setisCDialogVisible(false);
          }}
          closeDialog={() => {
            setisCDialogVisible(false);
          }}
        />
        <DialogInput
          isDialogVisible={isDDialogVisible}
          title={'請輸入心率值'}
          
          hintInput={'請在此輸入心率值'}
          cancelText={'取消'}
          submitText={'確定'}
          submitInput={inputText => {
            setCount5(Number(inputText));
            setisDDialogVisible(false);
          }}
          closeDialog={() => {
            setisDDialogVisible(false);
          }}
        />
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Button title={props.people.CaseName} titleStyle={{fontSize: 25}} />
            <CheckBox
              title="報到(量體溫)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={todo === 1}
              onPress={() => settodo(1)}
            />
            <CheckBox
              title="僅量體溫"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={todo === 2}
              onPress={() => settodo(2)}
            />
            {/*<CheckBox
              title="簽退(量體溫)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={todo === 3}
              onPress={() => settodo(3)}
            />*/}
          </View>
          <View
            style={todo === 0 ? {display: 'none'} : styles.sectionContainer}>
            <Button
              title={`額溫:    ${count}`}
              titleStyle={{fontSize: 25}}
              onPress={() => {
                setisADialogVisible(true);
              }}
            />
            {/*<Button
              title={`環境溫度:    ${count2}`}
              titleStyle={{fontSize: 25}}
            />*/}
            <Button
              title={`收縮壓:    ${count3}`}
              titleStyle={{fontSize: 25}}
              onPress={() => {
                setisBDialogVisible(true);
              }}
            />
            <Button
              title={`舒張壓:    ${count4}`}
              titleStyle={{fontSize: 25}}
              onPress={() => {
                setisCDialogVisible(true);
              }}
            />
            <Button
              title={`心率值:    ${count5}`}
              titleStyle={{fontSize: 25}}
              onPress={() => {
                setisDDialogVisible(true);
              }}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox
                center
                title="半日托"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={
                  todo !== 1 ? {display: 'none', width: '50%'} : {}
                }
                checked={!IsAllDay}
                onPress={() => setIsAllDay(false)}
              />
              <CheckBox
                center
                title="全日托"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={
                  todo !== 1 ? {display: 'none', width: '50%'} : {}
                }
                checked={IsAllDay}
                onPress={() => setIsAllDay(true)}
              />
            </View>

            <CheckBox
              center
              title="晚餐"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={IsDinner}
              containerStyle={
                  todo !== 1 ? {display: 'none'} : {}
                }
              onPress={() => setIsDinner(!IsDinner)}
            />
            <CheckBox
              center
              title="沐浴"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={IsBathe}
              containerStyle={
                  todo !== 1 ? {display: 'none'} : {}
                }
              onPress={() => setIsBathe(!IsBathe)}
            />
            <CheckBox
              center
              title="住宿"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={IsAccommodation}
              containerStyle={
                  todo !== 1 ? {display: 'none'} : {}
                }
              onPress={() => setIsAccommodation(!IsAccommodation)}
            />

            <Button
              title={'送出結果'}
              titleStyle={{fontSize: 25}}
              buttonStyle={{backgroundColor: 'orange',marginTop:24}}
              onPress={() => {
                Alert.alert('確定送出?', '', [
                  {
                    text: '取消',
                    onPress: () => {},
                  },
                  {
                    text: '確定',
                    onPress: () => {
                      postDataApi();
                    },
                  },
                ]);
              }}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Button
              title={'返回清單'}
              titleStyle={{fontSize: 25}}
              buttonStyle={{backgroundColor: 'orange'}}
              onPress={() => {
                goBackToPeople();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default PeopleOpen;
