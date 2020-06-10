import axios from 'axios'
//通用接口服务
class Http {

    constructor() {
    }

    formatBody(jsonObj) {
        let paramArr = [];
        for (let key in jsonObj) {
            if (key !== "isNeedRequestParams") {
                paramArr.push(`${key}=${jsonObj[key]}`);
            }
        }
        return paramArr.join('&');
    }
    postJson(url, body) {
        return this.post(url, body, 'application/JSON')
    }
    post(url, body, ContentType = 'application/x-www-form-urlencoded') {
        let params = body
        if (ContentType === 'application/x-www-form-urlencoded') params = this.formatBody(body);
        return axios({
                method: 'POST',
                url: url,
                data: params, //this.formatBody(body),
                headers: {
                    'Content-Type': ContentType
                },
                timeout: 15000
            })
            .then(res => {
                if (res.data.code === '0') {
                    return Promise.resolve(res.data);
                }
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }

    get(url, body) {
        // let body1 = JSON.parse(JSON.stringify(body));
        // body1 = this.formatBody(body1);
        // let url_ = url;
        // if (!(typeof body === 'object' && !isNaN(body.length)) && body1) {

        //     if (!(/[\?]/g.test(url))) {
        //         url_ += "?" + body1;
        //     } else {
        //         url_ += "&" + body1;
        //     }
        // }
        // console.log(url_)
        return axios.get(url, {
                timeout: 5000,
                params: {
                    ...body
                }
            })
            .then(res => {
                if (res.data.code === '0') {
                    return Promise.resolve(res.data);
                }
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }
}

export default new Http();