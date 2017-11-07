//检查自动更新   
function svn(t) {   
//  var xhr_svn = new plus.net.XMLHttpRequest();  
    var xhr_svn = new plus.net.XMLHttpRequest();
    
    xhr_svn.onreadystatechange = function(){   
        if (xhr_svn.readyState == 4) {   
            if (xhr_svn.status == 200) {   

                var res = xhr_svn.responseText;
                console.log(res);
                if(typeof res==='string'){
                		res = JSON.parse(res);
                };
                
                
//          		alert(res);
            		console.log(res);
                
                if (res.state == 'yes') {   
                    if (res.mark != t) {   
                        var upr;   
                        plus.nativeUI.confirm( "有新版本发布了，是否更新？", function(e){   
                            upr=(e.index==0)?"Y":"N";   
//                          console.log(upr);   
                            if(upr=="Y"){   
                            var wt = plus.nativeUI.showWaiting('下载更新中，请勿关闭');   
                            var url = res.url; // 下载文件地址   
                            var dtask = plus.downloader.createDownload(url, {}, function(d, status) {   
                                if (status == 200) { // 下载成功   
                                    var path = d.filename;   
                                    console.log(d.filename);   
                                    plus.runtime.install(path);   
                                } else { //下载失败   
                                    alert("Download failed: " + status);   
                                }   
                            });   
                            dtask.start();   
                            }else{   
                                   
                            }   
                        }, "打工580系统", ["确认","取消"] );   
                           
                           
                    } else {   
                        console.log('最新');   
                    }   
                }   
            } else {   
                plus.nativeUI.toast( "网络连接错误！");   
            }   
        }   
    }   
    xhr_svn.open("GET", "https://app.dagong580.cn/public/update.json",false);//这里的地址是上面json文件的地址   
    xhr_svn.send();   
   
}   
