-- Seed data mirroring components/landing/landing-data.ts and the admin panel
-- mocks, so the directory has real Kurunegala-area listings from day one.
-- Coordinates are approximate, centered on Kurunegala town (7.4863 N, 80.3647 E).

-- ---------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------
insert into public.categories (name, icon, slug) values
    ('Pharmacies', '💊', 'pharmacies'),
    ('Food & Cafes', '🍛', 'food-cafes'),
    ('Repairs & Services', '🔧', 'repairs-services'),
    ('Groceries', '🛒', 'groceries'),
    ('Electronics', '📱', 'electronics'),
    ('Fashion & Tailoring', '👕', 'fashion-tailoring'),
    ('Home & Hardware', '🏠', 'home-hardware'),
    ('Vehicle Services', '🚗', 'vehicle-services');

-- ---------------------------------------------------------------------
-- shops
-- ---------------------------------------------------------------------
insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active) values
    ('City Care Pharmacy', (select id from public.categories where slug = 'pharmacies'), 'Kurunegala', 'Kandy Rd, Kurunegala', 7.4850, 80.3660, 100, 3000, 'open',
        '{"mon": "07:00-22:00", "tue": "07:00-22:00", "wed": "07:00-22:00", "thu": "07:00-22:00", "fri": "07:00-22:00", "sat": "07:00-22:00", "sun": "08:00-21:00"}',
        '+94372220001', 'Late-night medicine and quick pickup near the town center.', true),
    ('Maliyadeva Pharmacy', (select id from public.categories where slug = 'pharmacies'), 'Kurunegala', 'Maliyadeva Rd, Kurunegala', 7.4825, 80.3622, 500, 2000, 'closed',
        '{"mon": "08:00-21:00", "tue": "08:00-21:00", "wed": "08:00-21:00", "thu": "08:00-21:00", "fri": "08:00-21:00", "sat": "08:00-21:00", "sun": "closed"}',
        '+94372220002', 'Neighbourhood pharmacy near Maliyadeva College.', false),
    ('Green Table Cafe', (select id from public.categories where slug = 'food-cafes'), 'Kurunegala', 'Puttalam Rd, Kurunegala', 7.4870, 80.3650, 300, 1200, 'open',
        '{"mon": "08:00-21:00", "tue": "08:00-21:00", "wed": "08:00-21:00", "thu": "08:00-21:00", "fri": "08:00-21:00", "sat": "08:00-22:00", "sun": "08:00-22:00"}',
        '+94372220003', 'Study-friendly cafe with Wi-Fi and light meals.', true),
    ('Lake View Cafe', (select id from public.categories where slug = 'food-cafes'), 'Kurunegala', 'Lake Rd, Kurunegala', 7.4805, 80.3690, 1000, 5000, 'open',
        '{"mon": "10:00-22:00", "tue": "10:00-22:00", "wed": "10:00-22:00", "thu": "10:00-22:00", "fri": "10:00-23:00", "sat": "10:00-23:00", "sun": "10:00-22:00"}',
        '+94372220004', 'Sit-down dining overlooking Kurunegala Lake.', true),
    ('Burger Hunt', (select id from public.categories where slug = 'food-cafes'), 'Kurunegala', 'Negombo Rd, Kurunegala', 7.4900, 80.3600, 500, 2000, 'open',
        '{"mon": "11:00-22:00", "tue": "11:00-22:00", "wed": "11:00-22:00", "thu": "11:00-22:00", "fri": "11:00-23:00", "sat": "11:00-23:00", "sun": "11:00-22:00"}',
        '+94372220005', 'Fast-food combos and burger deals.', true),
    ('Rasa Kade Hot Meals', (select id from public.categories where slug = 'food-cafes'), 'Kurunegala', 'Colombo Rd, Kurunegala', 7.4830, 80.3620, 150, 600, 'open',
        '{"mon": "06:00-20:00", "tue": "06:00-20:00", "wed": "06:00-20:00", "thu": "06:00-20:00", "fri": "06:00-20:00", "sat": "06:00-20:00", "sun": "06:00-14:00"}',
        '+94372220006', 'Budget rice and curry takeaway counter.', true),
    ('Kurunegala Digital Mart', (select id from public.categories where slug = 'electronics'), 'Kurunegala', 'Main St, Kurunegala', 7.4845, 80.3635, 1000, 50000, 'busy',
        '{"mon": "09:00-20:00", "tue": "09:00-20:00", "wed": "09:00-20:00", "thu": "09:00-20:00", "fri": "09:00-20:00", "sat": "09:00-20:00", "sun": "10:00-18:00"}',
        '+94372220007', 'Electronics, accessories, and repair support.', true),
    ('Kurunegala Tech Hub', (select id from public.categories where slug = 'electronics'), 'Kurunegala', 'Station Rd, Kurunegala', 7.4880, 80.3670, 2000, 15000, 'closed',
        '{"mon": "09:00-19:00", "tue": "09:00-19:00", "wed": "09:00-19:00", "thu": "09:00-19:00", "fri": "09:00-19:00", "sat": "09:00-19:00", "sun": "closed"}',
        '+94372220008', 'Mobile phone sales and repair specialists.', false),
    ('Softlogic', (select id from public.categories where slug = 'electronics'), 'Kurunegala', 'Kandy Rd, Kurunegala', 7.4862, 80.3645, 1500, 100000, 'open',
        '{"mon": "09:00-21:00", "tue": "09:00-21:00", "wed": "09:00-21:00", "thu": "09:00-21:00", "fri": "09:00-21:00", "sat": "09:00-21:00", "sun": "10:00-20:00"}',
        '+94372220009', 'Consumer electronics and appliances.', true),
    ('Nolimit', (select id from public.categories where slug = 'fashion-tailoring'), 'Kurunegala', 'Main St, Kurunegala', 7.4858, 80.3642, 500, 10000, 'open',
        '{"mon": "09:00-20:00", "tue": "09:00-20:00", "wed": "09:00-20:00", "thu": "09:00-20:00", "fri": "09:00-20:00", "sat": "09:00-20:00", "sun": "10:00-18:00"}',
        '+94372220010', 'Fashion retailer with storewide promotions.', true),
    ('City Spare Parts', (select id from public.categories where slug = 'vehicle-services'), 'Kurunegala', 'Industrial Rd, Kurunegala', 7.4790, 80.3580, 3000, 20000, 'closed',
        '{"mon": "08:00-18:00", "tue": "08:00-18:00", "wed": "08:00-18:00", "thu": "08:00-18:00", "fri": "08:00-18:00", "sat": "08:00-14:00", "sun": "closed"}',
        '+94372220011', 'Vehicle spare parts and accessories.', false),
    ('Kurunegala Central Grocers', (select id from public.categories where slug = 'groceries'), 'Kurunegala', 'Bazaar St, Kurunegala', 7.4868, 80.3655, 50, 5000, 'open',
        '{"mon": "07:00-21:00", "tue": "07:00-21:00", "wed": "07:00-21:00", "thu": "07:00-21:00", "fri": "07:00-21:00", "sat": "07:00-21:00", "sun": "07:00-21:00"}',
        '+94372220012', 'Everyday groceries and household essentials.', true),
    ('QuickFix Repairs', (select id from public.categories where slug = 'repairs-services'), 'Kurunegala', 'Negombo Rd, Kurunegala', 7.4895, 80.3615, 200, 3000, 'open',
        '{"mon": "08:00-19:00", "tue": "08:00-19:00", "wed": "08:00-19:00", "thu": "08:00-19:00", "fri": "08:00-19:00", "sat": "08:00-17:00", "sun": "closed"}',
        '+94372220013', 'Phone, appliance, and gadget repair services.', true),
    ('Home Hardware Mart', (select id from public.categories where slug = 'home-hardware'), 'Kurunegala', 'Puttalam Rd, Kurunegala', 7.4875, 80.3665, 100, 10000, 'open',
        '{"mon": "08:00-19:00", "tue": "08:00-19:00", "wed": "08:00-19:00", "thu": "08:00-19:00", "fri": "08:00-19:00", "sat": "08:00-19:00", "sun": "08:00-15:00"}',
        '+94372220014', 'Hardware, tools, and home improvement supplies.', true);

