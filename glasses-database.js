// Comprehensive Glasses Database for FrameFinder
// Curated high-quality images with detailed descriptions

const glassesDatabase = {
    // OVAL FACE RECOMMENDATIONS
    oval: {
        "Classic Rectangular": [
            {
                id: "rect_001",
                name: "Modern Professional Rectangle",
                image: "https://plus.unsplash.com/premium_photo-1733749585385-f09c117dc87a",
                type: "regular",
                material: "Acetate",
                color: "Black",
                style: "Professional",
                description: "Timeless rectangular frames perfect for business settings. The clean lines and classic proportions complement oval faces beautifully.",
                features: ["Durable acetate construction", "Universal bridge fit", "Spring hinges", "Anti-glare coating ready"],
                suitability: "Perfect for oval faces - the angular design adds structure while maintaining balance."
            },
            {
                id: "rect_002", 
                name: "Sleek Geometric Rectangle",
                image: "https://images.unsplash.com/photo-1694892465586-165971db8200",
                type: "regular",
                material: "Metal",
                color: "Gunmetal",
                style: "Contemporary",
                description: "Contemporary metal frames with subtle geometric detailing. Lightweight yet durable for all-day comfort.",
                features: ["Titanium construction", "Adjustable nose pads", "Flexible temples", "Scratch-resistant finish"],
                suitability: "Excellent for oval faces - adds sophisticated definition without overwhelming facial features."
            },
            {
                id: "rect_003",
                name: "Classic Tortoiseshell Rectangle", 
                image: "https://images.unsplash.com/photo-1694892463534-dade2296283d",
                type: "regular",
                material: "Acetate",
                color: "Tortoiseshell",
                style: "Classic",
                description: "Rich tortoiseshell pattern in a classic rectangular silhouette. A versatile choice that works with many styles.",
                features: ["Hand-polished acetate", "Traditional barrel hinges", "Wide temple design", "Luxurious finish"],
                suitability: "Ideal for oval faces - the classic proportions enhance natural facial balance."
            },
            {
                id: "rect_sun_001",
                name: "Rectangular Sport Sunglasses",
                image: "https://images.unsplash.com/photo-1653038282366-09ae0df227be",
                type: "sunglasses",
                material: "TR90",
                color: "Black/Gray",
                style: "Athletic",
                description: "High-performance rectangular sunglasses with wraparound protection. Perfect for active lifestyles.",
                features: ["UV400 protection", "Polarized lenses", "Lightweight TR90 frame", "Non-slip temple grips"],
                suitability: "Great for oval faces - the sporty rectangular design maintains facial harmony during activities."
            },
            {
                id: "rect_sun_002",
                name: "Classic Black Rectangle Sunglasses",
                image: "https://images.unsplash.com/photo-1639736921924-1cc822b2b393",
                type: "sunglasses", 
                material: "Acetate",
                color: "Black",
                style: "Classic",
                description: "Timeless black rectangular sunglasses that never go out of style. Perfect for any occasion.",
                features: ["100% UV protection", "Gradient lenses", "Premium acetate frame", "Classic styling"],
                suitability: "Perfect for oval faces - the rectangular shape provides ideal contrast to soft facial curves."
            }
        ],
        
        "Vintage Round": [
            {
                id: "round_001",
                name: "Retro Metal Round Glasses",
                image: "https://images.unsplash.com/photo-1606357086272-eab87f3db598",
                type: "regular",
                material: "Metal",
                color: "Gold",
                style: "Vintage",
                description: "Classic round metal frames with vintage charm. The perfect blend of retro style and modern comfort.",
                features: ["Stainless steel construction", "Adjustable nose pads", "Vintage-inspired design", "Lightweight comfort"],
                suitability: "Excellent for oval faces - the circular design echoes and enhances the natural facial curves."
            },
            {
                id: "round_002",
                name: "Intellectual Round Frames",
                image: "https://images.unsplash.com/photo-1606357100116-f787c70ea04f",
                type: "regular",
                material: "Acetate",
                color: "Tortoiseshell",
                style: "Academic",
                description: "Sophisticated round frames with an intellectual aesthetic. Perfect for creative professionals.",
                features: ["Premium acetate material", "Hand-finished details", "Comfortable fit", "Durable construction"],
                suitability: "Great for oval faces - adds scholarly sophistication while maintaining facial balance."
            },
            {
                id: "round_003",
                name: "Modern Round Wire Frames",
                image: "https://images.unsplash.com/photo-1591843336309-cbf414ad7978",
                type: "regular",
                material: "Metal",
                color: "Silver",
                style: "Contemporary",
                description: "Ultra-thin wire frames with a minimalist aesthetic. Clean, modern, and incredibly lightweight.",
                features: ["Ultra-thin metal construction", "Minimalist design", "Featherweight comfort", "Precision engineering"],
                suitability: "Perfect for oval faces - the delicate round shape enhances natural features without adding bulk."
            },
            {
                id: "round_sun_001",
                name: "Vintage Round Sunglasses",
                image: "https://images.unsplash.com/photo-1678550689682-f144e9dd8616",
                type: "sunglasses",
                material: "Metal",
                color: "Rose Gold",
                style: "Retro",
                description: "Iconic round sunglasses with a rose gold finish. Perfect for adding vintage flair to any outfit.",
                features: ["UV400 protection", "Anti-reflective coating", "Rose gold finish", "Vintage styling"],
                suitability: "Ideal for oval faces - the round lenses complement the natural facial structure beautifully."
            },
            {
                id: "round_sun_002", 
                name: "Classic Round Wire Sunglasses",
                image: "https://images.unsplash.com/photo-1678550690358-bf61ba0bf511",
                type: "sunglasses",
                material: "Metal",
                color: "Gold",
                style: "Classic",
                description: "Timeless round wire sunglasses with a golden finish. A wardrobe staple that transcends trends.",
                features: ["100% UV protection", "Wire frame construction", "Classic round lenses", "Timeless appeal"],
                suitability: "Excellent for oval faces - maintains the balanced proportions while adding stylish sun protection."
            }
        ],

        "Cat-Eye": [
            {
                id: "cat_001",
                name: "Classic Cat-Eye Frames",
                image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
                type: "regular",
                material: "Acetate",
                color: "Black",
                style: "Vintage",
                description: "Iconic cat-eye frames that epitomize vintage glamour. Perfect for making a sophisticated statement.",
                features: ["Premium acetate construction", "Classic cat-eye silhouette", "Comfortable nose bridge", "Vintage-inspired design"],
                suitability: "Perfect for oval faces - the upswept design adds elegance while complementing natural facial curves."
            },
            {
                id: "cat_002",
                name: "Modern Cat-Eye with Green Accent",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                type: "regular",
                material: "Acetate",
                color: "Green/Black",
                style: "Contemporary",
                description: "Contemporary cat-eye frames with a pop of green color. Modern twist on a classic design.",
                features: ["Two-tone color design", "Comfortable fit", "Durable acetate", "Modern proportions"],
                suitability: "Great for oval faces - adds personality and style while maintaining facial harmony."
            },
            {
                id: "cat_sun_001",
                name: "Luxury Cat-Eye Sunglasses",
                image: "https://media.istockphoto.com/id/1221511401/photo/cats-eye-sunglasses-isolated-on-white-background.webp",
                type: "sunglasses",
                material: "Acetate",
                color: "Black",
                style: "Luxury",
                description: "Sophisticated cat-eye sunglasses with premium construction. Perfect for adding glamour to any look.",
                features: ["UV400 protection", "Premium acetate frame", "Gradient lenses", "Luxury styling"],
                suitability: "Ideal for oval faces - the cat-eye shape enhances cheekbones while maintaining facial balance."
            },
            {
                id: "cat_sun_002",
                name: "Gold Frame Cat-Eye Sunglasses", 
                image: "https://media.istockphoto.com/id/1302938145/photo/close-up-of-cat-eye-sunglasses-with-gold-colored-frame-and-brown-glass.webp",
                type: "sunglasses",
                material: "Metal",
                color: "Gold",
                style: "Glamorous",
                description: "Luxurious gold-framed cat-eye sunglasses with brown lenses. Ultimate glamour meets sophisticated protection.",
                features: ["Gold-plated frame", "Premium brown lenses", "UV protection", "Luxury construction"],
                suitability: "Excellent for oval faces - adds luxurious appeal while enhancing natural facial proportions."
            }
        ],

        "Aviator": [
            {
                id: "aviator_001",
                name: "Classic Metal Aviator Frames",
                image: "https://images.unsplash.com/photo-1623949143726-4436d4262c68",
                type: "regular",
                material: "Metal",
                color: "Gold",
                style: "Classic",
                description: "Timeless aviator-style frames adapted for prescription lenses. Classic appeal with modern functionality.",
                features: ["Stainless steel construction", "Adjustable nose pads", "Classic aviator silhouette", "Prescription ready"],
                suitability: "Great for oval faces - the teardrop shape complements facial curves while adding structured appeal."
            },
            {
                id: "aviator_002",
                name: "Modern Aviator Glasses",
                image: "https://images.unsplash.com/photo-1586806827649-2b92a8e4a5e2",
                type: "regular",
                material: "Titanium",
                color: "Gunmetal",
                style: "Contemporary",
                description: "Contemporary aviator frames in lightweight titanium. Perfect blend of classic style and modern materials.",
                features: ["Titanium construction", "Ultra-lightweight", "Corrosion resistant", "Modern proportions"],
                suitability: "Perfect for oval faces - maintains the classic aviator appeal while providing comfortable wear."
            },
            {
                id: "aviator_sun_001",
                name: "Classic Gold Aviator Sunglasses",
                image: "https://images.unsplash.com/photo-1567473810954-507d59716c25",
                type: "sunglasses",
                material: "Metal",
                color: "Gold",
                style: "Classic",
                description: "The original aviator sunglasses that started it all. Iconic design with uncompromising quality.",
                features: ["UV400 protection", "Gold-plated frame", "Classic green lenses", "Iconic design"],
                suitability: "Ideal for oval faces - the classic aviator shape enhances facial structure while providing excellent coverage."
            },
            {
                id: "aviator_sun_002",
                name: "Silver Frame Aviator Sunglasses",
                image: "https://images.unsplash.com/photo-1562548726-43b650c82f8e",
                type: "sunglasses",
                material: "Metal", 
                color: "Silver",
                style: "Modern",
                description: "Sleek silver aviator sunglasses with contemporary appeal. Perfect for modern adventurers.",
                features: ["Polarized lenses", "Silver-plated frame", "Anti-glare coating", "Modern styling"],
                suitability: "Excellent for oval faces - provides balanced proportions while offering superior sun protection."
            }
        ]
    },

    // ROUND FACE RECOMMENDATIONS  
    round: {
        "Angular Rectangular": [
            {
                id: "angular_001",
                name: "Sharp Angular Rectangle",
                image: "https://images.unsplash.com/photo-1585486451366-5b5b9520797e",
                type: "regular",
                material: "Acetate",
                color: "Black",
                style: "Modern",
                description: "Bold rectangular frames with sharp angles designed to add definition to round faces.",
                features: ["Sharp angular design", "Thick acetate construction", "Wide temple design", "Structured silhouette"],
                suitability: "Perfect for round faces - the angular design adds needed structure and definition to soft facial curves."
            },
            {
                id: "angular_002",
                name: "Geometric Precision Frames",
                image: "https://images.unsplash.com/photo-1591843336300-89d113fcacd8",
                type: "regular",
                material: "Metal",
                color: "Gunmetal",
                style: "Geometric",
                description: "Precisely engineered geometric frames that create strong lines and definition.",
                features: ["Geometric precision", "Metal construction", "Angular corners", "Structured design"],
                suitability: "Excellent for round faces - creates definition and adds angular contrast to round facial features."
            },
            {
                id: "angular_sun_001",
                name: "Bold Angular Sunglasses",
                image: "https://images.unsplash.com/photo-1564867739458-f42235fab442",
                type: "sunglasses",
                material: "Acetate",
                color: "Black",
                style: "Bold",
                description: "Striking angular sunglasses that make a strong style statement while flattering round faces.",
                features: ["Bold angular design", "UV400 protection", "Structured silhouette", "Statement styling"],
                suitability: "Ideal for round faces - the sharp angles provide excellent contrast to soft facial curves."
            }
        ],

        "Bold Square": [
            {
                id: "square_001",
                name: "Classic Bold Square Frames",
                image: "https://images.unsplash.com/photo-1648688135643-2716ec8f4b24",
                type: "regular",
                material: "Acetate",
                color: "Tortoiseshell",
                style: "Bold",
                description: "Strong square frames that add structure and sophistication to round faces.",
                features: ["Bold square design", "Thick acetate frame", "Classic proportions", "Statement styling"],
                suitability: "Perfect for round faces - the square shape creates needed angles and definition."
            },
            {
                id: "square_002",
                name: "Modern Square Frames",
                image: "https://images.unsplash.com/photo-1569522178101-2483554e5602",
                type: "regular",
                material: "Acetate",
                color: "Black",
                style: "Contemporary",
                description: "Contemporary square frames with clean lines and modern proportions.",
                features: ["Modern square silhouette", "Clean line design", "Comfortable fit", "Contemporary styling"],
                suitability: "Great for round faces - adds geometric structure while maintaining comfortable proportions."
            },
            {
                id: "square_sun_001",
                name: "Bold Square Sunglasses",
                image: "https://images.unsplash.com/photo-1564867739458-f42235fab442",
                type: "sunglasses",
                material: "Acetate",
                color: "Black",
                style: "Bold",
                description: "Oversized square sunglasses that make a fashion statement while flattering round face shapes.",
                features: ["Oversized square design", "UV protection", "Bold styling", "Fashion-forward"],
                suitability: "Excellent for round faces - the large square shape adds definition and creates balanced proportions."
            }
        ],

        "Browline": [
            {
                id: "browline_001",
                name: "Classic Browline Frames",
                image: "https://plus.unsplash.com/premium_photo-1733944507844-2f14c35933d0",
                type: "regular",
                material: "Combination",
                color: "Tortoiseshell/Gold",
                style: "Vintage",
                description: "Iconic browline frames that add sophisticated structure to the upper face area.",
                features: ["Classic browline design", "Combination materials", "Vintage appeal", "Upper face emphasis"],
                suitability: "Perfect for round faces - the prominent top rim adds needed structure and definition to the upper face."
            },
            {
                id: "browline_002",
                name: "Modern Browline Style",
                image: "https://images.unsplash.com/photo-1703035045008-3326452e0e1c",
                type: "regular",
                material: "Acetate",
                color: "Tortoiseshell",
                style: "Contemporary",
                description: "Contemporary interpretation of the classic browline style with modern proportions.",
                features: ["Modern browline interpretation", "Sleek design", "Premium materials", "Contemporary appeal"],
                suitability: "Great for round faces - provides upper face structure while maintaining modern aesthetics."
            },
            {
                id: "browline_sun_001",
                name: "Browline Sunglasses",
                image: "https://images.unsplash.com/photo-1725845558949-1a763c2e5656",
                type: "sunglasses",
                material: "Combination",
                color: "Black/Gold",
                style: "Classic",
                description: "Classic browline sunglasses that combine vintage style with modern sun protection.",
                features: ["Browline design", "UV protection", "Classic styling", "Vintage appeal"],
                suitability: "Ideal for round faces - adds definition to the brow area while providing stylish sun protection."
            }
        ],

        "Geometric": [
            {
                id: "geometric_001",
                name: "Hexagonal Geometric Frames",
                image: "https://images.unsplash.com/photo-1748539085110-5078e6374d53",
                type: "regular",
                material: "Metal",
                color: "Rose Gold",
                style: "Geometric",
                description: "Unique hexagonal frames that add geometric interest and modern appeal.",
                features: ["Hexagonal shape", "Geometric design", "Metal construction", "Modern aesthetic"],
                suitability: "Excellent for round faces - the geometric angles provide contrast and add sophisticated structure."
            },
            {
                id: "geometric_002",
                name: "Angular Geometric Design",
                image: "https://plus.unsplash.com/premium_photo-1734599205843-2ad44b380668",
                type: "regular",
                material: "Acetate",
                color: "Multicolor",
                style: "Artistic",
                description: "Artistic geometric frames with unique angular design elements.",
                features: ["Artistic geometric design", "Unique angular elements", "Creative styling", "Modern appeal"],
                suitability: "Perfect for round faces - the angular geometric design adds definition and artistic flair."
            }
        ]
    },

    // SQUARE FACE RECOMMENDATIONS
    square: {
        "Soft Round": [
            {
                id: "soft_round_001",
                name: "Gentle Round Frames",
                image: "https://images.unsplash.com/photo-1632168844625-b22d7b1053c0",
                type: "regular",
                material: "Acetate",
                color: "Light Tortoiseshell",
                style: "Soft",
                description: "Gently curved round frames that soften the angular features of square faces.",
                features: ["Soft round curves", "Light color palette", "Gentle proportions", "Comfortable fit"],
                suitability: "Perfect for square faces - the soft curves counterbalance strong jawlines and add feminine appeal."
            },
            {
                id: "soft_round_002",
                name: "Delicate Round Wire Frames",
                image: "https://images.unsplash.com/photo-1625887022580-2949b9b97def",
                type: "regular",
                material: "Metal",
                color: "Gold",
                style: "Delicate",
                description: "Ultra-thin round wire frames that add softness without overwhelming strong facial features.",
                features: ["Ultra-thin construction", "Delicate proportions", "Lightweight comfort", "Minimal design"],
                suitability: "Excellent for square faces - provides gentle curves that soften angular features beautifully."
            }
        ],

        "Gentle Oval": [
            {
                id: "oval_001",
                name: "Classic Oval Frames",
                image: "https://images.unsplash.com/photo-1652328072963-ac78af63cb78",
                type: "regular",
                material: "Acetate",
                color: "Brown",
                style: "Classic",
                description: "Timeless oval frames that provide the perfect balance for square face shapes.",
                features: ["Classic oval shape", "Balanced proportions", "Comfortable design", "Versatile styling"],
                suitability: "Ideal for square faces - the oval shape provides gentle curves that complement angular features."
            },
            {
                id: "oval_002",
                name: "Modern Oval Design",
                image: "https://images.unsplash.com/photo-1586806828699-f06085feb6c5",
                type: "regular", 
                material: "Metal",
                color: "Silver",
                style: "Contemporary",
                description: "Contemporary oval frames with modern proportions and sleek design.",
                features: ["Modern oval silhouette", "Sleek metal construction", "Contemporary proportions", "Refined styling"],
                suitability: "Great for square faces - offers sophisticated curves that balance strong facial angles."
            }
        ],

        "Curved Frames": [
            {
                id: "curved_001",
                name: "Curved Wraparound Style",
                image: "https://images.unsplash.com/photo-1567473810954-507d59716c25",
                type: "sunglasses",
                material: "TR90",
                color: "Black",
                style: "Sport",
                description: "Curved wraparound frames that provide excellent coverage while softening angular features.",
                features: ["Curved wraparound design", "Full coverage", "Sport styling", "Comfortable fit"],
                suitability: "Perfect for square faces - the curved design softens strong angles while providing excellent protection."
            },
            {
                id: "curved_002",
                name: "Gentle Curve Sunglasses",
                image: "https://images.unsplash.com/photo-1562548726-43b650c82f8e",
                type: "sunglasses",
                material: "Metal",
                color: "Gold",
                style: "Classic",
                description: "Elegantly curved sunglasses that add sophistication while softening facial angles.",
                features: ["Elegant curved design", "Premium materials", "Sophisticated styling", "UV protection"],
                suitability: "Excellent for square faces - provides gentle curves that complement and soften strong facial features."
            }
        ],

        "Rimless": [
            {
                id: "rimless_001",
                name: "Minimalist Rimless Frames",
                image: "https://plus.unsplash.com/premium_photo-1734664184720-386b74d23c54",
                type: "regular",
                material: "Titanium",
                color: "Clear",
                style: "Minimalist",
                description: "Ultra-minimalist rimless frames that don't compete with strong facial features.",
                features: ["Rimless design", "Titanium construction", "Minimalist aesthetic", "Lightweight comfort"],
                suitability: "Ideal for square faces - the lack of frame allows natural facial features to shine while providing vision correction."
            },
            {
                id: "rimless_002",
                name: "Elegant Rimless Design",
                image: "https://plus.unsplash.com/premium_photo-1734128065021-523c8bb6ed76",
                type: "regular",
                material: "Titanium",
                color: "Silver",
                style: "Elegant",
                description: "Sophisticated rimless frames with elegant temple design and premium construction.",
                features: ["Sophisticated rimless style", "Premium titanium", "Elegant temple design", "Professional appeal"],
                suitability: "Perfect for square faces - provides vision correction without adding bulk or competing with strong features."
            }
        ]
    },

    // HEART FACE RECOMMENDATIONS
    heart: {
        "Bottom-Heavy": [
            {
                id: "bottom_heavy_001",
                name: "Classic Bottom-Heavy Frames",
                image: "https://plus.unsplash.com/premium_photo-1733944507844-2f14c35933d0",
                type: "regular",
                material: "Acetate",
                color: "Tortoiseshell",
                style: "Classic",
                description: "Classic frames with emphasis on the lower portion to balance a wide forehead.",
                features: ["Bottom-heavy design", "Balanced proportions", "Classic styling", "Comfortable fit"],
                suitability: "Perfect for heart faces - the bottom emphasis balances a wider forehead with a narrower chin."
            }
        ],

        "Light-Colored": [
            {
                id: "light_001",
                name: "Soft Light Frames",
                image: "https://images.unsplash.com/photo-1632168844625-b22d7b1053c0",
                type: "regular",
                material: "Acetate",
                color: "Light Pink",
                style: "Gentle",
                description: "Light-colored frames that won't overpower delicate facial features.",
                features: ["Light color palette", "Gentle proportions", "Soft styling", "Delicate appeal"],
                suitability: "Excellent for heart faces - light colors don't compete with delicate features while providing necessary structure."
            },
            {
                id: "light_002",
                name: "Nude Tone Frames",
                image: "https://images.unsplash.com/photo-1681773453980-fb0bd56afcaf",
                type: "regular",
                material: "Acetate",
                color: "Nude",
                style: "Natural",
                description: "Natural nude-toned frames that complement skin tones beautifully.",
                features: ["Nude color tones", "Natural appearance", "Skin-tone friendly", "Versatile styling"],
                suitability: "Great for heart faces - neutral tones provide structure without overwhelming delicate facial proportions."
            }
        ]
    },

    // DIAMOND FACE RECOMMENDATIONS
    diamond: {
        "Rimless": [
            {
                id: "diamond_rimless_001",
                name: "Sophisticated Rimless",
                image: "https://images.unsplash.com/photo-1723698496634-fb0d623aee99",
                type: "regular",
                material: "Titanium",
                color: "Clear",
                style: "Sophisticated",
                description: "Elegant rimless frames that highlight the eyes without competing with prominent cheekbones.",
                features: ["Rimless elegance", "Eye emphasis", "Lightweight design", "Sophisticated appeal"],
                suitability: "Perfect for diamond faces - draws attention to the eyes while not competing with prominent cheekbones."
            }
        ],

        "Cat-Eye": [
            {
                id: "diamond_cat_001",
                name: "Subtle Cat-Eye Frames",
                image: "https://media.istockphoto.com/id/492737486/photo/cat-eye-glasses.webp",
                type: "regular",
                material: "Acetate",
                color: "Black",
                style: "Vintage",
                description: "Subtle cat-eye frames that complement high cheekbones beautifully.",
                features: ["Subtle upswept design", "Cheekbone complementing", "Vintage appeal", "Elegant proportions"],
                suitability: "Ideal for diamond faces - the cat-eye shape echoes and enhances natural cheekbone prominence."
            }
        ]
    },

    // TRIANGLE FACE RECOMMENDATIONS
    triangle: {
        "Top-Heavy": [
            {
                id: "top_heavy_001",
                name: "Prominent Top Frame",
                image: "https://images.unsplash.com/photo-1569522178101-2483554e5602",
                type: "regular",
                material: "Acetate", 
                color: "Black",
                style: "Bold",
                description: "Bold top-heavy frames that add visual weight to the upper face area.",
                features: ["Top-heavy design", "Upper face emphasis", "Bold styling", "Balancing proportions"],
                suitability: "Perfect for triangle faces - adds visual weight to the forehead area to balance a wider jawline."
            }
        ],

        "Decorative Temples": [
            {
                id: "decorative_001",
                name: "Ornate Temple Design",
                image: "https://images.unsplash.com/photo-1748539085110-5078e6374d53",
                type: "regular",
                material: "Metal",
                color: "Rose Gold",
                style: "Decorative",
                description: "Frames with decorative temple details that draw attention to the upper face.",
                features: ["Decorative temple details", "Upper face emphasis", "Artistic elements", "Attention-drawing design"],
                suitability: "Excellent for triangle faces - decorative temples add visual interest to balance wider jaw areas."
            }
        ],

        "Upswept": [
            {
                id: "upswept_001",
                name: "Classic Upswept Style",
                image: "https://media.istockphoto.com/id/1221511401/photo/cats-eye-sunglasses-isolated-on-white-background.webp",
                type: "sunglasses",
                material: "Acetate",
                color: "Black",
                style: "Classic",
                description: "Upswept sunglasses that add visual width to the upper face area.",
                features: ["Upswept design", "Upper face widening", "Classic styling", "Balancing effect"],
                suitability: "Great for triangle faces - the upswept design creates visual balance by adding width to the forehead area."
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = glassesDatabase;
}