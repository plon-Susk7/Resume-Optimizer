import re
from bs4 import BeautifulSoup
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def preprocess_text(text):
    soup = BeautifulSoup(text, 'html.parser')
    text = soup.get_text(separator=' ')

    text = text.lower()

    # Lowercase the text
    contractions = {
        r"\b(can't)\b": "can not",
        r"\b(ain't)\b": "am not",
        r"\b(aren't)\b": "are not",
        r"\b(couldn't)\b": "could not",
        r"\b(didn't)\b": "did not",
        r"\b(doesn't)\b": "does not",
        r"\b(don't)\b": "do not",
        r"\b(hadn't)\b": "had not",
        r"\b(hasn't)\b": "has not",
        r"\b(haven't)\b": "have not",
        r"\b(isn't)\b": "is not",
        r"\b(there's)\b": "there is",
        r"\b(wasn't)\b": "was not",
        r"\b(why's)\b": "why is",
        r"\b(won't)\b": "will not",
        r"\b(wouldn't)\b": "would not",
    }

    # Replace contractions with their expanded forms
    for pattern, replacement in contractions.items():
        text = re.sub(pattern, replacement, text)

    text = text.replace("'s",' is')
    text = text.replace("'m",' am')
    text = text.replace("'re",' are')
    text = text.replace("'ve",' have')
    text = text.replace("'ll",' will')
    text = text.replace("'d",' would')
    text = text.replace("n't",' not')
    text = text.replace("'t",' not')
    
    # Tokenization
    tokens = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]

    # Remove punctuations
    tokens = [token for token in tokens if token.isalpha() or token.isalnum()]

    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    processed_text = ' '.join(tokens)
    return processed_text