-- ---------------------------------------------------------------------
-- discounts
-- ---------------------------------------------------------------------
insert into public.discounts (shop_id, title, offer, meta, valid_until, is_active) values
    ((select id from public.shops where name = 'Nolimit'), 'Storewide Sale', '20% Off Storewide', 'Ends tonight • Fashion', now() + interval '1 day', true),
    ((select id from public.shops where name = 'Burger Hunt'), 'Combo Alert', 'Buy 1 Get 1 Free', 'Limited time • Food', now() + interval '3 days', true),
    ((select id from public.shops where name = 'Softlogic'), 'Clearance Wave', 'Clearance Sale', 'Up to 40% off • Tech', now() + interval '7 days', true);

-- ---------------------------------------------------------------------
-- jobs
-- ---------------------------------------------------------------------
insert into public.jobs (shop_id, title, field, district, salary_min, salary_max, description, requirements, is_active) values
    ((select id from public.shops where name = 'City Care Pharmacy'), 'Pharmacy Assistant', 'Pharmacies', 'Kurunegala', 30000, 35000,
        'Assist customers, manage stock, and support the pharmacist during daytime and evening shifts.', 'O/L qualified, basic English, willing to work shifts.', true),
    ((select id from public.shops where name = 'Green Table Cafe'), 'Cafe Server', 'Food & Cafes', 'Kurunegala', 28000, 32000,
        'Take orders, serve customers, and keep the cafe tidy during peak hours.', 'Friendly attitude, prior cafe/restaurant experience a plus.', true),
    ((select id from public.shops where name = 'Kurunegala Tech Hub'), 'Mobile Repair Technician', 'Electronics', 'Kurunegala', 40000, 55000,
        'Diagnose and repair smartphones and tablets, handle customer drop-offs and pickups.', '1+ years mobile repair experience, own basic tools preferred.', true),
    (null, 'Three-Wheel Driver', 'Driving', 'Kurunegala', 35000, 50000,
        'Daily passenger and delivery trips around Kurunegala town with a company-provided three-wheeler.', 'Valid license, good knowledge of Kurunegala roads.', true),
    ((select id from public.shops where name = 'Nolimit'), 'Tailor Assistant', 'Fashion & Tailoring', 'Kurunegala', 25000, 30000,
        'Support alterations, measurements, and stock organisation in a busy fashion outlet.', 'Basic sewing/tailoring skills, attention to detail.', true),
    ((select id from public.shops where name = 'Home Hardware Mart'), 'Hardware Store Assistant', 'Home & Hardware', 'Kurunegala', 28000, 32000,
        'Help customers find tools and materials, manage shelves, and process sales.', 'Physically fit, basic numeracy for billing.', true);
