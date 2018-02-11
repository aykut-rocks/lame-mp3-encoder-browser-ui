var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var zip = require('express-zip');
var Lame = require("node-lame").Lame;

app.use(express.static('public'));

app.post('/upload', function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let old_path = files.audio.path,
            file_size = files.audio.size,
            file_ext = files.audio.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.send('Error!');
                    } else {
                        res.status(200);
                        let params = {};
                        switch (fields['bitrate-mode']) {
                            case 'cbr':
                                params = {
                                    "output": path.join(process.env.PWD, '/uploads/', file_name + '.' + 'mp3'),
                                    "cbr": true,
                                    "bitrate": fields['cbr-quality'],
                                    "mode": fields['channel-mode']
                                };
                                break;
                            case 'vbr':
                                params = {
                                    "output": path.join(process.env.PWD, '/uploads/', file_name + '.' + 'mp3'),
                                    "vbr": true,
                                    "vbr-quality": fields['vbr-quality'],
                                    "mode": fields['channel-mode']
                                };
                                break;
                            case 'abr':
                                params = {
                                    "output": path.join(process.env.PWD, '/uploads/', file_name + '.' + 'mp3'),
                                    "abr": fields['abr-quality'],
                                    "mode": fields['channel-mode']
                                };
                                break;
                        }
                        
                        const encoder = new Lame(params).setFile(new_path);
                        encoder.encode()
                            .then(() => {
                                res.zip([
                                    { path: path.join(process.env.PWD, '/uploads/', file_name + '.' + 'mp3'), name: file_name + '.' + 'mp3' }
                                ]);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                });
            });
        });
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
