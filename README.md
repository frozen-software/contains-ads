# Contains Ads

Checks if the specified URL is an ad. Fork of `is-ad`/`contains-ads`. I forked this for use in Skate Browser

```sh
$ npm i frozen-software/contains-ads
```

```js
const { client, initialize, containsAds } = require('contains-ads');

initialize().then(() => {

  // Easylist is the default, but you can add custom rules.
  // Visit ABP for more information (https://adblockplus.org/filters).
  client.parse('||blacklistwebsite.com')
  client.parse('@@||whitelistwebsite.com');
  
  containsAds('http://www.twitter.com');          // False
  containsAds('http://www.blabal.com&ad_type_');  // True
});
```

```
# Development commands -
$ npm test          # Runs the tests
$ npm build         # Parses the list of blocked sites
$ npm run update    # Updates the list of blocked sites
```
