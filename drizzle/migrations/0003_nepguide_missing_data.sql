-- ============================================================
-- NepGuide Missing Data Migration
-- Cities, Destinations, Route Stops, Cost Estimates, Road Routes
-- Extra treks (Mundum, etc.)
-- ============================================================

-- ========== CITIES ==========
INSERT INTO public.cities (country_id, region_id, name, slug, latitude, longitude, elevation_m, has_airport, is_major, description)
SELECT c.id, r.id, v.name, v.slug, v.lat, v.lng, v.elev, v.airport, v.major, v.descr
FROM public.countries c
LEFT JOIN public.regions r ON r.country_id = c.id AND r.slug = v.region_slug
JOIN (VALUES
('kathmandu-valley','Kathmandu','kathmandu',27.7172,85.3240,1400,true,true,'Capital city and main gateway. UNESCO World Heritage sites, Thamel tourist hub.'),
('kathmandu-valley','Bhaktapur','bhaktapur',27.6710,85.4298,1401,false,true,'Medieval Newar city, famous for pottery square and Nyatapola temple.'),
('kathmandu-valley','Patan (Lalitpur)','patan',27.6644,85.3188,1300,false,true,'City of fine arts and courtyards, home to Patan Durbar Square.'),
('gandaki','Pokhara','pokhara',28.2096,83.9856,822,true,true,'Lakeside city beneath the Annapurna range. Main base for Annapurna treks.'),
('terai','Bharatpur','bharatpur',27.6781,84.4294,208,true,false,'Gateway to Chitwan National Park.'),
('terai','Lumbini','lumbini',27.4833,83.2760,150,false,true,'Birthplace of Buddha. UNESCO World Heritage site.'),
('terai','Janakpur','janakpur',26.7288,85.9250,78,false,true,'Ancient Mithila city, Janaki Temple.'),
('everest','Lukla','lukla',27.6880,86.7310,2860,true,false,'Mountain airstrip and start of most Everest region treks.'),
('everest','Namche Bazaar','namche-bazaar',27.8069,86.7140,3440,false,true,'Sherpa capital of Khumbu. Major acclimatisation stop.'),
('annapurna','Jomsom','jomsom',28.7800,83.7300,2743,true,true,'District HQ of Mustang. Gateway to Upper Mustang and Muktinath.'),
('langtang','Syabrubesi','syabrubesi',28.1600,85.3400,1460,false,false,'Trailhead for Langtang Valley trek.'),
('far-west','Jumla','jumla',29.2742,82.1838,2514,true,false,'Gateway to Rara Lake and Far West treks.'),
('eastern-hills','Ilam','ilam',26.9110,87.9290,1200,false,true,'Tea gardens and eastern hill town.'),
('kanchenjunga','Taplejung','taplejung',27.3500,87.6700,1830,false,false,'Gateway to Kanchenjunga Base Camp.'),
('dolpo','Juphal','juphal',28.9500,82.8200,2475,true,false,'Airstrip for Dolpo treks.')
) AS v(region_slug, name, slug, lat, lng, elev, airport, major, descr)
WHERE c.slug = 'nepal';

