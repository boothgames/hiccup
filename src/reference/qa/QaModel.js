export class QaModel {

    constructor(id="", question = "", options=[], answer="") {
        this._id = id;
        this._question = question;
        this._options = options;
        this._answer = answer;
    }

    get id() {
        return this._id;
    }

    get question() {
        return this._question;
    }

    get options() {
        return this._options;
    }

    get answer() {
        return this._answer;
    }
}