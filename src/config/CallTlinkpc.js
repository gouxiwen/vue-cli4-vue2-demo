/* eslint-disable */
class Event {
    constructor() {
        // 创建一个事件对象
          this.events = Object.create(null);
        // events: {
		//	hehe: [(func)fn1,(func)fn2,...],
		//	haha: [(func)fn1,(func)fn2,...],
		//	....
		//	....
		//	}  
      }
      // 绑定事件
      on(name, fn) {
        // 没有该事件? 初始化处理函数数组为空
        if (!this.events[name]) {
            this.events[name] = []
          }
          // 否则push一个事件,
          this.events[name].push(fn);
          // 通知主程序解除绑定
          this.cbToTlink('on',name)
          // return 自身方便链式调用
          return this;
      }
      // 通知事件
      emit(name, ...args) {
      //没有该事件?不执行
        if (!this.events[name]) {
            return this;
        }
        const fns = this.events[name]
        //执行该事件对应的函数数组, 并传入参数
        fns.forEach(fn => fn.call(this, ...args))
        return this;
      }
      // 解绑事件
      off(name,fn) {
          // 通知主程序解除绑定
            this.cbToTlink('off',name)
        if (!this.events[name]) {
            return this;
        }
        // 没有指定解绑事件? 解绑所有
        if (!fn) {
           this.events[name] = null
           return this
        }
        // 否则找到该事件,解绑
        const index = this.events[name].indexOf(fn);
        this.events[name].splice(index, 1);
        return this;
      }
      // 单次绑定事件,执行完后解绑
      once(name,fn) {
        const only = () => {
          fn.apply(this, arguments);
          this.off(name, only);
          // 通知主程序解除绑定
            this.cbToTlink('off',name)
        };
        this.on(name, only);
        return this;
      }
  }
  class Call extends Event {
    resolve;
    reject
    constructor() {
        super()
        console.log('constructor')
        window.addEventListener("message", this.handleMessage, false); 
    }

    handleMessage(event) {
        // console.log(event)
        if (event.origin.includes('chrome-extension://') || event.origin.includes('http://localhost:')) {
            if (event.data.type === 'callback') {
                let fun = event.data.fun;
                callPc[`${fun}`](event.data.data)
            } else if (event.data.type === 'push') {
                // 根据推送类型进行处理
                callPc.handlePush(event.data.fun, event.data.data)
            }
        }
    }

    handlePush(fun, data) {
        console.log(fun)
        console.log(this.events[fun])
        if (this.events[fun] && this.events[fun].length > 0) {
            this.emit(fun, data)
        } else {
            // 没有监听事件，直接返回确认
            callPc.cbToTlink(fun, true)
        }
    }
    
    async callTlinkpc(method, data = null) {
        if (navigator.userAgent.includes('gc_teamwork_pc')) {
			if (method === 'initMultiple') {
				try {
					let resArr = []
					for (const funItem of data) {
						let res = await this.callPromise(funItem)
						let resObj = {
							fun: funItem.fun,
							res
						}
						resArr.push(resObj)
					}
					return Promise.resolve(resArr)
				} catch (error) {
					return Promise.reject(error)
				}
			} else {
				window.location.href = `callTlinkpc?method=${method}&data=${JSON.stringify(data)}`
				return this.promise()
			}
        } else {
            return Promise.reject('请在Tlinkpc环境调用该方法')
		}
    }

    async callTlinkpc2(method, data = null) {
        if (navigator.userAgent.includes('gc_teamwork_pc')) {
			if (method === 'initMultiple') {
				try {
					let resArr = []
					for (const funItem of data) {
						let res = await this.callPromise2(funItem)
						let resObj = {
							fun: funItem.fun,
							res
						}
						resArr.push(resObj)
					}
					return Promise.resolve(resArr)
				} catch (error) {
					return Promise.reject(error)
				}
			} else {
                window.open(`callTlinkpc?method=${method}&data=${JSON.stringify(data)}`)
				return this.promise()
			}
        } else {
            return Promise.reject('请在Tlinkpc环境调用该方法')
		}
    }

    cbToTlink(method, data = null) {
        if (navigator.userAgent.includes('gc_teamwork_pc')) {
            window.location.href = `callTlinkpc?method=${method}&data=${JSON.stringify(data)}`
        } else {
           throw new Error('请在Tlinkpc环境调用该方法')
        }
    }

    cbToTlink2(method, data = null) {
        if (navigator.userAgent.includes('gc_teamwork_pc')) {
            window.open(`callTlinkpc?method=${method}&data=${JSON.stringify(data)}`)
        } else {
           throw new Error('请在Tlinkpc环境调用该方法')
        }
    }

    promise() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject
        })
    }

    async callPromise(funItem) {
        window.location.href = `callTlinkpc?method=${funItem.fun}&data=${JSON.stringify(funItem.data)}`
        return this.promise()
    }

    async callPromise2(funItem) {
        window.open(`callTlinkpc?method=${funItem.fun}&data=${JSON.stringify(funItem.data)}`)
        return this.promise()
    }

    // 获取用户信息
    getUserInfo_cb(data) {
        console.log(data)
       try {
            this.resolve(data)
       } catch (error) {
            this.reject(error)
       }
    }

    // 打开选人弹框
    openContactDialog_cb(data) {
        // console.log(data)
        try {
            this.resolve(data)
        } catch (error) {
            this.reject(error)
        }
    }

    // 预览下载附件
    downloadFile() {
        try {
            this.resolve()
        } catch (error) {
            this.reject(error)
        }
    }

    removeEventListener() {
        console.log('removeEventListener')
        // 窗口在刷新前只执行一次，不用移除
        // window.removeEventListener("message", this.handleMessage, false); 
    }
  }
  const callPc =  new Call()
export default callPc