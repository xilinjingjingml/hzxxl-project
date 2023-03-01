#include "scripting/js-bindings/auto/jsb_cocos2dx_PluginProxyWrapper_auto.hpp"
#include "scripting/js-bindings/manual/jsb_conversions.hpp"
#include "scripting/js-bindings/manual/jsb_global.h"
#include "external/sources/protocols/PluginProxyWrapper.h"

se::Object* __jsb_PluginProxyWrapper_proto = nullptr;
se::Class* __jsb_PluginProxyWrapper_class = nullptr;

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_showAds(se::State& s)
{
    CC_UNUSED bool ok = true;
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2( cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_showAds : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    do {
        if (argc == 1) {
            std::string arg0;
            ok &= seval_to_std_string(args[0], &arg0);
            if (!ok) { ok = true; break; }
            cobj->showAds(arg0);
            return true;
        }
    } while(false);

    do {
        if (argc == 3) {
            int arg0 = 0;
            do { int32_t tmp = 0; ok &= seval_to_int32(args[0], &tmp); arg0 = (int)tmp; } while(false);
            if (!ok) { ok = true; break; }
            int arg1 = 0;
            do { int32_t tmp = 0; ok &= seval_to_int32(args[1], &tmp); arg1 = (int)tmp; } while(false);
            if (!ok) { ok = true; break; }
            int arg2 = 0;
            do { int32_t tmp = 0; ok &= seval_to_int32(args[2], &tmp); arg2 = (int)tmp; } while(false);
            if (!ok) { ok = true; break; }
            cobj->showAds(arg0, arg1, arg2);
            return true;
        }
    } while(false);

    SE_REPORT_ERROR("wrong number of arguments: %d", (int)argc);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_showAds)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPhoneVibrate(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPhoneVibrate : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPhoneVibrate : Error processing arguments");
        cobj->StartPhoneVibrate(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPhoneVibrate)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceOver(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceOver : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceOver : Error processing arguments");
        cobj->voiceOver(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceOver)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getIsPushOn(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getIsPushOn : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->getIsPushOn();
        ok &= boolean_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getIsPushOn : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getIsPushOn)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setStatusBarIsHidden(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setStatusBarIsHidden : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        bool arg0;
        ok &= seval_to_boolean(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setStatusBarIsHidden : Error processing arguments");
        cobj->setStatusBarIsHidden(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setStatusBarIsHidden)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_switchPluginXRunEnv(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_switchPluginXRunEnv : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        int arg0 = 0;
        do { int32_t tmp = 0; ok &= seval_to_int32(args[0], &tmp); arg0 = (int)tmp; } while(false);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_switchPluginXRunEnv : Error processing arguments");
        cobj->switchPluginXRunEnv(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_switchPluginXRunEnv)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPackageName(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPackageName : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPackageName : Error processing arguments");
        cobj->setPackageName(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPackageName)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSystemContactInfos(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSystemContactInfos : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->getSystemContactInfos();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSystemContactInfos)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getBatteryLevel(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getBatteryLevel : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        float result = cobj->getBatteryLevel();
        ok &= float_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getBatteryLevel : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getBatteryLevel)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_copyToClipboard(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_copyToClipboard : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_copyToClipboard : Error processing arguments");
        cobj->copyToClipboard(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_copyToClipboard)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_jump2ExtendMethod(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_jump2ExtendMethod : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        int arg0 = 0;
        std::string arg1;
        do { int32_t tmp = 0; ok &= seval_to_int32(args[0], &tmp); arg0 = (int)tmp; } while(false);
        ok &= seval_to_std_string(args[1], &arg1);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_jump2ExtendMethod : Error processing arguments");
        cobj->jump2ExtendMethod(arg0, arg1);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_jump2ExtendMethod)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        std::string arg0;
        int arg1 = 0;
        int arg2 = 0;
        ok &= seval_to_std_string(args[0], &arg0);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[1], &tmp); arg1 = (int)tmp; } while(false);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[2], &tmp); arg2 = (int)tmp; } while(false);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion : Error processing arguments");
        std::string result = cobj->getSDKVersion(arg0, arg1, arg2);
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadImageFinished(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadImageFinished : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadImageFinished : Error processing arguments");
        cobj->loadImageFinished(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadImageFinished)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setIapCallBack(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setIapCallBack : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::function<void (std::string)> arg0;
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto lambda = [=](std::string larg0) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(1);
                    ok &= std_string_to_seval(larg0, &args[0]);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setIapCallBack : Error processing arguments");
        cobj->setIapCallBack(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setIapCallBack)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getMacAddress(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getMacAddress : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getMacAddress();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getMacAddress : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getMacAddress)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMEI(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMEI : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getDeviceIMEI();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMEI : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMEI)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPluginConfig(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPluginConfig : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPluginConfig : Error processing arguments");
        cobj->setPluginConfig(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPluginConfig)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_PluginLog(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_PluginLog : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_PluginLog : Error processing arguments");
        cobj->PluginLog(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_PluginLog)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceName(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceName : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getDeviceName();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceName : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceName)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        std::string arg0;
        int arg1 = 0;
        int arg2 = 0;
        ok &= seval_to_std_string(args[0], &arg0);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[1], &tmp); arg1 = (int)tmp; } while(false);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[2], &tmp); arg2 = (int)tmp; } while(false);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion : Error processing arguments");
        std::string result = cobj->getPluginVersion(arg0, arg1, arg2);
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_SystemShare(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_SystemShare : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_SystemShare : Error processing arguments");
        cobj->SystemShare(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_SystemShare)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMSI(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMSI : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getDeviceIMSI();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMSI : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMSI)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getStatusBarHeight(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getStatusBarHeight : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        float result = cobj->getStatusBarHeight();
        ok &= float_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getStatusBarHeight : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getStatusBarHeight)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSocialURLParams(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSocialURLParams : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getSocialURLParams();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSocialURLParams : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSocialURLParams)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSimType(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSimType : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getSimType();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSimType : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSimType)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_stopSound(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_stopSound : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->stopSound();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_stopSound)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getReachability(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getReachability : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getReachability();
        ok &= int32_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getReachability : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getReachability)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getWIFILevel(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getWIFILevel : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        float result = cobj->getWIFILevel();
        ok &= float_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getWIFILevel : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getWIFILevel)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionCode(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionCode : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getVersionCode();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionCode : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionCode)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionName(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionName : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getVersionName();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionName : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionName)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceStart(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceStart : Error processing arguments");
        cobj->voiceStart(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceStart)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_sendSMS(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_sendSMS : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_sendSMS : Error processing arguments");
        cobj->sendSMS(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_sendSMS)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openURL(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openURL : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openURL : Error processing arguments");
        cobj->openURL(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openURL)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_hideAds(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_hideAds : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        int arg0 = 0;
        do { int32_t tmp = 0; ok &= seval_to_int32(args[0], &tmp); arg0 = (int)tmp; } while(false);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_hideAds : Error processing arguments");
        cobj->hideAds(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_hideAds)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_userItemsLogin(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_userItemsLogin : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_userItemsLogin : Error processing arguments");
        cobj->userItemsLogin(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_userItemsLogin)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_payForProduct(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_payForProduct : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_payForProduct : Error processing arguments");
        cobj->payForProduct(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_payForProduct)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_startUpdatingLocation(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_startUpdatingLocation : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->startUpdatingLocation();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_startUpdatingLocation)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPackageName(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPackageName : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getPackageName();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPackageName : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPackageName)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceType(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceType : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getDeviceType();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceType : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceType)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getClipBoardContent(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getClipBoardContent : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->getClipBoardContent();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getClipBoardContent)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceWantToCancel(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceWantToCancel : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->voiceWantToCancel();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceWantToCancel)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logEvent(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logEvent : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        int arg0 = 0;
        std::string arg1;
        std::string arg2;
        do { int32_t tmp = 0; ok &= seval_to_int32(args[0], &tmp); arg0 = (int)tmp; } while(false);
        ok &= seval_to_std_string(args[1], &arg1);
        ok &= seval_to_std_string(args[2], &arg2);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logEvent : Error processing arguments");
        cobj->logEvent(arg0, arg1, arg2);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logEvent)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openGPS(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openGPS : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->openGPS();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openGPS)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logout(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logout : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->logout();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logout)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_playSound(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_playSound : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_playSound : Error processing arguments");
        cobj->playSound(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_playSound)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadPlugin(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadPlugin : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        std::string arg0;
        int arg1 = 0;
        int arg2 = 0;
        ok &= seval_to_std_string(args[0], &arg0);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[1], &tmp); arg1 = (int)tmp; } while(false);
        do { int32_t tmp = 0; ok &= seval_to_int32(args[2], &tmp); arg2 = (int)tmp; } while(false);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadPlugin : Error processing arguments");
        cobj->loadPlugin(arg0, arg1, arg2);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadPlugin)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSessionCallBack(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSessionCallBack : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::function<void (std::string)> arg0;
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto lambda = [=](std::string larg0) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(1);
                    ok &= std_string_to_seval(larg0, &args[0]);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSessionCallBack : Error processing arguments");
        cobj->setSessionCallBack(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSessionCallBack)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPushSDKItem(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPushSDKItem : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPushSDKItem : Error processing arguments");
        cobj->StartPushSDKItem(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPushSDKItem)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_initHeadFace(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_initHeadFace : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_initHeadFace : Error processing arguments");
        cobj->initHeadFace(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_initHeadFace)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_pushToUser(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_pushToUser : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_pushToUser : Error processing arguments");
        cobj->pushToUser(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_pushToUser)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSocialCallBack(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSocialCallBack : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::function<void (std::string)> arg0;
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto lambda = [=](std::string larg0) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(1);
                    ok &= std_string_to_seval(larg0, &args[0]);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSocialCallBack : Error processing arguments");
        cobj->setSocialCallBack(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSocialCallBack)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_clearSocialURLParams(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_clearSocialURLParams : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->clearSocialURLParams();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_clearSocialURLParams)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setAdsCallBack(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setAdsCallBack : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::function<void (std::string)> arg0;
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto lambda = [=](std::string larg0) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(1);
                    ok &= std_string_to_seval(larg0, &args[0]);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setAdsCallBack : Error processing arguments");
        cobj->setAdsCallBack(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setAdsCallBack)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openPush(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openPush : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->openPush();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openPush)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_callPhone(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_callPhone : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_callPhone : Error processing arguments");
        cobj->callPhone(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_callPhone)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getCurrentNetDBM(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getCurrentNetDBM : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        float result = cobj->getCurrentNetDBM();
        ok &= float_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getCurrentNetDBM : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getCurrentNetDBM)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_shareWithItems(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_shareWithItems : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_shareWithItems : Error processing arguments");
        cobj->shareWithItems(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_shareWithItems)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_exitApp(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_exitApp : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->exitApp();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_exitApp)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPlatformCallBack(se::State& s)
{
    PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPlatformCallBack : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::function<void (std::string)> arg0;
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto lambda = [=](std::string larg0) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(1);
                    ok &= std_string_to_seval(larg0, &args[0]);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPlatformCallBack : Error processing arguments");
        cobj->setPlatformCallBack(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPlatformCallBack)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getInstance(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        PluginProxyWrapper* result = PluginProxyWrapper::getInstance();
        ok &= native_ptr_to_seval<PluginProxyWrapper>((PluginProxyWrapper*)result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getInstance : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getInstance)

SE_DECLARE_FINALIZE_FUNC(js_PluginProxyWrapper_finalize)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_constructor(se::State& s)
{
    PluginProxyWrapper* cobj = new (std::nothrow) PluginProxyWrapper();
    s.thisObject()->setPrivateData(cobj);
    se::NonRefNativePtrCreatedByCtorMap::emplace(cobj);
    return true;
}
SE_BIND_CTOR(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_constructor, __jsb_PluginProxyWrapper_class, js_PluginProxyWrapper_finalize)

static bool js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_ctor(se::State& s)
{
    PluginProxyWrapper* cobj = new (std::nothrow) PluginProxyWrapper();
    s.thisObject()->setPrivateData(cobj);
    se::NonRefNativePtrCreatedByCtorMap::emplace(cobj);
    return true;
}
SE_BIND_SUB_CLS_CTOR(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_ctor, __jsb_PluginProxyWrapper_class, js_PluginProxyWrapper_finalize)


    


static bool js_PluginProxyWrapper_finalize(se::State& s)
{
    CCLOGINFO("jsbindings: finalizing JS object %p (PluginProxyWrapper)", s.nativeThisObject());
    auto iter = se::NonRefNativePtrCreatedByCtorMap::find(s.nativeThisObject());
    if (iter != se::NonRefNativePtrCreatedByCtorMap::end())
    {
        se::NonRefNativePtrCreatedByCtorMap::erase(iter);
        PluginProxyWrapper* cobj = (PluginProxyWrapper*)s.nativeThisObject();
        delete cobj;
    }
    return true;
}
SE_BIND_FINALIZE_FUNC(js_PluginProxyWrapper_finalize)

bool js_register_cocos2dx_PluginProxyWrapper_PluginProxyWrapper(se::Object* obj)
{
    auto cls = se::Class::create("PluginProxyWrapper", obj, nullptr, _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_constructor));

    cls->defineFunction("showAds", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_showAds));
    cls->defineFunction("StartPhoneVibrate", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPhoneVibrate));
    cls->defineFunction("voiceOver", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceOver));
    cls->defineFunction("getIsPushOn", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getIsPushOn));
    cls->defineFunction("setStatusBarIsHidden", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setStatusBarIsHidden));
    cls->defineFunction("switchPluginXRunEnv", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_switchPluginXRunEnv));
    cls->defineFunction("setPackageName", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPackageName));
    cls->defineFunction("getSystemContactInfos", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSystemContactInfos));
    cls->defineFunction("getBatteryLevel", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getBatteryLevel));
    cls->defineFunction("copyToClipboard", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_copyToClipboard));
    cls->defineFunction("jump2ExtendMethod", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_jump2ExtendMethod));
    cls->defineFunction("getSDKVersion", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSDKVersion));
    cls->defineFunction("loadImageFinished", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadImageFinished));
    cls->defineFunction("setIapCallBack", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setIapCallBack));
    cls->defineFunction("getMacAddress", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getMacAddress));
    cls->defineFunction("getDeviceIMEI", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMEI));
    cls->defineFunction("setPluginConfig", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPluginConfig));
    cls->defineFunction("PluginLog", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_PluginLog));
    cls->defineFunction("getDeviceName", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceName));
    cls->defineFunction("getPluginVersion", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPluginVersion));
    cls->defineFunction("SystemShare", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_SystemShare));
    cls->defineFunction("getDeviceIMSI", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceIMSI));
    cls->defineFunction("getStatusBarHeight", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getStatusBarHeight));
    cls->defineFunction("getSocialURLParams", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSocialURLParams));
    cls->defineFunction("getSimType", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getSimType));
    cls->defineFunction("stopSound", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_stopSound));
    cls->defineFunction("getReachability", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getReachability));
    cls->defineFunction("getWIFILevel", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getWIFILevel));
    cls->defineFunction("getVersionCode", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionCode));
    cls->defineFunction("getVersionName", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getVersionName));
    cls->defineFunction("voiceStart", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceStart));
    cls->defineFunction("sendSMS", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_sendSMS));
    cls->defineFunction("openURL", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openURL));
    cls->defineFunction("hideAds", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_hideAds));
    cls->defineFunction("userItemsLogin", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_userItemsLogin));
    cls->defineFunction("payForProduct", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_payForProduct));
    cls->defineFunction("startUpdatingLocation", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_startUpdatingLocation));
    cls->defineFunction("getPackageName", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getPackageName));
    cls->defineFunction("getDeviceType", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getDeviceType));
    cls->defineFunction("getClipBoardContent", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getClipBoardContent));
    cls->defineFunction("voiceWantToCancel", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_voiceWantToCancel));
    cls->defineFunction("logEvent", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logEvent));
    cls->defineFunction("openGPS", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openGPS));
    cls->defineFunction("logout", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_logout));
    cls->defineFunction("playSound", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_playSound));
    cls->defineFunction("loadPlugin", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_loadPlugin));
    cls->defineFunction("setSessionCallBack", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSessionCallBack));
    cls->defineFunction("StartPushSDKItem", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_StartPushSDKItem));
    cls->defineFunction("initHeadFace", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_initHeadFace));
    cls->defineFunction("pushToUser", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_pushToUser));
    cls->defineFunction("setSocialCallBack", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setSocialCallBack));
    cls->defineFunction("clearSocialURLParams", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_clearSocialURLParams));
    cls->defineFunction("setAdsCallBack", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setAdsCallBack));
    cls->defineFunction("openPush", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_openPush));
    cls->defineFunction("callPhone", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_callPhone));
    cls->defineFunction("getCurrentNetDBM", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getCurrentNetDBM));
    cls->defineFunction("shareWithItems", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_shareWithItems));
    cls->defineFunction("exitApp", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_exitApp));
    cls->defineFunction("setPlatformCallBack", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_setPlatformCallBack));
    cls->defineFunction("ctor", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_ctor));
    cls->defineStaticFunction("getInstance", _SE(js_cocos2dx_PluginProxyWrapper_PluginProxyWrapper_getInstance));
    cls->defineFinalizeFunction(_SE(js_PluginProxyWrapper_finalize));
    cls->install();
    JSBClassType::registerClass<PluginProxyWrapper>(cls);

    __jsb_PluginProxyWrapper_proto = cls->getProto();
    __jsb_PluginProxyWrapper_class = cls;

    jsb_set_extend_property("jsb", "PluginProxyWrapper");
    se::ScriptEngine::getInstance()->clearException();
    return true;
}

bool register_all_cocos2dx_PluginProxyWrapper(se::Object* obj)
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("jsb", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("jsb", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_cocos2dx_PluginProxyWrapper_PluginProxyWrapper(ns);
    return true;
}