-- ========== DESTINATIONS ==========
INSERT INTO public.destinations (country_id, region_id, name, slug, type, short_description, description, latitude, longitude, image, duration_days, distance_km, difficulty, estimated_cost_min, estimated_cost_max, currency, best_season, is_featured)
SELECT c.id, r.id, v.name, v.slug, v.type, v.short, v.descr, v.lat, v.lng, v.img, v.dur, v.dist, v.diff, v.cmin, v.cmax, 'USD', v.season, v.feat
FROM public.countries c
LEFT JOIN public.regions r ON r.country_id = c.id AND r.slug = v.region_slug
JOIN (VALUES
('everest','Everest Base Camp','everest-base-camp','trek','Foot of the world''s highest mountain.','The classic destination at 5,364 m on the Khumbu glacier. Sunrise from Kala Patthar is the highlight.',27.9881,86.9250,'/images/everest.jpg','12-14',130,'Challenging',1100,2200,'Spring / Autumn',true),
('annapurna','Annapurna Base Camp','annapurna-base-camp','trek','Glacial amphitheatre ringed by 7,000 m peaks.','Hidden sanctuary at 4,130 m surrounded by Annapurna I, Hiunchuli and Machhapuchhre.',28.5300,83.8800,'/images/annapurna.jpg','7-11',110,'Moderate',600,1200,'Spring / Autumn',true),
('annapurna','Poon Hill','poon-hill','viewpoint','Best short sunrise viewpoint in Nepal.','3,210 m ridge with panoramic views of Dhaulagiri and Annapurna South. Perfect 4-5 day trek.',28.4000,83.7000,'/images/annapurna.jpg','4-5',40,'Easy',250,500,'Year-round',true),
('langtang','Kyanjin Gompa','kyanjin-gompa','trek','Langtang valley endpoint with cheese factory.','Base for Tserko Ri climb and glacier views. Rebuilt after 2015 earthquake.',28.2139,85.5600,'/images/langtang.jpg','7-9',65,'Moderate',450,900,'Spring / Autumn',true),
('langtang','Gosaikunda Lakes','gosaikunda','sacred-lake','Sacred alpine lakes at 4,380 m.','Hindu and Buddhist pilgrimage site. Busiest at Janai Purnima full moon.',28.0800,85.4200,'/images/langtang.jpg','5-7',55,'Moderate',400,800,'Spring / Autumn',true),
('mustang','Lo Manthang','lo-manthang','heritage','Walled capital of the former Kingdom of Lo.','Tibetan-culture town at 3,840 m with monasteries, sky caves and desert landscape.',29.1833,83.9667,'/images/mustang.jpg','10-14',115,'Moderate',1800,3000,'Mar-Nov',true),
('mustang','Muktinath','muktinath','pilgrimage','Sacred site with 108 water spouts.','Important for both Hindus and Buddhists at 3,760 m in the Kali Gandaki valley.',28.8167,83.8667,'/images/mustang.jpg','3-4',22,'Easy',200,450,'Year-round',false),
('gandaki','Pokhara Lakeside','pokhara-lakeside','city','Lakeside town under the Annapurnas.','Main hub for Annapurna treks, paragliding, boating on Phewa Lake.',28.2096,83.9856,'/images/pokhara.jpg','2-4',null,'Easy',50,150,'Year-round',true),
('kathmandu-valley','Kathmandu Durbar Square','kathmandu-durbar-square','heritage','Medieval royal square in the capital.','UNESCO site with temples, courtyards and the living goddess Kumari.',27.7045,85.3072,'/images/kathmandu.jpg','1',null,'Easy',20,50,'Year-round',true),
('terai','Chitwan National Park','chitwan-national-park','wildlife','Jungle safari and rhinos.','UNESCO park with one-horned rhinoceros, tigers, elephants and birdlife.',27.5000,84.3500,'/images/terai.jpg','2-3',null,'Easy',80,200,'Oct-Mar',true),
('terai','Lumbini','lumbini-birthplace','pilgrimage','Birthplace of Lord Buddha.','Sacred garden, Maya Devi Temple and international monasteries.',27.4833,83.2760,'/images/terai.jpg','1-2',null,'Easy',30,80,'Year-round',true),
('far-west','Rara Lake','rara-lake','lake','Nepal''s largest lake in a remote national park.','Crystal-clear alpine lake at 2,990 m. Quiet and little-visited.',29.5300,82.0800,'/images/pokhara.jpg','7-10',null,'Moderate',600,1200,'Spring / Autumn',true),
('far-west','Khaptad National Park','khaptad','national-park','Plateau of rolling meadows and forests.','Sacred to Khaptad Baba. Wildflowers in spring, views of Api and Saipal.',29.3500,81.1500,'/images/pokhara.jpg','6-8',null,'Moderate',500,900,'Spring / Autumn',false),
('eastern-hills','Ilam Tea Gardens','ilam-tea','landscape','Rolling tea estates in the east.','Scenic walks among tea bushes with views of Kanchenjunga on clear days.',26.9110,87.9290,'/images/terai.jpg','2-3',null,'Easy',40,100,'Year-round',false),
('annapurna','Mardi Himal Base Camp','mardi-himal','trek','Ridge trek with Machhapuchhre close-ups.','Relatively new teahouse route ending at 4,500 m viewpoint.',28.4500,83.9500,'/images/annapurna.jpg','5-7',45,'Moderate',350,700,'Spring / Autumn',true),
('dolpo','Shey Phoksundo Lake','shey-phoksundo','lake','Nepal''s deepest and bluest lake.','Turquoise lake at 3,611 m in remote Dolpo. Approach via Ringmo village.',29.2000,82.9500,'/images/mustang.jpg','9-11',85,'Moderate',1200,1900,'May-Oct',true)
) AS v(region_slug, name, slug, type, short, descr, lat, lng, img, dur, dist, diff, cmin, cmax, season, feat)
WHERE c.slug = 'nepal';

