import React from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import profilePng from '../../assets/profilepng.png'
const ReviewCard = ({ review }) => {

  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating size="large"
         icon={<StarIcon style={{ color: 'tomato', fontSize: '1.4rem' }} />}
          precision={0.5} value={review.rating} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55,fontSize: '1.4rem' }} fontSize="inherit" />} />
        <span>{review.comment}</span>
      </div>
    </>
  )
}

export default ReviewCard;