import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards








// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Badge } from './ui/badge'
// import { Briefcase, MapPin, DollarSign, Building2 } from 'lucide-react'

// const LatestJobCards = ({ job }) => {
//     const navigate = useNavigate()

//     const formatDate = (date) => {
//         const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
//         if (days === 0) return 'Today'
//         if (days === 1) return 'Yesterday'
//         return `${days} days ago`
//     }

//     return (
//         <div 
//             onClick={() => navigate(`/description/${job._id}`)}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//         >
//             {/* Date */}
//             <div className="text-xs text-gray-400 mb-3 flex items-center justify-between">
//                 <span>{formatDate(job.createdAt)}</span>
//                 <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-xs font-medium">
//                     New
//                 </span>
//             </div>

//             {/* Company Info */}
//             <div className="flex items-center gap-3 mb-4">
//                 <img 
//                     src={job.company?.logo || '/default-company.png'} 
//                     alt={job.company?.name}
//                     className="w-12 h-12 rounded-lg object-cover border"
//                     onError={(e) => {e.target.src = '/default-company.png'}}
//                 />
//                 <div>
//                     <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
//                         {job.company?.name || 'Unknown Company'}
//                     </h3>
//                     <div className="flex items-center gap-1 text-xs text-gray-500">
//                         <MapPin size={12} />
//                         {job.location}
//                     </div>
//                 </div>
//             </div>

//             {/* Job Title */}
//             <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
//                 {job.title}
//             </h4>
            
//             <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                 {job.description || 'No description available'}
//             </p>

//             {/* Badges */}
//             <div className="flex flex-wrap gap-2 mb-4">
//                 <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
//                     <Briefcase size={10} className="mr-1" />
//                     {job.jobType}
//                 </Badge>
//                 <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
//                     <DollarSign size={10} className="mr-1" />
//                     {job.salary} LPA
//                 </Badge>
//                 <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
//                     <Building2 size={10} className="mr-1" />
//                     {job.position} {job.position > 1 ? 'Positions' : 'Position'}
//                 </Badge>
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-between pt-3 border-t">
//                 <span className="text-xs text-gray-400">
//                     {job.experienceLevel} yrs experience
//                 </span>
//                 <span className="text-emerald-600 text-sm font-medium hover:underline">
//                     Apply Now →
//                 </span>
//             </div>
//         </div>
//     )
// }

// export default LatestJobCards