-- ========== EXTRA TREKKING ROUTES ==========
INSERT INTO public.trekking_routes (country_id, region_id, name, slug, short_description, description, difficulty, duration_days, distance_km, elevation_max_m, best_season, start_location, end_location, estimated_cost_min, estimated_cost_max, currency, hero_image, permits, accommodation, food, transportation, safety, is_featured)
SELECT c.id, r.id, v.name, v.slug, v.short, v.descr, v.diff, v.dur, v.dist, v.elev, v.season, v.startl, v.endl, v.cmin, v.cmax, 'USD', v.img, v.permits, v.acc, v.food, v.trans, v.safety, v.feat
FROM public.countries c
JOIN public.regions r ON r.country_id = c.id AND r.slug = v.region_slug
JOIN (VALUES
('eastern-hills','Mundum Trail (Koshi)','mundum-trail','Ancient Kirat cultural trail through eastern hills.','A cultural trek following the Mundum (Kirat oral tradition) path through Rai and Limbu villages, rhododendron forests and viewpoints toward Kanchenjunga. Quiet alternative to the classic routes.','Moderate','8-12 days',80,3500,'Spring / Autumn','Basantapur / Hile','Chainpur or Taplejung',500,900,'/images/terai.jpg','Local area permits + TIMS where applicable','Homestays and basic lodges','Home-cooked local food','Bus Kathmandu-Basantapur or Biratnagar','Less marked trails - local guide recommended.',false),
('far-west','Rara Lake Trek','rara-lake-trek','Remote trek to Nepal''s largest lake.','From Jumla or Surkhet the trail climbs through forests and meadows to the pristine Rara Lake (2,990 m) inside Rara National Park. Very few trekkers.','Moderate','7-10 days',60,3500,'Spring / Autumn','Jumla','Rara Lake',600,1200,'/images/pokhara.jpg','Rara National Park entry + TIMS','Basic lodges and camping','Simple local food','Flight Kathmandu-Nepalgunj-Jumla','Remote area - carry first-aid and allow buffer days for flights.',true),
('far-west','Khaptad Trek','khaptad-trek','Plateau trek in the Far West.','Rolling grasslands, forests and the ashram of Khaptad Baba. Wide views of the western Himalaya on clear days.','Moderate','6-9 days',50,3200,'Spring / Autumn','Silgadhi','Khaptad',450,850,'/images/pokhara.jpg','Khaptad National Park entry','Basic lodges / camping','Simple food','Bus or jeep from Dhangadhi or Nepalgunj','Quiet and remote - guide helpful.',false),
('annapurna','ABC + Poon Hill Combo','abc-poon-hill-combo','Short combination of two popular Annapurna classics.','Combines the Poon Hill sunrise with the full Annapurna Base Camp sanctuary for a satisfying 9-12 day itinerary.','Moderate','9-12 days',120,4130,'Spring / Autumn','Pokhara','Pokhara',700,1300,'/images/annapurna.jpg','ACAP + TIMS','Teahouses throughout','Good variety','Drive from Pokhara','Standard Annapurna precautions.',false),
('kathmandu-valley','Nagarkot Sunrise Trek','nagarkot-sunrise','Easy overnight ridge walk near Kathmandu.','Short hike or drive to Nagarkot for Himalayan sunrise views (Everest to Annapurna on clear days). Ideal 1-night escape.','Easy','1-2 days',15,2200,'Year-round','Kathmandu / Bhaktapur','Nagarkot',40,120,'/images/kathmandu.jpg','None required','Hotels and lodges','Good restaurants','Taxi or local bus from Kathmandu (1.5 hrs)','Very safe and popular.',true),
('gandaki','Sarangkot Sunrise','sarangkot-sunrise','Classic Pokhara viewpoint overnight.','Short climb or drive above Pokhara for sunrise over the Annapurna range and Phewa Lake. Perfect 1-night stay.','Easy','1 day',8,1600,'Year-round','Pokhara','Sarangkot',30,80,'/images/pokhara.jpg','None','Hotels and homestays','Cafes and restaurants','Taxi from Pokhara lakeside (20-30 min)','Very safe.',true)
) AS v(region_slug, name, slug, short, descr, diff, dur, dist, elev, season, startl, endl, cmin, cmax, img, permits, acc, food, trans, safety, feat)
WHERE c.slug = 'nepal';

