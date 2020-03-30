require("dotenv").config();
const DatabaseClass = require("./utils/Database");
const nodemailer = require("nodemailer");
const Database = new DatabaseClass();
const express = require("express");
const qs = require("qs");
const next = require("next");
const ab2b = require("arraybuffer-to-buffer");
const app = express();
const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();
const NodeGeocoder = require("node-geocoder");
const axios = require("axios");
const geocoder = NodeGeocoder({
	provider: "mapquest",
	apiKey: process.env.MAPQUEST
});
var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "covid19registry@gmail.com",
		pass: process.env.MAIL
	}
});
function str2ab(str) {
	var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

app.use(express.json({ limit: "50mb" }));
server.prepare().then(d => {
	app.get("/", handle);
	app.get("/public.pem", handle);
	app.get("/register", handle);
	app.get("/search", handle);
	app.get("/mail/*", handle);
	app.get("/_next/*", handle);
	app.post("/api/mail", (req, res) => {
		axios
			.post(
				"https://www.google.com/recaptcha/api/siteverify",
				qs.stringify({
					secret: process.env.CAPTCHA,
					response: req.body.captcha
				})
			)
			.then(d => {
				if (d.data.success) {
					Database.HealthRecord.findById(req.body._id).then(e => {
						let mail = Database.decrypt(e.email.toString(), e.token).toString();
						transporter
							.sendMail({
								to: mail,
								subject: req.body.subject,
								text: req.body.body,
								replyTo: req.body.email
							})
							.then(e => res.send(200));
					});
				} else {
					res.send(401);
				}
			});
	});
	app.post("/api/register", async (req, res) => {
		console.log(req.body);
		axios
			.post(
				"https://www.google.com/recaptcha/api/siteverify",
				qs.stringify({
					secret: process.env.CAPTCHA,
					response: req.body.captcha
				})
			)
			.then(async d => {
				console.log(d.data);
				if (d.data.success) {
					let record = req.body;
					let location = await geocoder.geocode(req.body.hospitalAddress);
					coords = [location[0].latitude, location[0].longitude];
					record.coords = coords;
					record.token = Buffer.from(record.token);
					Database.addRecord(record)
						.then(e => {
							res.sendStatus(200);
							transporter.sendMail({
								to: ["neel.redkar@outlook.com"],
								subject: "Patient Check",
								html: `
						<p>Hey Doctor!</p>
						<br/>
						<p>
						Thanks fo reaching out! Can you confirm this patient?
						</p>
						<ul>
							<li>Name: ${Database.decrypt(record.name, record.token).toString()}</li>
							<li>Email: ${Database.decrypt(record.email, record.token).toString()}</li>
							<li>Day Infected: ${new Date(record.dayInfected).toString()}</li>
							<li>Day Cured: ${new Date(record.dayCured).toString()}</li>
							<li>Blood Type: ${record.bloodType}</li>
							<li>Description: ${record.desc}</li>
						</ul>
						<p>
						And be sure to look at the attachments!
						</p>
						<h4>
						<a href="http://registry.neelr.dev/api/approve/${
									e.id
									}">Click here to approve the person!</a></h4>
						`,
								attachments: [
									{
										filename: "report.pdf",
										content: Buffer.from(
											Database.decrypt(record.report, record.token)
												.toString()
												.split("base64,")[1],
											"base64"
										)
									}
								]
							});
							console.log("doned");
						})
						.catch(e => console.log(e));
				} else {
					res.sendStatus(401);
				}
			});
	});
	app.get("/api/approve/:id", (req, res) => {
		console.log(req.params.id);
		let id = req.params.id;
		Database.approveRecord(id).then(d => res.send("Approved!"));
	});
	app.get("/api/getAll", (req, res) => {
		Database.HealthRecord.find({}).then(d => {
			let buff = d.map(v => Database.clean(v));
			res.send(buff);
		});
	});
	app.listen(process.env.PORT, () => console.log("on port " + process.env.PORT));
});
