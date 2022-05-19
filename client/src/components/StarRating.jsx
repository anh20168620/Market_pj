import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../assets/css/starRating.css";

function StarRating(props) {
  const auth = localStorage.getItem("user");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(props.rate);

  const [rateQuatity, setRateQuatity] = useState([]);

  const handleOnClick = async (e) => {
    setRating(e.target.value);

    await fetch(`http://localhost:3001/user/rating/${props.user}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: e.target.value,
        userId: JSON.parse(auth)._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRateQuatity(data.data);
        } else {
          console.log(data.message);
        }
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              id="rating"
              value={ratingValue}
              onClick={handleOnClick}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#55607F"}
              size={28}
              onMouseOver={() => setHover(ratingValue)}
              onMouseOut={() => setHover(null)}
            />
          </label>
        );
      })}

      <div className="rate_quatity">
        <span className="rate_quatity_text">1 sao :</span>{" "}
        {rateQuatity[0] ? rateQuatity[0].quantity : 0}
      </div>
      <div className="rate_quatity">
        <span className="rate_quatity_text">2 sao :</span>{" "}
        {rateQuatity[1] ? rateQuatity[1].quantity : 0}
      </div>
      <div className="rate_quatity">
        <span className="rate_quatity_text">3 sao :</span>{" "}
        {rateQuatity[2] ? rateQuatity[2].quantity : 0}
      </div>
      <div className="rate_quatity">
        <span className="rate_quatity_text">4 sao :</span>{" "}
        {rateQuatity[3] ? rateQuatity[3].quantity : 0}
      </div>
      <div className="rate_quatity">
        <span className="rate_quatity_text">5 sao :</span>{" "}
        {rateQuatity[4] ? rateQuatity[4].quantity : 0}
      </div>
    </div>
  );
}

export default StarRating;
