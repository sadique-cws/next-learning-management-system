import React from "react"
import { FcApproval, FcCamcorderPro, FcOnlineSupport, FcSurvey } from "react-icons/fc"

const FactContainer = () => {
  return (
    <div className="md:px-[10%] p-3 md:-mt-20 mt-5">
        <div className="grid md:grid-cols-4 h-auto p-5 gap-y-5 md:h-48 grid-cols-2 bg-white border-separate border shadow-md rounded-lg divide-x-2 items-center">
            <div className="flex flex-col items-center">
                <FcCamcorderPro className="w-16 h-16 text-red-600 mb-3"/>
                <h3 className="text-gray-700 font-semibold">Daily Live</h3>
                <h4 className="text-gray-700">Interative Classes</h4>
            </div>
            <div className="flex flex-col items-center">
                <FcSurvey className="w-16 h-16 text-teal-600 mb-3"/>
                <h3 className="text-gray-700 font-semibold">Project Base</h3>
                <h4 className="text-gray-700">Focus on Real Project</h4>
            </div>
            <div className="flex flex-col items-center">
                <FcOnlineSupport className="w-16 h-16 text-red-600 mb-3"/>
                <h3 className="text-gray-700 font-semibold">24 X 7</h3>
                <h4 className="text-gray-700">Doubt solving sessions</h4>
            </div>
            <div className="flex flex-col items-center">
                <FcApproval className="w-16 h-16 text-red-600 mb-3"/>
                <h3 className="text-gray-700 font-semibold">500+</h3>
                <h4 className="text-gray-700">Student&quot;s Placements</h4>
            </div>
        </div>
    </div>
  )
}

export default FactContainer