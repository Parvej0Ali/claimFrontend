import React from 'react'
import { useLocation } from 'react-router-dom'

export const Service=() =>{
  return (
    <div>Service</div>
  )
}



// import { useAuth } from '../store/auth';
// import "./Service.css"
// export const Service = () => {
//     //const location = useLocation();
//     //const userId = location.state.userId;
//     const location = useLocation();
//     // const userId = location.state.userId;
//     //console.log(userId)
//     //lec34
//     const {services}=useAuth()
//     console.log(services)


//   return (
//     <section className="section-services">
//       <div className="heading-container">
//         <h5 className='main-heading'>Policies</h5>
//       </div>
//       <div className="container">
//         <div className='card-container'>
//           {services.map((curElem, index) => {
//             const { policyName, totalAmount, premiumAmount, duration } = curElem;
//             return (
//               <div className='card' key={index}>
//                 <div className='card-details'>
//                   <h3>Policy Name: {policyName}</h3>
//                   <p>Total Amount: {totalAmount}</p>
//                   <p>Premium Amount: {premiumAmount}</p>
//                   <p>Duration: {duration}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };



{/* 
)
} */}

{/* <section className="section-services">
<div className="container">
    <h1 className='main-heading'>Services</h1>
</div>
<div className='container grid grid-three-cols'>
            <div className='card'>
                <div className='card-img'>
                    <img src="policy.webp" alt="designer" width="200"/>
                </div>
                <div className='card-details'>
                    <div className="grid grid-two-cols">
                        <p>PolicyName</p>
                        <p>PolicyAmount</p>
                    </div>
                        <p>Duration</p>
                        <p>PremiumAmount</p>
                </div>
            </div>
    
</div>
</section> */}

{/* <section className="section-services">
<div className="container">
    <h1 className='main-heading'>Services</h1>
</div>
<div className='container grid grid-three-cols'>
    {services.map((curElem,index)=>{
        const {policyName,totalAmount,premiumAmount,duration}=curElem;
        return(
            <div className='card' key={index}>
                {/* <div className='card-img'>
                    <img src="policy.webp" alt="designer" width="200"/>
                </div> */}
//                 <div className='card-details'>
//                     <div className="grid grid-two-cols">
//                         <h3>policyName  {policyName}</h3>
//                         <h3>totalAmount {totalAmount}</h3>
//                         <h3>premiumAmount{premiumAmount}</h3>
//                         <h3>duration{duration}</h3>
//                     </div>

//                 </div>
//             </div>
//         );
//     })}
// </div>
// </section>
//   ) */}