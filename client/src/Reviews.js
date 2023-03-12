// import React from 'react';
// import { Card, Header } from 'semantic-ui-react'
// import { useEffect, useState } from 'react';

// function Reviews() {

//   const [options, setOptions] = useState([])


//   useEffect(() => {
//     fetch(`http://localhost:4000/reviews`)
//       .then((r) => r.json())
//       .then((data) => setOptions(data))
//   }, [])

//   const items = []

//   options.forEach((item) => items.push(
//     {
//       header: item.review,
//     }
//   ))

//   return (
//     <div className='test'>
//       <Header as='h1' color='orange'>Reviews</Header>
//       <Card.Group centered items={items} style={{margin: 50 }} itemsPerRow={1}/>

//     </div>
//   )
// }

// export default Reviews;