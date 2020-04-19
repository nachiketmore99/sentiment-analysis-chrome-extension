# import re
import numpy as np
import pandas as pd
# from sklearn.model_selection import train_test_split

from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Embedding, Dropout
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences

from keras.models import load_model

def predict_sentiment(titles, stars):
    print('Reviews : ', titles)

    # y_pred = []

    # for i in range(0, len(stars)): 
    #     if int(stars[i]) > 3:
    #         y_pred.append(1) 
    #     else:
    #         y_pred.append(0)

    print('loading of model')
    model = load_model('sa_3.h5')

    print('compiling')
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    titles = pd.DataFrame(titles, columns =['titles']) 

    print('Dataframe : ',titles)

    tokenizer = Tokenizer(num_words=3000, split=" ")
    tokenizer.fit_on_texts(titles['titles'])

    titles = tokenizer.texts_to_sequences(titles['titles'].values)
    titles = pad_sequences(titles, maxlen=27, dtype='int32', value=0) 


    print('Predicting')

    sentiments = model.predict(titles)
    sentiments =(sentiments>0.5).flatten().astype(int)
    # print(sentiments)
    
    
    pos_count, neg_count = 0, 0
    for sentiment in sentiments:
        if sentiment==1:
            pos_count += 1
        else:
            neg_count += 1

    print('Positive predictions:', pos_count)
    print('Negative predictions:', neg_count)

    # pos_real, neg_real = 0, 0
    # for y in y_pred:
    #     if y==1:
    #         pos_real += 1
    #     else:
    #         neg_real += 1

    # print('Positive Real:', pos_real)
    # print('Negative Real:', neg_real)

    return [pos_count, neg_count]

    
