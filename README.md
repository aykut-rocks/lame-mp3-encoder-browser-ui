# lame mp3 encoder browser ui
simple browser user interface for the [lame mp3 encoder](http://lame.sourceforge.net/)

![Lame mp3 encoder browser ui](img/lame-browser-ui-screenshot.png)

## How To
- clone repository
- go to project root folder
- install dependencies with: npm install
- start server with: node app.js
- start browser and go to: localhost:3000

# usage
- select bitrate mode, select channel mode and set bitrate
- select audio file and click the encode button
- the file will be uploaded to the /uploads/ path, encoded to mp3 and downloaded as zip file in your /downloads/ folder

# possible improvements
- multiple file uploads
- zipped file has original file name
- better error handling
- files should be deleted on the server
