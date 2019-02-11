const fs = require('fs');
const path = require('path');
const winston = require('winston');
const Blocker = require('ad-block');

const read = (input, output) => {
	winston.info('Reading ' + input + '.');
	fs.readFile(input, 'utf8', (error, data) => {
		if (error) { winston.error(error) }

		const urls = data.split('\n');
		const totalSize = urls.length;

		winston.info('Parsing ' + totalSize + ' urls (this can take a couple minutes).');

		const client = new Blocker.AdBlockClient();

		urls.map(line => client.parse(line));
		winston.info('Created buffer.');
		fs.writeFile(output, client.serialize(64), (err) => {
			if (err) { winston.error(err); }
			winston.info('Wrote buffer to ' + input);
		});
	});
};

read(
	path.resolve(__dirname, 'ads.txt'),
	path.resolve(__dirname, '../source/ads.buffer')
);
read(
	path.resolve(__dirname, 'privacy.txt'),
	path.resolve(__dirname, '../source/privacy.buffer')
);