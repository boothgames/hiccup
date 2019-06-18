export default class QaModel {
  #id = 0;

  #question = '';

  #options = [];

  #answer = '';

  constructor(id = '', question = '', options = [], answer = '') {
    this.#id = id;
    this.#question = question;
    this.#options = options;
    this.#answer = answer;
  }

  get id() {
    return this.#id;
  }

  get question() {
    return this.#question;
  }

  get options() {
    return this.#options;
  }

  get answer() {
    return this.#answer;
  }
}