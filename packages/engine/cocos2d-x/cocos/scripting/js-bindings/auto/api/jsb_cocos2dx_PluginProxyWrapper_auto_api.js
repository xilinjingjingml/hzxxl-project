/**
 * @module cocos2dx_PluginProxyWrapper
 */
var jsb = jsb || {};

/**
 * @class PluginProxyWrapper
 */
jsb.PluginProxyWrapper = {

/**
 * @method showAds
* @param {String|int} str
* @param {int} int
* @param {int} int
*/
showAds : function(
int,
int,
int 
)
{
},

/**
 * @method StartPhoneVibrate
 * @param {String} arg0
 */
StartPhoneVibrate : function (
str 
)
{
},

/**
 * @method voiceOver
 * @param {String} arg0
 */
voiceOver : function (
str 
)
{
},

/**
 * @method getIsPushOn
 * @return {bool}
 */
getIsPushOn : function (
)
{
    return false;
},

/**
 * @method setStatusBarIsHidden
 * @param {bool} arg0
 */
setStatusBarIsHidden : function (
bool 
)
{
},

/**
 * @method switchPluginXRunEnv
 * @param {int} arg0
 */
switchPluginXRunEnv : function (
int 
)
{
},

/**
 * @method setPackageName
 * @param {String} arg0
 */
setPackageName : function (
str 
)
{
},

/**
 * @method getSystemContactInfos
 */
getSystemContactInfos : function (
)
{
},

/**
 * @method getBatteryLevel
 * @return {float}
 */
getBatteryLevel : function (
)
{
    return 0;
},

/**
 * @method copyToClipboard
 * @param {String} arg0
 */
copyToClipboard : function (
str 
)
{
},

/**
 * @method jump2ExtendMethod
 * @param {int} arg0
 * @param {String} arg1
 */
jump2ExtendMethod : function (
int, 
str 
)
{
},

/**
 * @method getSDKVersion
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @return {String}
 */
getSDKVersion : function (
str, 
int, 
int 
)
{
    return ;
},

/**
 * @method loadImageFinished
 * @param {String} arg0
 */
loadImageFinished : function (
str 
)
{
},

/**
 * @method setIapCallBack
 * @param {function} arg0
 */
setIapCallBack : function (
func 
)
{
},

/**
 * @method getMacAddress
 * @return {String}
 */
getMacAddress : function (
)
{
    return ;
},

/**
 * @method getDeviceIMEI
 * @return {String}
 */
getDeviceIMEI : function (
)
{
    return ;
},

/**
 * @method setPluginConfig
 * @param {String} arg0
 */
setPluginConfig : function (
str 
)
{
},

/**
 * @method PluginLog
 * @param {String} arg0
 */
PluginLog : function (
str 
)
{
},

/**
 * @method getDeviceName
 * @return {String}
 */
getDeviceName : function (
)
{
    return ;
},

/**
 * @method getPluginVersion
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @return {String}
 */
getPluginVersion : function (
str, 
int, 
int 
)
{
    return ;
},

/**
 * @method SystemShare
 * @param {String} arg0
 */
SystemShare : function (
str 
)
{
},

/**
 * @method getDeviceIMSI
 * @return {String}
 */
getDeviceIMSI : function (
)
{
    return ;
},

/**
 * @method getStatusBarHeight
 * @return {float}
 */
getStatusBarHeight : function (
)
{
    return 0;
},

/**
 * @method getSocialURLParams
 * @return {String}
 */
getSocialURLParams : function (
)
{
    return ;
},

/**
 * @method getSimType
 * @return {String}
 */
getSimType : function (
)
{
    return ;
},

/**
 * @method stopSound
 */
stopSound : function (
)
{
},

/**
 * @method getReachability
 * @return {int}
 */
getReachability : function (
)
{
    return 0;
},

/**
 * @method getWIFILevel
 * @return {float}
 */
getWIFILevel : function (
)
{
    return 0;
},

/**
 * @method getVersionCode
 * @return {String}
 */
getVersionCode : function (
)
{
    return ;
},

/**
 * @method getVersionName
 * @return {String}
 */
getVersionName : function (
)
{
    return ;
},

/**
 * @method voiceStart
 * @param {String} arg0
 */
voiceStart : function (
str 
)
{
},

/**
 * @method sendSMS
 * @param {String} arg0
 */
sendSMS : function (
str 
)
{
},

/**
 * @method openURL
 * @param {String} arg0
 */
openURL : function (
str 
)
{
},

/**
 * @method hideAds
 * @param {int} arg0
 */
hideAds : function (
int 
)
{
},

/**
 * @method userItemsLogin
 * @param {String} arg0
 */
userItemsLogin : function (
str 
)
{
},

/**
 * @method payForProduct
 * @param {String} arg0
 */
payForProduct : function (
str 
)
{
},

/**
 * @method startUpdatingLocation
 */
startUpdatingLocation : function (
)
{
},

/**
 * @method getPackageName
 * @return {String}
 */
getPackageName : function (
)
{
    return ;
},

/**
 * @method getDeviceType
 * @return {String}
 */
getDeviceType : function (
)
{
    return ;
},

/**
 * @method getClipBoardContent
 */
getClipBoardContent : function (
)
{
},

/**
 * @method voiceWantToCancel
 */
voiceWantToCancel : function (
)
{
},

/**
 * @method logEvent
 * @param {int} arg0
 * @param {String} arg1
 * @param {String} arg2
 */
logEvent : function (
int, 
str, 
str 
)
{
},

/**
 * @method openGPS
 */
openGPS : function (
)
{
},

/**
 * @method logout
 */
logout : function (
)
{
},

/**
 * @method playSound
 * @param {String} arg0
 */
playSound : function (
str 
)
{
},

/**
 * @method loadPlugin
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 */
loadPlugin : function (
str, 
int, 
int 
)
{
},

/**
 * @method setSessionCallBack
 * @param {function} arg0
 */
setSessionCallBack : function (
func 
)
{
},

/**
 * @method StartPushSDKItem
 * @param {String} arg0
 */
StartPushSDKItem : function (
str 
)
{
},

/**
 * @method initHeadFace
 * @param {String} arg0
 */
initHeadFace : function (
str 
)
{
},

/**
 * @method pushToUser
 * @param {String} arg0
 */
pushToUser : function (
str 
)
{
},

/**
 * @method setSocialCallBack
 * @param {function} arg0
 */
setSocialCallBack : function (
func 
)
{
},

/**
 * @method clearSocialURLParams
 */
clearSocialURLParams : function (
)
{
},

/**
 * @method setAdsCallBack
 * @param {function} arg0
 */
setAdsCallBack : function (
func 
)
{
},

/**
 * @method openPush
 */
openPush : function (
)
{
},

/**
 * @method callPhone
 * @param {String} arg0
 */
callPhone : function (
str 
)
{
},

/**
 * @method getCurrentNetDBM
 * @return {float}
 */
getCurrentNetDBM : function (
)
{
    return 0;
},

/**
 * @method shareWithItems
 * @param {String} arg0
 */
shareWithItems : function (
str 
)
{
},

/**
 * @method exitApp
 */
exitApp : function (
)
{
},

/**
 * @method setPlatformCallBack
 * @param {function} arg0
 */
setPlatformCallBack : function (
func 
)
{
},

/**
 * @method getInstance
 * @return {PluginProxyWrapper}
 */
getInstance : function (
)
{
    return PluginProxyWrapper;
},

/**
 * @method PluginProxyWrapper
 * @constructor
 */
PluginProxyWrapper : function (
)
{
},

};
