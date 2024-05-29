# Glimpse
A better search engine for livestreams
## Why
Livestreaming is wildly popular. But on even the most popular sites - like Twitch, the Amazon-owned service - searching is a chore. Glimpse fixes that.
Glimpse draws from *both* Youtube Live and Twitch, giving you access to a unified streaming portal.
Glimpse also employs its own search engine for Twitch, letting you find content **without** digging through tags, categories, and completely unrelated streams.
## Tech
Glimpse is an experiment to determine the limits of proxying and scraping in browser. That's part of the reason that Glimpse may one day become unstable and deprecated. For now though, Glimpse runs only off of vanilla JS, HTML, and CSS. Proxying is done through [corsproxy.io](https://corsproxy.io), but that is highly subject to change as CORS proxies aren't meant to be used as extensively in production as they are in Glimpse.
## Support
Glimpse is a solo developed, open-source project. Supporting Glimpse allows me to continue maintaining and improving Glimpse.
  
<a href="https://www.buymeacoffee.com/rockwill"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=rockwill&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
### FAQ
- My search page is empty!  
*Because Glimpse has to scrape Twitch and Youtube to find you content independently of those services' search algorithms, it may sometimes fall prey to temporary CORS blocks.*
*If that didn't make sense to you, just know that either switching to a different browser, turning on Incognito mode, or refreshing a few times should fix the issue.*
- Is Glimpse free?  
*Glimpse is 100% free (and open source!). This is possible because we have <u>no</u> servers. Everything runs locally, on your computer. That also means no data mining and no privacy concerns.*
- Is Glimpse a livestreaming service?  
*No. Glimpse is basically a search engine for live streams. It only searches Twitch and Youtube - you can't stream on Glimpse itself.*
## Where
You could read more about Glimpse, or you could just try it out [here](https://glimpse.rockwill.dev).
