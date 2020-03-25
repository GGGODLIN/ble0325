package com.bletestproject0323;

import android.os.Bundle;
import android.util.Log;

import com.dindon.ble.GtechBle;
import com.dindon.ble.GtechException;
import com.dindon.ble.deviceItems.BaseDevice;
import com.dindon.ble.deviceItems.FORA_D40;
import com.dindon.ble.deviceItems.FORA_IR40;
import com.dindon.ble.deviceItems.FORA_P80;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "bleTestProject0323";
  }
  private static final String TAG = MainActivity.class.getSimpleName();
  private GtechBle GtechBle;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GtechBle = new GtechBle(getApplication(), new dataResultCallback());
    Log.d(TAG, "onCreate");
  }

  @Override
  protected void onResume() {
    super.onResume();
    GtechException ge = GtechBle.startScan(new scanResultCallback());
    Log.d(TAG, ge.toString());
  }

  @Override
  protected void onPause() {
    super.onPause();
    GtechBle.stopScan();
  }

  @Override
  protected void onStop() {
    super.onStop();
    GtechBle.stopScan();
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    GtechBle.stopScan();
  }

  private class scanResultCallback implements GtechBle.scanResultCallback {

    @Override
    public void onScanning(Integer Type, BaseDevice baseDevice) {
      Log.d(TAG, "bleDevice :" + baseDevice.getName());
    }

    @Override
    public void onResult(GtechException ge) {
      Log.d(TAG, ge.toString());
    }
  }

  private class dataResultCallback implements GtechBle.dataResultCallback {

    @Override
    public void onSuccess(BaseDevice device) {
//            Log.d(TAG, "onSuccess" + device.getName());
      if (device instanceof FORA_D40) {
        FORA_D40 fora_d40 = ((FORA_D40) device);
        if (fora_d40.getDataType() == 1) {
          Log.d(TAG, String.format("%s => sys = %d, dia = %d, pulse = %d", fora_d40.getDataTime(), fora_d40.getSys(), fora_d40.getDia(), fora_d40.getPulse()));
        } else if (fora_d40.getDataType() == 2) {
          Log.d(TAG, String.format("%s => mode = %d, glucose = %d", fora_d40.getDataTime(), fora_d40.getMode(), fora_d40.getGlucose()));
        }
      }
      if (device instanceof FORA_IR40) {
        FORA_IR40 fora_ir40 = ((FORA_IR40) device);

        String stringValue = Double.toString(fora_ir40.getObjectTemperature()/10.0);
        String stringValue2 = Double.toString(fora_ir40.getAmbientTemperature()/10.0);

        WritableMap params = Arguments.createMap(); // add here the data you want to send
        params.putString("event", stringValue); // <- example
        params.putString("event2", stringValue2); // <- example

        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onStop", params);

        Log.d(TAG, String.format("%s => ObjectTemperature = %d, AmbientTemperature = %d", fora_ir40.getDataTime(), fora_ir40.getObjectTemperature(), fora_ir40.getAmbientTemperature()));
      }
      if (device instanceof FORA_P80) {
        FORA_P80 fora_p80 = ((FORA_P80) device);

        String stringValue3 = Double.toString(fora_p80.getSys());
        String stringValue4 = Double.toString(fora_p80.getDia());
        String stringValue5 = Double.toString(fora_p80.getPulse());

        WritableMap params = Arguments.createMap(); // add here the data you want to send
        params.putString("event3", stringValue3); // <- example
        params.putString("event4", stringValue4); // <- example
        params.putString("event5", stringValue5); // <- example

        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("blood", params);

        Log.d(TAG, String.format("%s => sys = %d, dia = %d, pulse = %d", fora_p80.getDataTime(), fora_p80.getSys(), fora_p80.getDia(), fora_p80.getPulse()));
      }
    }

    @Override
    public void onFailure(GtechException ge) {
      Log.d(TAG, ge.toString());
    }
  }


  private class connectRossmaxCallback implements GtechBle.connectRossmaxCallback {

    @Override
    public void onConnectionReady(GtechException ge) {

    }

    @Override
    public void onTimeoutExpired(GtechException ge) {

    }

    @Override
    public void onDisconnected(GtechException ge) {

    }
  }
}
