import Image from 'next/image'
import React from 'react'

const CreditCart = () => {
    return (
        <div className="max-w-sm mx-auto hover:shadow-2xl">
            <div className="relative bg-gradient-to-r from-pink-400 to-indigo-300 rounded-xl text-white shadow-lg p-6">
                {/* <div className="absolute top-4 left-4">
                    <div className="bg-yellow-400 w-12 h-8 rounded-sm"></div>
                </div> */}


                <div className="absolute top-4 right-4">
                    <Image
                        src="/icons/zai-logo.png"
                        alt="Card Type"
                        width={40}
                        height={40}
                    />
                </div>


                <div className="mt-14 mb-8">
                    <h1 className="text-2xl tracking-widest font-semibold">1983 1938 3380 1234</h1>
                </div>


                <div className="flex justify-between mt-4">
                    <div className="text-sm">
                        <p className="font-light">VALID THRU</p>
                        <p>12/25</p>
                    </div>
                    <div className="text-sm">
                        <p className="font-light">CARD HOLDER</p>
                        <p>Sai Nyi</p>
                    </div>
                </div>

                {/* 
                <div className="absolute bottom-4 right-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/88/Old_MasterCard_Logo.png"
                        alt="Mastercard"
                        className="w-12"
                    />
                </div> */}
            </div>
        </div>

    )
}

export default CreditCart