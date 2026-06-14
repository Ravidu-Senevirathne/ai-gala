-- Seed data for restaurants scraped from Google Maps (Kurunegala area).
-- Generated from restaurant export; all rows mapped to the 'food-cafes' category.

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Fab Ceylon Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '6, 8 Dambulla Rd',
    7.4890449,
    80.3653691,
    1000,
    7000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Fab+Ceylon+Kurunegala/data=!4m7!3m6!1s0x3ae33b00550ba9c1:0x5ca5920200df4fb0!8m2!3d7.4890449!4d80.3653691!16s%2Fg%2F11lcl_l0hh!19sChIJwakLVQA74zoRsE_fAAKSpVw?authuser=0&hl=en&rclk=1',
    4.6,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF5KEla4XBNTORdurbULUoHWKj-ZcMx6Z33mAhficw2Y65-eIJbDL6P7ss9jYDwAn4KHJ2Q4hhrnIzBTkmWWaJe7w2RaV6c-Dl7gcHc7pzXZfD5y0NDyoOv-kupnWMZOf5-qSmNQoXV2D8=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Charcoal Smoke House (Halal)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '233 Kandy Rd',
    7.4779535,
    80.3750005,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Charcoal+Smoke+House+%28Halal%29/data=!4m7!3m6!1s0x3ae3390c4f3947c3:0x52c9811ca38b148c!8m2!3d7.4779535!4d80.3750005!16s%2Fg%2F11krgbry30!19sChIJw0c5Tww54zoRjBSLoxyByVI?authuser=0&hl=en&rclk=1',
    4.5,
    222,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFlhWdcBsGb6Pa0ISRFtp3dXrLTh0_G_LMlhXXfoUydhlsEnoSVm_TwGTgcQAZyKLP4ywp-Z-ML8AhmzydXgiZD1BFvNwF2hEw4EAKO0V8UJll4dJkc_QwwqnLhAAX4idzU-tXm_w=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Ceylon Lagos by Gemigedara',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4977359,
    80.3667795,
    1000,
    7000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Ceylon+Lagos+by+Gemigedara/data=!4m7!3m6!1s0x3ae33924d2775d05:0x6fee2fafb8cb5617!8m2!3d7.4977359!4d80.3667795!16s%2Fg%2F11t5k61sp8!19sChIJBV130iQ54zoRF1bLuK8v7m8?authuser=0&hl=en&rclk=1',
    4.3,
    244,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHLFMEfAnoEMwVz1v0oFurBmVll7CZFuRoRhJg-jMd0c3fE538sCiEIDRwJGUUYDNHKM3-zyZPNOy0oNSdaTPAPC1khPE44R7Njc7dV9CcK5P8wAVBmGKVWi7UrYJBXaAqRQ7ec=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Aasife Biriyani - Kurunegala (Sri Lanka)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4879563,
    80.3598282,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Aasife+Biriyani+-+Kurunegala+%28Sri+Lanka%29/data=!4m7!3m6!1s0x3ae33b73c68a526b:0x9201576afe6dfbcb!8m2!3d7.4879563!4d80.3598282!16s%2Fg%2F11lnhxpgct!19sChIJa1KKxnM74zoRy_tt_mpXAZI?authuser=0&hl=en&rclk=1',
    4.7,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGGhLS1o87AIl9Ss9nBD2eQbfNdaIbek3wuaGlfPqLx61jJ2TBsMXSZvF3IQ0qzL1NFteAOWJEXuw4c--O1ifMc0ke-OZj7UEHzBgKeuX58LO-X83uCXXJu9CQ_bfrJ8UVmv78fQkZKKRgF=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cafe Amakie',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '84, Dambulla Rd',
    7.4980463,
    80.3848358,
    2000,
    3000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cafe+Amakie/data=!4m7!3m6!1s0x3ae33930a14c83c7:0x853a20e74c958de9!8m2!3d7.4980463!4d80.3848358!16s%2Fg%2F11n6gbjk7k!19sChIJx4NMoTA54zoR6Y2VTOcgOoU?authuser=0&hl=en&rclk=1',
    4.5,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEOhs_gvJvVM2x9yEr2A75VKcyy-Ktur3dXJdc7w6aaVlivIJtx7PmQby8tG1rqA12hgs7QuMXuyYB5SPhZY1zX0m_CS_4ZAFuyQoD8kBwKlvgnuI7Y0JRIXC4dcrZZ6RJ1TU=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Sri Bajra Dosai',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '156 Negombo Rd',
    7.4867942,
    80.3572838,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Sri+Bajra+Dosai/data=!4m7!3m6!1s0x3ae33b84cfeb968d:0xf9807cfc9a961a12!8m2!3d7.4867942!4d80.3572838!16s%2Fg%2F11fmkns22n!19sChIJjZbrz4Q74zoREhqWmvx8gPk?authuser=0&hl=en&rclk=1',
    4.5,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHOSDn52EVDihHXkzNUz8w-DbIHEpozMqBeaSbBjW02OGxc6p85Z9NqtiJtcBWXvpR4cfYjet9jQl8V0GSUARj7SqaFpjkbIm83Yo3JSh0SdfH2tH1XDsW8DsqbmOzNJJLmTrCnQA=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Gemi Gedara',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4821674,
    80.3581546,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Gemi+Gedara/data=!4m7!3m6!1s0x3ae33a2269e841ed:0xcf7983950992d8d0!8m2!3d7.4821674!4d80.3581546!16s%2Fg%2F11dxjy9cmy!19sChIJ7UHoaSI64zoR0NiSCZWDec8?authuser=0&hl=en&rclk=1',
    4,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtHBEznBclY-xmHhGDqhgMtrplNW7YwcIcy1XOHzYw0cnZIK5udZLNvA2__YplgAfy6tahp75mlwJdsLvQXFImMsxuNIDL-mG9VwEmiu1kGhf67OqcT4Vh6X_h6yZCqy2ivR39=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Restaurant Three',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4968058,
    80.3678422,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Restaurant+Three/data=!4m7!3m6!1s0x3ae339a57c88b555:0xa9108787f27ce165!8m2!3d7.4968058!4d80.3678422!16s%2Fg%2F11flvbkk1v!19sChIJVbWIfKU54zoRZeF88oeHEKk?authuser=0&hl=en&rclk=1',
    4.1,
    610,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEmtlVy3_kGihOfvBiGZD5aJyz9Lh-DraPGWNyPGD3qQS4hTHCqACkU_ZYtasHlahozus3kDdacnGUDUt09czMzADDamp_oDh5xK4EsnBdRCz0FZG93g2-3oY4iAp0GoVtmuOhfAQ=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Saruketha By Oak Ray',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4981922,
    80.3843179,
    2000,
    4000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Saruketha+By+Oak+Ray/data=!4m7!3m6!1s0x3ae339965dc0395f:0xee19d7f42dbe3a4f!8m2!3d7.4981922!4d80.3843179!16s%2Fg%2F11v_7_xndt!19sChIJXznAXZY54zoRTzq-LfTXGe4?authuser=0&hl=en&rclk=1',
    4.3,
    246,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFBI4C3hyJxSia6flRw_TGWXnu0TSRTDEeFtrSgJtRsBRHIvn4Br45oAekJNbPht8NfQSP6V6JoCh6c40kqbgn_demG5-aExmDlXmU8hzjhyr44jHvBCWxDBPqiXDglOoTZhFVqrqKnSfE=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'ATHUGALPURA RESTAURANT',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4783735,
    80.3744809,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/ATHUGALPURA+RESTAURANT/data=!4m7!3m6!1s0x3ae339ad5aaa3ce5:0xb1794eb0113599ed!8m2!3d7.4783735!4d80.3744809!16s%2Fg%2F11w3f25y8d!19sChIJ5TyqWq054zoR7Zk1EbBOebE?authuser=0&hl=en&rclk=1',
    4.9,
    22,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHFnuy2Ap-PUloYBobyDLi0scwYga9WsPR-pgNg3N2lCH7tCwd80HTzX0CzrgPBxkk2SqExRNssfqGHIkBua3R2ppWaO1cWa4G9Bb7io4JpPT74eQCvf7METoScZYrLX1NvnCgQUQ=w138-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Garden Cafe Asian Restaurant by Sanasuma',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4545512,
    80.3472902,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Garden+Cafe+Asian+Restaurant+by+Sanasuma/data=!4m7!3m6!1s0x3ae33b8b66d6e7b1:0x13b88d0f02da72ce!8m2!3d7.4545512!4d80.3472902!16s%2Fg%2F11lkw50_0w!19sChIJsefWZos74zoRznLaAg-NuBM?authuser=0&hl=en&rclk=1',
    4.5,
    73,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFi6A3lKu6zvm_v-bfe22HB_LrJyg5lw3V_lxWQwLuHEqy5lx-rduZnnnO94ygR5Rj60Iuy2fpRn9gErSrXnADJfBK4EtJEJ7ZUfv0QWE-nOFeePH8Gll069NKs2B0es5ghuzI8Ew=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cafe Olu',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '255 Kandy Rd',
    7.4774758,
    80.3759777,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cafe+Olu/data=!4m7!3m6!1s0x3ae3399bf9e4e2c1:0x227e9ed85c6b5733!8m2!3d7.4774758!4d80.3759777!16s%2Fg%2F11s5wpjlr2!19sChIJweLk-Zs54zoRM1drXNiefiI?authuser=0&hl=en&rclk=1',
    4.5,
    700,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGCTmnnEUUqDhBE3iNxkFNuTThZSSRPHsmXVrk3ZlFVGujkqIcMzBl_R6E_VR5Si5AXE244jXB56g1vWxZLUikyRA98xZc7Ci9eRvcwNQgy6d90Qpnf9row8TW-X7CGjCdyGqVz=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Wela Addara Restaurant Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5038125,
    80.3650625,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Wela+Addara+Restaurant+Kurunegala/data=!4m7!3m6!1s0x3ae33b25fa9202e9:0x5270d73d26f2599d!8m2!3d7.5038125!4d80.3650625!16s%2Fg%2F11trzm6vc3!19sChIJ6QKS-iU74zoRnVnyJj3XcFI?authuser=0&hl=en&rclk=1',
    4.5,
    131,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGNdFfymnTqwB6gRwvKabuCwPFF3Zz-K8e6LjaM-Lqu73LtDFD8oMPlOQqWcWqJTwwNKpoT6jY9ZcxXSrFxdewjsjCPspG16g6waeKAQYrXp_jjd5X9OWfNhBWzLcE3L88MQBc3X7ifAowX=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Maharani Indian Restaurant ( Yaggapitiya )',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4989536,
    80.3870453,
    1000,
    3000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Maharani+Indian+Restaurant+%28+Yaggapitiya+%29/data=!4m7!3m6!1s0x3ae33998334342f5:0x9c7fabbd52bc3040!8m2!3d7.4989536!4d80.3870453!16s%2Fg%2F11mrl3tlp5!19sChIJ9UJDM5g54zoRQDC8Ur2rf5w?authuser=0&hl=en&rclk=1',
    4.5,
    169,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGZhSKFn0D6wGiJIpDx3Psnd8WSX39xhvafzv6gQLOvWaH2IAoQODRylwJJt92p4nUCTC517qtJGOzUkW6TvET11rSbSryue8xg8aZ6RwfmyWf_tGZROZYVoqP13D6B-xRAXNOmcFIshXDk=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Asliya Kallista Restaurant & Cafe',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.485266,
    80.3628467,
    1000,
    5000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Asliya+Kallista+Restaurant+%26+Cafe/data=!4m7!3m6!1s0x3ae33b004331df51:0xbeb7ba0946001a21!8m2!3d7.485266!4d80.3628467!16s%2Fg%2F11m6qzvx97!19sChIJUd8xQwA74zoRIRoARgm6t74?authuser=0&hl=en&rclk=1',
    4.3,
    137,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHLh3NPvV7TBa_Dq-RgiauQDGZdTTtF9ar7pEWJ7_DlMYcJ3dPEngNwtNJhdvG4wN1n9CeHjACbYMPV-hacVdPynOJRFOTjJv2Na7W7oh7UN6Cu_Gtgsi5-8IQQsk5qiaQpSjeiZS4g-xI=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Love Breeze Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4978806,
    80.3662751,
    1000,
    5000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Love+Breeze+Family+Restaurant/data=!4m7!3m6!1s0x3ae3390075ee7785:0x473e3f974aec8aa6!8m2!3d7.4978806!4d80.3662751!16s%2Fg%2F11wj5fj85g!19sChIJhXfudQA54zoRporsSpc_Pkc?authuser=0&hl=en&rclk=1',
    4.5,
    79,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGUMheTpGpkJ3SRPdf6kyckMuSHkvsaD0L8z_WI-wMg0QyjrizP80dMwzNUuRanUpWdgwktd7m-tdP4BxQn9z3kULPhdlWinkwPzteS_r8FZoZPP6kUeCZSVPxkP08DFTt4wQ4sOTndlnSb=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'The Saruketha Pavilion',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4967131,
    80.3581619,
    500,
    3000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/The+Saruketha+Pavilion/data=!4m7!3m6!1s0x3ae33a04f0acdbb9:0x19aee791d23b1950!8m2!3d7.4967131!4d80.3581619!16s%2Fg%2F11c6chr2xv!19sChIJudus8AQ64zoRUBk70pHnrhk?authuser=0&hl=en&rclk=1',
    3.9,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFS5LosalzrOm3EAyPRVjVhiBUSvMM6onLkFTByGJAVeCZe27EserlizdV7BfOJ7tt0WoNKIc7jNambd_mNU2UQuo9GLZyxOReJTz2wYe-5jdrlCDX39ebNEjAdfWdckknHe9e2Uw=w138-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Burgezz',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4851454,
    80.3642694,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Burgezz/data=!4m7!3m6!1s0x3ae33b006eb2de2f:0x79441ab6076e8c40!8m2!3d7.4851454!4d80.3642694!16s%2Fg%2F11wy397w55!19sChIJL96ybgA74zoRQIxuB7YaRHk?authuser=0&hl=en&rclk=1',
    4.9,
    38,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGf8mIYu8fmM7cH4qQ08bWVMhZDKR2pmAZPj9AJ1eIUAUbhMq2NwGea4CnFrMi7_BPu4BpGuBXKP3mDyHW5Lteh3ruZBu3hwaEUHgboFaFg8WJlQVWUDO4hAfspSs_HtV-rFCtaqMykvKdT=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'The Hangout',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '136B Colombo Road',
    7.4810983,
    80.3597382,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/The+Hangout/data=!4m7!3m6!1s0x3ae33a23d301ea97:0xb1e3c4e138286f57!8m2!3d7.4810983!4d80.3597382!16s%2Fg%2F11b6gr_mhq!19sChIJl-oB0yM64zoRV28oOOHE47E?authuser=0&hl=en&rclk=1',
    3.9,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLnMDKZmjrElm7R37WTUWuWM7Zv2u0HKxzmtINTipvVHxgJj5jFHV6JgRC6Q42DIPaHsuEwZokcRPvz-uFm7NtgRXuSeRs80xHrtEgbswd97utqWkhaMP2sJSFv32RFKNB_R_4=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'P&G Lounge',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4763378,
    80.3772177,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/P%26G+Lounge/data=!4m7!3m6!1s0x3ae33a1fdf4ac197:0xd0a03cc5acf0becb!8m2!3d7.4763378!4d80.3772177!16s%2Fg%2F124ybk1bc!19sChIJl8FK3x864zoRy77wrMU8oNA?authuser=0&hl=en&rclk=1',
    4.2,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFs4Hc0ExSNjOfwVZGtJN-HNNTRudtvmC5pOfDvEqt7DQxaEGSJhtI9ylLuF9llSLYC6xGfa0LsH7AZH2nLsC_bzecoqT1txsdBGpqn6HATct3NPKlc-tzRhu0lMpxQkXfIrYci=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cafe 96 Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4964113,
    80.3617176,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cafe+96+Kurunegala/data=!4m7!3m6!1s0x3ae33b346f5b81eb:0x2bc7645758a8a9fc!8m2!3d7.4964113!4d80.3617176!16s%2Fg%2F11l29d3d6n!19sChIJ64FbbzQ74zoR_KmoWFdkxys?authuser=0&hl=en&rclk=1',
    5,
    13,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHtkh0bUBqpT5Z1o5GnSbm1vR4p5aFc3Fn6wcrazJrQw5zLCgx2pHNt3s2znrUFMPNeAgCoGCW6Hd3YR_SEldj__ywYTcO2CxB0QdWjMqBvXpFLn4AQULO22FxBwKHdQAMg3eiv=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Mandiya Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4854988,
    80.3652426,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Mandiya+Restaurant/data=!4m7!3m6!1s0x3ae33b46a169c3b5:0x65cc55de839a5739!8m2!3d7.4854988!4d80.3652426!16s%2Fg%2F11ypf_qnl7!19sChIJtcNpoUY74zoROVeag95VzGU?authuser=0&hl=en&rclk=1',
    3.7,
    74,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGazz4OecilG00iArA1oniSyea-jIXnBKInnaQhNEqrRJUlcfcAxiedeXgAJxgGZvwdWesEzVbaezS0Dhi-GFM0k9XWSCNYiwsshtmWfEKwuk8i8L8bHEHnBIdqdZ1g_PGWU43pHe5QTXPS=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Krusty Krab',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4852145,
    80.3630607,
    1,
    1500,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Krusty+Krab/data=!4m7!3m6!1s0x3ae33b00045aaf87:0xa2c05e63532d45fd!8m2!3d7.4852145!4d80.3630607!16s%2Fg%2F11vz64z1t6!19sChIJh69aBAA74zoR_UUtU2NewKI?authuser=0&hl=en&rclk=1',
    4.5,
    36,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH-59jFl-3b0t-H54pEPLGU6Ur06vlRklGcNqU1brTjR1k1ALdXMJIZd7rdv6OpiezkUcSv0-SMtw5FC54hU9j2mzJiZlg0tFAhmh9AkWazGEYan7rafqNt8CpjRiMaJ9SUlQ8f=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'SIRAJ BHAI BIRIYANI RESTAURANT',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4779671,
    80.3830019,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/SIRAJ+BHAI+BIRIYANI+RESTAURANT/data=!4m7!3m6!1s0x3ae339a36e3b48d5:0x86cae871fdd6b7db!8m2!3d7.4779671!4d80.3830019!16s%2Fg%2F11y7s_s4p6!19sChIJ1Ug7bqM54zoR27fW_XHoyoY?authuser=0&hl=en&rclk=1',
    4.7,
    41,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGRoa9oIrZuhYkUc0k4NFzr3fu8qhjau8NH_bitHLQx2xFQcEkEGGGGh8TEx_C8amF0e5ky6wZOqP9rRea5WXC43ZzGbpohErWUzIQjv94jGaQft8c6VAJ5g8iThyHfE5UyvjfNvjmXBEs=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Singhe Bakers & Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4769914,
    80.3451781,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Singhe+Bakers+%26+Restaurant/data=!4m7!3m6!1s0x3ae33a38c0fb03f7:0x244baf962d51eb55!8m2!3d7.4769914!4d80.3451781!16s%2Fg%2F1v42d6q6!19sChIJ9wP7wDg64zoRVetRLZavSyQ?authuser=0&hl=en&rclk=1',
    4.2,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG4nUnmfERzZyt5NJU1aFQEwhOU1TV3-LmatHXAf1SxGseXMaUHJzeOyWeePZoaAjao2E3epyRWJVS59An3pg6dQ8jiK8FoIgmXNWZYrgeuj_rabuGBOrocpr1qW2j29ebk2dUo=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'La Roma Cafe Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4941588,
    80.3733915,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/La+Roma+Cafe+Restaurant/data=!4m7!3m6!1s0x3ae339d499df2ea7:0xf28b429f5988e3b7!8m2!3d7.4941588!4d80.3733915!16s%2Fg%2F11mzhhhvmf!19sChIJpy7fmdQ54zoRt-OIWZ9Ci_I?authuser=0&hl=en&rclk=1',
    5,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHD0146C_z64Xtlkg6j_4gErHN3hnSSulq37G8FRorruoPIv2d13QSrvaGW0WIgOLq5qfigg7jwXgBNI7YbRTGak-GwXH4_b6tRZmn8WHl-DmrzMeeaRsaeFC9lktzfomORBmb4mBPtqXE=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Shanthi Café',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4883752,
    80.3622855,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Shanthi+Caf%C3%A9/data=!4m7!3m6!1s0x3ae33a1e9030a453:0x6c21c5787ffafdac!8m2!3d7.4883752!4d80.3622855!16s%2Fg%2F11g6s8k60x!19sChIJU6QwkB464zoRrP36f3jFIWw?authuser=0&hl=en&rclk=1',
    4.3,
    190,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEMTwrISgTamGYUDy7kSkPDqjWwoiHslxHvrT4Gl1GWELz6I1AjRo-K5W_4VvFYgQrZxDv2Ps_4r_bgx9q52D5TfiSxSAYWv07KKi5xCnG01UXba2o_YutMFmIK6fq04aRfRWpfDA=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Ransara In & Out Pvt Ltd',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.488207,
    80.363295,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Ransara+In+%26+Out+Pvt+Ltd/data=!4m7!3m6!1s0x3ae33a1e63d7e5ad:0x98471be848af41a!8m2!3d7.488207!4d80.363295!16s%2Fg%2F1tcwv4m1!19sChIJreXXYx464zoRGvSKhL5xhAk?authuser=0&hl=en&rclk=1',
    3.7,
    850,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8l7UnDaEexqAzbtTF-UBVUXITzDMOwGCkMTN310Nlsyp-UCIOBZmmEtnSjtrSwpogcqfZ0GkfHn9Ax4uBUbM3g1LzZfJUrJQYX4Esnyz2UKix-LTXGj7uzjANAZkubR7f7wEF=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Iwra Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4979737,
    80.3840197,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Iwra+Family+Restaurant/data=!4m7!3m6!1s0x3ae339ffca074225:0xdec1a3cfa716531d!8m2!3d7.4979737!4d80.3840197!16s%2Fg%2F11mhgl3262!19sChIJJUIHyv854zoRHVMWp8-jwd4?authuser=0&hl=en&rclk=1',
    4.6,
    23,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEEKWfS_TtjtJId4XFRhpdemoc7gjvRcTMqwvFwyKwJEgcam9wqwRZX4I-Q-A5bm5sGUKik0b1dR39PDq5J73g53X0oFTbDuXtyi8eL1oR4QK46NQkWU-7H2RfRNOZKf-91xvnNKAA_O2Y=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Relax family restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4734381,
    80.3532174,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Relax+family+restaurant/data=!4m7!3m6!1s0x3ae33b0ffe225e25:0x3960fa70338725ba!8m2!3d7.4734381!4d80.3532174!16s%2Fg%2F11v9xzkhp8!19sChIJJV4i_g874zoRuiWHM3D6YDk?authuser=0&hl=en&rclk=1',
    5,
    3,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzjA7cCRNK3IWes8b4kBe1l0JBwc9eSxVmbhsVj17SrsDd7T-PYqJEPtT4pr4qt47Ok8kjWZ2-y2bI4nA4Ko4R0AXgQ-WW2T_ccqTwmmOKx9GO3kQ6XiYfYzlXvqoDceGd95h2eA=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Dine Hut Indian Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4949067,
    80.3785035,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Dine+Hut+Indian+Family+Restaurant/data=!4m7!3m6!1s0x3ae339f7d07c252d:0x6e71abef17a6b1c3!8m2!3d7.4949067!4d80.3785035!16s%2Fg%2F11b7q5dms8!19sChIJLSV80Pc54zoRw7GmF--rcW4?authuser=0&hl=en&rclk=1',
    4,
    945,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHV_gcYR4UYqim4YTLYTgMvIyIKfUltcZs5JxW7V6I4sKgbINcbf5coCLk3_mOP_woUPaR34k08J2ph8uP9aJs_vh4fKNils8WBiOXRKb9U9jz8yymQfYLht8ikkVVvz4uDYOQ=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'P&S (Perera & Sons) - Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4807982,
    80.3596652,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/P%26S+%28Perera+%26+Sons%29+-+Kurunegala/data=!4m7!3m6!1s0x3ae33b980599ca73:0x657ec1208b9c0406!8m2!3d7.4807982!4d80.3596652!16s%2Fg%2F11gjm3qymc!19sChIJc8qZBZg74zoRBgSciyDBfmU?authuser=0&hl=en&rclk=1',
    3.8,
    150,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFkfSvFeitr3t1UA34HRGJ1Hx_EXJCCCwW89Cfx0IBAogNAbwo4H9qAY3IRFHtkEJ3JNO1sPH0UAVbJ6GOrQ57x--hNToppysE_mELGZU88nldsX_qtlNNOYP2_SXQcFJdY-XkAzQ=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Diya Dahara',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '07 N Lake Rd',
    7.4978584,
    80.3656699,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Diya+Dahara/data=!4m7!3m6!1s0x3ae33a02789d6049:0xffc20826eaedf7ac!8m2!3d7.4978584!4d80.3656699!16s%2Fg%2F1hhx650_g!19sChIJSWCdeAI64zoRrPft6iYIwv8?authuser=0&hl=en&rclk=1',
    3.8,
    666,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEXr-HNnH4_SS8sAAv8jwVU0KJ3qYQtFN43P7I8OMIFNKy-xN564_SuqFnsl01mZldaKtl85dcvTdWCDeh3ERueto-quFZ3hqj8czMeKV8UoDDqG_DaRV1yp8gOb_mP9gHRT_iB=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Do Way Lounge',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4661003,
    80.3476863,
    3000,
    5000,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Do+Way+Lounge/data=!4m7!3m6!1s0x3ae33b0015aaf787:0xca7fdcb5f4572344!8m2!3d7.4661003!4d80.3476863!16s%2Fg%2F11zkrt9khm!19sChIJh_eqFQA74zoRRCNX9LXcf8o?authuser=0&hl=en&rclk=1',
    5,
    18,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGO1s1I3AhR7bQPFJCRACccVhmbvtZVMIKv2pvxYRjzHxeAkHNAzLt6F5riPljkWRoCVHZmYE6dwymK4SfPeloYQLSzJzjc_LW7cUoBdRWylsUHF2vtXtoRpmqHpM9fhxLGS-UZjD6yoJdX=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Fresh & Hot Restaurant (halal)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4941711,
    80.367658,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Fresh+%26+Hot+Restaurant+%28halal%29/data=!4m7!3m6!1s0x3ae339f7c4ebda59:0xfbef4ddaa4c7e5ef!8m2!3d7.4941711!4d80.367658!16s%2Fg%2F11bc8yv29p!19sChIJWdrrxPc54zoR7-XHpNpN7_s?authuser=0&hl=en&rclk=1',
    4,
    551,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGexcOR6aWkx-AxDAgzjAATHlEB2EWKXQ63I12B30drcb8LZWx7zZUwvvu6Diz01TQqCIOb7jDFtym7gbDMJN87wCMPnuCkbd7EBwTvU6luH1ZVEmsfMAUOQXy_n1dxzhPN7qEd=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Dilhi Lounge',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.49517,
    80.3573255,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Dilhi+Lounge/data=!4m7!3m6!1s0x3ae33bf128657863:0xdedd98c90f4a5401!8m2!3d7.49517!4d80.3573255!16s%2Fg%2F11rwm6z2gn!19sChIJY3hlKPE74zoRAVRKD8mY3d4?authuser=0&hl=en&rclk=1',
    3.9,
    186,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHT7HdRd1oBIdDjLepuQIFMAkoRuecbDFgCg64dj8J28A5Oh4wWIP4toWRm199emjkVT7Eqc1Jr8_lal9ZYU8QLunnfP8PA5RmVIrCXRlVuheYnzAL4-L6hi7Aw_dhWCKPdn7qVJg=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Sathkaara Dehena',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5151442,
    80.4201931,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Sathkaara+Dehena/data=!4m7!3m6!1s0x3ae3378572bcac43:0xeae9460dbdb1b091!8m2!3d7.5151442!4d80.4201931!16s%2Fg%2F11gfjtqfts!19sChIJQ6y8coU34zoRkbCxvQ1G6eo?authuser=0&hl=en&rclk=1',
    4.2,
    404,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHkMaP6m92Y1wROGt5D1jyYarIwf1mjUn70JqRvskq3V8nnSVxKXmP7qVKVy48awlxfsJ-j1762l5PgUIP25cTfIUg5DkO0KEE-HxZcVAWuV9_b3mDNjTNpsQzxQ6zPvtWao6LVuQ=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cafe lunumiris',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4936586,
    80.358242,
    1,
    500,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cafe+lunumiris/data=!4m7!3m6!1s0x3ae33b85c42daa1d:0x8102c613c1877c79!8m2!3d7.4936586!4d80.358242!16s%2Fg%2F11q2l5xk43!19sChIJHaotxIU74zoReXyHwRPGAoE?authuser=0&hl=en&rclk=1',
    4.4,
    21,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHUcfo_TUkHiMMCl3TQm5Grht09j83UzBEW0_kWv5Em61K8fH-d2vPwxAnk-m7Kx0MNE-VoyhLm8AjvmAofaVAFLCEldlLPQcIrlKCRLiv7IjLRxCrwMVBSaFSsmMDW0HUsF7w=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Palm Grove Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4888073,
    80.3644783,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Palm+Grove+Restaurant/data=!4m7!3m6!1s0x3ae33b620934ed4f:0x3ed5015db716684b!8m2!3d7.4888073!4d80.3644783!16s%2Fg%2F11nx1xy30v!19sChIJT-00CWI74zoRS2gWt10B1T4?authuser=0&hl=en&rclk=1',
    4.5,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHtoVSV8ARB7QDEcVECXtNOXfZDEZVMaU8ManFJQPblm5dsKv22hOX3UgclMNd-wYc0LyeL7CDHT5y3h4ZRydMTOgADVOufFDbk1l9HrBOiwfQeG_9s0PctDbpp6kuvMW1vc56-kPz8Puk=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Maharani Indian Restaurant ( Pellandeniya )',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '131, Pellandeniya',
    7.5236798,
    80.328487,
    1000,
    6000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Maharani+Indian+Restaurant+%28+Pellandeniya+%29/data=!4m7!3m6!1s0x3ae33115e7e14add:0x3382b917324db391!8m2!3d7.5236798!4d80.328487!16s%2Fg%2F11mcx0jc5v!19sChIJ3Urh5xUx4zoRkbNNMhe5gjM?authuser=0&hl=en&rclk=1',
    4.3,
    248,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHSgUcM2IhR0NRnwhFt5x1lqJItk4MobbzBXRmV0DtwxoR3solX04MXI3XpFj4tKgaLjOVXXCR1k2rsNIX9TwJ_egEn_fA2Jt1lE6hnvljMJYOy_RLVdYn4Y0ldRS0aI3HpaK3C7IDgUAWg=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Burger King Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Colombo Road',
    7.4845148,
    80.3637618,
    1000,
    5000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Burger+King+Kurunegala/data=!4m7!3m6!1s0x3ae33b611876f547:0xa33830183652bce6!8m2!3d7.4845148!4d80.3637618!16s%2Fg%2F11g_zxktns!19sChIJR_V2GGE74zoR5rxSNhgwOKM?authuser=0&hl=en&rclk=1',
    4.2,
    880,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHv9LOpbeW1NLZ2dpvK-eMiiRSmvzSS_33gQMJ_PAOOwY6Qk_wICFcuwe_onWhFgRWYKb4tb1rl2ZSpH5LVD0ev2tILs29ylw7Stc0KyHCl3HXGrOXO8xYvBOlsE7mA4w5ecyW5=w138-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Sha-in Cafe & Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Negombo Rd',
    7.4694912,
    80.3092668,
    1500,
    4000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Sha-in+Cafe+%26+Restaurant/data=!4m7!3m6!1s0x3ae33b00011f6341:0xa3cebbe467d26bae!8m2!3d7.4694912!4d80.3092668!16s%2Fg%2F11ydd37rm6!19sChIJQWMfAQA74zoRrmvSZ-S7zqM?authuser=0&hl=en&rclk=1',
    4.5,
    27,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHCv1xR7PNXA8qoCEE6_s60Obd4yCC3zXsQ4G0JiPig9yq_PZpPh7GAx86yVWINj0xKhILF4-73h3UUK3Kv8srE99L8Aq1ho45R999k7hb8h3XwWxRGzVT-qB4dI-qMmJ2WA-eh-geGSi0=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Coffee Point',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4855668,
    80.3657225,
    500,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Coffee+Point/data=!4m7!3m6!1s0x3ae33bce04996565:0xd154de71a388f53f!8m2!3d7.4855668!4d80.3657225!16s%2Fg%2F11svvzxn0r!19sChIJZWWZBM474zoRP_WIo3HeVNE?authuser=0&hl=en&rclk=1',
    4.4,
    70,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHOG1sVv0KdDmXujeiTTq4zP94HEUrvZQhHurLuFrR-OqakUhVuF9iGP6KxXUCKQPz0cW0DBgQCgA8fKrOrHv2iZuyEPyGHCXNqWDwSKGeiOZQPn2f4qcgkEM0xRTF9YppZAOrNdw=w80-h120-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'La Garage - Athugalpura',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4909376,
    80.3587916,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/La+Garage+-+Athugalpura/data=!4m7!3m6!1s0x3ae33b4d560a35f7:0x5672c06c0bae7582!8m2!3d7.4909376!4d80.3587916!16s%2Fg%2F11y40tw5l_!19sChIJ9zUKVk074zoRgnWuC2zAclY?authuser=0&hl=en&rclk=1',
    4.8,
    12,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHll-CvZTTe3J2dztRggxR-OwrHpRZSBVbN33ET8O0sdyOs41ob0hBmtsDeRF1wt7oQxXA1Iqm0BoDM3cnoJISZM6t60rf_6RbGAS13GCYVgeG1G9OdD1NgcdHRKqQ29-YeMV4-7xwMxCHD=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'KFC - Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'F9J6+G64, Colombo Rd',
    7.4812744,
    80.3605797,
    1000,
    5000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/KFC+-+Kurunegala/data=!4m7!3m6!1s0x3ae33a2183d0be0b:0xa280f8c905e50cd1!8m2!3d7.4812744!4d80.3605797!16s%2Fg%2F12cp7t08k!19sChIJC77QgyE64zoR0QzlBcn4gKI?authuser=0&hl=en&rclk=1',
    3.8,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEzhKod3LbfVpzlxnE8PzDKQcxVJjPi3TU15m_56-DIG51cHn6mstjrHDPxITiT__FGANliUxLdyBNIo_ihLU2kYnPstx1TNC_f49EPg9zyaQe_m0LWwhNI-lWnyodDmO3fr0su=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'The Benchers - Pub and Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4806998,
    80.3596297,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/The+Benchers+-+Pub+and+Restaurant/data=!4m7!3m6!1s0x3ae33b4ef7e38f51:0xbd36d3d1a4a79558!8m2!3d7.4806998!4d80.3596297!16s%2Fg%2F11tn69nxpj!19sChIJUY_j90474zoRWJWnpNHTNr0?authuser=0&hl=en&rclk=1',
    5,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHfyz8xi0PjEXoFudedfW-TWqWV9jx_teNJ2HHWAOApR_FvWRpsqI_WxNo-FRPWuHlgqcdRbFMtU99ceobkBNzIAum9gmxJ3Xsb0wnpFdBplxeQHTSNazzfNFVAf5qNXxGB220Sug=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Hela Rasa',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4939896,
    80.3763353,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Hela+Rasa/data=!4m7!3m6!1s0x3ae3390035c4093b:0xea72f26d1d26b2f8!8m2!3d7.4939896!4d80.3763353!16s%2Fg%2F11wbzbkjry!19sChIJOwnENQA54zoR-LImHW3ycuo?authuser=0&hl=en&rclk=1',
    4.7,
    10,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGu2vi8GEOIWOe02SAW-QwVv-8utCiBCd1cBJ_l-2mRYfw-xYWNIvD5BxvFSAikzAiAkGSP4OB6b8OJzWDx6C1qqc_9PgS6CquRBf6otqCq1WoRYpF2aiDvPU78L04p7-IdugU_qw=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cloud 9 Cafe',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '57, Badagamuwa, Kurunegala - Dambulla Rd',
    7.507324,
    80.4049457,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cloud+9+Cafe/data=!4m7!3m6!1s0x3ae33734845a0f5f:0xe32b7b2d428d0d93!8m2!3d7.507324!4d80.4049457!16s%2Fg%2F11qp_wx5yz!19sChIJXw9ahDQ34zoRkw2NQi17K-M?authuser=0&hl=en&rclk=1',
    4.5,
    258,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHrtEyZvx_cCeLh0LpeYNrTnMzjYLwgrCMwu6U8ZYio7jk81WCYqZkalUPE17RSPmsAdshNs29MpHTh-M_YDj_rjvM7mPPReiBbgO8xDnZJDl3nfuNQKA3wVxMrIO9Op2G8QDL_=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Welcome Inn Hotel',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4800628,
    80.3600828,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Welcome+Inn+Hotel/data=!4m10!3m9!1s0x3ae33a215f787465:0x3735c7f2750f0ff2!5m2!4m1!1i2!8m2!3d7.4800628!4d80.3600828!16s%2Fg%2F11cr_cxl8d!19sChIJZXR4XyE64zoR8g8PdfLHNTc?authuser=0&hl=en&rclk=1',
    4.6,
    56,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGrSUBjK9RRAxOJj0yOe90FaSddxrEFwFZd6DoeptQfPSFCJXjK4S5rv3JAGQ_36ZfzCrdPNYFY9A1wc85dx7op-Q9OMQVlD43yqOiqtZqvI-FKjcVcXPBxSxNxBeYheCRs3k9v=w138-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Gami Gedara',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4868397,
    80.3654229,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Gami+Gedara/data=!4m7!3m6!1s0x3ae33a1f958d1be5:0x67148fd61139ac58!8m2!3d7.4868397!4d80.3654229!16s%2Fg%2F11q3v29ynd!19sChIJ5RuNlR864zoRWKw5EdaPFGc?authuser=0&hl=en&rclk=1',
    3.5,
    48,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAElgchrZSkwAxZIFagFijMNs8R1am16dipwd4UgewMr2uCP6q9Tkt6GIYHSYJ9sFyhptpSP5IdvEcGLnqWAdrcBlbHBumbEZ2kwKgAB2HOa1uxPFCgfnSWmEsfoWp9_xNTvCRo-=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'C & C කොල කැද',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.482344,
    80.35666,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/C+%26+C+%E0%B6%9A%E0%B7%9C%E0%B6%BD+%E0%B6%9A%E0%B7%90%E0%B6%AF/data=!4m7!3m6!1s0x3ae33b54673f7e43:0x3140803b3277ba01!8m2!3d7.482344!4d80.35666!16s%2Fg%2F11l2d7mpp2!19sChIJQ34_Z1Q74zoRAbp3MjuAQDE?authuser=0&hl=en&rclk=1',
    5,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHQLF6wu9quKQB4GYS85kzFKECT03Z7zCKk_VzaYu467l5so_ot5sKSZ3N3USKUL2P658oJcIywWRQ-Q7pAQ5x46_UZwDJl7sDAG7ppAXD3dQGRoK4mvyN4chsEBhxf7Gsm1c5k=w86-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Pale Food - පැලේ Food',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4951538,
    80.3477369,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Pale+Food+-+%E0%B6%B4%E0%B7%90%E0%B6%BD%E0%B7%9A+Food/data=!4m7!3m6!1s0x3ae33b9b1354c325:0x77c12e5d84742b61!8m2!3d7.4951538!4d80.3477369!16s%2Fg%2F11qzxc4fgw!19sChIJJcNUE5s74zoRYSt0hF0uwXc?authuser=0&hl=en&rclk=1',
    4.2,
    174,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFUyTIfNDEEaNyiZwjJ4OOyIye0_MBbaKGvfGCKR6X9V_OhcEXQcgJ3mcJo0opbRfGOJ7TXu6YU0XOICHvGTFK5B9jJAWBK5bV-dFeY6tMZNIgIbpgrCEsstTENh-u2zB2q4kCLAQ=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'My Burger Restaurant Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4958403,
    80.3798808,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/My+Burger+Restaurant+Kurunegala/data=!4m7!3m6!1s0x3ae339e9bc1059ed:0xd8be77dbde3c0d51!8m2!3d7.4958403!4d80.3798808!16s%2Fg%2F11b6ggvqmp!19sChIJ7VkQvOk54zoRUQ083tt3vtg?authuser=0&hl=en&rclk=1',
    3.9,
    865,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEwK7XJDu9OcA5w4iz6LgT7Wvn5Udg8uTHo62Jss0HqWeev3_Xx12bmmLuhLM0GptIiL8bCftPr5r92IBU0vIDTfC583TvA0Nl1YlEamrdMSR--0ZOb8EdJBHazOeKkqxRyIxtX=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Thambapanni',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.555487,
    80.2993996,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Thambapanni/data=!4m7!3m6!1s0x3ae331000d458d8f:0x242ca32134dc411d!8m2!3d7.555487!4d80.2993996!16s%2Fg%2F11n5576_g8!19sChIJj41FDQAx4zoRHUHcNCGjLCQ?authuser=0&hl=en&rclk=1',
    5,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFiy5EIyfihiq9S2HqQtbMCxwuaydRpYGgnOHtLEeQhIXqFtKMNBY3cFZZ4_slzV-0YREPBzJqlvnrWh683G_od58ydwnD5Z-VC8_bOQbB_mb_G8-zf8k_DDS6xwX2EzD7xobx3Ru-2dNdd=w91-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'GREEN BEANS (Halal friendly Restaurant)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4873283,
    80.358436,
    1000,
    2000,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/GREEN+BEANS+%28Halal+friendly+Restaurant%29/data=!4m7!3m6!1s0x3ae33b0005745add:0x97ee773ec38bcfea!8m2!3d7.4873283!4d80.358436!16s%2Fg%2F11y86vf3xc!19sChIJ3Vp0BQA74zoR6s-Lwz537pc?authuser=0&hl=en&rclk=1',
    3.8,
    57,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHUWYChBGs6ErZ1PLcquMvCsfU_RtS0nPhEXJVrxktPFQe45UsStCpmQpj6PJif6wGwSlNMHs1Ax41R6mk6wrRHr2fRW_her_BliOvkVz3iWI8sijiKzATDmT4Uxd8tl30tiusuwbAXRDSF=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Taco Bell - Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Colombo Road',
    7.4774056,
    80.3570046,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Taco+Bell+-+Kurunegala/data=!4m7!3m6!1s0x3ae33b920a4e06fd:0x9f7f287928e13e55!8m2!3d7.4774056!4d80.3570046!16s%2Fg%2F11k46wl12w!19sChIJ_QZOCpI74zoRVT7hKHkof58?authuser=0&hl=en&rclk=1',
    4,
    366,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGSNGK0a57UgKgLkSphXLkiRsaz6AAvG3TcOtShVbKU2aRFR1vLka-Lk0DsAmVF_KPKoLxKA9LFhmsX2DtG9pASY03xZkyutHbz2ff2_PoCXkBSHYilReuse8wk5TsJ8h2jdup0pw=w164-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'sethmi Restaurant & cream House',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4870519,
    80.3632296,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/sethmi+Restaurant+%26+cream+House/data=!4m7!3m6!1s0x3ae33b097ef71057:0xeaf08ca2e5dc3748!8m2!3d7.4870519!4d80.3632296!16s%2Fg%2F11frt93s9x!19sChIJVxD3fgk74zoRSDfc5aKM8Oo?authuser=0&hl=en&rclk=1',
    5,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHwR8C81y6JT37iKt44mJANH6sIe9Bb4CG1_D28K4tJEHhCgsb_l6i6r_BwcUhuHfmNX6cDTQHHQPE0LOEISRl7d25StD00qs3gJf4UaAiIg3uIWarMbSGkSE-dRAv-gnkLN6LcZg=w189-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Ransilu Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4878818,
    80.3652082,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Ransilu+Restaurant/data=!4m7!3m6!1s0x3ae33a1e22bb2fbd:0x13904ecdbe21559c!8m2!3d7.4878818!4d80.3652082!16s%2Fg%2F11f0_gcwgt!19sChIJvS-7Ih464zoRnFUhvs1OkBM?authuser=0&hl=en&rclk=1',
    3.6,
    28,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGQJ9X6GflMGEHvmB49b_RgUOOu81kHkImuA1rSeflJnF5250SzJcEy6t5UQ_ixuvg168qoRQTldMCk3hyjHCb9feY9GiesMpeFWwfDz6k8cQMvv9MsV736wCg6muy6EumhCR9sDg=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Akee Cafe & Restaurant with Rooms',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4944565,
    80.3735969,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Akee+Cafe+%26+Restaurant+with+Rooms/data=!4m7!3m6!1s0x3ae3399bc4d289e3:0xef43c19e1edd91ca!8m2!3d7.4944565!4d80.3735969!16s%2Fg%2F11q_43ztbt!19sChIJ44nSxJs54zoRypHdHp7BQ-8?authuser=0&hl=en&rclk=1',
    4.1,
    16,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGy5JiYhrK9me4fNaq-qpS-xjWh2dC_8eZIc2gGCqAL2WA1G1tWqk3JhVl2kGCbcye8Wrdqz6tU38WgKpYnX7a9qe37N_WlGxn3uFyzLHDVC79O54AiCsrD6p5Xzgftu-HZVuHJLw=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'miran shanika dayawansa',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4817695,
    80.3608876,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/miran+shanika+dayawansa/data=!4m7!3m6!1s0x3ae33bc665fa0b69:0x15577b26bd9d24b5!8m2!3d7.4817695!4d80.3608876!16s%2Fg%2F11yqlw66l0!19sChIJaQv6ZcY74zoRtSSdvSZ7VxU?authuser=0&hl=en&rclk=1',
    null,
    null,
    'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=V4FvVUQup7c0a_6FShffRQ&cb_client=search.gws-prod.gps&w=80&h=92&yaw=126.16962&pitch=0&thumbfov=100'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Burger Boom',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4772291,
    80.3824276,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Burger+Boom/data=!4m7!3m6!1s0x3ae339386890c92f:0x129fa61515d4e4b9!8m2!3d7.4772291!4d80.3824276!16s%2Fg%2F11nsrv8p_4!19sChIJL8mQaDg54zoRueTUFRWmnxI?authuser=0&hl=en&rclk=1',
    4.5,
    26,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEvKKldlUbl1F7HYqc11WDcM6JSfhPfrw9V4iKMvagN6xjEFqUrrwjE3BlXeoItG8Ug7BaIR5qFDm-4GdoaKTZd-00AjGWSeOQEJkkXwCZ30qUEtAw4nQMYrLX8vKRQRddbnC3g9g=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Golden Hotel & Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4900106,
    80.3643214,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Golden+Hotel+%26+Family+Restaurant/data=!4m7!3m6!1s0x3ae33b53735cc373:0xfd7de4e9e0538354!8m2!3d7.4900106!4d80.3643214!16s%2Fg%2F11strts8lq!19sChIJc8Ncc1M74zoRVINT4Onkff0?authuser=0&hl=en&rclk=1',
    3.8,
    127,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGCEN0O3bDHVOsLjl_vaeZrhcxrezsj8wA8NXbZVuH7kMMwobfZ-wOxotEksnH0hVj2njmYQWETKwFx6VlTu5NpXcsl3_x0_WUqF9SHYPEmJoK5-PMGxEMqsobXEyIMb3NFkqP-hg=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Sri Gayathri Cafe ශ්‍රී ගයාත්‍රී කැෆේ',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4882824,
    80.362306,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Sri+Gayathri+Cafe+%E0%B7%81%E0%B7%8A%E2%80%8D%E0%B6%BB%E0%B7%93+%E0%B6%9C%E0%B6%BA%E0%B7%8F%E0%B6%AD%E0%B7%8A%E2%80%8D%E0%B6%BB%E0%B7%93+%E0%B6%9A%E0%B7%90%E0%B7%86%E0%B7%9A/data=!4m7!3m6!1s0x3ae33bd6e042f64f:0x4f370073748a61f4!8m2!3d7.4882824!4d80.362306!16s%2Fg%2F11f62zh48p!19sChIJT_ZC4NY74zoR9GGKdHMAN08?authuser=0&hl=en&rclk=1',
    4.4,
    34,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHmx4d9CBtu1WYWOdo5LtlTccWjCdL9dIdGj7I9DalB4vo-PNg_R-v41ialsaUKxUfQYn3ZOWn2yf4Q4CW3v7-BAONdd2Z5EGlJ4M2MoDk7XDb82DfQLYtznvtDqE4LY4aaBdKD-46xKLo=w80-h142-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'One Man Kitchen',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4809739,
    80.3689701,
    500,
    1000,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/One+Man+Kitchen/data=!4m7!3m6!1s0x3ae3398babf329a7:0x2dbecd0a41b4593f!8m2!3d7.4809739!4d80.3689701!16s%2Fg%2F1hc262z08!19sChIJpynzq4s54zoRP1m0QQrNvi0?authuser=0&hl=en&rclk=1',
    4.4,
    60,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHzuXNB6ybJQT6gxls7m2_NVJuPIjGko2sJgL79Uibd6d_V6TuieXQiH5yxm1Np_hX2GS8k89gdOyTEhziEns7YcZf6iQQYg7eCKztOvLusR77uCBtg4YpKvyS754DCHB6-BXCHUQ=w92-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Sahas Uyana Achcharu Kurunegala lake',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4919459,
    80.3606618,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Sahas+Uyana+Achcharu+Kurunegala+lake/data=!4m7!3m6!1s0x3ae33b006860bfa7:0x54908afa93834d0c!8m2!3d7.4919459!4d80.3606618!16s%2Fg%2F11xrvs9ydt!19sChIJp79gaAA74zoRDE2Dk_qKkFQ?authuser=0&hl=en&rclk=1',
    4.8,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHRNaIO6WuAWrgDf2Gk9DswytxeaXhs3UOWLH0DCTuPjwlXxIXCcvjKVP2iPVdkXgmtNtW-5_ixbTgVz2mleFZcs3mt-HUPX4lH4vEfpthGPjQQu-kCebfVdETE_8I330BjKwJBMju-Sco=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Bee Kitchen Thorayaya',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5137619,
    80.4177051,
    1,
    4000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Bee+Kitchen+Thorayaya/data=!4m7!3m6!1s0x3ae337e8edb56ac3:0xf4469f1eb91bdaeb!8m2!3d7.5137619!4d80.4177051!16s%2Fg%2F11s7ktwt_j!19sChIJw2q17eg34zoR69obuR6fRvQ?authuser=0&hl=en&rclk=1',
    4,
    379,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE5ZBnaWwkPQoOEVqIQt2uiK7qJwcPM6UlZ4mYTvg5E8gxBx_BZk65EgEWyTo2Yko2mkJrc-lauq0eFwDpoqK0n-pbOEQHnWeGszJOM-Nm0pnJwHVyGP4cqUxqv6FavGnK9DRjb=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Pizza Hut - Kurunegala 1',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '385 3 වන පටුමග',
    7.4733446,
    80.3528978,
    1000,
    5000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Pizza+Hut+-+Kurunegala+1/data=!4m7!3m6!1s0x3ae33a3a9cbfe7db:0xcae30774c0c3cdb3!8m2!3d7.4733446!4d80.3528978!16s%2Fg%2F11csqfl2hk!19sChIJ2-e_nDo64zoRs83DwHQH48o?authuser=0&hl=en&rclk=1',
    4.3,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG7U1UQOCwk2Wj-G10slfzlwhQbqVX6PC0qygKIemPnYXqDchz0tPsmA8b-vA9VI46iHtmjwIDnpPqrmr8ImrB4VIK7V3ng3AmWmNj_dQSH9otbbkVHgm1S269gS-dvWO41vvDE=w80-h142-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'GUSTO',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4950876,
    80.3571644,
    1000,
    7000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/GUSTO/data=!4m7!3m6!1s0x3ae33bd7bd25e1ff:0xb2909c03323e2310!8m2!3d7.4950876!4d80.3571644!16s%2Fg%2F11ww8fz3__!19sChIJ_-Elvdc74zoRECM-MgOckLI?authuser=0&hl=en&rclk=1',
    3.8,
    16,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFy1XxbNzuz1fpTGkndEZ7w8fBiybTuLU6xblZm1JuTXuJAnInEMy0MsxlFdOgh1tweeVq6RUXWokg-IsVyQlJISDXoBn9uY_rE5QWUD-RaRQvkLA1mGN5-ig2q-S1mYb8DNYjK=w80-h111-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'New Royal Hotel And Bakers',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4822771,
    80.3610708,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/New+Royal+Hotel+And+Bakers/data=!4m7!3m6!1s0x3ae33a218e044a65:0xc56dfebe06ab108f!8m2!3d7.4822771!4d80.3610708!16s%2Fg%2F11gbzbn874!19sChIJZUoEjiE64zoRjxCrBr7-bcU?authuser=0&hl=en&rclk=1',
    3.3,
    27,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEiZvWaWz6EUfx2Uqx5juRcwwdM_aklgCY6UAB3HxOa5dgeNiUJw8v2rebp28GcyTQouhtO-00fG6JzeZ8VRKlsED4ORIpiMY3cN_muBCkpILGTNI1y0i-_j1kjvUerutKdWFDs=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Galley ගැලි',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5101084,
    80.3408014,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Galley+%E0%B6%9C%E0%B7%90%E0%B6%BD%E0%B7%92/data=!4m7!3m6!1s0x3ae33130eefd1f1b:0xa1d199eae2182876!8m2!3d7.5101084!4d80.3408014!16s%2Fg%2F11qq2_h_y4!19sChIJGx_97jAx4zoRdigY4uqZ0aE?authuser=0&hl=en&rclk=1',
    4.2,
    121,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE093ozOyd8BTybGzRbwh-ykEex3ftn_wi2rDjiTjHc09GIFxlj6h6UzcuaXRUhFJlPJUEUVM_B9RlgKOnwKSdOx1JEJVU9fc77pi-r4K7Ni0FrW5UmCux8s5o-p75Yap_rgfv3=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Raja Katagesma Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.498532,
    80.3852013,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Raja+Katagesma+Restaurant/data=!4m7!3m6!1s0x3ae339fea6b3a74d:0x4b13f281e2b5283d!8m2!3d7.498532!4d80.3852013!16s%2Fg%2F11s85nsdb1!19sChIJTaezpv454zoRPSi14oHyE0s?authuser=0&hl=en&rclk=1',
    5,
    7,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGcPc-oMbwjNPJLw_kHXFUeoHKz46swxIHnOId7HXcUVFRn9vXmdhO6N_D5IxU94r3Mrzo4Y4FprwL0YE1iXhnb0GywfYpJkiMHKYd9yPg7EnYMci-kLIDwPZM4BEI-SckoDQ=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Yummy Yard',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4834959,
    80.3675977,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Yummy+Yard/data=!4m7!3m6!1s0x3ae3393dd3ee8a61:0x9a6f65b0d7ffe77d!8m2!3d7.4834959!4d80.3675977!16s%2Fg%2F11shpd2n7t!19sChIJYYru0z054zoRfef_17Blb5o?authuser=0&hl=en&rclk=1',
    3.7,
    83,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAERfy7FKtAFaJ8PyhnFQvTCoY2RY_ufcfp6aoT1ZBCffDBrnqXOGYY9aeBcRFC0uAwo29malkKJbeiRyzf3QhoyHj3Nhx3UDD5fJsBK1ivKZWdJdRNGyAV8uYqJYSySGqv6ylIkz2c6Bug=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Kings Kurunegala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4819325,
    80.3520204,
    1500,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Kings+Kurunegala/data=!4m7!3m6!1s0x3ae33b3581cd01d9:0x9a772e8cf53e97d3!8m2!3d7.4819325!4d80.3520204!16s%2Fg%2F11tx_rkp21!19sChIJ2QHNgTU74zoR05c-9Ywud5o?authuser=0&hl=en&rclk=1',
    4.1,
    22,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFl6HOvs26UNbs2We9xYkJToukHwuOTcIGU-AIAU5zN_GEdJYpc_h68Ul5JtMeDzVqfaCa9uub9Jj4pe8EnMry4ngWWkobnqZBdBYzs-5WAr_-Dr4GyVuB3w5LNvu6jISKDcH-YVZppPtKM=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Rahumaniya Chinese restaurant (halal)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '49 Perakumba St',
    7.4891707,
    80.3638575,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Rahumaniya+Chinese+restaurant+%28halal%29/data=!4m7!3m6!1s0x3ae33a1dd825f723:0x51772a3a8ffc18c8!8m2!3d7.4891707!4d80.3638575!16s%2Fg%2F12hstvcs5!19sChIJI_cl2B064zoRyBj8jzoqd1E?authuser=0&hl=en&rclk=1',
    3.5,
    286,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFB9W_CNd3foa0gLyr-GOcnbjybm4x0q72z9RJKlhzWhjiafVFFth_hntya9ine4BZsIS2tK-y1jLND-HXPgU4kXAnY9S-s60zP7HmYCrJ5gqGyd07uDDAnaiVqqYRP7W40M7BM=w124-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Owinrose Restuarent',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4825772,
    80.353099,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Owinrose+Restuarent/data=!4m7!3m6!1s0x3ae33a3d6be79017:0x64cead10b89fefda!8m2!3d7.4825772!4d80.353099!16s%2Fg%2F11hbpdhtzs!19sChIJF5Dnaz064zoR2u-fuBCtzmQ?authuser=0&hl=en&rclk=1',
    3.2,
    10,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEWLzp8MGjwx-2RKbGUODrPBEDuo-_1XZtRTrdXAdnQ9cUTzAUnDbU9BnjtaLO5VYFmYyGXWU3FIjp6o0QEcAqnw3SW-edV9k2IqMcvn20gOKm7-J9CUar-yi4y3WfKD8JtmMk=w80-h122-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Mathara Bath Kade & Bakers',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'F9Q6+HWR, Main Street',
    7.4889949,
    80.3622626,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Mathara+Bath+Kade+%26+Bakers/data=!4m7!3m6!1s0x3ae33a1e9cdc010d:0x2a1b7052ababa739!8m2!3d7.4889949!4d80.3622626!16s%2Fg%2F1tfcx713!19sChIJDQHcnB464zoROaerq1JwGyo?authuser=0&hl=en&rclk=1',
    3.9,
    409,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFrYMoxpNO9zzH4lLQd0I51B87IUIPwIibNPe5v7qMRa_Bu6iNRIu1bbkDBFT_Nh8cxtmpgedAorm-PkIwboSSP_IgTEYdenyKFPckZzpG8kYXckyoeQBlY83BzPkjT6l1zQAo=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'NJ Caterers',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '79 Perera Graden Rd',
    7.4840458,
    80.3635641,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/NJ+Caterers/data=!4m7!3m6!1s0x3ae33a1f87768481:0x94c403c54814308f!8m2!3d7.4840458!4d80.3635641!16s%2Fg%2F1hg4ylcjc!19sChIJgYR2hx864zoRjzAUSMUDxJQ?authuser=0&hl=en&rclk=1',
    3.9,
    147,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF_v_drBgfqyo1WNl_TexFf3LKMevZHW1audW_MW---WbCDaxC3LbbEU9zpzUJdASR4skZ1tiFzD67HQLiOcHKJ0wq9-eazKJJrD4ng0_XUaY0iWl3Qr8Quk0_QrKTkqM3FYciq=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Cottage Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.483712,
    80.3764524,
    500,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Cottage+Restaurant/data=!4m7!3m6!1s0x3ae339992f285ed7:0x12982c262649d22!8m2!3d7.483712!4d80.3764524!16s%2Fg%2F11sjz55lv1!19sChIJ114oL5k54zoRIp1kYsKCKQE?authuser=0&hl=en&rclk=1',
    4,
    22,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGszwZjeL2eP4w63LtHS8ovoiUkvVRmDt4QOjtSvQ9ynwKXaEu60ywCygFZfSARUjEGa8eOtqlpCOBwjAUj1a3d7CWDfl1vvoDAwznYBRR7uvYlXoNDe5ZUIaYew_6Iamm-7kUd=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Canteen',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.478314,
    80.3598931,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Canteen/data=!4m7!3m6!1s0x3ae33bad0e7a9a4b:0x16c6b6d43bd999ba!8m2!3d7.478314!4d80.3598931!16s%2Fg%2F11qpv1bl0b!19sChIJS5p6Dq074zoRupnZO9S2xhY?authuser=0&hl=en&rclk=1',
    5,
    3,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF0zsugbqMkG9WtL8fQnNdJcRHrun9TIuGopWfD7b73ZzHHNZnNz22Je75ysq5-iBmOkdox97MvY8OfScgdyA3oDSJEvRXE_1nky-uMGMV6--RJfeEAhpsFkfr6nZFyZgjSTJv8mw=w80-h142-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Semini Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5065325,
    80.3431714,
    1,
    500,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Semini+Family+Restaurant/data=!4m7!3m6!1s0x3ae331fa3893ee41:0x42bf9907dbf3d7aa!8m2!3d7.5065325!4d80.3431714!16s%2Fg%2F11sbhljz27!19sChIJQe6TOPox4zoRqtfz2weZv0I?authuser=0&hl=en&rclk=1',
    4.5,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAESurrFDQQrsFghf8Melztu1IDzQvPwU-W6SquPnt4gTR4Cpbz7hnnbHc1J4kbOlHpB99seCBuPyHQ4EKyzdXZFXDI-VYg0k6nP0WK8Fi4gQwWJKIDJmu6XVoy22PKDvFxDSzky=w92-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'New Melbourne Chinese Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '38, Kandy Road, Suratissa Mawatha',
    7.486679,
    80.3660822,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/New+Melbourne+Chinese+Restaurant/data=!4m7!3m6!1s0x3ae339f580311059:0x242e07f557b285bf!8m2!3d7.486679!4d80.3660822!16s%2Fg%2F1pp2tzndv!19sChIJWRAxgPU54zoRv4WyV_UHLiQ?authuser=0&hl=en&rclk=1',
    3.7,
    45,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFTO25U5hAGZ8kkPW-vqiA8hVBviRJHwmVRfexuFwjD4_XZ01m6W_XJGneDq10TiKFjC9jVN8-CyFc6IaNSSwZgFmwP5pHDaB7C5OjrivOE3F65f3XHBoOCb4LrLwcal5B0NX5y3g=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Soduru Bojunhala',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4864692,
    80.3518402,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Soduru+Bojunhala/data=!4m7!3m6!1s0x3ae33bfc40e39057:0xec0dd296ad595aba!8m2!3d7.4864692!4d80.3518402!16s%2Fg%2F11v4j7kpds!19sChIJV5DjQPw74zoRulpZrZbSDew?authuser=0&hl=en&rclk=1',
    4.2,
    6,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFBDA2SnxjgdbGSk4tHBpCM9aunJvjE6--KmutiuSTsVK1OmwtLeQ7hyO3lAxedCEDRx2BMvFHQThzRR8wbYbYeGvfjrLciE2cTn5MH0l0Dv9uibuDNyZ_ZF8yvJwraFpWmaxqY=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Ranthaliya Rest House Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4913715,
    80.3614229,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Ranthaliya+Rest+House+Restaurant/data=!4m7!3m6!1s0x3ae33b00680e2cab:0xca76f16ff44e5d23!8m2!3d7.4913715!4d80.3614229!16s%2Fg%2F11zjdzrr1k!19sChIJqywOaAA74zoRI11O9G_xdso?authuser=0&hl=en&rclk=1',
    5,
    1,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAELjF3i5bd4XgC1-z8sx91p1rK10iF9g2VsrmWOugm1m-_bQQWhAJvqk5524b4RfhO4Nxuu6CQnAq4MtcfiTCFa_DuYPhLcOZtqDrbA75KOAwglrbS5TD6bY56TCBE2XFrM1zimg6dn9mgD=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Pizza Hut - Kurunegala 2',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    '252 Katugastota - Kurunegala - Puttalam Hwy',
    7.4918083,
    80.3567783,
    1,
    4000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Pizza+Hut+-+Kurunegala+2/data=!4m7!3m6!1s0x3ae33b356e2335c1:0x4fb46d73277e7b09!8m2!3d7.4918083!4d80.3567783!16s%2Fg%2F11ptp5bwkw!19sChIJwTUjbjU74zoRCXt-J3NttE8?authuser=0&hl=en&rclk=1',
    4.7,
    695,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGvrk1m-ZfoPvxI6Uy0jyBxSJsmwY_2dDR2MnYB0cbHcM8hVzcCU0Up-C5tPVGWJfIXz_Sqtyk5aT3glOKm9Z8O6WZgY4X_Ksx-1FznynQ11-vWBhkDkPmC3r2R3YhpIE3bmA3Z=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Singhe Bakers & Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5012039,
    80.3478482,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Singhe+Bakers+%26+Restaurant/data=!4m7!3m6!1s0x3ae33ba005c77d11:0xfc95ff5645885381!8m2!3d7.5012039!4d80.3478482!16s%2Fg%2F11r9t9rh40!19sChIJEX3HBaA74zoRgVOIRVb_lfw?authuser=0&hl=en&rclk=1',
    4.4,
    388,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEDknjbmgiUR9lNVu_12DXrgVWDEkoF1HDWVakWZWqhD2wDkmv3acbANGUrgKoBFR6D2JP7QohOBp42deyJ8ihDEzeAWPhg7J4HQL77zoB4C75aqmj9AHhgA-0siBdNFFOdXDQ=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Jaya Lanka Rest',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4967056,
    80.3472594,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Jaya+Lanka+Rest/data=!4m7!3m6!1s0x3ae33a0db25bdf15:0x2c332014a2be1c13!8m2!3d7.4967056!4d80.3472594!16s%2Fg%2F11gdkpcvr0!19sChIJFd9bsg064zoRExy-ohQgMyw?authuser=0&hl=en&rclk=1',
    3.9,
    110,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGkBg3QTRNbpatvIRoSwvK2ooKD6K1J7JsykOu_-eQG0X7DEv7qg6ke7QCUFuT0z692K9694AsQPIIEVxVflbeVnaQZ2vltaycddHXSOejtTFNMUGHouwglhdHCsll0AN21X2JF479C4dCg=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'The One Cafe',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.48931,
    80.3646445,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/The+One+Cafe/data=!4m7!3m6!1s0x3ae33bbecf4806f5:0xd165a271bb446a94!8m2!3d7.48931!4d80.3646445!16s%2Fg%2F11rpzbmx4z!19sChIJ9QZIz7474zoRlGpEu3GiZdE?authuser=0&hl=en&rclk=1',
    5,
    1,
    'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=KH-m-7gPdMqxzn0EX7PtcA&cb_client=search.gws-prod.gps&w=80&h=92&yaw=205.96985&pitch=0&thumbfov=100'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Spicy Cottage',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4873277,
    80.3584452,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Spicy+Cottage/data=!4m7!3m6!1s0x3ae33b6fbf6b4fc9:0x9ccaf45a2b02191b!8m2!3d7.4873277!4d80.3584452!16s%2Fg%2F11pf47xjpt!19sChIJyU9rv2874zoRGxkCK1r0ypw?authuser=0&hl=en&rclk=1',
    4,
    7,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEKR-89tcMp-Vl_RHzVKMbhnOT6WW-jBdMjC1pAmAN4mE6NmKtnKrdOdwp6qIcZkCSsWbSuayUXzF5ZI3ufEIjvRi36xEUEDYGY-BE-sQLcEhfGse6qQsn3BwQAMfK8Iqy-7BRK=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'P&S (Perera & Sons) - Kandy Road 2',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4866103,
    80.3663974,
    1000,
    2000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/P%26S+%28Perera+%26+Sons%29+-+Kandy+Road+2/data=!4m7!3m6!1s0x3ae339b687293b69:0xd91f87630e9e913a!8m2!3d7.4866103!4d80.3663974!16s%2Fg%2F11fmvkh3np!19sChIJaTsph7Y54zoROpGeDmOHH9k?authuser=0&hl=en&rclk=1',
    4.3,
    133,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHg63z--Y0JHCugCfrRRtL5y51UQzVsYZt1UJ_5yBugxBKKAnIo5vLLyDgglNmZePNuPebblzFaJ8IaTYHMwwfeEQ6I7B2Rlq3LsIS4tw4hOe70DEx76l1cA112H2AtgFz6S2pt=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'The Food Town',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.5199557,
    80.3320504,
    1000,
    1500,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/The+Food+Town/data=!4m7!3m6!1s0x3ae3317fade1febb:0xe0eb53ac7b96b2ea!8m2!3d7.5199557!4d80.3320504!16s%2Fg%2F11kqc1sx5b!19sChIJu_7hrX8x4zoR6rKWe6xT6-A?authuser=0&hl=en&rclk=1',
    3.9,
    42,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpMCklSnlUlOnxIVXyFiuxwm1OEgUn-93_lP5o2DBOGmmIpo9BsttVAplbforoFTwPTFrcQ6zgcxvmW1EDnY9g0wJhWlKtEHghf3_LjiQxDl4CAowtdt0oYftA4jR9udio-L5tMw=w95-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Hotel Forida',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4906081,
    80.3648799,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Hotel+Forida/data=!4m7!3m6!1s0x3ae33a1d933cfd35:0xaa127d1afe2b3981!8m2!3d7.4906081!4d80.3648799!16s%2Fg%2F11c1q450tn!19sChIJNf08kx064zoRgTkr_hp9Eqo?authuser=0&hl=en&rclk=1',
    4,
    48,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGP9hVRnFdlZ-d_31vsuZAIubqKZ13jmAQEUbRsAK1d5jR_OycR5F4Ugj0TFR14pczdUimfYB6IJ1OXl8HuU5EX9cUNx7PMVTfupNP0CutHNNhSL96Ii5qHlUdgob_KPIOtHA6n4A=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Aadharshan',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4804582,
    80.3578589,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Aadharshan/data=!4m7!3m6!1s0x3ae33b002f943b09:0xc1b8e014623ed3ce!8m2!3d7.4804582!4d80.3578589!16s%2Fg%2F11xdk61gk2!19sChIJCTuULwA74zoRztM-YhTguME?authuser=0&hl=en&rclk=1',
    null,
    null,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEo2sl2XT6ssPYGJbrGWsexAsVSQITvaEfKNrFLQrisPhuRXzktopfxOooW6JZa-7mgVZILAN3F2qkSMckAjZA7-hlSKwpNsGnZApaFsVJ-blmXc4PYlhT1cP3AgMdbukUuK_ndLpCitV-W=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Treat Cafe Family Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4776911,
    80.3829012,
    500,
    3000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Treat+Cafe+Family+Restaurant/data=!4m7!3m6!1s0x3ae339b06fd9f661:0xa7ab954365307871!8m2!3d7.4776911!4d80.3829012!16s%2Fg%2F11h11ksrn6!19sChIJYfbZb7A54zoRcXgwZUOVq6c?authuser=0&hl=en&rclk=1',
    4.2,
    123,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE2mNhrbagMGlCRuzCQcV0G9Fu3Om6x69vL0mvujWGqujJRpgj3bcTJI1Bc5yLwyx4X_btVvOSLyM3p-LA8x_2VnQA0vupggx3vWjSVRPXjAS3Ya7mhn-WJRQOxfQ-0br1hTusf9A=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'MAX''S Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Chain eatery for Filipino fried chicken',
    7.4993783,
    80.3490073,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/MAX%27S+Restaurant/data=!4m7!3m6!1s0x3ae33b00516f6853:0x9b3d5787fdb366b5!8m2!3d7.4993783!4d80.3490073!16s%2Fg%2F11w25lmwf0!19sChIJU2hvUQA74zoRtWaz_YdXPZs?authuser=0&hl=en&rclk=1',
    5,
    2,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHmyNcTCN8JTpWw2tDqDeq_axfSEGI0-topg-sX-bJC1vbI5IwkqZ7658eOpntFHVJtd57P48CmU1dBXdOkgZZMF1sbKGRbVw9YbtoZnz9Tx4p53896fim8ZI1g4cvjb4keBRwK_g=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'CM Bakers And Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4704555,
    80.3490702,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/CM+Bakers+And+Restaurant/data=!4m7!3m6!1s0x3ae33bec371e06d5:0x970abfd9c1e9ada4!8m2!3d7.4704555!4d80.3490702!16s%2Fg%2F11pvhn7zzl!19sChIJ1QYeN-w74zoRpK3pwdm_Cpc?authuser=0&hl=en&rclk=1',
    3.7,
    54,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'LISARI''S CAKES (KURUNEGALA)',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4788527,
    80.3518708,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/LISARI%27S+CAKES+%28KURUNEGALA%29/data=!4m7!3m6!1s0x3ae33b214e57f415:0x26e864fa27e5e09c!8m2!3d7.4788527!4d80.3518708!16s%2Fg%2F11h54gj_qq!19sChIJFfRXTiE74zoRnODlJ_pk6CY?authuser=0&hl=en&rclk=1',
    4.8,
    22,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Little Indian Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4880602,
    80.3632963,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Little+Indian+Restaurant/data=!4m7!3m6!1s0x3ae33b0063148689:0xa2464ac6622ea15!8m2!3d7.4880602!4d80.3632963!16s%2Fg%2F11y3p0j_wh!19sChIJiYYUYwA74zoRFeoiZqxkJAo?authuser=0&hl=en&rclk=1',
    4.5,
    2,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Semini Hotel & Reception',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4764493,
    80.369754,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Semini+Hotel+%26+Reception/data=!4m7!3m6!1s0x3ae3398911d7ff8b:0x1c387dcbbda766ce!8m2!3d7.4764493!4d80.369754!16s%2Fg%2F11cp5ftgfr!19sChIJi__XEYk54zoRzmanvct9OBw?authuser=0&hl=en&rclk=1',
    3.8,
    358,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Soba Lanka Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Badagamuwa',
    7.5007311,
    80.3936873,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Soba+Lanka+Restaurant/data=!4m7!3m6!1s0x3ae339992ebb07db:0x50862a8241f9e3d7!8m2!3d7.5007311!4d80.3936873!16s%2Fg%2F11tdd6ms03!19sChIJ2we7Lpk54zoR1-P5QYIqhlA?authuser=0&hl=en&rclk=1',
    3.6,
    304,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'No Name Cafeteria',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4817023,
    80.3686034,
    500,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/No+Name+Cafeteria/data=!4m7!3m6!1s0x3ae33bfa7398eb37:0x17a403fdd27685af!8m2!3d7.4817023!4d80.3686034!16s%2Fg%2F11kgwvsb2n!19sChIJN-uYc_o74zoRr4V20v0DpBc?authuser=0&hl=en&rclk=1',
    4.5,
    27,
    null
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Kulla cafe',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4868636,
    80.3634104,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Kulla+cafe/data=!4m7!3m6!1s0x3ae33b27525d6353:0x2e44314e38376bf2!8m2!3d7.4868636!4d80.3634104!16s%2Fg%2F11k58nsgxr!19sChIJU2NdUic74zoR8ms3OE4xRC4?authuser=0&hl=en&rclk=1',
    5,
    3,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEVISfeMCcHztBaK8ByLf8zU58eOXb71YeX6m_rPzKsGF3fwFbeMN-7SzE1Ar2rJLFs6LGXPY30xnX_XcAtx-AEbXo3ijClOL45anSxaD1rlMVHlA1xzpjBjLmtVBGDeECl0Bxf=w80-h106-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Food Stores',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4920321,
    80.3606178,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Food+Stores/data=!4m7!3m6!1s0x3ae33b006ea3f669:0xd89d23ff4f0296ac!8m2!3d7.4920321!4d80.3606178!16s%2Fg%2F11vqk_89lp!19sChIJafajbgA74zoRrJYCT_8jndg?authuser=0&hl=en&rclk=1',
    4.6,
    5,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGEYxriAvXaDgNwUZrM4bwJAfAtziZWcDt6claikUeGfttGx60tU5Qhtc2vHpL6GnsDfT_nCRymxV8rVyco8Mv7kGgXg4atJFUG2mge0Zx9XKSsO2CJxAhvqEGU_IRodkdPXhA=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Wholee Ice Cream',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'Dambulla Rd, Pollaththapitiya',
    7.496013,
    80.3718513,
    1,
    1000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Wholee+Ice+Cream/data=!4m7!3m6!1s0x3ae339004faec95b:0x763fe99ae8552aaf!8m2!3d7.496013!4d80.3718513!16s%2Fg%2F11w1m0hdfg!19sChIJW8muTwA54zoRrypV6JrpP3Y?authuser=0&hl=en&rclk=1',
    4.5,
    70,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEqkcBdJcdHSaMPHpXvhE8ddGMeXhjaunEr13YzzfvNHdMVNvBj2GTMKpO-sapJgG1LmoLeUYSn-yQdSUqHkNQAaCAA0K7ELHn1s3LEGPcLp_rjp5GzpW88mPoyOvbjC2ELx2DeSQ=w163-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Vijitha cafe',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4812364,
    80.3513693,
    null,
    null,
    'closed',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Vijitha+cafe/data=!4m7!3m6!1s0x3ae33b0054c45691:0xe124d5016dce3e63!8m2!3d7.4812364!4d80.3513693!16s%2Fg%2F11whhhvm54!19sChIJkVbEVAA74zoRYz7ObQHVJOE?authuser=0&hl=en&rclk=1',
    5,
    1,
    'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=2GNtXm0iyIoqrwXBFuaCLA&cb_client=search.gws-prod.gps&w=80&h=92&yaw=306.1537&pitch=0&thumbfov=100'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'RIO Restaurant',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    null,
    7.4884206,
    80.3634512,
    null,
    null,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/RIO+Restaurant/data=!4m7!3m6!1s0x3ae33a1e64f225c1:0x783be8d8a9175761!8m2!3d7.4884206!4d80.3634512!16s%2Fg%2F11b7q0p4d1!19sChIJwSXyZB464zoRYVcXqdjoO3g?authuser=0&hl=en&rclk=1',
    3.8,
    4,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFT5AMQKuM9_t7JFoe7-pypIjQkISxmdeLKHRwgaqUuhA77Vd8U2y6ZVHI8kyHHeUqgvRwFkeMCjNmlT78qcjApbmFIDJsMWA9v5fYygnwXjhuZy8cWWTXds__42ORXLehCSysVUeH5Yrh0=w122-h92-k-no'
);

insert into public.shops (name, category_id, district, address, lat, lng, price_range_min, price_range_max, status, hours, phone, description, is_active, google_location_url, google_rating, google_review_count, cover_image_url) values (
    'Pizza Hut - Kurunegala 3',
    (select id from public.categories where slug = 'food-cafes'),
    'Kurunegala',
    'F9GG+PX9',
    7.4769159,
    80.3775275,
    1000,
    6000,
    'open',
    null,
    null,
    null,
    true,
    'https://www.google.com/maps/place/Pizza+Hut+-+Kurunegala+3/data=!4m7!3m6!1s0x3ae339720f9d0c13:0x81710f2ac832d718!8m2!3d7.4769159!4d80.3775275!16s%2Fg%2F11tdrc3mjw!19sChIJEwydD3I54zoRGNcyyCoPcYE?authuser=0&hl=en&rclk=1',
    4.6,
    502,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG76HXCHFRk28GFYB8CDk3Nib72Fyq7fGIVObuUwCWqJnN2HhckR9n1cPUjSS0LZV2XdPlamqwaSQEkJfJTk9DdCoBwnawCshxIgzIxeGHhVOHxaPrVUU6K02oUmrvG9PVP1qmUpQ=w80-h100-k-no'
);