-- ========== ROUTE STOPS (major treks) ==========
-- Everest Base Camp
INSERT INTO public.route_stops (route_id, name, latitude, longitude, day_number, elevation_m, distance_from_previous_km, transport_mode, description, sort_order)
SELECT tr.id, v.name, v.lat, v.lng, v.day, v.elev, v.dist, v.mode, v.descr, v.ord
FROM public.trekking_routes tr
JOIN (VALUES
('everest-base-camp-trek','Kathmandu',27.7172,85.3240,0,1400,0,'city','Start point. Fly or drive to Lukla.',0),
('everest-base-camp-trek','Lukla',27.6880,86.7310,1,2860,0,'flight','Mountain airstrip. Trail begins.',1),
('everest-base-camp-trek','Phakding',27.7400,86.7130,1,2610,8,'trek','First night beside the Dudh Koshi.',2),
('everest-base-camp-trek','Namche Bazaar',27.8069,86.7140,2,3440,10,'trek','Sherpa capital. Acclimatisation day recommended.',3),
('everest-base-camp-trek','Tengboche',27.8360,86.7640,3,3867,10,'trek','Famous monastery with Ama Dablam views.',4),
('everest-base-camp-trek','Dingboche',27.8920,86.8310,4,4410,10,'trek','Acclimatisation stop. Climb Nangkartshang Peak.',5),
('everest-base-camp-trek','Lobuche',27.9480,86.8100,5,4910,8,'trek','Last major settlement before EBC.',6),
('everest-base-camp-trek','Gorak Shep',27.9800,86.8290,6,5164,5,'trek','Highest overnight. Base for Kala Patthar.',7),
('everest-base-camp-trek','Everest Base Camp',27.9881,86.9250,6,5364,3,'trek','Goal. Return to Gorak Shep same day.',8),
('everest-base-camp-trek','Kala Patthar',27.9950,86.8280,7,5545,2,'trek','Best sunrise viewpoint of Everest.',9),
('everest-base-camp-trek','Pheriche / Pangboche',27.8900,86.8200,8,4240,15,'trek','Descent begins.',10),
('everest-base-camp-trek','Namche Bazaar',27.8069,86.7140,9,3440,15,'trek','Return via Tengboche.',11),
('everest-base-camp-trek','Lukla',27.6880,86.7310,10,2860,15,'trek','Fly back to Kathmandu.',12)
) AS v(slug, name, lat, lng, day, elev, dist, mode, descr, ord)
ON tr.slug = v.slug;

-- Annapurna Base Camp
INSERT INTO public.route_stops (route_id, name, latitude, longitude, day_number, elevation_m, distance_from_previous_km, transport_mode, description, sort_order)
SELECT tr.id, v.name, v.lat, v.lng, v.day, v.elev, v.dist, v.mode, v.descr, v.ord
FROM public.trekking_routes tr
JOIN (VALUES
('annapurna-base-camp-trek','Pokhara',28.2096,83.9856,0,822,0,'city','Start. Drive to Nayapul or Jhinu.',0),
('annapurna-base-camp-trek','Nayapul / Jhinu Danda',28.2800,83.8200,1,1780,0,'drive','Trailhead. Hot springs at Jhinu.',1),
('annapurna-base-camp-trek','Chhomrong',28.4200,83.8200,2,2170,10,'trek','Gurung village. Last big settlement.',2),
('annapurna-base-camp-trek','Bamboo / Dovan',28.4800,83.8600,3,2600,8,'trek','Forest camps.',3),
('annapurna-base-camp-trek','Deurali',28.5100,83.8800,4,3230,7,'trek','Last stop before sanctuary.',4),
('annapurna-base-camp-trek','Annapurna Base Camp',28.5300,83.8800,5,4130,6,'trek','Sanctuary amphitheatre. Sunrise magic.',5),
('annapurna-base-camp-trek','Bamboo / Chhomrong',28.4200,83.8200,6,2170,15,'trek','Descent.',6),
('annapurna-base-camp-trek','Nayapul / Pokhara',28.2096,83.9856,7,822,15,'trek','Return to Pokhara.',7)
) AS v(slug, name, lat, lng, day, elev, dist, mode, descr, ord)
ON tr.slug = v.slug;

