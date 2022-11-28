import pandas as pd
from sklearn.preprocessing import LabelEncoder
from flask import Flask,request,render_template
from flask_cors import CORS

import pickle

app = Flask(__name__)
CORS(app)

# logging.getLogger('flask_cors').level = logging.DEBUG
output=0

@app.route("/")
def hello_world():
    return "<h1>Server is LIVE !</h1>"


@app.route("/predict", methods=['POST'])
def add_number():
    # print("My Request is: ",request)
    request_data = request.get_json()
    # print("My Request after appling json method is: ",request_data)
    # print("coming till here")
    flavour   = request_data['flavour']
    calories  = request_data['calories']
    dish      = request_data['dishType']
    Meal_Type = request_data['mealType']
    no_of_ingredients = request_data['no_of_ingredients']
    # print("no_of_ingredients is ",no_of_ingredients)

    # ingredients = request_data['ingredients']

    df6 = pd.read_csv("./vizz.csv")

    print("THIS IS NOT GIVING ERROR")
    
    le1=LabelEncoder()
    df6['Flavor_Type']=le1.fit_transform(df6['Flavor_Type'])
    print("HERE 1")
    le2=LabelEncoder()
    df6['Dish']=le2.fit_transform(df6['Dish'])
    print("HERE 2")
    le3=LabelEncoder()
    df6['Meal_Type']=le3.fit_transform(df6['Meal_Type'])
    print("HERE 3")

    X=df6.loc[:,['Flavor_Type','Dish','Calories','Meal_Type','NumberOfIngredients']]
    y=df6['Predicted_rating']

    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test=train_test_split(X,y,test_size=0.25,random_state=0)

    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()

    X_train=sc.fit_transform(X_train)


    pickle_model = pickle.load(open("./prediction.pkl","rb"))


    print("HERE 4")
    grade = pickle_model.predict(sc.transform([[le1.transform([flavour]),le2.transform([dish]),calories,le3.transform([Meal_Type]),no_of_ingredients]]))
    print("HERE 5")
    print("GRADE IS : ",grade)

    return { "grade": grade[0] }


if __name__ == "__main__":
 app.run(debug=True)