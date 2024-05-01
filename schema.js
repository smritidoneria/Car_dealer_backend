// schemas.js

export const adminSchema = {
    admin_id: { type: 'string' },
    password: { type: 'string' }
  };
  
  export const userSchema = {
    user_email: { type: 'string' },
    user_id: { type: 'string' },
    user_location: { type: 'string' },
    user_info: { type: 'string' },
    password: { type: 'string' },
    vehicle_info: { bsonType: 'array', items: { bsonType: 'objectId' } }
  };
  
  export const dealershipSchema = {
    dealership_email: { type: 'string' },
    dealership_id: { type: 'string' },
    dealership_name: { type: 'string' },
    dealership_location: { type: 'string' },
    password: { type: 'string' },
    dealership_info: { type: 'string' },
    cars: { bsonType: 'array', items: { bsonType: 'objectId' } },
    deals: { bsonType: 'array', items: { bsonType: 'objectId' } },
    sold_vehicles: { bsonType: 'array', items: { bsonType: 'objectId' } }
  };
  
  export const dealSchema = {
    deal_id: { type: 'string' },
    car_id: { type: 'string' },
    deal_info: { type: 'object' }
  };
  
  export const carSchema = {
    car_id: { type: 'string' },
    type: { type: 'string' },
    name: { type: 'string' },
    model: { type: 'string' },
    car_info: { type: 'string' },
    sold:{type:'boolean'}
  };
  
  export const soldVehiclesSchema = {
    
    car_id: { bsonType: 'array', items: { bsonType: 'objectId' } },
    owner_id: { bsonType: 'objectId' },
   
   
  };
  
  