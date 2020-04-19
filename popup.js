/*document.addEventListener('DOMContentLoaded', function () {

  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
      if (element.addEventListener){
          element.addEventListener(eventName, eventHandler, false);
      } else if (element.attachEvent) {
          element.attachEvent('on' + eventName, eventHandler);
      }
  }


  document.getElementById('message_button').addEventListener('click', onclick)
  
  function onclick () 
  {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
    {
  	   chrome.tabs.sendMessage(tabs[0].id, tabs[0].url, function(response) 
       {
          // console.log(response.url)
          if (String(response.url).includes('www.amazon.in')) {
                console.log('Working...')

                document.getElementById('loader').style.display = 'block';
                document.getElementById('message_button').style.display = 'none';

                var iframeEl = document.getElementById('the_iframe'),
                    results = document.getElementById('results');

                // Send a message to the child iframe
                var sendMessage = function(msg) {
                    // Make sure you are sending a string, and to stringify JSON
                    iframeEl.contentWindow.postMessage(msg, '*');
                };

                // Send random messge data on every button click
                sendMessage('' + response.url);

                // Listen to message from child window
                bindEvent(window, 'message', function (e) {
                
                      var res = e.data.split(",");

                      pos = parseInt(res[0])
                      neg = parseInt(res[1])

                      pos_per = (pos/(pos+neg))*100
                      neg_per = (neg/(pos+neg))*100

                      var cssAnimation = document.createElement('style');
                      cssAnimation.type = 'text/css';
                      var rules = document.createTextNode(
                      '@keyframes pos {'+
                      'to { width:'+pos_per+'%; }'+
                      '}'+
                      '@keyframes neg {'+
                      'to { width:'+neg_per+'%; }'+
                      '}');
                      cssAnimation.appendChild(rules);
                      document.getElementById('loader').style.display = 'none';
                      document.getElementById('container').style.display = 'block';
                      document.getElementsByTagName("head")[0].appendChild(cssAnimation);
                      document.getElementById('pos').innerText = pos_per+'% '+'Positive Reviews';
                      document.getElementById('neg').innerText = neg_per+'% '+'Negative Reviews';


                });
                // iframeWindow.contentWindow.postMessage('hi', 'http://127.0.0.1:5000');

                // y.body.style.backgroundColor = "red";

                // frame.contentWindow.document.getElementById("url").value = response.url;
            		// document.getElementById("urlform").submit();

          }

          else{
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('error_button').addEventListener('click', function(){
              document.getElementById('overlay').style.display = 'none';
            });
          }


      	})
  	})
  }



}, false)






*/


  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
      if (element.addEventListener){
          element.addEventListener(eventName, eventHandler, false);
      } else if (element.attachEvent) {
          element.attachEvent('on' + eventName, eventHandler);
      }
  }


  document.getElementById('message_button').addEventListener('click', onclick)
  
  function onclick () 
  {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
    {
          var url  = String(tabs[0].url)
          if (url.includes('www.amazon.in')) {
            
                function getPosition(string, subString, index) {
                  return string.split(subString, index).join(subString).length;
                }

                var a = getPosition(url, '/', 5)+1
                var b = getPosition(url, '/', 6) 
                var res = url.substring(a, b)
                url  = 'https://www.amazon.in/product-reviews/'+res 
                console.log(url)
                console.log('Working...')

                document.getElementById('loader').style.display = 'block';
                document.getElementById('message_button').style.display = 'none';

                var iframeEl = document.getElementById('the_iframe'),
                    results = document.getElementById('results');

                // Send a message to the child iframe
                var sendMessage = function(msg) {
                    // Make sure you are sending a string, and to stringify JSON
                    console.log(msg)
                    iframeEl.contentWindow.postMessage(msg, "https://chrome-heroku.herokuapp.com/");
                };

                // Send random messge data on every button click
                sendMessage('' + url);

                // Listen to message from child window
                bindEvent(window, 'message', function (e) {
                
                      var res = e.data.split(",");

                      pos = parseInt(res[0])
                      neg = parseInt(res[1])

                      pos_per = ((pos/(pos+neg))*100).toFixed(2);
                      neg_per = ((neg/(pos+neg))*100).toFixed(2);

                      var cssAnimation = document.createElement('style');
                      cssAnimation.type = 'text/css';
                      var rules = document.createTextNode(
                      '@keyframes pos {'+
                      'to { width:'+pos_per+'%; }'+
                      '}'+
                      '@keyframes neg {'+
                      'to { width:'+neg_per+'%; }'+
                      '}');
                      cssAnimation.appendChild(rules);
                      document.getElementById('loader').style.display = 'none';
                      document.getElementById('container').style.display = 'block';
                      document.getElementById('the_iframe').style.display = 'none';
                      document.getElementsByTagName("head")[0].appendChild(cssAnimation);
                      document.getElementById('pos').innerText = 'Positive Reviews '+pos_per+'% ';
                      document.getElementById('neg').innerText = 'Negative Reviews '+neg_per+'% ';
                      document.getElementById('count').innerText = pos+neg+' Reviews';


                });
                // iframeWindow.contentWindow.postMessage('hi', 'http://127.0.0.1:5000');

                // y.body.style.backgroundColor = "red";

                // frame.contentWindow.document.getElementById("url").value = response.url;
                // document.getElementById("urlform").submit();

          }

          else{
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('error_button').addEventListener('click', function(){
              document.getElementById('overlay').style.display = 'none';
            });
          }


        
    })
  }






