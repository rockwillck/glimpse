var searchParams = new URLSearchParams(window.location.href.replace(window.location.origin, "").replace(window.location.pathname, ""))

searchBar.value = searchParams.get("search")
const proxy = "https://corsproxy.io/?"

const endpointUrl = proxy + encodeURIComponent(`https://yewtu.be/search?q=${searchParams.get("search")}&features=live`)

var allCards = []

function loopArrayInPattern(arr, n) {
    const result = [];
    let segment1 = arr.slice(0, n);
    let segment2 = arr.slice(n);

    while (segment1.length > 0 || segment2.length > 0) {
        if (segment1.length > 0) {
            result.push(segment1.shift());
        }
        if (segment2.length > 0) {
            result.push(segment2.shift());
        }
    }

    return result;
}

// Fetch the HTML content from the backend
fetch(endpointUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(htmlContent => {
    // Handle the HTML content here
    htmlContent = htmlContent.replaceAll("\n", "").replaceAll("\t", "").replaceAll(">                <", "><").replaceAll(">            <", "><").replaceAll(">                            <", "><").replaceAll(">                        <", "><")
    let regex = /<div class="video-card-row"><a href="\/watch\?v=(.*?)"><p dir="auto">(.*?)<\/p><\/a><\/div>(.*?)<a href="(.*?)"><p class="channel-name" dir="auto">(.*?)<\/p><\/a>/g
    var matches = []
    var match

    while ((match = regex.exec(htmlContent)) !== null) {
        matches.push([match[1], match[2], match[4], match[5].trim().replace("&nbsp;<i class=\"icon ion ion-md-checkmark-circle\"></i>", "")]);
    }
    for (match of matches) {
        allCards.push(`<div class="resultCard">
        <a href="https://www.youtube.com/watch?v=${match[0]}" class="thumbLink"><img src="http://img.youtube.com/vi/${match[0]}/0.jpg" class="thumbnail"></a>
        <div class="resultInfo">
            <a href="https://www.youtube.com/watch?v=${match[0]}" class="titleLink"><h2 class="resultTitle">${match[1]}</h2></a>
            <a href="https://www.youtube.com${match[2]}" class="channelLink">
            <p class="resultChannel">${match[3]}</p></a>
            <p class="platform">Youtube</p>
        </div>
    </div>`)
    }
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
  });








  async function fetchHTML(url) {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  }
  
var twitchMatches = []
function runTwitchAnal(page) {
    let params = searchParams.get("search").toLowerCase().split(" ")
    var numDone = 0
    for (let param of params) {
        // Fetch HTML content of the webpage
        fetchHTML(proxy + (`https://twitch-tools.rootonline.de/channel_previews.php?title=${param}&page=${page}`))
        .then(htmlContent => {
            let regex = /<h6 class="card-title m-1 mb-3"><a\s+href="https:\/\/www\.twitch\.tv\/([^"]+)"[^>]*>([^<]+)<\/a><\/h6>/g
            let match

            while ((match = regex.exec(htmlContent)) !== null) {
                for (term of match[2].toLowerCase().trim().match(/[a-zA-Z ]/g).join("").split(" ")) {
                    if (term.startsWith(param) || term.endsWith(param)) {
                        twitchMatches.push([match[1], match[2].trim(), `https://static-cdn.jtvnw.net/previews-ttv/live_user_${match[1]}-640x360.jpg`])
                        console.log(twitchMatches)
                        break
                    }
                }
            }
            numDone++
            if (numDone == params.length) {
                if (page < 2) {
                    runTwitchAnal(page + 1)
                } else {
                    for (match of twitchMatches) {
                        console.log(match)
                        allCards.push(`<div class="resultCard">
                        <a href="https://www.twitch.tv/${match[0]}" class="thumbLink"><img src="${match[2]}" class="thumbnail"></a>
                        <div class="resultInfo">
                            <a href="https://www.twitch.tv/${match[0]}" class="titleLink"><h2 class="resultTitle">${match[1]}</h2></a>
                            <p class="resultChannel">${match[0]}</p>
                            <p class="platform">Twitch</p>
                        </div>
                    </div>`)
                    }
                    for (card of loopArrayInPattern(allCards, allCards.length - twitchMatches.length)) { 
                        document.getElementById("results").innerHTML += card
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the HTML:', error);
        });
    }
}
runTwitchAnal(1)