var express = require('express')
var app = express()
var nodemailer = require('nodemailer')
var formidable = require('formidable')

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'donotreply@intellicar.in',
	  pass: 'secret'
	}
});

var mailOptions = {
  from: 'do-not-reply@intellicar.com',
  to: 'rinoyrix@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

app.get('/', express.static('public'));

app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
		if(err) {
			res.send('error')
		} else {
			var file = files.file;
			mailOptions.attachments = [{filename:file.name,path:file.path}]
			transporter.sendMail(mailOptions, function(err, info) {
				if(err) {
					res.send('error sending mail')
				} else {
					res.send('mail sent')
				}
			})
		}
	})
})

app.listen(4000)
