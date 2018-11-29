document.addEventListener("DOMContentLoaded", function(event) {
  if (window.top === window) {
      console.log("DOMContentLoaded");
      console.log("New Page Load ... Refreshing RNA");
      scanAndFetch();
  }
});

const BASE_URL = 'https://localhost:5000/service/relevant-articles';

function constructRequestUrl(reddit_data) {
  if(reddit_data.href)
      return `${BASE_URL}?url=${reddit_data.href}`;
  else
      return null;
}

const OLD_REDDIT_POST_TITLE = 'a.title';
const OLD_REDDIT_POST_BODY = 'div.md-container';

function getLinkOrTextFromPost(title, body) {
  const anchor_tag = document.querySelector(title);
  if(anchor_tag && anchor_tag.href)
      return { href: anchor_tag.href };

  const body_element = document.querySelector(body);
  anchor_tag = body_element.querySelector('a');
  if(anchor_tag && anchor_tag.href)
      return { href: anchor_tag.href };
      
  return { href: location.href };
}

function scanAndFetch() {
  let hostname = location.hostname;
  let site_href = window.location.href;
  let source = hostname.substr(hostname.lastIndexOf(".") + 1);

  console.log(site_href);
  var data = {
      href: site_href,
      domain: hostname,
      source: source,
      time: Date.now()
  };

  if(site_href.includes('reddit') && site_href.includes('/comments/')) {
      data.reddit_data = getLinkOrTextFromPost(OLD_REDDIT_POST_TITLE, OLD_REDDIT_POST_BODY);
      fetch(data);
  }
}

function fetch(payload) {
  if(!payload || !payload.reddit_data) return;

  const requestUrl = encodeURI(constructRequestUrl(payload.reddit_data));
  if(!requestUrl) return;

  console.log(requestUrl);
  $.ajax({
      type: 'GET',
      url: requestUrl,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
          console.log(response);
          safari.extension.dispatchMessage('INJECT', response);
      },
      failure: function(response) {
          console.log(response);
      }
  })
}