const crypto = require("crypto");
const fs = require("fs");
const mongoose = require("mongoose");
const HealthRecordSchema = require("../schema/HealthRecord");
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class Database {
  HealthRecordReview = mongoose.model("HealthRecordReview", HealthRecordSchema);
  HealthRecord = mongoose.model("HealthRecordApproved", HealthRecordSchema);
  constructor() {
    this.privateKey = fs.readFileSync("./private.pem").toString();
    this.publicKey = fs.readFileSync("./public/public.pem").toString();
  }
  addRecord(record) {
    return this.HealthRecordReview.create(record);
  }
  async approveRecord(id) {
    let record = await this.HealthRecordReview.findById(id);
    await this.HealthRecordReview.deleteMany({ _id: id });
    let buffer = record;
    buffer.isNew = true;
    return this.HealthRecord.create(buffer);
  }
  decrypt(record, token) {
    let pass = crypto.privateDecrypt(this.privateKey, Buffer.from(token))
    let decipher = crypto.createDecipher("aes-256-ctr", pass)
    var dec = decipher.update(record, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  clean(document) {
    let record = document.toJSON()
    let buff = {};
    Object.keys(record).map(v => {
      switch (v) {
        case "dayInfected": buff[v] = record[v]
        case "dayCured": buff[v] = record[v]
        case "coords": buff[v] = record[v]
        case "bloodType": buff[v] = record[v]
        case "desc": buff[v] = record[v]
        case "_id": buff[v] = record[v]
      }
    })
    buff.coords.map((v, i) => {
      buff.coords[i] = (Math.random() * ((v - 0.05) - (v + 0.05)) + v + 0.05)
    })
    return buff
  }
};
