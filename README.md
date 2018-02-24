## Installation

1. Download the repository, navigate to the application folder, and npm i. Great! You're most of the way there.

2. You will need to set the MONGOLAB_URI to the address of a mongo database. Mongolab works!

3. From the command prompt, type npm run start-dev and hit enter. The development version should start running with the react app on port 3000 and the express server on port 3100.

4. Now you just need to populate some information - see the mongoose model in /application/model for information about what your entries in MongoDB should look like. For every mongoDB entry, if you want it to appear, you need to have the "live" key set to true, and if you want an icon/your CRX/your XPI files to appear/be functional, you'll need to create a folder in the /application/public/database folder with the value of the corresponding "_id" key. The folder needs to have the icon, named icon.png, and the chrome/firefox versions of the extension, named dist.crx and dist.xpi respectively

## Examples

There's some screenshots in the /application/screenshots folder that show what it may look like in use.

## TO DO

A long list of things, but namely, I have yet to actually implement the server-side functionality for submitting extensions from the front end. That's next on the list - after that is setting up a feedback form that can automatically fire off emails from the express server to a designated list of admins. 
