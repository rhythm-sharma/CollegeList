import React, { Component } from "react";
import collegeImg_2 from "../../assets/college_02.jpg";
import "./CollegeCard.css";

class CollegeCard extends Component {
  famousNearestPlaces = (famous_nearest_places) => {
    let places = famous_nearest_places.split(",");
    let kms_1 = places[0].split("from");
    let kms_2 = places[1].split("from");
    return (
      <span className="silver-chalice-normal">
        <span className="greyish-brown-bold">{kms_1[0]}</span>
        {"from" + kms_1[1]} <span className="greeny-blue-bold">,</span>{" "}
        <span className="greyish-brown-bold">{kms_2[0]}</span>{" "}
        {"from" + kms_2[1]}
      </span>
    );
  };

  offerText = (offertext) => {
    offertext = offertext.replace(",", "");
    let match = offertext.match(/\d+/g);
    match.forEach((item) => {
      offertext = offertext.replace(
        item,
        `<span class='greeny-blue-bold'>${item}</span>`
      );
    });
    offertext = offertext.replace(
      "LOGIN",
      `<span class='water-blue-bold'>LOGIN</span>`
    );
    return offertext;
  };

  rating = (rating) => {
    const fullStar = `<span class="full-rating">&#9733;</span>`;
    const emptyStar = `<span class="empty-rating">&#9733;</span>`;

    let tempReturn = "";

    for (let i = 1; i < 6; i++) {
      if (i <= Math.round(rating)) {
        tempReturn += fullStar;
      } else {
        tempReturn += emptyStar;
      }
    }
    return tempReturn;
  };

  render() {
    const { collegeInfo } = this.props;

    let tags = collegeInfo.tags.map((item, index) => {
      return (
        <div key={index} className="tag-button">
          <p className="text">{item}</p>
        </div>
      );
    });

    let amenties = collegeInfo.amenties.map((item, index) => {
      if (index === 0) {
        return (
          <p key={index} className="amenties-text">
            {item}
          </p>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <span className="amenties-dot"></span>
            <p className="amenties-text">{item}</p>
          </React.Fragment>
        );
      }
    });

    return (
      <div className="college-card-container">
        <div className="image-container">
          <img className="image" src={collegeImg_2} alt="" />
          {collegeInfo.promoted && (
            <div className="promoted">
              <p className="text">PROMOTED</p>
            </div>
          )}
          <div className="rating-container">
            <p className="rating">
              {collegeInfo.rating} <span className="rating-out-off">/5</span>
            </p>
            <p className="rating-remarks">{collegeInfo.rating_remarks}</p>
          </div>
          <div className="tags">{tags}</div>
          <p className="rank"># {collegeInfo.ranking}</p>
        </div>
        <div className="info-container">
          <div className="name-rating-discount">
            <div className="name">{collegeInfo.college_name}</div>
            <div
              className="rating-plate"
              dangerouslySetInnerHTML={{
                __html: this.rating(collegeInfo.rating),
              }}
            ></div>
            <div className="discount">
              <s className="original-fees">₹ {collegeInfo.original_fees} </s>
              <div className="discount-tag">
                <span className="white-dot"></span>
                <span className="discount-number">{collegeInfo.discount}</span>
              </div>
            </div>
          </div>
          <div className="near-place-with-fees">
            <div className="near-place">
              {collegeInfo.nearest_place[0]}
              <span className="away"> | {collegeInfo.nearest_place[1]}</span>
            </div>
            <div className="discounted-fees">
              ₹ {collegeInfo.discounted_fees}
            </div>
          </div>
          <p className="fees-cycle">{collegeInfo.fees_cycle}</p>
          <p className="famous-nearest-places">
            <span className="greeny-blue-bold">93% Match :</span>{" "}
            {this.famousNearestPlaces(collegeInfo.famous_nearest_places)}
          </p>
          <div className="offer-amenties">
            <div
              className="offer"
              dangerouslySetInnerHTML={{
                __html: this.offerText(collegeInfo.offertext),
              }}
            ></div>
            <div className="amenties">{amenties}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollegeCard;
