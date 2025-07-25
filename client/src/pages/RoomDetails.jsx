import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {
        const {id} = useParams()
        const [room,setRoom] = useState(null)
        const [mainImage,setMainImage] = useState(null)

        useEffect(()=>{
            const room = roomsDummyData.find(room => room._id === id)
            room && setRoom(room)
            room && setMainImage(room.images[0])
        },[id])
    return room && (
    <div className='py-28 md:py-35 px-4 m:px-16 lg:px-24 xl:px-32'>
        {/* Details su la chambre */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} 
                <span className='font-inter text-sm'>
                    ({room.roomType})
                </span>
            </h1>
            <p className='text-xs font-inter py-1,5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>
        {/* note de la chambre */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating/>
            <p className='ml-2'>200+ reviews</p>
        </div>
        {/*adresse de la chambre */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon"/>
            <span>{room.hotel.address}</span>
        </div>
        {/* images de la chambre */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6 mb-4'>
            <div className='lg:w-1/2  w-full'>
                <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
            </div>
            <div className='grid grid-cols-2  gap-4 lg:w-1/2 w-full mb-4'>
                {room?.images.length > 1 && room.images.map((image, index)=>(
                    <img onClick={()=> setMainImage(image)} key={index} src={image} alt="Room Image" className={`w-full rounded-2xl rounded-x1 shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orande,500'}`}/>
                ))}
            </div>
        </div>
        {/* Room Highlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before.</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {room.amenities.map((item, index)=>(
                        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Prix de la chambre */}
            <p className='text-2xl font-medium' >${room.pricePerNight}/night</p>
        </div>
        {/* checkIn & checkOut Formulaire */}
        <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                
                <div className='flex flex-col'>
                    <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                    <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col'>
                    <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                    <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div> 
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-medium'>Guests</label>
                    <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>    
            </div>
            <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-10 py-3 md:py-4 text-base cursor-pointer'>
                Check Avalibility
            </button>
        </form>
        {/* common Specifications */}
        <div className='mt-25 space-y-4'>
            {roomCommonData.map((spec, index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>
                </div>
            ))}
        </div>
        <div>
            <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'> Guest will be allocated on the ground floor accordingg to avalibility.You get a confortable Two bedroom apartement has a true city feeling. The price quoted is for two guest, at th guest slot please mark the number of guests to get the exact ptive fot groups. The Guest will be allocated on the ground floor accordingg to avalibility. You get a confortable Two bedroom apartement has a true city feeling.</p>
        </div>
        {/* hote de l'hebergement */}
        {/*<div className='flex flex-col items-start gap-4'>
            <div className='flex gap-4'> 
                <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full'/>
                <div>
                    <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                    <div className='flex items-center mt-1'>
                        <StarRating />
                        <p className='ml-2'> 200+ reviews</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-5xl py-16 md:pl-20 md:w-full mx-2 md:mx-auto flex items-center justify-between text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl p-10 text-white">
            <div>
                <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
                    Contact Our Team Today
                </h1>
                <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
                Have a question or need a custom offer? We’re here to help you plan the perfect stay—reach out and let’s make it happen!"
                </p>
            </div>
            <button className="px-12 py-3 text-slate-800 bg-white  active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-10 py-3 md:py-4 text-base cursor-pointer">
                Contact Us
            </button>
        </div>*/}
    </div>
    )
}

export default RoomDetails