-- Annapurna Circuit (key stops)
INSERT INTO public.route_stops (route_id, name, latitude, longitude, day_number, elevation_m, distance_from_previous_km, transport_mode, description, sort_order)
SELECT tr.id, v.name, v.lat, v.lng, v.day, v.elev, v.dist, v.mode, v.descr, v.ord
FROM public.trekking_routes tr
JOIN (VALUES
('annapurna-circuit-trek','Besisahar',28.2300,84.3800,0,760,0,'city','Roadhead. Jeep or bus from Kathmandu.',0),
('annapurna-circuit-trek','Chame',28.5500,84.2400,3,2670,40,'trek','District HQ. Apple orchards begin.',1),
('annapurna-circuit-trek','Upper Pisang',28.6200,84.1500,4,3300,15,'trek','Viewpoint of Annapurna II.',2),
('annapurna-circuit-trek','Manang',28.6667,84.0167,5,3540,18,'trek','Acclimatisation town. Side trips possible.',3),
('annapurna-circuit-trek','Yak Kharka / Letdar',28.7200,83.9500,6,4000,12,'trek','Approach to Thorong La.',4),
('annapurna-circuit-trek','Thorong Phedi',28.7800,83.9200,7,4450,8,'trek','Base for the pass. Early start next day.',5),
('annapurna-circuit-trek','Thorong La Pass',28.7930,83.9380,8,5416,5,'trek','Highest point. Cross early morning.',6),
('annapurna-circuit-trek','Muktinath',28.8167,83.8667,8,3760,10,'trek','Sacred site after the pass.',7),
('annapurna-circuit-trek','Jomsom',28.7800,83.7300,9,2743,20,'trek','End of classic section. Flight or jeep out.',8)
) AS v(slug, name, lat, lng, day, elev, dist, mode, descr, ord)
ON tr.slug = v.slug;

-- Langtang Valley
INSERT INTO public.route_stops (route_id, name, latitude, longitude, day_number, elevation_m, distance_from_previous_km, transport_mode, description, sort_order)
SELECT tr.id, v.name, v.lat, v.lng, v.day, v.elev, v.dist, v.mode, v.descr, v.ord
FROM public.trekking_routes tr
JOIN (VALUES
('langtang-valley-trek','Syabrubesi',28.1600,85.3400,1,1460,0,'drive','Trailhead. Bus/jeep from Kathmandu.',0),
('langtang-valley-trek','Lama Hotel',28.1800,85.4200,2,2480,11,'trek','Forest lodge beside the river.',1),
('langtang-valley-trek','Langtang Village',28.2100,85.5000,3,3430,12,'trek','Rebuilt village. Yak pastures begin.',2),
('langtang-valley-trek','Kyanjin Gompa',28.2139,85.5600,4,3860,7,'trek','Endpoint. Cheese factory and Tserko Ri.',3),
('langtang-valley-trek','Tserko Ri',28.2200,85.5800,5,4984,5,'trek','Day climb for panoramic views.',4),
('langtang-valley-trek','Syabrubesi',28.1600,85.3400,7,1460,30,'trek','Return the same way.',5)
) AS v(slug, name, lat, lng, day, elev, dist, mode, descr, ord)
ON tr.slug = v.slug;

-- Mardi Himal
INSERT INTO public.route_stops (route_id, name, latitude, longitude, day_number, elevation_m, distance_from_previous_km, transport_mode, description, sort_order)
SELECT tr.id, v.name, v.lat, v.lng, v.day, v.elev, v.dist, v.mode, v.descr, v.ord
FROM public.trekking_routes tr
JOIN (VALUES
('mardi-himal-trek','Pokhara / Kande',28.2500,83.9000,1,1770,0,'drive','Trailhead near Kande.',0),
('mardi-himal-trek','Forest Camp',28.3500,83.9200,2,2520,8,'trek','First ridge camp in forest.',1),
('mardi-himal-trek','Low Camp',28.4000,83.9400,3,3050,6,'trek','Open ridge begins.',2),
('mardi-himal-trek','High Camp',28.4300,83.9500,4,3580,5,'trek','Last overnight before viewpoint.',3),
('mardi-himal-trek','Mardi Himal Base / Viewpoint',28.4500,83.9500,5,4500,4,'trek','Close-up of Machhapuchhre. Return same day.',4)
) AS v(slug, name, lat, lng, day, elev, dist, mode, descr, ord)
ON tr.slug = v.slug;

