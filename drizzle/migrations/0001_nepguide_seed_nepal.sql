
INSERT INTO public.countries (name, slug, iso_code, latitude, longitude, description, hero_image, is_active) VALUES
('Nepal','nepal','NPL',28.3949,84.1240,'A Himalayan nation of eight of the world''s fourteen 8,000-metre peaks, ancient Newar cities, subtropical jungle and the most developed trekking trail network on earth.','/images/everest.jpg',true),
('India','india','IND',20.5937,78.9629,'Himalayan foothills, Western Ghats and desert routes.',null,false),
('Bhutan','bhutan','BTN',27.5142,90.4336,'Eastern Himalaya kingdom of high passes and dzongs.',null,false),
('Pakistan','pakistan','PAK',30.3753,69.3451,'Karakoram giants and the Baltoro glacier routes.',null,false),
('Japan','japan','JPN',36.2048,138.2529,'Volcanic alpine traverses and pilgrimage trails.',null,false),
('Peru','peru','PER',-9.1900,-75.0152,'Andean passes, Inca roads and cloud forest.',null,false),
('Tanzania','tanzania','TZA',-6.3690,34.8888,'Kilimanjaro routes and rift valley landscapes.',null,false),
('New Zealand','new-zealand','NZL',-40.9006,174.8860,'Great Walks across two alpine islands.',null,false),
('Switzerland','switzerland','CHE',46.8182,8.2275,'Alpine huts, glaciers and high traverses.',null,false),
('Chile','chile','CHL',-35.6751,-71.5430,'Patagonian granite towers and fjord trails.',null,false),
('Norway','norway','NOR',60.4720,8.4689,'Fjord ridges and arctic tundra routes.',null,false),
('Kyrgyzstan','kyrgyzstan','KGZ',41.2044,74.7661,'Tien Shan alpine lakes and nomad valleys.',null,false);

INSERT INTO public.regions (country_id, name, slug, description, latitude, longitude, hero_image)
SELECT c.id, r.name, r.slug, r.description, r.lat, r.lng, r.img FROM public.countries c, (VALUES
('Everest Region','everest','The Khumbu: Sherpa villages, Tengboche monastery, glacier moraines and the approach to the highest mountain on earth.',27.9881,86.9250,'/images/everest.jpg'),
('Annapurna Region','annapurna','Nepal''s most varied trekking area — rice terraces, Thorong La, deep gorges and the Annapurna Sanctuary.',28.5967,83.8203,'/images/annapurna.jpg'),
('Langtang Region','langtang','The closest high Himalaya to Kathmandu: yak pastures, Tamang villages and the Gosaikunda lakes.',28.2139,85.5200,'/images/langtang.jpg'),
('Manaslu & Central Himalaya','manaslu','Restricted-permit valleys around the eighth-highest mountain, plus Tsum and Ganesh Himal.',28.5497,84.5594,'/images/annapurna.jpg'),
('Mustang','mustang','The trans-Himalayan rain shadow: ochre cliffs, walled Lo Manthang and the Kali Gandaki gorge.',29.1892,83.9736,'/images/mustang.jpg'),
('Dolpo','dolpo','Remote west: Shey Phoksundo''s turquoise lake and high Tibetan-culture plateaus.',29.2000,82.9000,'/images/mustang.jpg'),
('Kanchenjunga','kanchenjunga','Far-eastern wilderness below the world''s third-highest peak.',27.7025,88.1475,'/images/langtang.jpg'),
('Kathmandu Valley','kathmandu-valley','Three medieval Newar cities, seven UNESCO monument zones and the valley rim viewpoints.',27.7172,85.3240,'/images/kathmandu.jpg'),
('Gandaki & Lakes','gandaki','Pokhara, Begnas and the mid-hill towns beneath the Annapurna skyline.',28.2096,83.9856,'/images/pokhara.jpg'),
('Terai & Lowlands','terai','Subtropical plains: Chitwan and Bardiya jungle, Lumbini and Janakpur.',27.5291,84.3542,'/images/terai.jpg'),
('Far West','far-west','Rara Lake, Khaptad plateau and Nepal''s least-visited districts.',29.5000,82.0900,'/images/pokhara.jpg'),
('Eastern Hills','eastern-hills','Ilam tea gardens and the Koshi hill country.',26.9110,87.9290,'/images/terai.jpg')
) AS r(name, slug, description, lat, lng, img) WHERE c.slug='nepal';
