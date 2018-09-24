/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getSetting() {
        return new Promise((resolve, reject) =>{
             wx.getSetting({
                success: (res) => {
                    console.log("###########", res)
                    if(res.authSetting["scope.userInfo"]){
                        console.log("###true######")
                        resolve(true)
                    }else{
                        console.log("###false######")
                        resolve(false)
                    }
                }
            })
        })
    }

    setUserCloudStorage(KVDataList){
        return new Promise((resolve, reject) => {
        console.log("platform.js => 开始保存用户数据",KVDataList);
        wx.setUserCloudStorage({
          KVDataList: KVDataList,
          success: function (res) {
            console.log("platform.js => 保存用户数据成功");
            resolve();
          }
        })
      })
    }

    getUserCloudStorage(key_list){
        return new Promise((resolve, reject) => {
        wx.getUserCloudStorage({
          keyList: key_list,
          success:  (res) => {
            console.log("platform.js => 获取用户数据成功", res);
            resolve(res);
          }
        })
      })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            let sysInfo = wx.getSystemInfoSync();
            let sdkVersion = sysInfo.SDKVersion;
            //sdkVersion = sdkVersion.replace(/\./g, "");
            //sdkVersion = sdkVersion.substr(0, 3);
            //let sdkVersionNum = parseInt(sdkVersion);
            //console.log("platform获取用户授权:", sdkVersionNum);
            //if (sdkVersionNum >= 201) {
            if (sdkVersion >= "2.0.1") {
                let button = wx.createUserInfoButton({
                    type: 'text',
                    text: '点击获取账户授权',
                    style: {
                        left: 50,
                        top: 200,
                        width: 220,
                        height: 40,
                        lineHeight: 40,
                        backgroundColor: '#7f7f7f',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                })
                button.onTap((res) => {
                    if(res.userInfo){
                        console.log("用户授权:", res);
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                        var province = userInfo.province;
                        var city = userInfo.city;
                        var country = userInfo.country;
                        button.destroy();
                        resolve(userInfo);
                    }else{
                        wx.showModal({
                            title: '友情提醒',
                            content: '请允许微信获得授权!',
                            confirmText: "授权",
                            showCancel: false,
                            success: res => {
                                resolve(null);
                            }
                        });

                    }
                });
            }else {
                wx.getUserInfo({
                    withCredentials: true,
                    success: res => {
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                        var province = userInfo.province;
                        var city = userInfo.city;
                        var country = userInfo.country;
                        resolve(userInfo);
                    },
                    fail: res => {
                        wx.showModal({
                            title: '友情提醒',
                            content: '请允许微信获得授权!',
                            confirmText: "授权",
                            showCancel: false,
                            success: res => {
                                resolve(null);
                            }
                        });
                    }
                });
            }
        })
    }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();