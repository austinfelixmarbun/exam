-- ============================================================
-- SEED DATA untuk ShowroomDb (PostgreSQL)
-- Jalankan setelah migration berhasil dieksekusi.
-- Urutan insert mengikuti dependency: master dulu, lalu transaksi.
-- ============================================================

-- ============================================================
-- 1. ACCESSORIES (Master Aksesoris)
-- ============================================================
INSERT INTO accessories (accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('Spoiler Belakang', 'Exterior', 3500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Body Kit Full', 'Exterior', 12000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Kaca Film V-KOOL', 'Exterior', 4500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Roof Rack Aluminium', 'Exterior', 2800000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Velg Racing 18"', 'Exterior', 8500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Jok Kulit Premium', 'Interior', 7500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Karpet Dasar 3D', 'Interior', 1200000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Dashcam Dual Camera', 'Interior', 2500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Ambient Lighting LED', 'Interior', 3000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Head Unit Android 10"', 'Audio', 6500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Subwoofer 12" JBL', 'Audio', 4000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Speaker Split Pioneer', 'Audio', 2200000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Power Amplifier 4CH', 'Audio', 3500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Tweeter Focal', 'Audio', 1800000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Peredam Suara Full', 'Audio', 5000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 2. SALES_PERSON (Master Salesperson)
-- ============================================================
INSERT INTO sales_person (sales_code, sales_name, position, phone_number, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('SLS-001', 'Ahmad Fauzi', 'Sales Executive', '081234567890', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('SLS-002', 'Rina Wulandari', 'Senior Sales', '081234567891', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('SLS-003', 'Budi Santoso', 'Sales Executive', '081234567892', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('SLS-004', 'Dewi Kartika', 'Sales Supervisor', '081234567893', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('SLS-005', 'Hendra Wijaya', 'Sales Executive', '081234567894', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 3. PROMO_DISCOUNT (Master Promo)
-- ============================================================
INSERT INTO promo_discount (descr, deduction_amt, is_active, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('Promo Kemerdekaan Agustus 2026', 5000000.00, true, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Diskon Akhir Tahun 2026', 10000000.00, true, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Cashback Lebaran', 7500000.00, false, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Promo First Buyer', 3000000.00, true, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Trade-In Bonus', 15000000.00, true, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 4. BUYER (Data Pembeli)
-- ============================================================
INSERT INTO buyer (full_name, id_no, birth_dt, gender, phone_number, email, address, city, zip_code, occupation, income, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('Joko Widodo Pratama', '3201011234560001', '1985-03-15', 'Male', '081311112222', 'joko.pratama@email.com', 'Jl. Merdeka No. 10', 'Jakarta', '10110', 'Wiraswasta', 25000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Siti Nurhaliza', '3201011234560002', '1990-07-22', 'Female', '081322223333', 'siti.nurhaliza@email.com', 'Jl. Sudirman No. 55', 'Bandung', '40111', 'PNS', 15000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Rudi Hermawan', '3201011234560003', '1982-11-08', 'Male', '081333334444', 'rudi.hermawan@email.com', 'Jl. Gatot Subroto No. 3', 'Surabaya', '60111', 'Karyawan Swasta', 20000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Anisa Rahma', '3201011234560004', '1995-01-30', 'Female', '081344445555', 'anisa.rahma@email.com', 'Jl. Diponegoro No. 78', 'Semarang', '50131', 'Dokter', 35000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Farhan Malik', '3201011234560005', '1988-09-12', 'Male', '081355556666', 'farhan.malik@email.com', 'Jl. Ahmad Yani No. 21', 'Yogyakarta', '55211', 'Pengacara', 30000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Linda Permata', '3201011234560006', '1992-04-18', 'Female', '081366667777', 'linda.permata@email.com', 'Jl. Pahlawan No. 9', 'Medan', '20111', 'Akuntan', 18000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Agus Setiawan', '3201011234560007', '1978-12-05', 'Male', '081377778888', 'agus.setiawan@email.com', 'Jl. Veteran No. 45', 'Makassar', '90111', 'Pengusaha', 50000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Putri Ayu Lestari', '3201011234560008', '1993-06-25', 'Female', '081388889999', 'putri.lestari@email.com', 'Jl. Asia Afrika No. 12', 'Bandung', '40112', 'Arsitek', 22000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Denny Kurniawan', '3201011234560009', '1986-08-14', 'Male', '081399990000', 'denny.kurniawan@email.com', 'Jl. Thamrin No. 88', 'Jakarta', '10230', 'IT Manager', 28000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('Maya Sari', '3201011234560010', '1991-02-28', 'Female', '081300001111', 'maya.sari@email.com', 'Jl. Pemuda No. 33', 'Denpasar', '80111', 'Dosen', 16000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 5. VEHICLE (Master Kendaraan)
-- ============================================================
INSERT INTO vehicle (vehicle_code, chassis_number, brand, model, year, color, base_price, otr_price, status, engine, tank_capacity, passenger_capacity, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('VHC-001', 'MHKA1BA2J0K000001', 'Toyota', 'Avanza 1.5 G', 2026, 'Silver Metallic', 230000000.00, 237500000.00, 'Available', '1.5L 4-Cylinder', '43 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-002', 'MHKA1BA2J0K000002', 'Toyota', 'Innova Zenix V', 2026, 'Attitude Black', 420000000.00, 432000000.00, 'Available', '2.0L HEV', '55 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-003', 'MHFB1BE3J0K000003', 'Honda', 'HR-V 1.5 SE', 2026, 'Platinum White', 380000000.00, 391200000.00, 'Available', '1.5L i-VTEC', '40 Liter', '5', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-004', 'MHFB1BE3J0K000004', 'Honda', 'Civic RS', 2025, 'Ignite Red', 560000000.00, 575000000.00, 'Available', '1.5L VTEC Turbo', '47 Liter', '5', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-005', 'MHMFE83J0K0000005', 'Mitsubishi', 'Xpander Ultimate', 2026, 'Quartz White', 300000000.00, 310500000.00, 'Available', '1.5L MIVEC', '45 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-006', 'MHMFE83J0K0000006', 'Mitsubishi', 'Pajero Sport Dakar', 2025, 'Jet Black Mica', 580000000.00, 598000000.00, 'Sold', '2.4L DI-D', '68 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-007', 'MHRZH810K00000007', 'Suzuki', 'Ertiga GX', 2026, 'Burgundy Red', 250000000.00, 258000000.00, 'Available', '1.5L K15B', '45 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-008', 'MHRZH810K00000008', 'Suzuki', 'XL7 Alpha', 2026, 'Celestial Blue', 295000000.00, 305200000.00, 'Reserved', '1.5L K15B', '45 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-009', 'KNDJB721007000009', 'Hyundai', 'Creta Prime', 2026, 'Atlas White', 340000000.00, 351000000.00, 'Available', '1.5L Smartstream', '50 Liter', '5', 'SYSTEM', 'SYSTEM', NOW(), NOW()),
('VHC-010', 'KNDJB721007000010', 'Hyundai', 'Stargazer Prime', 2026, 'Biophilic Blue', 290000000.00, 299500000.00, 'Available', '1.5L Smartstream', '45 Liter', '7', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 6. VEHICLE_ACCESSORIES (Aksesoris per Kendaraan)
--    Harga di-snapshot dari master Accessories saat dipasang.
-- ============================================================
-- Vehicle VHC-001 (Toyota Avanza) - OTR = 230000000 + 7500000 = 237500000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(1, 'Jok Kulit Premium', 'Interior', 7500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-002 (Toyota Innova Zenix) - OTR = 420000000 + 12000000 = 432000000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(2, 'Body Kit Full', 'Exterior', 12000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-003 (Honda HR-V) - OTR = 380000000 + 6500000 + 4700000 = 391200000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(3, 'Head Unit Android 10"', 'Audio', 6500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(3, 'Kaca Film V-KOOL', 'Exterior', 4700000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-004 (Honda Civic RS) - OTR = 560000000 + 8500000 + 3500000 + 3000000 = 575000000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(4, 'Velg Racing 18"', 'Exterior', 8500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(4, 'Spoiler Belakang', 'Exterior', 3500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(4, 'Ambient Lighting LED', 'Interior', 3000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-005 (Mitsubishi Xpander) - OTR = 300000000 + 6500000 + 4000000 = 310500000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(5, 'Head Unit Android 10"', 'Audio', 6500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(5, 'Subwoofer 12" JBL', 'Audio', 4000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-006 (Mitsubishi Pajero Sport) - OTR = 580000000 + 5000000 + 7500000 + 2500000 + 3000000 = 598000000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(6, 'Peredam Suara Full', 'Audio', 5000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(6, 'Jok Kulit Premium', 'Interior', 7500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(6, 'Dashcam Dual Camera', 'Interior', 2500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(6, 'Ambient Lighting LED', 'Interior', 3000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-007 (Suzuki Ertiga) - OTR = 250000000 + 1200000 + 6800000 = 258000000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(7, 'Karpet Dasar 3D', 'Interior', 1200000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(7, 'Head Unit Android 10"', 'Audio', 6800000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-008 (Suzuki XL7) - OTR = 295000000 + 2800000 + 4500000 + 2900000 = 305200000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(8, 'Roof Rack Aluminium', 'Exterior', 2800000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(8, 'Kaca Film V-KOOL', 'Exterior', 4500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(8, 'Dashcam Dual Camera', 'Interior', 2900000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-009 (Hyundai Creta) - OTR = 340000000 + 3000000 + 8000000 = 351000000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(9, 'Ambient Lighting LED', 'Interior', 3000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(9, 'Velg Racing 18"', 'Exterior', 8000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Vehicle VHC-010 (Hyundai Stargazer) - OTR = 290000000 + 7500000 + 2000000 = 299500000
INSERT INTO vehicle_accessories (vehicle_id, accessories_name, category, price, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
(10, 'Jok Kulit Premium', 'Interior', 7500000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW()),
(10, 'Speaker Split Pioneer', 'Audio', 2000000.00, 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- 7. SALES_TRX (Transaksi Penjualan)
--    FK references: buyer_id, vehicle_id, sales_person_id, promo_discount_id
-- ============================================================
-- Trx 1: Agus beli Pajero Sport (Sold), pakai promo Trade-In Bonus
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260101-001', 'INV-20260101-001', 7, 6, 4, 598000000.00, 5, 15000000.00, 583000000.00, 48, 175000000.00, 408000000.00, 5.5000, 11637500.00, '2026-01-15', 'Credit', 'Sold', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 2: Joko beli Avanza (Pending), pakai promo First Buyer
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260705-002', 'INV-20260705-002', 1, 1, 1, 237500000.00, 4, 3000000.00, 234500000.00, 36, 70000000.00, 164500000.00, 4.7500, 6143750.00, '2026-07-05', 'Credit', 'Pending', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 3: Anisa beli HR-V (Sold), tanpa promo
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260320-003', 'INV-20260320-003', 4, 3, 2, 391200000.00, NULL, 0.00, 391200000.00, 0, 391200000.00, 0.00, 0.0000, 0.00, '2026-03-20', 'Cash', 'Sold', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 4: Denny beli Civic RS (Pending), pakai promo Kemerdekaan
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260810-004', 'INV-20260810-004', 9, 4, 3, 575000000.00, 1, 5000000.00, 570000000.00, 60, 170000000.00, 400000000.00, 5.2500, 10500000.00, '2026-08-10', 'Credit', 'Pending', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 5: Rudi beli XL7 (Reserved), pakai promo Akhir Tahun
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260612-005', 'INV-20260612-005', 3, 8, 5, 305200000.00, 2, 10000000.00, 295200000.00, 48, 90000000.00, 205200000.00, 4.5000, 6605000.00, '2026-06-12', 'Credit', 'Pending', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 6: Maya beli Stargazer (Canceled), tanpa promo
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260415-006', 'INV-20260415-006', 10, 10, 2, 299500000.00, NULL, 0.00, 299500000.00, 36, 90000000.00, 209500000.00, 4.7500, 7797917.00, '2026-04-15', 'Credit', 'Canceled', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 7: Farhan beli Innova Zenix (Sold), tanpa promo, Transfer
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260228-007', 'INV-20260228-007', 5, 2, 1, 432000000.00, NULL, 0.00, 432000000.00, 0, 432000000.00, 0.00, 0.0000, 0.00, '2026-02-28', 'Transfer', 'Sold', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- Trx 8: Putri beli Creta (Pending), pakai promo First Buyer
INSERT INTO sales_trx (trx_code, invoice_no, buyer_id, vehicle_id, sales_person_id, otr_price, promo_discount_id, deduction_amt, final_price, tenor, down_payment_amt, principal_amt, interest_rate, monthly_installment, transaction_dt, payment_method, trx_status, usr_crt, usr_upd, dtm_crt, dtm_upd) VALUES
('TRX-20260725-008', 'INV-20260725-008', 8, 9, 4, 351000000.00, 4, 3000000.00, 348000000.00, 48, 105000000.00, 243000000.00, 5.0000, 7593750.00, '2026-07-25', 'Credit', 'Pending', 'SYSTEM', 'SYSTEM', NOW(), NOW());

-- ============================================================
-- SELESAI - Total Records:
-- accessories       : 15 rows
-- sales_person      :  5 rows
-- promo_discount    :  5 rows
-- buyer             : 10 rows
-- vehicle           : 10 rows
-- vehicle_accessories: 18 rows
-- sales_trx         :  8 rows
-- ============================================================
