import { React, useState } from "react";
import Output from "./output.js";
import { toast, Toaster } from "react-hot-toast";

function Predict_page() {

  const [bool, setBool] = useState(false);

  function flip_bool(){
    console.log("bool is fliping")
    setBool( (prev) => !prev )
  }

  const [showArr, setShowArr] = useState([]);
  const [temp, setTemp] = useState("");
  const [formData, setFormData] = useState({
    recipeName: "",
    calories: "",
    mealType : "",
    dishType : "",
    flavour : "",
    timeToPrepare: "",
    no_of_ingredients:showArr.length
    // numArr: showArr.length
    // ingredients: showArr,
  });

  const [output, setOutput] = useState({
    grade: "4",
    calories: "567",
    numArr: showArr.length,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("the showarr is ",showArr)
    console.log("formData is : ",formData)
    try {
      if (
        // formData.calories &&
        // formData.recipeName  &&
        // formData.timeToPrepare 
        // formData.typeOfDish 
        // formData.ingredients
        true
      ) {
        let res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          mode: "no-cors",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        // console.log(res)
        // if(res.status){
          let resJson = await res.json();
        // }
        
        setOutput({
          ...resJson,
          numArr: showArr.length,
          calories: formData.calories,
        });

        console.log(resJson);
        setBool(false);

        if (res.status === 200 || 201) {
          setFormData({
            recipeName: "",
            calories: "",
            mealType : "",
            dishType : "",
            flavour : "",
            timeToPrepare: "",
            no_of_ingredients : "",
            // numArr: numArr
            // ingredients: showArr,
          });
          console.log("Fetched successfully");
        } else {
          alert("Some error occured");
        }
      } else {
        toast.error("pls fill all inputs");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if( temp != "" ){
      setShowArr(( prev ) => {
        return [ ...prev, { id: Math.random(), payload: temp }];
      });
      setTemp( "" );
    }
  };

  const handleRemove = (id) => {
    const tempArr = showArr.filter((item) => {
      return item.id != id;
    });
    setShowArr(tempArr);
  };

  return (
    <>
      <Toaster />
      {!bool && <Output flip = {flip_bool} output = {output} setShowArr={setShowArr} />}
      {bool && (
        <div>
          <div className="header">
            <h1>Evaluate a new recipe,</h1>
            <svg
              width="152"
              height="23"
              viewBox="0 0 152 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="underline"
            >
              <path
                id="Vector 1"
                d="M1 11.913C103.979 -10.3912 151 11.913 151 11.913C151 11.913 87.1702 -3.7823 26.3191 21"
                stroke="#EF9600"
                strokeWidth="4"
              />
            </svg>
          </div>
          <form className="flex-parent" onSubmit={handleSubmit}>
            <div className="flex-child">
              <div className="with_scroll">
                <div className="unit">
                  <h3>Recipe Name</h3>
                  <input
                    type="text"
                    className=""
                    placeholder="Eg: Chicken Curry"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, recipeName: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

                <div className="unit">
                  <h3>Calories</h3>
                  <input
                    type="number"
                    className=""
                    placeholder="Eg: 543 kcals"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, calories: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

                <div className="unit">
                  <h3>Time to Prepare</h3>
                  <input
                    type="number"
                    className=""
                    placeholder="Eg: 5"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, timeToPrepare: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

                <div className="unit">
                  <h3>Meal type</h3>
                  <input
                    type="text"
                    className=""
                    placeholder="Eg: Entree~Dinner"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, mealType: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

                <div className="unit">
                  <h3>Dish type</h3>
                  <input
                    type="text"
                    className=""
                    placeholder="Eg: Sandwich & Wrap"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, dishType: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

                <div className="unit">
                  <h3>Flavour</h3>
                  <input
                    type="text"
                    className=""
                    placeholder="Eg: Savory~Spicy"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, flavour: e.target.value };
                      });
                      // console.log(formData);
                    }}
                  />
                </div>

              </div>
              
              <button className="submit_button">SUBMIT</button>
            </div>
            <div className="flex-child-2">
              <div className="add-unit">
                <h3>Add Ingredients</h3>
                <input
                  placeholder="Eg: Rice"
                  value={temp}
                  onChange={(e) => {
                    setTemp(e.target.value);
                  }}
                />
                <button className="add_button" onClick={handleAdd}>
                  Add
                </button>
              </div>
              <div className="your-ing">
                {showArr.map((item) => (
                  <p key={item.id} id={item.id}>
                    {" "}
                    {item.payload}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 svg-2"
                      onClick={() => handleRemove(item.id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Predict_page;