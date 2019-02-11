# Contains Ads

Forked for use in SkateBrowser.
Checks if the specified url is an ad. Fork of `contains-ads`. Now with EasyList and EasyPrivacy.

```sh
$ npm i frozen-software/contains-ads
```

```js
const { client, initialize, containsAds } = require('contains-ads');

initialize({
	// Use EasyPrivacy?
	privacy: true,
	// Use EasyList?
	ads: true
}).then(() => {
	// Easylist is the default, but you can add custom rules.
	// Visit ABP for more information (https://adblockplus.org/filters).
	client.parse('||blacklistwebsite.com')
	client.parse('@@||whitelistwebsite.com');
  
	containsAds('http://www.twitter.com');          // false
	containsAds('http://www.blabal.com&ad_type_');  // true
});
```

```
# Development commands -
$ npm test          # Runs the tests
$ npm build         # Parses the list of blocked sites
$ npm run update    # Updates the list of blocked sites
```
