import axios from 'axios'

class HTTP  {
    constructor(url){
        this.url = url;
    }

    requestToken(token) {
        return axios.create({
            baseURL: this.url,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
    }

    request() {
        return axios.create({
            baseURL: this.url,
            headers: {
                "Content-type": "application/json"
            }
        });
    }
}

export default HTTP;