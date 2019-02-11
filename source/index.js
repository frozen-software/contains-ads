const fs = require('fs');
const path = require('path');
const Blocker = require('ad-block');

const client = new Blocker.AdBlockClient();
module.exports.client = client;

const read = (file, resolve, reject) => {
	fs.readFile(file, (err, buffer) => {
		if (err) { return reject(err); }
		client.deserialize(buffer);
		return resolve();
	});
};

const shouldBlockInit = (opts) => new Promise((resolve, reject) => {
	const p = opts.privacy || false;
	const a = opts.ads || false;
	var done = 0;

	// It's a bit trashy right now but I only had a few minutes.

	if (a) {
		read(path.resolve(__dirname, 'ads.buffer'), () => {
			done++;

			if (done === 2) resolve();
		});
	}
	if (p) {
		read(path.resolve(__dirname, 'privacy.buffer'), () => {
			done++;

			if (done === 2) resolve();
		})
	}
	if (!a && !p) {
		reject()
	}
});
module.exports.initialize = shouldBlockInit;

const none = Blocker.FilterOptions.noFilterOption;
const isAd = (req, base) => client.matches(req, none, base);
module.exports.containsAds = (req, base) => isAd(req, base);
module.exports.isAd = isAd;