-- ========== COST ESTIMATES (sample for major routes) ==========
INSERT INTO public.cost_estimates (route_id, category, amount_min, amount_max, currency, note)
SELECT tr.id, v.cat, v.min, v.max, 'USD', v.note
FROM public.trekking_routes tr
JOIN (VALUES
('everest-base-camp-trek','Transportation',250,450,'Kathmandu-Lukla flights (round trip, peak season higher)'),
('everest-base-camp-trek','Accommodation',150,300,'Teahouses 12-14 nights'),
('everest-base-camp-trek','Food',200,350,'3 meals/day, costs rise with altitude'),
('everest-base-camp-trek','Permits',50,80,'Sagarmatha NP + local permit'),
('everest-base-camp-trek','Guide',250,400,'Optional but recommended'),
('everest-base-camp-trek','Porter',150,250,'Optional'),
('everest-base-camp-trek','Miscellaneous',50,100,'Hot showers, WiFi, charging, snacks'),
('annapurna-base-camp-trek','Transportation',30,60,'Pokhara-Nayapul jeep/taxi'),
('annapurna-base-camp-trek','Accommodation',80,160,'7-10 nights teahouse'),
('annapurna-base-camp-trek','Food',120,200,'3 meals/day'),
('annapurna-base-camp-trek','Permits',40,50,'ACAP + TIMS'),
('annapurna-base-camp-trek','Guide',180,280,'Optional'),
('annapurna-base-camp-trek','Porter',120,180,'Optional'),
('annapurna-circuit-trek','Transportation',40,100,'Kathmandu-Besisahar + Jomsom out'),
('annapurna-circuit-trek','Accommodation',120,250,'12-16 nights'),
('annapurna-circuit-trek','Food',180,300,''),
('annapurna-circuit-trek','Permits',40,50,'ACAP + TIMS'),
('annapurna-circuit-trek','Guide',280,400,''),
('langtang-valley-trek','Transportation',20,40,'Kathmandu-Syabrubesi bus/jeep'),
('langtang-valley-trek','Accommodation',70,140,'7-9 nights'),
('langtang-valley-trek','Food',100,180,''),
('langtang-valley-trek','Permits',40,50,'Langtang NP + TIMS'),
('langtang-valley-trek','Guide',180,280,'')
) AS v(slug, cat, min, max, note)
ON tr.slug = v.slug;

-- ========== ROAD ROUTES ==========
INSERT INTO public.road_routes (country_id, from_name, to_name, from_lat, from_lng, to_lat, to_lng, road_distance_km, road_hours, flight_minutes, mode, is_approximate, note)
SELECT c.id, v.frm, v.tto, v.flat, v.flng, v.tlat, v.tlng, v.dist, v.hrs, v.fly, v.mode, true, v.note
FROM public.countries c
JOIN (VALUES
('Kathmandu','Pokhara',27.7172,85.3240,28.2096,83.9856,200,6.5,25,'road','Tourist bus or private car. Flight also available.'),
('Kathmandu','Lukla',27.7172,85.3240,27.6880,86.7310,null,null,35,'flight','Weather dependent. Peak season via Ramechhap.'),
('Kathmandu','Syabrubesi',27.7172,85.3240,28.1600,85.3400,120,7,null,'road','Local bus or jeep.'),
('Kathmandu','Besisahar',27.7172,85.3240,28.2300,84.3800,170,6,null,'road','Bus or jeep for Annapurna Circuit start.'),
('Pokhara','Jomsom',28.2096,83.9856,28.7800,83.7300,null,null,20,'flight','Short mountain flight. Road also possible via Beni.'),
('Pokhara','Nayapul',28.2096,83.9856,28.2800,83.8200,40,1.5,null,'road','Taxi or local bus for ABC/Poon Hill trailhead.'),
('Kathmandu','Chitwan (Sauraha)',27.7172,85.3240,27.5800,84.5000,160,5,null,'road','Tourist bus common.'),
('Kathmandu','Lumbini',27.7172,85.3240,27.4833,83.2760,280,8,null,'road','Bus via Bhairahawa.'),
('Kathmandu','Nagarkot',27.7172,85.3240,27.7150,85.5200,32,1.5,null,'road','Taxi or local bus. Popular day/overnight trip.'),
('Pokhara','Sarangkot',28.2096,83.9856,28.2450,83.9450,8,0.5,null,'road','Short taxi ride for sunrise viewpoint.')
) AS v(frm, tto, flat, flng, tlat, tlng, dist, hrs, fly, mode, note)
WHERE c.slug = 'nepal';
