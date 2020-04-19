import requests
import bs4
import re
import prediction1

def scrape(link):

    titles = []
    stars = []

    # url = "".join((link, '/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1' ))
    # res = requests.get(url)
    # soup = bs4.BeautifulSoup(res.text, 'lxml')
    # no_reviews = soup.find("span", { "data-hook" : "cr-filter-info-review-count" })
    # no_reviews = int(re.sub("[^\d\.]", "", no_reviews.getText().split()[3]))
      
    x=1
    
    while x < 3:
        
        url = "".join((link, '/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=' ))
        # print("Iteration ",x)
        url1 = "".join((url, str(x)))
        url1 = "".join((url1, '&sortBy=recent'))

        res = requests.get(url1)

        #print(url1)

        soup = bs4.BeautifulSoup(res.text, 'lxml') 
        reviews = soup.findAll("a", { "data-hook" : "review-title" })
        ratings = soup.findAll("i", { "data-hook" : "review-star-rating" })
                
        for a in reviews:
            title = a.find("span")
            titles.append(title.getText())
        for b in ratings:
            star = b.find("span")
            stars.append(star.getText()[:1])
                 
        #print("Size : ",len(titles))

        if len(titles) == (10*x):
            x = x+1
        else:
            pass
        
    # print(titles)

    pred = prediction1.predict_sentiment(titles, stars)

    return pred

# scrape('https://www.amazon.in/Redmi-Pro-Black-32GB-Storage/product-reviews/B07DJL15QT')






































        
