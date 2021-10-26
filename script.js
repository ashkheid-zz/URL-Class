class URL {
  constructor(theURL) {
    this.urlObject = this.urlChopper(theURL);
  }
  urlChopper(str) {
    const protocolRegEx = /https?/,
      domainRegEx = /(www\.)?\w+\.[a-z]+/,
      tldRegEx = /(?<=(www\.)?\w+\.)[a-z]+/,
      urlRegEx = /(?<=(www\.)?\w+\.[a-z]+)\/\S+(?=[?])/,
      queriesRegEx = /(?<=[?])\S+/;

    const urlParts = {
      domain: str.match(domainRegEx).toString(),
      protocol: str.match(protocolRegEx).toString(),
      tld: str.match(tldRegEx).toString(),
      url: str.match(urlRegEx).toString(),
      queries: Object.fromEntries(
        str
          .match(queriesRegEx)
          .toString()
          .split('&')
          .map((element) => element.split('='))
      ),
      isActive: Boolean(this.isUrlActive(str)),
    };

    return urlParts;
  }

  get getDomain() {
    return this.urlObject.domain;
  }

  get getProtocol() {
    return this.urlObject.protocol;
  }

  get getTld() {
    return this.urlObject.tld;
  }

  get getUrl() {
    return this.urlObject.url;
  }

  get getQueries() {
    return this.urlObject.queries;
  }

  async isUrlActive(str) {
    let check;
    await fetch(str).then(res => check = res.status);
    return check === 200;
  }
}

let str = 'https://reqres.in/api/users?page=2';

let test = new URL(str);
console.log(test.urlObject);