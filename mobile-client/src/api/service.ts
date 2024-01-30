const data = {
events: [{
  coordinate: {latitude: 33.2098,
  longitude: -87.5692} 
},
{
  coordinate: {latitude: 33.2325,
  longitude: -87.5211} 
},{
  coordinate: {latitude: 33.2341,
  longitude: -87.5331} 
},{
  coordinate: {latitude: 33.2433,
  longitude: -87.5909} 
},
]
}


function get<T>(resource: string): T{
   // @ts-ignore
   return data[resource] 
}

export default {
    get
}