import sklearn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
import joblib


def predict_sentiment(titles, stars):

    loaded_logreg = joblib.load('logreg.sav')
    loaded_rb = joblib.load('rb.sav')
    loaded_nb = joblib.load('nb.sav')
    loaded_vectorizer = joblib.load('vectorizer.sav')

    model1 = loaded_logreg.predict(loaded_vectorizer.transform(titles)).tolist()
    model2 = loaded_rb.predict(loaded_vectorizer.transform(titles)).tolist()
    model3 = loaded_nb.predict(loaded_vectorizer.transform(titles)).tolist()

    # print('model1: ', model1)
    # print('model2: ', model2)
    # print('model3: ', model3)

    # print('predictions made by model1: ', model1.count(1), model1.count(0) )
    # print('predictions made by model2: ', model2.count(1), model2.count(0) )
    # print('predictions made by model3: ', model3.count(1), model3.count(0) )

    pos_count = (model1.count(0)+model2.count(0)+model3.count(0))/3
    neg_count = (model1.count(1)+model2.count(1)+model3.count(1))/3

    y_pred = []

    for i in range(0, len(stars)): 
        if int(stars[i]) > 3:
            y_pred.append(1) 
        else:
            y_pred.append(0)

    pos_real, neg_real = 0, 0
    for y in y_pred:
        if y==1:
            pos_real += 1
        else:
            neg_real += 1

    print('Positive Real:', pos_real)
    print('Negative Real:', neg_real)

    print('Positive predictions:', round(pos_count))
    print('Negative predictions:', round(neg_count))

    return [round(pos_count), round(neg_count)]

    
