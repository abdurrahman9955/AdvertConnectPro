
export interface ProductItem {
    id: number;
    name: string;
    options: string[];
    subcategories: { [key: string]: string[] };
  }
 
  const Products: ProductItem[] = [

    { id: 1, name: 'Recipe',
     options: ['Breakfast', 'Lunch', 'Dinner', 'Other'],
      subcategories: {
      
      'Breakfast': ['Pancakes', 'Omelette', 'Smoothie', 'French Toast', 'Granola', 'Frittata',
      'Muffins', 'Avocado Toast', 'Waffles', 'Breakfast Burrito', 'Cereal', 'Fruit Salad',
      'Egg Sandwich', 'Yogurt Parfait', 'Bagel with Cream Cheese', 'Hash Browns', 'Crepes',
      'Shakshuka', 'Bacon and Eggs','Other'],

      'Lunch': ['Sandwich', 'Salad', 'Soup', 'Burger', 'Wrap', 'Pizza', 'Quiche', 'Stuffed Peppers',
      'Chicken Caesar Salad', 'Tacos', 'Club Sandwich', 'Caesar Salad', 'Caprese Salad', 'Pasta Salad',
      'BLT Sandwich', 'Chicken Wrap', 'Greek Salad', 'Minestrone Soup', 'Panini', 'Other'],

      'Dinner': ['Pasta', 'Grilled Chicken', 'Stir-fry', 'Roast Beef', 'Salmon', 'Vegetarian Lasagna',
      'BBQ Ribs', 'Shrimp Scampi', 'Chicken Parmesan', 'Teriyaki Chicken', 'Vegetable Curry',
      'Spaghetti Bolognese', 'Beef Tacos', 'Lemon Garlic Butter Chicken', 'Honey Glazed Salmon',
      'Mushroom Risotto', 'Steak Fajitas','Eggplant Parmesan', 'Sushi','Other'],

      'Other':['Other'],
      
    }},

    { id: 2, name: 'Restaurants',
     options: ['Fast Food', 'Italian', 'Asian','Other'],
      subcategories: {
   
    'Fast Food': ['Burger', 'Pizza', 'Fries', 'Chicken Nuggets', 'Hot Dogs', 'Milkshake', 
    'Chicken Sandwich', 'Onion Rings', 'Taco', 'Burrito', 'Fish and Chips', 'Sundae', 'Salad',
    'Wrap', 'Cheeseburger', 'Ice Cream Cone', 'Poutine', 'Smoothie', 'Buffalo Wings','Other'],
   
    'Italian': ['Pasta', 'Pizza', 'Risotto', 'Lasagna', 'Bruschetta', 'Tiramisu', 'Gnocchi', 
    'Caprese Salad', 'Calzone', 'Minestrone Soup', 'Veal Parmesan', 'Cannoli', 'Antipasto Platter',
    'Spaghetti Carbonara', 'Margherita Pizza', 'Fettuccine Alfredo', 'Osso Buco', 'Panna Cotta',
    'Arancini','Other'],
    
    'Asian': ['Sushi', 'Noodles', 'Curry', 'Spring Rolls', 'Dim Sum', 'Pad Thai', 'Sashimi',
    'Teriyaki Chicken', 'Bibimbap', 'Pho', 'Miso Soup', 'Tempura', 'Ramen', 'Dumplings',
    'Stir-fried Rice', 'Kung Pao Chicken',  'Sushi Rolls', 'Chow Mein', 'Sesame Chicken',
    'Bento Box','Other'],

    'Other':['Other'],
   
  }},
    { id: 3, name: 'Properties',
     options: ['Residential', 'Commercial', 'Land','Other'],
      subcategories: {
     
      'Residential': ['House', 'Apartment', 'Condo', 'Townhouse', 'Duplex', 'Villa', 'Cottage', 
      'Mansion', 'Loft', 'Tiny House', 'Bungalow', 'Penthouse', 'Studio Apartment', 'Mobile Home',
      'Co-op', 'Cluster House', 'Triplex', 'Ranch Style House', 'Cabin', 'Floating Home', 'Other'],

      'Commercial': ['Office Space', 'Retail', 'Warehouse', 'Restaurant', 'Hotel', 'Medical Office',
      'Industrial Space', 'Shopping Center', 'Data Center', 'Conference Center', 'Flex Space',
      'Fitness Center', 'Gas Station', 'Banquet Hall', 'Coworking Space', 'Salon/Spa', 'Theater',
      'Storage Facility', 'Car Dealership', 'Commercial Condo', 'Other'],

      'Land': ['Residential Land', 'Commercial Land', 'Agricultural Land', 'Vacant Lot', 'Farm Land',
      'Ranch Land', 'Industrial Land', 'Waterfront Land', 'Mountain Land', 'Wooded Land',
      'Desert Land', 'Urban Land', 'Suburban Land', 'Island Land', 'Countryside Land', 
      'Coastal Land', 'Developed Land', 'Undeveloped Land', 'Land with Planning Permission',
      'Land with Utilities', 'Other'],

      'Other':['Other'],
      
    }},
    { id: 4, name: 'Homes',
      options: ['For Rent', 'For Sell', 'Other'],
       subcategories: {
    
      'Buy': ['Single Family Home', 'Condo', 'Townhouse', 'Duplex', 'Cottage', 'Villa', 'Mansion',
      'Loft', 'Tiny House', 'Bungalow', 'Penthouse', 'Mobile Home', 'Co-op', 'Cluster House', 'Triplex',
       'Ranch Style House', 'Cabin', 'Floating Home', 'Colonial Home', 'Georgian Home', 'Other'],

      'Rent': ['Apartment', 'House', 'Room', 'Studio Apartment', 'Condo', 'Townhouse', 'Duplex', 'Loft',
       'Shared Housing', 'Student Housing', 'Sublet', 'Short-term Lease', 'Vacation Rental', 
       'Bed and Breakfast', 'Serviced Apartment', 'Corporate Housing', 'Guest House', 'Farmstay', 
       'Treehouse', 'Houseboat', 'Other'],

      'Sell': ['List Your Property', 'Sell Your Home', 'Sell Land', 'For Sale by Owner (FSBO)',
      'Real Estate Agent', 'Auction', 'Online Listing', 'Cash Sale', 'Lease Option', 'Assisted Sale',
      'Short Sale', 'Foreclosure', 'Distressed Sale', 'Estate Sale', 'Trade or Swap', 'Joint Venture',
      'Build to Suit', 'Rent to Own', 'Seller Financing', 'Home Equity Sale', 'Other'],

      'Other':['Other'],
      
    }},
    { id: 5, name: 'Spare Parts',
     options: ['Car Parts', 'Electronics Parts','Machinery Parts', 'Other'],
      subcategories: {
     
      'Car Parts': ['Engine Parts', 'Brake System', 'Exhaust System', 'Transmission Parts', 
      'Suspension Parts', 'Ignition System', 'Fuel System', 'Air Intake System', 'Electrical System', 
      'Cooling System', 'Steering System', 'Drive Belts', 'Filters', 'Oil System', 'Wipers', 'Gaskets', 
      'Hoses', 'Lighting', 'Wheel Bearings', 'Alternators', 'Other'],
      
      'Electronics Parts': ['Circuit Boards', 'Sensors', 'Connectors', 'Diodes', 'Resistors', 
      'Transistors', 'Capacitors', 'Inductors', 'Integrated Circuits (ICs)', 'Microcontrollers',
       'Power Supplies', 'LEDs', 'LCD Displays', 'Soldering Materials', 'Switches', 'Relays', 
       'Connectors', 'Wires and Cables', 'Potentiometers', 'Batteries', 'Other'],
     
      'Machinery Parts': ['Bearings', 'Belts', 'Valves', 'Gears', 'Pumps', 'Hydraulic Cylinders', 
      'Filters', 'Seals', 'Bushings', 'Chains', 'Shafts', 'Springs', 'Clutches', 'Couplings', 
      'Sprockets', 'Gaskets', 'Brackets', 'Lubrication Systems', 'Motors', 'Actuators', 'Other'],

      'Other':['Other'],
      
    }},
    { id: 6, name: 'Materials',
    options: ['Wood', 'Metal', 'Plastic', 'Other'],
    subcategories: {
    
    'Wood': ['Hardwood', 'Softwood', 'Plywood', 'MDF (Medium-Density Fiberboard)', 'Particle Board', 
    'Lumber', 'Timber', 'Veneer', 'Bamboo', 'Cedar', 'Redwood', 'Maple', 'Oak', 'Cherry', 'Walnut', 
    'Birch', 'Mahogany', 'Pine', 'Teak', 'Ash', 'Other'],
    
    'Metal': ['Steel', 'Aluminum', 'Copper', 'Brass', 'Bronze', 'Stainless Steel', 'Titanium', 'Nickel',
     'Zinc', 'Lead', 'Tin', 'Iron', 'Gold', 'Silver', 'Platinum', 'Magnesium', 'Hastelloy', 'Inconel', 
     'Monel', 'Zirconium', 'Other'],
   
    'Plastic': ['Polyethylene', 'Polypropylene', 'Polycarbonate', 'ABS (Acrylonitrile Butadiene Styrene)',
    'PVC (Polyvinyl Chloride)', 'PET (Polyethylene Terephthalate)', 'Polyurethane', 
    'HDPE (High-Density Polyethylene)', 'LDPE (Low-Density Polyethylene)', 'Polystyrene', 
    'Acrylic', 'Nylon', 'Teflon', 'PBT (Polybutylene Terephthalate)', 'PMMA (Polymethyl Methacrylate)', 
    'PPS (Polyphenylene Sulfide)', 'PEEK (Polyether Ether Ketone)', 'PTFE (Polytetrafluoroethylene)', 
    'PLA (Polylactic Acid)', 'Other'],

    'Other':['Other'],
    
  }},
    { id: 7, name: 'Event Center',
     options: ['Weddings', 'Conferences', 'Parties', 'Other'],
      subcategories: {
      
      'Weddings': ['Indoor Wedding', 'Outdoor Wedding', 'Destination Wedding', 'Beach Wedding', 
      'Garden Wedding', 'Rustic Wedding', 'Modern Wedding', 'Vintage Wedding', 'Bohemian Wedding', 
      'Cityscape Wedding', 'Mountainside Wedding', 'Country Club Wedding', 'Ballroom Wedding', 
      'Barn Wedding', 'Tropical Wedding', 'Lakefront Wedding', 'Vineyard Wedding', 'Castle Wedding', 
      'Church Wedding', 'Elopement', 'Other'],

      'Conferences': ['Business Conference', 'Seminar', 'Workshop', 'Trade Show', 'Symposium', 
      'Convention', 'Product Launch', 'Panel Discussion', 'Training Session', 'Networking Event', 
      'Exhibition', 'Professional Development Day', 'Corporate Retreat', 'Incentive Program', 
      'Roundtable Discussion', 'Tech Conference', 'Medical Conference', 'Educational Conference', 
      'Virtual Conference', 'Other'],

      'Parties': ['Birthday Party', 'Holiday Party', 'Graduation Party', 'Anniversary Party', 
      'Retirement Party', 'Theme Party', 'Pool Party', 'Dinner Party', 'Costume Party', 
      'Cocktail Party', 'Housewarming Party', 'Kids Party', 'Bachelorette Party', 'Baby Shower', 
      'Bachelor Party', 'Surprise Party', 'Engagement Party', 'Sports Party', 'Karaoke Party', 'Other'],

      'Other':['Other'],
      
    }},
    { id: 8, name: 'Sports Tools',
     options: ['Football', 'Basketball', 'Golf', 'Other'],
      subcategories: {
       

    'Football': ['Football Shoes', 'Jerseys', 'Goalkeeper Gloves', 'Football Cleats', 'Shin Guards', 
    'Goal Nets', 'Training Cones', 'Football Socks', 'Referee Whistle', 'Captains Armband', 
    'Goalkeeper Jersey', 'Football Pump', 'Ankle Guards', 'Water Bottle', 'Practice Jerseys', 
    'Football Shorts', 'Team Flag', 'Goalpost', 'Training Bibs', 'Tactical Board', 'Other'],

    'Basketball': ['Basketball Shoes', 'Jerseys', 'Basketballs', 'Basketball Hoop', 'Basketball Net', 
    'Basketball Pump', 'Basketball Shorts', 'Basketball Socks', 'Headband', 'Wristbands', 
    'Basketball Bag', 'Knee Sleeves', 'Ankle Braces', 'Water Bottle', 'Training Cones', 
    'Basketball Training Aids', 'Scoreboard', 'Coach Clipboard', 'Whistle', 
    'Basketball Court Markers', 'Other'],

    'Golf': ['Golf Clubs', 'Golf Balls', 'Golf Bags', 'Golf Shoes', 'Golf Gloves', 'Golf Tees', 
    'Golf Towels', 'Golf Umbrella', 'Divot Repair Tool', 'Ball Markers', 'Golf Hat', 'Golf Cart', 
    'Range Finder', 'Golf Grips', 'Putting Green', 'Ball Retriever', 'Golf Clothing', 
    'Golf GPS Watch', 'Golf Swing Analyzer', 'Scorecard Holder', 'Other'],

    'Other':['Other'],
    
  }},
    { id: 9, name: 'Metals & Aluminum',
     options: ['Steel', 'Aluminum', 'Copper', 'Other'],
      subcategories: {
       
    'Steel': ['Flat Steel', 'Round Steel', 'Square Steel', 'Angle Iron', 'Steel Rods', 'Steel Tubes', 
    'Steel Beams', 'Steel Plates', 'Steel Channels', 'Steel Coils', 'Steel Wire', 'Steel Bars', 
    'Sheet Piles', 'Steel Mesh', 'Steel Pipes', 'Hollow Section', 'Steel Nails', 'Steel Fasteners', 
    'Steel Framing', 'Corrugated Steel', 'Other'],

    'Aluminum': ['Aluminum Sheets', 'Aluminum Rods', 'Aluminum Tubes', 'Aluminum Extrusions', 
    'Aluminum Plates', 'Aluminum Bars', 'Aluminum Coils', 'Aluminum Foil', 'Aluminum Wire', 
    'Aluminum Pipes', 'Aluminum Channels', 'Aluminum Angle', 'Aluminum Casting', 'Aluminum Cladding', 
    'Aluminum Ladders', 'Aluminum Windows', 'Aluminum Doors', 'Aluminum Siding', 'Aluminum Railings', 
    'Aluminum Heat Sinks', 'Other'],
    'Copper': ['Copper Sheets', 'Copper Rods', 'Copper Tubes', 'Copper Wire', 'Copper Coils', 
    'Copper Foil', 'Copper Pipes', 'Copper Strips', 'Copper Bars', 'Copper Fittings', 'Copper Nails', 
    'Copper Tubing', 'Copper Clad Laminate (CCL)', 'Copper Mesh', 'Copper Heat Exchangers', 
    'Copper Sinks', 'Copper Gutters', 'Copper Roofing', 'Copper Sculptures', 'Copper Flashing', 'Other'],

    'Other':['Other'],
    
  }},
    { id: 10, name: 'Fashion',
     options: ['Clothing', 'Footwear', 'Accessories', 'Other'],
      subcategories: {
    
        'Clothing': ['Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Activewear', 
        'Formal Wear', 'Casual Wear', 'Sportswear', 'Outerwear', 'Sleepwear', 'Swimwear', 'Ethnic Wear', 
        'Maternity Wear', 'Plus Size Clothing', 'Business Casual', 'Vintage Clothing', 'Streetwear', 
        'Boho Chic', 'Urban Fashion', 'Workout Gear', 'Trendy Fashion', 'Other'],
   
        'Footwear': ['Men\'s Footwear', 'Women\'s Footwear', 'Kids\' Footwear', 'Athletic Shoes', 
        'Casual Shoes', 'Formal Shoes', 'Boots', 'Sneakers', 'Sandals', 'Heels', 'Flats', 'Loafers', 
        'Slippers', 'Espadrilles', 'Wedges', 'Oxfords', 'Running Shoes', 'Dress Shoes', 
        'Platform Shoes', 'Mules', 'Other'],
   
        'Accessories': ['Jewelry', 'Hats', 'Scarves', 'Handbags', 'Watches', 'Sunglasses', 'Belts', 
        'Gloves', 'Ties', 'Headbands', 'Wallets', 'Umbrellas', 'Hair Accessories', 'Brooches', 
        'Cufflinks', 'Keychains', 'Socks', 'Tights', 'Backpacks', 'Tech Accessories', 'Other'],

        'Other':['Other'],
   
  }},
    { 
      id: 11,
      name: 'Shops & Stores',
      options: ['Fashion Stores', 'Electronics Stores', 'Supermarkets', 'Other'],
      subcategories: {
      
      
        'Fashion Stores': ['Clothing', 'Footwear', 'Accessories', 'Boutiques', 'Sportswear Shops', 
        'Lingerie Stores', 'Kids Fashion Stores', 'Vintage Shops', 'Designer Outlets', 
        'Athleisure Stores', 'Fashion Chains', 'Formal Wear Stores', 'Ethnic Wear Shops', 
        'Shoe Boutiques', 'Streetwear Shops', 'Luxury Fashion Stores', 'Maternity Stores', 
        'Hat Shops', 'Jewelry Boutiques', 'Other'],
       
        'Electronics Stores': ['Smartphones', 'Laptops', 'Cameras', 'Tablets', 'Audio Equipment', 
        'Wearable Devices', 'Gaming Consoles', 'Printers', 'Home Appliances', 'Drones', 
        'Computer Accessories', 'Headphones', 'Virtual Reality Gear', 'Smartwatches', 
        'Camera Accessories', 'Electronic Components', 'Televisions', 'Power Banks', 
        'Speakers', 'Fitness Trackers', 'Other'],
       
        'Supermarkets': ['Grocery', 'Snacks', 'Beverages', 'Fresh Produce', 'Frozen Foods', 
        'Dairy Products', 'Bakery', 'Meat and Poultry', 'Seafood', 'Canned Goods', 
        'Household Essentials', 'Cleaning Supplies', 'Personal Care', 'Health and Wellness', 
        'Pet Supplies', 'Baby Care', 'International Foods', 'Organic Products', 'Snack Aisle', 
        'Beverage Section', 'Other'],

        'Other':['Other'],
       
      },
    },
    { 
      id: 12,
      name: 'Medical',
      options: ['Pharmacies', 'Medical Equipment', 'Health Services', 'Other'],
      subcategories: {
       
        
        'Pharmacies': ['Prescription Drugs', 'Over-the-counter Drugs', 'Health Supplements', 'Other'],
        
        'Medical Equipment': ['Diagnostic Equipment', 'Patient Care', 'Surgical Instruments', 'Other'],
       
        'Health Services': ['Primary Care', 'Specialist Consultation', 'Emergency Services', 'Other'],

        'Other':['Other'],
        
      },
    },
    { 
      id: 13,
      name: 'Vehicles',
      options: ['Cars', 'Motorcycles', 'Bicycles', 'Other'],
      subcategories: {
        
    'Cars': ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Convertible', 'Coupe', 'Electric Cars', 
    'Hybrid Cars', 'Luxury Cars', 'Compact Cars', 'Minivan', 'Pickup Truck', 'Crossover', 
    'Sports Car', 'Wagon', 'Vintage Cars', 'Off-road Vehicles', 'Eco-friendly Cars', 'Family Cars', 
    'Commercial Vehicles', 'Other'],

    'Motorcycles': ['Sport Bikes', 'Cruisers', 'Touring Bikes', 'Dirt Bikes', 'Choppers', 
    'Adventure Bikes', 'Scooters', 'Cafe Racers', 'Dual Sport Bikes', 'Trikes', 
    'Electric Motorcycles', 'Classic Motorcycles', 'Naked Bikes', 'Custom Motorcycles', 'Enduro Bikes', 
    'Street Bikes', 'Bobber Motorcycles', 'Motocross Bikes', 'Supermoto', 'Vintage Motorcycles', 'Other'],

    'Bicycles': ['Mountain Bikes', 'Road Bikes', 'Hybrid Bikes', 'Cruiser Bikes', 'BMX Bikes', 
    'Electric Bikes', 'Folding Bikes', 'Gravel Bikes', 'Fat Bikes', 'Commuter Bikes', 'Kids Bikes', 
    'Tandem Bikes', 'Recumbent Bikes', 'Triathlon Bikes', 'Touring Bikes', 'Single-Speed Bikes', 
    'City Bikes', 'Cargo Bikes', 'Fixed Gear Bikes', 'Tricycles', 'Other'],

    'Other':['Other'],
 
  },
    },
    { 
      id: 14,
      name: 'Cloths',
      options: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Other'],
      subcategories: {
       
       
        'Men\'s Clothing': ['Shirts', 'Pants', 'Suits', 'T-Shirts', 'Jeans', 'Jackets', 'Sweaters', 
        'Shorts', 'Activewear', 'Formal Wear', 'Casual Wear', 'Outerwear', 'Sleepwear', 'Swimwear', 
        'Sportswear', 'Business Attire', 'Underwear', 'Ties', 'Accessories', 'Other'],
       
        'Women\'s Clothing': ['Dresses', 'Tops', 'Bottoms', 'Skirts', 'Blouses', 'Jumpsuits', 'Coats', 
        'Cardigans', 'Leggings', 'Activewear', 'Formal Dresses', 'Casual Dresses', 'Sweaters', 'Jeans', 
        'Shorts', 'Outerwear', 'Swimwear', 'Lingerie', 'Maternity Wear', 'Accessories', 'Other'],
        
        'Kids\' Clothing': ['Boys', 'Girls', 'Infants', 'Toddlers', 'Newborns', 'School Uniforms', 
        'Pajamas', 'Dresses', 'Tops', 'Bottoms', 'Jackets', 'Activewear', 'Swimwear', 'Costumes', 
        'Winter Wear', 'Sports Apparel', 'Sleepwear', 'Accessories', 'Shoes', 'Hats', 'Other'],

        'Other':['Other'],
    
      },
    },
    { 
      id: 15,
      name: 'Electronics',
      options: ['Smartphones', 'Laptops', 'Cameras', 'Other'],
      subcategories: {
       
        'Smartphones': ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'OnePlus', 'Xiaomi', 'Huawei', 
        'Sony Xperia', 'LG', 'Motorola', 'Asus', 'Nokia', 'HTC', 'BlackBerry', 'ZTE', 'Lenovo', 
        'OPPO', 'Vivo', 'Realme', 'Infinix', 'Alcatel', 'Other'],

        'Laptops': ['MacBook', 'Dell XPS', 'HP Spectre', 'Lenovo ThinkPad', 'ASUS ROG', 'Acer Predator', 
        'Microsoft Surface', 'Alienware', 'Razer Blade', 'LG Gram', 'MSI Gaming Laptop', 
        'Samsung Galaxy Book', 'Huawei MateBook', 'Toshiba Portégé', 'Sony VAIO', 'Fujitsu Lifebook', 
        'LG Ultra PC', 'Google Pixelbook', 'Xiaomi Mi Notebook', 'Other'],

        'Cameras': ['DSLR', 'Mirrorless', 'Point and Shoot', 'GoPro', 'Action Cameras', '360 Cameras', 
        'Medium Format Cameras', 'Bridge Cameras', 'Instant Cameras', 'Compact Cameras', 
        'Cinema Cameras', 'Digital Compact Cameras', 'Full Frame Cameras', 'APS-C Cameras', 
        'Micro Four Thirds Cameras', 'Canon EOS Series', 'Nikon Z Series', 'Sony Alpha Series', 
        'Fujifilm X Series', 'Panasonic Lumix Series', 'Other'],

        'Other':['Other'],
        
      },
    },
    { 
      id: 16,
      name: 'Kitchen',
      options: ['Cookware', 'Appliances', 'Utensils', 'Other'],
      subcategories: {
        
    'Cookware': ['Pots and Pans', 'Bakeware', 'Cooking Utensils', 'Cooking Sets', 'Roasting Pans', 
    'Woks', 'Dutch Ovens', 'Griddles', 'Sauté Pans', 'Stockpots', 'Sauce Pans', 'Casserole Dishes', 
    'Frying Pans', 'Grill Pans', 'Cake Pans', 'Pie Dishes', 'Muffin Tins', 
    'Bundt Pans', 'Casserole Pans', 'Other'],

    'Appliances': ['Microwave', 'Blender', 'Toaster', 'Coffee Maker', 'Food Processor', 'Stand Mixer', 
    'Juicer', 'Electric Kettle', 'Slow Cooker', 'Rice Cooker', 'Air Fryer', 'Pressure Cooker', 
    'Espresso Machine', 'Hand Mixer', 'Waffle Maker', 'Ice Cream Maker', 'Bread Maker', 
    'Grill/Griddle', 'Sous Vide Cooker', 'Food Dehydrator', 'Other'],

    'Utensils': ['Knives', 'Spoons', 'Forks', 'Cutting Boards', 'Spatulas', 'Tongs', 'Whisks', 'Peelers', 
    'Can Openers', 'Measuring Cups and Spoons', 'Mixing Bowls', 'Colanders', 'Strainers', 'Graters', 
    'Pizza Cutters', 'Garlic Presses', 'Ice Cream Scoops', 'Potato Mashers', 'Cheese Slicers', 
    'Kitchen Shears', 'Other'],

    'Other':['Other'],
  
  },
    },
    { 
      id: 17,
      name: 'Grocery',
      options: ['Fresh Produce', 'Dairy', 'Canned Goods', 'Other'],
      subcategories: {
        
        'Fresh Produce': ['Vegetables', 'Fruits', 'Herbs', 'Leafy Greens', 'Root Vegetables', 
        'Berries', 'Citrus Fruits', 'Tropical Fruits', 'Melons', 'Stone Fruits', 'Exotic Fruits', 
        'Organic Produce', 'Fresh Juices', 'Salad Greens', 'Fresh Herbs', 'Sprouts', 'Mushrooms', 
        'Microgreens', 'Edible Flowers', 'Other'],

        'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Eggs', 'Cream', 'Sour Cream', 'Cottage Cheese', 
        'Cream Cheese', 'Whipped Cream', 'Plant-Based Milk Alternatives', 'Almond Milk', 'Soy Milk', 
        'Coconut Milk', 'Cheese Varieties', 'Greek Yogurt', 'Flavored Yogurt', 'Lactose-Free Dairy', 
        'Organic Dairy', 'Other'],

        'Canned Goods': ['Soup', 'Beans', 'Tomatoes', 'Vegetables', 'Fruits', 'Fish', 'Meat', 
        'Pasta Sauce', 'Soup Broths', 'Chili', 'Condensed Milk', 'Canned Pasta', 'Canned Seafood', 
        'Canned Vegetables', 'Canned Fruits', 'Canned Beans', 'Canned Soup', 'Canned Meat', 
        'Canned Gravy', 'Canned Stew', 'Other'],

        'Other':['Other'],
       
      },
    },
    { 
      id: 18,
      name: 'Electronics',
      options: ['Smartwatches', 'Headphones', 'Speakers', 'Other'],
      subcategories: {
  
    'Smartwatches': ['Apple Watch', 'Samsung Galaxy Watch', 'Fitbit', 'Garmin', 'Huawei Watch', 
    'Amazfit', 'Fossil', 'TicWatch', 'Withings', 'Suunto', 'Polar', 'Misfit', 'Casio Smartwatch', 
    'Xiaomi Mi Watch', 'LG Watch', 'Sony Smartwatch', 'Garmin Venu', 'Honor Watch', 'Realme Watch', 
    'Oppo Watch', 'Other'],

    'Headphones': ['Over-Ear', 'In-Ear', 'Wireless', 'Noise-Canceling', 'On-Ear', 'Open-Back', 
    'Closed-Back', 'Earbuds', 'True Wireless Earbuds', 'Sports Headphones', 'Gaming Headsets', 
    'DJ Headphones', 'Studio Headphones', 'Bluetooth Headphones', 'Hi-Fi Headphones', 
    'Audiophile Headphones', 'Bone Conduction Headphones', 'Lightning Connector Headphones', 
    'USB-C Headphones', 'Kids Headphones', 'Other'],

    'Speakers': ['Bluetooth Speakers', 'Home Theater Systems', 'Soundbars', 'Bookshelf Speakers', 
    'Portable Speakers', 'Smart Speakers', 'Wi-Fi Speakers', 'Studio Monitors', 'Computer Speakers', 
    'Outdoor Speakers', 'Floorstanding Speakers', 'In-Ceiling Speakers', 'In-Wall Speakers', 
    'Subwoofers', 'Gaming Speakers', 'Surround Sound Speakers', 'Sound Bases', 'Underwater Speakers', 
    'Vintage Speakers', 'Party Speakers', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 19,
      name: 'Books',
      options: ['Fiction', 'Non-Fiction', 'Children\'s Books', 'Other'],
      subcategories: {
       
        'Fiction': ['Mystery', 'Science Fiction', 'Romance', 'Fantasy', 'Thriller', 
        'Historical Fiction', 'Adventure', 'Dystopian Fiction', 'Crime Fiction', 'Chick Lit', 'Horror', 
        'Contemporary Fiction', 'Classic Literature', 'Magical Realism', 'Literary Fiction', 'Humor', 
        'Urban Fantasy', 'Women\'s Fiction', 'Short Stories', 'Other'],

        'Non-Fiction': ['Biography', 'History', 'Self-Help', 'Memoir', 'Business', 'Psychology', 
        'Science', 'Health and Wellness', 'Philosophy', 'Political Science', 'Sociology', 'True Crime', 
        'Technology', 'Travel', 'Cookbooks', 'Art and Photography', 'Education', 'Nature', 'Religion', 
        'Personal Development', 'Other'],

        'Children\'s Books': ['Picture Books', 'Chapter Books', 'Young Adult', 'Middle-Grade Books', 
        'Children\'s Fantasy', 'Adventure Books', 'Mystery Books', 'Science Fiction for Kids', 
        'Historical Fiction for Kids', 'Educational Books', 'Bedtime Stories', 'Fairy Tales', 
        'Graphic Novels for Kids', 'Poetry for Children', 'Interactive Books', 'Early Readers', 
        'Board Books', 'Holiday-themed Books', 'Biographies for Kids', 'Other'],

        'Other':['Other'],
        
      },
    },
    { 
      id: 20,
      name: 'Cosmetics',
      options: ['Skincare', 'Makeup', 'Haircare', 'Other'],
      subcategories: {
     

    'Skincare': ['Cleansers', 'Moisturizers', 'Serums', 'Toners', 'Exfoliators', 'Masks', 'Sunscreen', 
    'Eye Creams', 'Acne Treatments', 'Anti-Aging Products', 'Facial Oils', 'Essences', 'Treatments', 
    'Ampoules', 'Face Mists', 'Sheet Masks', 'Spot Treatments', 'Night Creams', 'Face Scrubs', 
    'Facial Cleansing Brushes', 'Other'],

    'Makeup': ['Lipstick', 'Eyeshadow', 'Foundation', 'Mascara', 'Blush', 'Highlighter', 'Eyeliner', 
    'Concealer', 'Setting Powder', 'Bronzer', 'Lip Gloss', 'Eyebrow Products', 'Makeup Brushes', 
    'Makeup Remover', 'Primer', 'Setting Spray', 'CC Cream', 'BB Cream', 'Makeup Palettes', 
    'Lip Liner', 'Body Glitter', 'Other'],

    'Haircare': ['Shampoo', 'Conditioner', 'Styling Products', 'Hair Oil', 'Hair Mask', 
    'Leave-In Conditioner', 'Heat Protectant', 'Hair Serum', 'Hair Gel', 'Hair Mousse', 
    'Hair Spray', 'Dry Shampoo', 'Volumizing Products', 'Texturizing Products', 'Curl Enhancers', 
    'Hair Dye', 'Hair Accessories', 'Scalp Treatments', 'Hair Vitamins', 'Hair Tools', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 21,
      name: 'Jewelry',
      options: ['Necklaces', 'Rings', 'Bracelets', 'Other'],
      subcategories: {
        
        'Necklaces': ['Pendants', 'Chains', 'Lockets', 'Pearl Necklaces', 'Statement Necklaces', 
        'Choker Necklaces', 'Collar Necklaces', 'Lariat Necklaces', 'Y-Necklaces', 'Layered Necklaces', 
        'Bib Necklaces', 'Tassel Necklaces', 'Initial Necklaces', 'Cross Necklaces', 'Heart Necklaces', 
        'Gemstone Necklaces', 'Bar Necklaces', 'Coin Necklaces', 'Nameplate Necklaces', 
        'Infinity Necklaces', 'Other'],

        'Rings': ['Engagement Rings', 'Wedding Bands', 'Statement Rings', 'Solitaire Rings', 
        'Halo Rings', 'Three-Stone Rings', 'Vintage Rings', 'Stackable Rings', 'Cocktail Rings', 
        'Cluster Rings', 'Eternity Rings', 'Promise Rings', 'Midi Rings', 'Signet Rings', 'Toe Rings', 
        'Birthstone Rings', 'Adjustable Rings', 'Thumb Rings', 'Stacked Rings', 'Men\'s Rings', 'Other'],

        'Bracelets': ['Bangles', 'Cuffs', 'Charm Bracelets', 'Chain Bracelets', 'Beaded Bracelets', 
        'Wrap Bracelets', 'Link Bracelets', 'Tennis Bracelets', 'Anklets', 'ID Bracelets', 
        'Leather Bracelets', 'Bolo Bracelets', 'Slider Bracelets', 'Stretch Bracelets', 
        'Magnetic Bracelets', 'Personalized Bracelets', 'Statement Bracelets', 'Friendship Bracelets', 
        'Morse Code Bracelets', 'Medical Alert Bracelets', 'Other'],

        'Other':['Other'],
       
      },
    },
    { 
      id: 22,
      name: 'Vehicles',
      options: ['Cars', 'Motorcycles', 'Bicycles', 'Other'],
      subcategories: {
       

        'Cars': ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Convertible', 'Coupe', 'Electric Cars', 
        'Hybrid Cars', 'Luxury Cars', 'Compact Cars', 'Minivan', 'Pickup Truck', 'Crossover', 
        'Sports Car', 'Wagon', 'Vintage Cars', 'Off-road Vehicles', 'Eco-friendly Cars', 
        'Family Cars', 'Commercial Vehicles', 'Other'],
       
        'Motorcycles': ['Sport Bikes', 'Cruisers', 'Touring Bikes', 'Dirt Bikes', 'Choppers', 
        'Adventure Bikes', 'Scooters', 'Cafe Racers', 'Dual Sport Bikes', 'Trikes', 
        'Electric Motorcycles', 'Classic Motorcycles', 'Naked Bikes', 'Custom Motorcycles', 
        'Enduro Bikes', 'Street Bikes', 'Bobber Motorcycles', 'Motocross Bikes', 'Supermoto', 
        'Vintage Motorcycles', 'Other'],
       
        'Bicycles': ['Mountain Bikes', 'Road Bikes', 'Hybrid Bikes', 'Cruiser Bikes', 'BMX Bikes', 
        'Electric Bikes', 'Folding Bikes', 'Gravel Bikes', 'Fat Bikes', 'Commuter Bikes', 'Kids Bikes', 
        'Tandem Bikes', 'Recumbent Bikes', 'Triathlon Bikes', 'Touring Bikes', 'Single-Speed Bikes', 
        'City Bikes', 'Cargo Bikes', 'Fixed Gear Bikes', 'Tricycles', 'Other'],

        'Other':['Other'],
       
      },
    },
    { 
      id: 23,
      name: 'Beverage',
      options: ['Coffee', 'Tea', 'Soft Drinks', 'Other'],
      subcategories: {

    'Coffee': ['Ground Coffee', 'Coffee Beans', 'Instant Coffee', 'Espresso', 'Single-Origin Coffee', 
    'Decaf Coffee', 'Dark Roast', 'Medium Roast', 'Light Roast', 'Flavored Coffee', 'Organic Coffee', 
    'Cold Brew Coffee', 'Coffee Pods', 'Caffeine-Free Coffee', 'Coffee Blends', 'Fair Trade Coffee', 
    'Coffee Accessories', 'Coffee Grinders', 'Coffee Makers', 'Travel Mugs', 'Other'],

    'Tea': ['Black Tea', 'Green Tea', 'Herbal Tea', 'Oolong Tea', 'White Tea', 'Chai Tea', 'Rooibos Tea', 
    'Pu-erh Tea', 'Mate Tea', 'Hibiscus Tea', 'Fruit Infusions', 'Detox Tea', 'Slimming Tea', 'Iced Tea', 
    'Tea Bags', 'Loose Leaf Tea', 'Matcha Tea', 'Blooming Tea', 'Tea Accessories', 'Teapots', 'Tea Cups', 'Other'],

    'Soft Drinks': ['Soda', 'Juice', 'Energy Drinks', 'Sparkling Water', 'Flavored Water', 
    'Sports Drinks', 'Iced Tea Drinks', 'Cold-Pressed Juices', 'Fruit Juices', 'Vegetable Juices', 
    'Smoothies', 'Lemonade', 'Infused Water', 'Coconut Water', 'Iced Coffee Drinks', 'Milkshakes', 
    'Protein Drinks', 'Non-Alcoholic Cocktails', 'Mocktails', 'Tonic Water', 'Other'],

    'Other':['Other'],
   
    
  },
    },
    { 
      id: 24,
      name: 'Coffee Shops',
      options: ['Local Cafes', 'Chain Coffee Shops', 'Specialty Coffee Shops', 'Other'],
      subcategories: {
       
    'Local Cafes': ['Independent Cafes', 'Artisanal Coffee Shops', 'Cozy Corners', 'Neighborhood Gems', 
    'Hidden Gems', 'Community Favorites', 'Quaint Coffee Houses', 'Local Roasteries', 'Rustic Cafes', 
    'Charming Bakeries', 'Bohemian Coffee Spots', 'Urban Retreats', 'Vintage Cafes', 'Cafes with Patios', 
    'Eclectic Coffee Shops', 'Family-Owned Cafes', 'Hipster Hangouts', 'Cafes with Live Music', 
    'Bookstore Cafes', 'Dog-Friendly Cafes', 'Other'],

    'Chain Coffee Shops': ['Starbucks', 'Dunkin', 'Peet\'s Coffee', 'Tim Hortons', 'McDonald\'s McCafé', 
    'Costa Coffee', 'Caffè Nero', 'Gloria Jean\'s Coffees', 'Caribou Coffee', 
    'The Coffee Bean & Tea Leaf', 'Tully\'s Coffee', 'Seattle\'s Best Coffee', 'McCafé', 
    'Gregorys Coffee', 'Blue Bottle Coffee', 'Second Cup', 'Au Bon Pain', 'It\'s A Grind Coffee House', 
    'Philz Coffee', 'Café Barbera', 'Other'],

    'Specialty Coffee Shops': ['Third Wave Coffee Shops', 'Pour-Over Bars', 'Cold Brew Specialists', 
    'Single-Origin Coffee Shops', 'Coffee Laboratories', 'Nitro Cold Brew Cafes', 'Coffee Roasteries', 
    'Artisan Coffee Shops', 'Barista Competitions Venues', 'Ethically Sourced Coffee Shops', 
    'Bean-to-Barista Establishments', 'Cafes with Coffee Workshops', 'Coffee Tasting Rooms', 
    'Espresso Artistry Spaces', 'Microbreweries with Coffee', 'Experimental Coffee Labs', 
    'Coffee and Dessert Pairing Shops', 'Aeropress Enthusiast Cafes', 
    'Farm-to-Cup Coffee Houses', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 25,
      name: 'SuperMarkets',
      options: ['Grocery', 'Household', 'Personal Care', 'Other'],
      subcategories: {
       
    'Grocery': ['Fresh Produce', 'Dairy', 'Canned Goods', 'Bakery', 'Frozen Foods', 'Snack Foods', 
    'Beverages', 'Condiments', 'Pasta and Rice', 'Cereal and Breakfast Foods', 'Baking Ingredients', 
    'Canned and Jarred Foods', 'International Foods', 'Organic and Natural Foods', 
    'Spices and Seasonings', 'Baby and Toddler Foods', 'Pet Supplies', 'Health Foods', 
    'Bulk Foods', 'Deli and Prepared Foods', 'Other'],

    'Household': ['Cleaning Supplies', 'Paper Products', 'Home Essentials', 'Laundry Supplies', 
    'Kitchenware', 'Storage and Organization', 'Home Decor', 'Bedding and Linens', 'Furniture', 
    'Small Appliances', 'Cookware and Bakeware', 'Electronics', 'Tools and Hardware', 'Lighting', 
    'Party Supplies', 'Seasonal and Holiday Items', 'Office Supplies', 'Pest Control', 
    'Home Improvement', 'Automotive', 'Other'],

    'Personal Care': ['Skincare', 'Haircare', 'Oral Care', 'Bath and Body', 'Cosmetics', 'Fragrances', 
    'Health and Wellness', 'Personal Hygiene', 'First Aid', 'Men\'s Grooming', 'Women\'s Grooming', 
    'Shaving and Hair Removal', 'Sun Care', 'Incontinence Care', 'Medical Supplies', 
    'Supplements and Vitamins', 'Beauty Tools and Accessories', 'Home Health Care', 
    'Diet and Nutrition', 'Fitness and Exercise', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 26,
      name: 'Building Materials',
      options: ['Lumber', 'Hardware', 'Paint', 'Other'],
      subcategories: {
       
        'Lumber': ['Plywood', '2x4s', 'Decking', 'Laminated Veneer Lumber (LVL)', 'Particleboard', 
        'Hardwood Boards', 'Softwood Boards', 'MDF Boards', 'Melamine Boards', 'Trim Boards', 
        'Furring Strips', 'Pressure-Treated Lumber', 'Composite Decking', 'Cedar Boards', 'Oak Boards', 
        'Bamboo Lumber', 'Maple Boards', 'Birch Boards', 'Pine Boards', 'Redwood Lumber', 'Other'],

        'Hardware': ['Nails', 'Screws', 'Tools', 'Power Tools', 'Hand Tools', 'Fasteners', 
        'Adhesives and Sealants', 'Door Hardware', 'Cabinet Hardware', 'Window Hardware', 
        'Hinges', 'Hooks and Hangers', 'Ladders', 'Safety Equipment', 'Measuring and Layout Tools', 
        'Workwear and Protective Gear', 'Storage and Organization', 'Tool Accessories', 'Casters', 
        'Home Security', 'Other'],

        'Paint': ['Interior Paint', 'Exterior Paint', 'Primers', 'Paint Brushes', 'Paint Rollers', 
        'Paint Trays and Liners', 'Paint Sprayers', 'Paint Tapes', 'Drop Cloths', 'Painter\'s Tape', 
        'Stains and Sealers', 'Paint Additives', 'Paint Mixers and Stirrers', 'Painting Accessories', 
        'Spray Paint', 'Specialty Paints', 'Ceiling Paint', 'Floor Paint', 'Chalkboard Paint', 
        'Concrete Paint', 'Other'],

        'Other':['Other'],
       
      },
    },
    { 
      id: 27,
      name: 'Fruits',
      options: ['Citrus', 'Berries', 'Tropical Fruits', 'Other'],
      subcategories: {
       
    
        'Citrus': ['Oranges', 'Lemons', 'Grapefruits', 'Tangerines', 'Clementines', 'Blood Oranges', 
        'Mandarins', 'Pomelos', 'Ugli Fruit', 'Kumquats', 'Satsumas', 'Limequats', 'Calamondins', 
        'Bergamots', 'Yuzu', 'Citron', 'Sweet Limes', 'Tangelo', 'Minneola', 'Citrus Medley', 'Other'],
   
        'Berries': ['Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Cranberries', 
        'Gooseberries', 'Boysenberries', 'Currants', 'Huckleberries', 'Mulberries', 'Elderberries', 
        'Loganberries', 'Marionberries', 'Acai Berries', 'Cherries', 'Cranberries', 'Cloudberries', 
        'Goldenberries', 'Juniper Berries', 'Saskatoon Berries', 'Other'],
    
        'Tropical Fruits': ['Pineapple', 'Mango', 'Kiwi', 'Banana', 'Papaya', 'Guava', 'Passion Fruit', 
        'Dragon Fruit', 'Coconut', 'Lychee', 'Pomegranate', 'Star Fruit', 'Durian', 'Jackfruit', 
        'Plantain', 'Feijoa', 'Soursop', 'Mangosteen', 'Carambola', 'Persimmon', 'Other'],

        'Other':['Other'],
   
  },
    },
    { 
      id: 28,
      name: 'Furniture',
      options: ['Living Room', 'Bedroom', 'Outdoor', 'Other'],
      subcategories: {
        
    'Living Room': ['Sofas', 'Coffee Tables', 'Shelves', 'Sectional Sofas', 'Accent Chairs', 
    'End Tables', 'TV Stands', 'Bookcases', 'Ottomans', 'Chaise Lounges', 'Recliners', 'Futons', 
    'Console Tables', 'Bean Bags', 'Fireplace TV Stands', 'Entertainment Centers', 'Sofa Beds', 
    'Coat Racks', 'Room Dividers', 'Living Room Sets', 'Other'],

    'Bedroom': ['Beds', 'Dressers', 'Nightstands', 'Mattresses', 'Bed Frames', 'Headboards', 
    'Armoires', 'Chests of Drawers', 'Bedroom Sets', 'Vanity Tables', 'Mirrors', 'Bedroom Benches', 
    'Futons', 'Daybeds', 'Trundle Beds', 'Bunk Beds', 'Platform Beds', 'Canopy Beds', 'Murphy Beds', 
    'Captain\'s Beds', 'Other'],

    'Outdoor': ['Patio Sets', 'Outdoor Sofas', 'Sun Loungers', 'Adirondack Chairs', 
    'Outdoor Dining Sets', 'Hammocks', 'Porch Swings', 'Outdoor Benches', 'Picnic Tables', 
    'Garden Stools', 'Outdoor Coffee Tables', 'Fire Pits', 'Outdoor Rugs', 'Patio Umbrellas', 
    'Outdoor Bar Sets', 'Chaise Lounges', 'Outdoor Sectionals', 'Outdoor Cushions', 'Deck Boxes', 
    'Patio Chairs', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 29,
      name: 'Equipments',
      options: ['Gym Equipment', 'Photography Gear', 'Audio Visual Equipment', 'Other'],
      subcategories: {

    'Gym Equipment': ['Treadmills', 'Weights', 'Resistance Bands', 'Elliptical Trainers', 
    'Exercise Bikes', 'Rowing Machines', 'Home Gyms', 'Yoga Mats', 'Jump Ropes', 'Kettlebells', 
    'Medicine Balls', 'Pull-Up Bars', 'Ab Rollers', 'Exercise Balls', 'Foam Rollers', 'Fitness Trackers', 
    'Boxing Equipment', 'Resistance Tubes', 'Balance Boards', 'Step Platforms', 'Other'],

    'Photography Gear': ['Cameras', 'Lenses', 'Tripods', 'Camera Bags', 'Camera Accessories', 
    'Studio Lighting', 'Photography Backdrops', 'Reflectors', 'Lens Filters', 'Camera Straps', 
    'Memory Cards', 'Camera Batteries', 'Camera Cleaning Kits', 'Remote Controls', 'Camera Flashes', 
    'Camera Tripod Heads', 'Camera Stabilizers', 'Photography Reflectors', 'Camera Rain Covers', 
    'Camera Lens Hoods', 'Other'],

    'Audio Visual Equipment': ['Speakers', 'Microphones', 'Projectors', 'Headphones', 
    'AV Receivers', 'Soundbars', 'Home Theater Systems', 'Microphone Stands', 'PA Systems', 
    'Audio Interfaces', 'Mixers and Consoles', 'DJ Equipment', 'Turntables', 'Studio Monitors', 
    'Wireless Microphone Systems', 'Projector Screens', 'Projection Mounts', 'AV Cables', 
    'Amplifiers', 'Conference Room Audio Systems', 'Other'],

    'Other':['Other'],
    
  },
    },
    { 
      id: 30,
      name: 'Babies & Kids',
      options: ['Toys', 'Clothing', 'Baby Gear', 'Other'],
      subcategories: {
      
        'Toys': ['Action Figures', 'Dolls', 'Educational Toys', 'Board Games', 'Building Blocks', 
        'Puzzles', 'Plush Toys', 'Remote Control Toys', 'Art and Craft Supplies', 'Outdoor Toys', 
        'Ride-On Toys', 'Musical Toys', 'Science Kits', 'Dress-Up Toys', 'Play Kitchens', 
        'Toy Cars and Trucks', 'Sports Equipment for Kids', 'Stuffed Animals', 
        'Toy Instruments', 'Interactive Toys', 'Other'],

        'Clothing': ['Onesies', 'T-Shirts', 'Pajamas', 'Dresses', 'Sweaters', 'Jackets', 'Leggings', 
        'Hats and Caps', 'Socks', 'Shoes', 'Swimwear', 'Accessories', 'Costumes', 'Activewear', 
        'Skirts', 'Trousers', 'Coats', 'Underwear', 'Sleepwear', 'Rainwear', 'Other'],
       
        'Baby Gear': ['Strollers', 'Car Seats', 'Cribs', 'Baby Monitors', 'High Chairs', 
        'Changing Tables', 'Baby Carriers', 'Diaper Bags', 'Baby Swings', 'Bouncers and Rockers', 
        'Playpens', 'Bath Tubs', 'Baby Walkers', 'Nursery Furniture', 'Baby Bedding', 'Potty Training', 
        'Baby Feeding Supplies', 'Teething Toys', 'Baby Clothes Storage', 'Baby Safety Products', 'Other'],
       
        'Other':['Other'],
      },
    },
    { 
      id: 31,
      name: 'Software',
      options: ['Operating Systems', 'Productivity Software', 'Design Software', 'Other'],
      subcategories: {
       

    'Operating Systems': ['Windows', 'macOS', 'Linux', 'Ubuntu', 'Fedora', 'CentOS', 'Debian', 
    'Arch Linux', 'openSUSE', 'Red Hat Enterprise Linux', 'Android', 'iOS', 'Chrome OS', 'BSD', 
    'Solaris', 'Unix', 'FreeBSD', 'AIX', 'HP-UX', 'OS/2', 'BeOS', 'Other'],

    'Productivity Software': ['Microsoft Office', 'Google Workspace', 'Slack', 'Zoom', 'Trello', 
    'Asana', 'Evernote', 'Notion', 'Monday.com', 'Wrike', 'Airtable', 'Microsoft Teams', 'Todoist', 
    'Jira', 'Dropbox', 'Box', 'OneNote', 'Zoho Workplace', 'Confluence', 'Quip', 'Other'],

    'Design Software': ['Adobe Creative Cloud', 'Sketch', 'Figma', 'InVision', 'CorelDRAW', 
    'Affinity Designer', 'Canva', 'GIMP', 'Procreate', 'Autodesk SketchBook', 'Zeplin', 
    'Adobe XD', 'Axure RP', 'Marvel', 'Principle', 'Balsamiq', 'SketchUp', 'Blender', 'Cinema 4D', 
    '3ds Max', 'Other'],

    'Other':['Other'],
   
  },
    },
    { 
      id: 32,
      name: 'Animals',
      options: ['Pets', 'Pet Supplies', 'Wildlife Conservation', 'Other'],
      subcategories: {
       

    'Pets': ['Dogs', 'Cats', 'Fish', 'Birds', 'Hamsters', 'Rabbits', 'Guinea Pigs', 'Turtles', 
    'Snakes', 'Lizards', 'Ferrets', 'Hedgehogs', 'Chinchillas', 'Sugar Gliders', 'Hermit Crabs', 
    'Tarantulas', 'Axolotls', 'Frogs', 'Betta Fish', 'Parrots', 'Other'],

    'Pet Supplies': ['Pet Food', 'Toys', 'Grooming Products', 'Collars and Leashes', 
    'Beds and Furniture', 'Carriers and Travel Products', 'Bowls and Feeders', 
    'Apparel and Accessories', 'Health and Wellness', 'Training and Behavior', 
    'Litter and Cleanup', 'Houses, Crates, and Pens', 'Flea and Tick Control', 
    'Aquariums and Accessories', 'Reptile and Amphibian Supplies', 'Small Animal Supplies', 
    'Bird Supplies', 'Horse Supplies', 'Farm and Ranch Supplies', 'Wild Bird Supplies', 'Other'],

    'Wildlife Conservation': ['Donations', 'Adopt an Animal', 'Conservation Projects', 
    'Wildlife Sanctuaries', 'Zoos and Aquariums', 'Nature Reserves', 'Animal Rehabilitation Centers', 
    'Wildlife Education Programs', 'Species-specific Conservation Organizations', 
    'Global Conservation Initiatives', 'Marine Conservation Projects', 'Wildlife Research Programs', 
    'Biodiversity Protection', 'Anti-Poaching Initiatives', 'Community-based Conservation', 
    'Environmental Education Initiatives', 'Ecotourism Projects', 'Habitat Restoration Programs', 
    'Climate Change Adaptation Projects', 'Conservation Volunteer Opportunities', 'Other'],

    'Other':['Other'],
    
  },
    },
    { 
      id: 33,
      name: 'Accessories',
      options: ['Handbags', 'Watches', 'Sunglasses', 'Other'],
      subcategories: {
      
      'Handbags': ['Tote Bags', 'Clutches', 'Backpacks', 'Shoulder Bags', 'Crossbody Bags', 
      'Hobo Bags', 'Satchel Bags', 'Bucket Bags', 'Messenger Bags', 'Top Handle Bags', 'Evening Bags', 
      'Wristlet Bags', 'Belt Bags', 'Camera Bags', 'Trolley Bags', 'Beach Bags', 'Tote Backpacks', 
      'Convertible Bags', 'Duffel Bags', 'Drawstring Bags', 'Other'],

      'Watches': ['Analog Watches', 'Digital Watches', 'Smartwatches', 'Automatic Watches', 
      'Chronograph Watches', 'Dress Watches', 'Sports Watches', 'Diving Watches', 'Field Watches', 
      'Skeleton Watches', 'Moonphase Watches', 'GMT Watches', 'Pilot Watches', 'Fashion Watches', 
      'Luxury Watches', 'Military Watches', 'Fitness Trackers', 'Hybrid Smartwatches', 'Solar Watches', 
      'GPS Watches', 'Other'],

      'Sunglasses': ['Aviators', 'Wayfarers', 'Round Sunglasses', 'Cat-eye Sunglasses', 
      'Oversized Sunglasses', 'Square Sunglasses', 'Rectangle Sunglasses', 'Clubmaster Sunglasses', 
      'Browline Sunglasses', 'Sport Sunglasses', 'Polarized Sunglasses', 'Mirrored Sunglasses', 
      'Gradient Sunglasses', 'Retro Sunglasses', 'Shield Sunglasses', 'Butterfly Sunglasses', 
      'Flat Top Sunglasses', 'Wrap-around Sunglasses', 'Cateye Shield Sunglasses', 
      'Slim Cat-eye Sunglasses', 'Other'],

      'Other':['Other'],
    
  },
    },
    { 
      id: 34,
      name: 'Music Equipments',
      options: ['Instruments', 'Recording Equipment', 'Sheet Music', 'Other'],
      subcategories: {
     
      'Instruments': ['Guitars', 'Keyboards', 'Drums', 'Violins', 'Flutes', 'Trumpets', 
      'Saxophones', 'Pianos', 'Bass Guitars', 'Cellos', 'Harmonicas', 'Ukuleles', 'Banjos', 
      'Mandolins', 'Accordions', 'Djembe Drums', 'Synthesizers', 'Electric Violins', 'Didgeridoos', 'Other'],
     
      'Recording Equipment': ['Microphones', 'Audio Interfaces', 'Studio Monitors', 'Mixers', 
      'Digital Audio Workstations (DAWs)', 'Headphones', 'Pop Filters', 'Mic Stands', 
      'Shock Mounts', 'Studio Desks', 'Cables and Connectors', 'Preamps', 'Power Conditioners', 
      'Acoustic Treatment', 'MIDI Controllers', 'Audio Recorders', 'Patchbays', 'External Hard Drives', 
      'Studio Chairs', 'Instrument Mics', 'Other'],

      'Sheet Music': ['Piano Sheet Music', 'Guitar Tabs', 'Orchestral Scores', 'Vocal Sheet Music', 
      'Choral Sheet Music', 'Brass Sheet Music', 'Woodwind Sheet Music', 'String Sheet Music', 
      'Percussion Sheet Music', 'Jazz Sheet Music', 'Rock Sheet Music', 'Pop Sheet Music', 
      'Country Sheet Music', 'Classical Sheet Music', 'Folk Sheet Music', 'World Music Sheet Music', 
      'Contemporary Sheet Music', 'Blues Sheet Music', 'Electronic Sheet Music', 'Film Score Sheet Music', 'Other'],
   
      'Other':['Other'],
  },
    },
    { 
      id: 35,
      name: 'HealthCare',
      options: ['Medications', 'Medical Supplies', 'Wellness Products', 'Other'],
      subcategories: {
      
      'Medications': ['Prescription Drugs', 'Over-the-Counter Medications', 'Vitamins', 'Antibiotics', 
      'Pain Relievers', 'Allergy Medications', 'Cold and Flu Medications', 
      'Digestive Health Medications', 'Sleep Aids', 'Anti-Inflammatory Drugs', 'Antacids', 
      'Hormone Replacement Therapy', 'Muscle Relaxants', 'Antidepressants', 'Anti-Anxiety Medications', 
      'Diabetes Medications', 'Blood Pressure Medications', 'Cholesterol Medications', 
      'Antiviral Medications', 'Antifungal Medications', 'Other'],

      'Medical Supplies': ['First Aid Kits', 'Bandages', 'Thermometers', 'Blood Pressure Monitors', 
      'TENS Units', 'Hot and Cold Therapy Packs', 'Medical Gloves', 'Medical Masks', 'Hand Sanitizers', 
      'Disinfectants', 'Medical Tape', 'Nebulizers', 'Oxygen Supplies', 'Incontinence Products', 
      'Wound Care Products', 'Braces and Supports', 'Compression Stockings', 'Diagnostic Instruments', 
      'Medical Scissors', 'Splints', 'Other'],

      'Wellness Products': ['Supplements', 'Essential Oils', 'Fitness Trackers', 
      'Aromatherapy Diffusers', 'Homeopathic Remedies', 'Herbal Teas', 'Weight Loss Supplements', 
      'Joint Health Supplements', 'Probiotics', 'Detox Products', 'Natural Sleep Aids', 
      'Stress Relief Products', 'Nutritional Drinks', 'Meal Replacement Shakes', 
      'Yoga and Meditation Accessories', 'Massagers', 'Resistance Bands', 'Exercise Balls', 
      'Fitness DVDs', 'Fitness Equipment Mats', 'Other'],
      'Other':['Other'],
        
     

      },
    },
    { 
     id: 36,
     name: 'Others Products',
     options: ['Miscellaneous', 'Unique Finds', 'Customized Items', 'Other'],
     subcategories: {
   
    'Miscellaneous': ['Random', 'Assorted', 'Unspecified', 'Eclectic', 'Mixed Bag', 'Grab Bag', 
    'Oddities', 'Novelties', 'Curiosities', 'Hodgepodge', 'Potpourri', 'Sundry Items', 
    'Diverse Assortment', 'Grab-and-Go', 'Miscellanea', 'Motley Collection', 'Mishmash', 
    'Odds and Ends', 'Various Items', 'Other'],

    'Unique Finds': ['Limited Edition', 'Rare Items', 'Collector\'s Picks', 'One-of-a-Kind', 
    'Hard-to-Find', 'Special Editions', 'Curated Gems', 'Hidden Treasures', 'Exclusives', 'Ephemera', 
    'Hidden Gems', 'Treasured Discoveries', 'Extraordinary Pieces', 'Distinctive Items', 
    'Unique Discoveries', 'Uncommon Pieces', 'Exclusive Finds', 'Scarce Artifacts', 
    'Unusual Specimens', 'Extra Special Items', 'Other'],

    'Customized Items': ['Personalized Gifts', 'Bespoke Creations', 'Tailored Products', 
    'Made-to-Order', 'Custom Crafts', 'Unique Designs', 'Tailor-Made Creations', 
    'Handcrafted to Perfection', 'Individualized Products', 'Crafted According to Your Wishes', 
    'Specially Designed Items', 'Customizable Products', 'Created to Your Specifications', 
    'Crafted with Your Input', 'Tailored to Your Tastes', 'One-of-a-Kind Creations', 
    'Designed Just for You', 'Personal Touch Creations', 'Custom-Made Artistry', 'Other'],
    
    'Other':['Other'],
  },
    },
  ];
  
  export { Products };



  



 