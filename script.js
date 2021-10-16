class URL {
  constructor(theURL) {
    this.urlObject = this.urlChopper(theURL);
  }
  urlChopper(str) {
    const protocol = /https?/,
      domain = /www\.?\w+\.[a-z]+/,
      tld = /(?<=www\.?\w+\.)[a-z]+/,
      url = /(?<=www\.?\w+\.[a-z]+)\/\S+(?=[?])/,
      queries = /(?<=[?])\S+/;

    return {
      domain: str.match(domain).toString(),
      protocol: str.match(protocol).toString(),
      tld: str.match(tld).toString(),
      url: str.match(url).toString(),
      queries: str
        .match(queries)
        .toString()
        .split("&")
        .map((element) => element.split("=")),
    };
  }

  get domain() {
    return this.urlObject.domain;
  }

  get protocol() {
    return this.urlObject.protocol;
  }

  get tld() {
    return this.urlObject.tld;
  }

  get url() {
    return this.urlObject.url;
  }

  get queries() {
    return this.urlObject.queries;
  }
}

let str =
  "https://www.google.com/books/edition/Algorithmic_Thinking/eY4HEAAAQBAJ?hl=en&gbpv=1&dq=algorithmic+thinking+a+problem-based+introduction";

let test = new URL(str);
console.log(test.urlObject);
