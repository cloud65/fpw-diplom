--
-- Файл сгенерирован с помощью SQLiteStudio v3.3.3 в Сб апр 15 16:10:29 2023
--
-- Использованная кодировка текста: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Таблица: app_machinery
DROP TABLE IF EXISTS app_machinery;
CREATE TABLE "app_machinery" ("guid" char(32) NOT NULL PRIMARY KEY, "number" varchar(25) NOT NULL, "motor_number" varchar(25) NOT NULL, "transmission_number" varchar(25) NOT NULL, "bridge_drv_number" varchar(25) NOT NULL, "bridge_ctrl_number" varchar(25) NOT NULL, "contract" varchar(50) NOT NULL, "shipment" date NOT NULL, "consignee" varchar(250) NOT NULL, "address" varchar(512) NOT NULL, "equipment" text NOT NULL, "bridge_ctrl_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "bridge_drv_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "client_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "model_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "motor_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "service_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "transmission_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('c909ccfc048f4cbd91d82e722f52f477', '0017', '7ML1035', '21D0108251', '21D0107997', '21D0093265', '', '2022-03-09', 'ИП Трудников С.В.', 'п. Знаменский, 
Респ. Марий Эл', '1. Гидролинии с БРС;
2. Дополнительеная установка кабины', '88d1921dca3d4cf4aa467a1d66ab9f5f', 'bb0962a5c95b44f0a063d884cac85e13', 2, '67a4f6f21a0d4805ac5f71167ed704d0', '5530cf5346d64bc897f5ff6f4ee353f8', 3, 'a390cfe0a401463b8f5931e585f652cc');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('332edac2a7f74ae8a4dc84767ee8fb77', '0021', '112890', '20H0066', '20H0039', 'KDBAC9685', '', '2022-01-14', 'ООО "ДЭТ №13"', 'с. Акуловка, Московская обл.', 'Стандарт', '1f1d2592abac40c59c0992ff3e9e9558', '8214ba6491b94a41bc41f4cf90b95776', 4, '843633b0b37f493bbaf30c8202b3f2cf', '458776ddf216429cbd89d1fc264c0f4a', 5, 'aa77e0cb35e34bf9b24465e023ccf66f');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('1ddac25a0e9d4b7f82ae02a21c473a59', '0027', '167733', '20H0070', '20H0049', 'KDBAH6583', '', '2022-04-28', 'ООО "Мосгоррест"', 'г. Санкт-Петербург', '1. Кабина с отопителем', '1f1d2592abac40c59c0992ff3e9e9558', '8214ba6491b94a41bc41f4cf90b95776', 6, '843633b0b37f493bbaf30c8202b3f2cf', '458776ddf216429cbd89d1fc264c0f4a', 3, 'aa77e0cb35e34bf9b24465e023ccf66f');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('4ed184318d744391a566eecda595930f', '0032', '2MU2983', '21K0116785', '21K0115910', ' 00070422', '', '2022-05-27', 'ФРП России', 'г. Челябинск, в/ч ', '1. Кабина с отопителем;
2. Медицинская аптечка;
3. Проблесковый маячок;
4. Знак аварийной остановки;
5. Огнетушитель порошковый 5п;', '74be0a1827f34632adc111144d492dcd', '0988f71583e34e81adcdb35d1c91f90f', 4, '29eec4686a8d4dcd96c5b6a9f8776e79', '48882b2d966a4fec9d92e2b66923b1e5', 3, '36cd7c267c30483f8b2085a9da225cdb');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('48bca33f791b4945804f1ea217a25c94', '0003', '2ME0639', '21D0108264', '21D0107988', '0821004', '', '2021-09-30', 'ООО "Ранский ЛПХ"', 'п. Опарино, Кировская обл.', 'Стандарт', '74be0a1827f34632adc111144d492dcd', '0988f71583e34e81adcdb35d1c91f90f', 7, '29eec4686a8d4dcd96c5b6a9f8776e79', '48882b2d966a4fec9d92e2b66923b1e5', 5, '36cd7c267c30483f8b2085a9da225cdb');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('ce4aaae970554285be0e7214813046e1', '0016', '049827', '21D0108256', '21D0108000', '21D0093244', '', '2021-12-20', 'ООО "ГП СПБ"', 'г. Санкт-Петербург', '1. Кабина с отопителем;
2. Каретка смещения + гидролинии;', '88d1921dca3d4cf4aa467a1d66ab9f5f', 'bb0962a5c95b44f0a063d884cac85e13', 8, '5e684bc0070a435686cd2e29750f8226', '6d3b6c201c374a6d853e1245d3ccf871', 3, 'a390cfe0a401463b8f5931e585f652cc');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('b24d9bcc3fe94d909a1edf813121f2ec', '0039', '000015', '22B0001', '22B3364', '00010622', '', '2022-07-18', 'ФСН России', 'г. Москва', '1. Высота подъёма вил - 4 500мм;
2. Кабина с отопителем;
3. Шины суперэластик;
4. Прибор комбинированный КД8235;', '88d1921dca3d4cf4aa467a1d66ab9f5f', '3b841a5cf683450fa333b961bad7db6c', 9, 'f214357a4ef148b79cd52d70647ef1e4', 'ee6aa8d45194429696a4401d7f8ee241', 3, 'c46470882ef047aa842696a3588e14f4');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('70aaa313113e447a9ce4f601a7b66896', '0045', '000003', '22B0008', '22B3370', '00200622', '', '2022-08-30', 'АО Зандер', 'г. Краснодар', '1. Кабина с отопителем;
2. Каретка бокового смещения 1050мм;n\3. Блокировка реверса хода;
4. Высота подъёма вил - 4800мм;
5. Прибор комбинированный КД8235;', '88d1921dca3d4cf4aa467a1d66ab9f5f', '3b841a5cf683450fa333b961bad7db6c', 10, 'acd417ad24724dc9b5928f71ace0b4a2', 'ee6aa8d45194429696a4401d7f8ee241', 3, 'c46470882ef047aa842696a3588e14f4');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('d6dbf480d32f438a80031bd59565adae', '0019', '112893', '20H0069', '20H0041', 'KDBAC9687', '', '2022-01-28', 'АО "Т-Минус"', 'г. Первоуральск, 
Свердловской обл.', '1. Высота подъёма вил - 4 500мм;
2. Центральный цилиндр подъёма ;
3. Кабина с отопителем;
4. Стрела безблочная Г-образная;', '1f1d2592abac40c59c0992ff3e9e9558', '8214ba6491b94a41bc41f4cf90b95776', 4, '843633b0b37f493bbaf30c8202b3f2cf', '458776ddf216429cbd89d1fc264c0f4a', 11, 'aa77e0cb35e34bf9b24465e023ccf66f');
INSERT INTO app_machinery (guid, number, motor_number, transmission_number, bridge_drv_number, bridge_ctrl_number, contract, shipment, consignee, address, equipment, bridge_ctrl_id, bridge_drv_id, client_id, model_id, motor_id, service_id, transmission_id) VALUES ('fc7bf08396a546dc8d415b4a3d611cfc', '0008', '2ME0753', '21D0108269', '21D0108011', '0821005', '', '2021-09-30', 'ООО "ГП Краснодар"', 'г. Краснодар', '1. Кабина с отопителем;', '74be0a1827f34632adc111144d492dcd', '0988f71583e34e81adcdb35d1c91f90f', 8, '29eec4686a8d4dcd96c5b6a9f8776e79', '48882b2d966a4fec9d92e2b66923b1e5', 11, '36cd7c267c30483f8b2085a9da225cdb');

-- Таблица: app_maintenance
DROP TABLE IF EXISTS app_maintenance;
CREATE TABLE "app_maintenance" ("guid" char(32) NOT NULL PRIMARY KEY, "date" date NOT NULL, "mileage" integer NOT NULL, "order_number" varchar(15) NOT NULL, "order_date" date NOT NULL, "form_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "machine_id" char(32) NOT NULL REFERENCES "app_machinery" ("guid") DEFERRABLE INITIALLY DEFERRED, "organization_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "service_id" integer NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('1aa1de54d7914835b438138b16430b88', '2021-10-05', 55, '#2022-32КЕ5СИЛ', '2021-10-03', 'c15f6ed764d94626b8e48e37c692edc7', '48bca33f791b4945804f1ea217a25c94', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('378ac23662bf4250b5dc9ae243bc834c', '2021-10-05', 54, '#2022-97КЕ18СИЛ', '2021-10-03', 'c15f6ed764d94626b8e48e37c692edc7', 'fc7bf08396a546dc8d415b4a3d611cfc', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('ea86d3031e0046839087c81a59a6490b', '2021-11-02', 220, '#2022-81КЕ66СИЛ', '2021-10-31', '83ed107e7a9448d8b37237f739b76761', '48bca33f791b4945804f1ea217a25c94', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('a3f636336be74dacbc2002928c0c99b2', '2021-11-02', 225, '#2022-54КЕ17СИЛ', '2021-10-31', '83ed107e7a9448d8b37237f739b76761', 'fc7bf08396a546dc8d415b4a3d611cfc', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('cbf381e86802459da2d78fc035865fb4', '2021-12-10', 450, '#2022-72КЕ68СИЛ', '2021-12-08', '586dd08a880340d5b14f1f2526d8df1e', '48bca33f791b4945804f1ea217a25c94', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('32466f9a37b94b25b2a817ee32bea187', '2021-12-10', 422, '#2022-97КЕ11СИЛ', '2021-12-08', '586dd08a880340d5b14f1f2526d8df1e', 'fc7bf08396a546dc8d415b4a3d611cfc', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('89e8cb71097f400fa2342ce01e293a0a', '2021-12-25', 53, '#2022-77КЕ66СИЛ', '2021-12-23', 'c15f6ed764d94626b8e48e37c692edc7', 'ce4aaae970554285be0e7214813046e1', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('2a48ac36a71e4e97940d4197281208be', '2022-01-19', 52, '#2022-27КЕ67СИЛ', '2022-01-17', 'c15f6ed764d94626b8e48e37c692edc7', '332edac2a7f74ae8a4dc84767ee8fb77', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('0d3a5887431c4b59bc99b32d1e96e582', '2022-01-22', 221, '#2022-96КЕ82СИЛ', '2022-01-20', '83ed107e7a9448d8b37237f739b76761', 'ce4aaae970554285be0e7214813046e1', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('fbb16ae910bd414d88dae9a6d3313797', '2022-02-02', 55, '#2022-6КЕ38СИЛ', '2022-01-31', 'c15f6ed764d94626b8e48e37c692edc7', 'd6dbf480d32f438a80031bd59565adae', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('629ecbc417a14ca99c828bdee0563e6f', '2022-02-13', 1054, '#2022-56КЕ54СИЛ', '2022-02-11', '9740de3fd73c4b2aa3dfcc14f36f91d7', '48bca33f791b4945804f1ea217a25c94', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('92bec90ed80046ca90b2ce8a39117a74', '2022-02-13', 1026, '#2022-88КЕ66СИЛ', '2022-02-11', '9740de3fd73c4b2aa3dfcc14f36f91d7', 'fc7bf08396a546dc8d415b4a3d611cfc', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('f35d1a946a1c4b1aaea6fea87e80a36c', '2022-02-16', 221, '#2022-5КЕ78СИЛ', '2022-02-14', '83ed107e7a9448d8b37237f739b76761', '332edac2a7f74ae8a4dc84767ee8fb77', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('95f8d165a8c1400699cddb6e31dbee60', '2022-03-01', 407, '#2022-16КЕ6СИЛ', '2022-02-27', '586dd08a880340d5b14f1f2526d8df1e', 'ce4aaae970554285be0e7214813046e1', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('268e20fd712348cfb1f152f24ebcba59', '2022-03-02', 219, '#2022-38КЕ68СИЛ', '2022-02-28', '83ed107e7a9448d8b37237f739b76761', 'd6dbf480d32f438a80031bd59565adae', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('6caf896e8d4c4b698b8588d3ff4c5273', '2022-03-14', 53, '#2022-70КЕ87СИЛ', '2022-03-12', 'c15f6ed764d94626b8e48e37c692edc7', 'c909ccfc048f4cbd91d82e722f52f477', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('39619a945cf84df4ba496c3a03ceff8e', '2022-03-26', 403, '#2022-42КЕ6СИЛ', '2022-03-24', '586dd08a880340d5b14f1f2526d8df1e', '332edac2a7f74ae8a4dc84767ee8fb77', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('09d162d68e2d4fe0be54db3694789246', '2022-04-09', 405, '#2022-34КЕ62СИЛ', '2022-04-07', '586dd08a880340d5b14f1f2526d8df1e', 'd6dbf480d32f438a80031bd59565adae', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('4b4742d002fc416d823cd55ea108c115', '2022-04-11', 210, '#2022-16КЕ87СИЛ', '2022-04-09', '83ed107e7a9448d8b37237f739b76761', 'c909ccfc048f4cbd91d82e722f52f477', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('5eb31966b7fa42069464e87330bf0521', '2022-05-03', 52, '#2022-21КЕ82СИЛ', '2022-05-01', 'c15f6ed764d94626b8e48e37c692edc7', '1ddac25a0e9d4b7f82ae02a21c473a59', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('d0d1ddfd84714e1ebf9e6f7711d1b09f', '2022-05-05', 1011, '#2022-22КЕ87СИЛ', '2022-05-03', '9740de3fd73c4b2aa3dfcc14f36f91d7', 'ce4aaae970554285be0e7214813046e1', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('652d86c6071d43d98d8a09b9d4974c49', '2022-05-19', 405, '#2022-77КЕ23СИЛ', '2022-05-17', '586dd08a880340d5b14f1f2526d8df1e', 'c909ccfc048f4cbd91d82e722f52f477', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('776d6907662646dcb3690e240c44d791', '2022-05-31', 214, '#2022-31КЕ19СИЛ', '2022-05-29', '83ed107e7a9448d8b37237f739b76761', '1ddac25a0e9d4b7f82ae02a21c473a59', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('2310b12297554deaad91d66e9de97adc', '2022-06-01', 55, '#2022-10КЕ19СИЛ', '2022-05-30', 'c15f6ed764d94626b8e48e37c692edc7', '4ed184318d744391a566eecda595930f', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('e3ca3e68c4944877a116003d92ed00b1', '2022-06-29', 216, '#2022-92КЕ16СИЛ', '2022-06-27', '83ed107e7a9448d8b37237f739b76761', '4ed184318d744391a566eecda595930f', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('f7bc8a8c44fa44e69390187ff7c82684', '2022-07-08', 441, '#2022-84КЕ73СИЛ', '2022-07-06', '586dd08a880340d5b14f1f2526d8df1e', '1ddac25a0e9d4b7f82ae02a21c473a59', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('3a60466ceb1447d793cd32177bbd22b5', '2022-07-23', 54, '#2022-72КЕ89СИЛ', '2022-07-21', 'c15f6ed764d94626b8e48e37c692edc7', 'b24d9bcc3fe94d909a1edf813121f2ec', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('68d020379c18416889962f661fbc57c5', '2022-08-06', 434, '#2022-55КЕ37СИЛ', '2022-08-04', '586dd08a880340d5b14f1f2526d8df1e', '4ed184318d744391a566eecda595930f', 'ef602c5e6d724f6aad785e42763a20ef', 5);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('badefaa37938453bb1fed2f78b0979bd', '2022-08-20', 206, '#2022-26КЕ57СИЛ', '2022-08-18', '83ed107e7a9448d8b37237f739b76761', 'b24d9bcc3fe94d909a1edf813121f2ec', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('f5d9b0d0d8c04acaa782d0fe91275645', '2022-09-01', 2053, '#2022-99КЕ12СИЛ', '2022-08-30', 'c83d3daf00104452b31c0b61d5efcf13', '48bca33f791b4945804f1ea217a25c94', '06f32b44b05c497da6578d8e927486e8', 3);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('3563b8e76e9a48da8166402d43ea36df', '2022-09-01', 2025, '#2022-50КЕ10СИЛ', '2022-08-30', 'c83d3daf00104452b31c0b61d5efcf13', 'fc7bf08396a546dc8d415b4a3d611cfc', 'c62cc7e4105645eab0df06ccb11f6d9d', 11);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('44a65d365f144f25843fb815f884b624', '2022-09-04', 53, '#2022-58КЕ94СИЛ', '2022-09-02', 'c15f6ed764d94626b8e48e37c692edc7', '70aaa313113e447a9ce4f601a7b66896', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('da3c875d2f83406285ace6aaffc7e5bd', '2022-09-27', 407, '#2022-54КЕ66СИЛ', '2022-09-25', '586dd08a880340d5b14f1f2526d8df1e', 'b24d9bcc3fe94d909a1edf813121f2ec', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('d6157f655c8942e1b91001647289f14a', '2022-10-02', 202, '#2022-98КЕ93СИЛ', '2022-09-30', '83ed107e7a9448d8b37237f739b76761', '70aaa313113e447a9ce4f601a7b66896', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('913a9a05969d4cb2ad6fdd51c1df2b38', '2022-11-09', 402, '#2022-82КЕ69СИЛ', '2022-11-07', '586dd08a880340d5b14f1f2526d8df1e', '70aaa313113e447a9ce4f601a7b66896', '5a9351860e784d6aa743d32e3fb0bb71', NULL);
INSERT INTO app_maintenance (guid, date, mileage, order_number, order_date, form_id, machine_id, organization_id, service_id) VALUES ('8cdfa4b2d87340009b973cb6604b0c53', '2022-11-21', 2010, '#2022-78КЕ54СИЛ', '2022-11-19', 'c83d3daf00104452b31c0b61d5efcf13', 'ce4aaae970554285be0e7214813046e1', '5a9351860e784d6aa743d32e3fb0bb71', NULL);

-- Таблица: app_reclamation
DROP TABLE IF EXISTS app_reclamation;
CREATE TABLE "app_reclamation" ("guid" char(32) NOT NULL PRIMARY KEY, "date" date NOT NULL, "mileage" integer NOT NULL, "description" text NOT NULL, "repair_units" text NOT NULL, "repair_date" date NOT NULL, "downtime" integer NOT NULL, "machine_id" char(32) NOT NULL REFERENCES "app_machinery" ("guid") DEFERRABLE INITIALLY DEFERRED, "recovery_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "unit_id" char(32) NOT NULL REFERENCES "app_reference" ("guid") DEFERRABLE INITIALLY DEFERRED, "service_id" integer NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('c1b7a7a8d2b94f8388eb21e014acd668', '2022-04-01', 123, 'повышенный шум', 'прокладки, прочие материалы', '2022-04-08', 7, 'c909ccfc048f4cbd91d82e722f52f477', 'da249023ffff4f529ae25481a241662b', 'ce6eafa3a3fd43b4be704b7af42523aa', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('dd9786faf7c941c1b07e89c1f9d4b87b', '2022-04-02', 129, 'проскальзывание', 'шестерня ведущая', '2022-04-07', 5, 'c909ccfc048f4cbd91d82e722f52f477', 'da249023ffff4f529ae25481a241662b', '7f2492862f7b412c8828515204e67ca8', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('c18edbe87cea4d6c87b683b48f229d70', '2022-03-30', 112, 'блокировка колес', '', '2022-03-31', 1, 'c909ccfc048f4cbd91d82e722f52f477', '05cf8f1390c24fb498e71b3e64a429a1', '7f2492862f7b412c8828515204e67ca8', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('4b2df46ae63542cca4f5f97f6cbad6e5', '2022-02-06', 123, 'блокировка колес', 'колесо', '2022-02-11', 5, '332edac2a7f74ae8a4dc84767ee8fb77', 'da249023ffff4f529ae25481a241662b', 'cca9e85f4dd34a7f8534e8f7f68d254b', 5);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('4538cf8e748c4f9ba1aa1fd9419a758f', '2022-05-05', 38, 'разрушение подшипника', 'подшипник', '2022-05-07', 2, '1ddac25a0e9d4b7f82ae02a21c473a59', 'da249023ffff4f529ae25481a241662b', '507a9ecf6bef48a8939ea1d60ffbff2f', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('2bc0933a7576410e9771c7f736096d10', '2022-06-17', 112, 'разрушение подшипника', 'подшипник', '2022-06-25', 8, '4ed184318d744391a566eecda595930f', 'da249023ffff4f529ae25481a241662b', '507a9ecf6bef48a8939ea1d60ffbff2f', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('5da8738d8baa4cf1a57814178975e141', '2021-10-26', 142, 'разрушение подшипника', 'подшипник', '2021-11-02', 7, '48bca33f791b4945804f1ea217a25c94', 'da249023ffff4f529ae25481a241662b', '507a9ecf6bef48a8939ea1d60ffbff2f', 5);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('e0e0e2c77ad84dfeaa0a3b89de4fc8c0', '2021-12-31', 61, 'разрушение верхнего ролика', 'ролик', '2022-01-05', 5, 'ce4aaae970554285be0e7214813046e1', 'da249023ffff4f529ae25481a241662b', '8f6404bc289f465c8fbe6004f304d80a', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('3795570552844e88ba21182829cd3c19', '2022-07-28', 56, 'течь масла', 'прокладки', '2022-08-01', 4, 'b24d9bcc3fe94d909a1edf813121f2ec', 'da249023ffff4f529ae25481a241662b', 'ce6eafa3a3fd43b4be704b7af42523aa', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('aed4da4fa1b34dbea15e76a82bab6d34', '2022-09-07', 47, 'течь масла', 'прокладки', '2022-09-09', 2, '70aaa313113e447a9ce4f601a7b66896', 'da249023ffff4f529ae25481a241662b', 'bc001493f8f949e6a6b8ed786dd793b7', 3);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('a7154c01f71e4916a0682e65ee76ee81', '2022-02-01', 22, 'не заводится', '', '2022-02-10', 9, 'd6dbf480d32f438a80031bd59565adae', '05cf8f1390c24fb498e71b3e64a429a1', 'ce6eafa3a3fd43b4be704b7af42523aa', 11);
INSERT INTO app_reclamation (guid, date, mileage, description, repair_units, repair_date, downtime, machine_id, recovery_id, unit_id, service_id) VALUES ('a2ae975f643b452a8619fed0a901ae91', '2021-10-11', 59, 'течь масла', 'прокладки', '2021-10-21', 10, 'fc7bf08396a546dc8d415b4a3d611cfc', 'da249023ffff4f529ae25481a241662b', 'ce6eafa3a3fd43b4be704b7af42523aa', 11);

-- Таблица: app_reference
DROP TABLE IF EXISTS app_reference;
CREATE TABLE "app_reference" ("guid" char(32) NOT NULL PRIMARY KEY, "section" integer NOT NULL, "name" varchar(250) NOT NULL, "description" text NULL);
INSERT INTO app_reference (guid, section, name, description) VALUES ('67a4f6f21a0d4805ac5f71167ed704d0', 1, 'ПД1,5', 'Подробное описание ПД1,5');
INSERT INTO app_reference (guid, section, name, description) VALUES ('5530cf5346d64bc897f5ff6f4ee353f8', 2, 'Kubota D1803', 'Подробное описание Kubota D1803');
INSERT INTO app_reference (guid, section, name, description) VALUES ('a390cfe0a401463b8f5931e585f652cc', 3, '10VA-00105', 'Подробное описание 10VA-00105');
INSERT INTO app_reference (guid, section, name, description) VALUES ('bb0962a5c95b44f0a063d884cac85e13', 4, '20VA-00101', 'Подробное описание 20VA-00101');
INSERT INTO app_reference (guid, section, name, description) VALUES ('88d1921dca3d4cf4aa467a1d66ab9f5f', 5, 'VS20-00001', 'Подробное описание VS20-00001');
INSERT INTO app_reference (guid, section, name, description) VALUES ('843633b0b37f493bbaf30c8202b3f2cf', 1, 'ПД5,0', 'Подробное описание ПД5,0');
INSERT INTO app_reference (guid, section, name, description) VALUES ('458776ddf216429cbd89d1fc264c0f4a', 2, 'ММЗ Д-243', 'Подробное описание ММЗ Д-243');
INSERT INTO app_reference (guid, section, name, description) VALUES ('aa77e0cb35e34bf9b24465e023ccf66f', 3, 'HF50-VP020', 'Подробное описание HF50-VP020');
INSERT INTO app_reference (guid, section, name, description) VALUES ('8214ba6491b94a41bc41f4cf90b95776', 4, 'HA50-VP010', 'Подробное описание HA50-VP010');
INSERT INTO app_reference (guid, section, name, description) VALUES ('1f1d2592abac40c59c0992ff3e9e9558', 5, 'B350655A', 'Подробное описание B350655A');
INSERT INTO app_reference (guid, section, name, description) VALUES ('29eec4686a8d4dcd96c5b6a9f8776e79', 1, 'ПД3,0', 'Подробное описание ПД3,0');
INSERT INTO app_reference (guid, section, name, description) VALUES ('48882b2d966a4fec9d92e2b66923b1e5', 2, 'Kubota V3300', 'Подробное описание Kubota V3300');
INSERT INTO app_reference (guid, section, name, description) VALUES ('36cd7c267c30483f8b2085a9da225cdb', 3, '10VB-00106', 'Подробное описание 10VB-00106');
INSERT INTO app_reference (guid, section, name, description) VALUES ('0988f71583e34e81adcdb35d1c91f90f', 4, '20VB-00102', 'Подробное описание 20VB-00102');
INSERT INTO app_reference (guid, section, name, description) VALUES ('74be0a1827f34632adc111144d492dcd', 5, 'VS30-00001', 'Подробное описание VS30-00001');
INSERT INTO app_reference (guid, section, name, description) VALUES ('5e684bc0070a435686cd2e29750f8226', 1, 'ПГ1,5', 'Подробное описание ПГ1,5');
INSERT INTO app_reference (guid, section, name, description) VALUES ('6d3b6c201c374a6d853e1245d3ccf871', 2, 'Nissan K21', 'Подробное описание Nissan K21');
INSERT INTO app_reference (guid, section, name, description) VALUES ('f214357a4ef148b79cd52d70647ef1e4', 1, 'ПД2,0', 'Подробное описание ПД2,0');
INSERT INTO app_reference (guid, section, name, description) VALUES ('ee6aa8d45194429696a4401d7f8ee241', 2, 'MMZ-4D', 'Подробное описание MMZ-4D');
INSERT INTO app_reference (guid, section, name, description) VALUES ('c46470882ef047aa842696a3588e14f4', 3, 'HF30-VP010', 'Подробное описание HF30-VP010');
INSERT INTO app_reference (guid, section, name, description) VALUES ('3b841a5cf683450fa333b961bad7db6c', 4, 'HA30-02020', 'Подробное описание HA30-02020');
INSERT INTO app_reference (guid, section, name, description) VALUES ('acd417ad24724dc9b5928f71ace0b4a2', 1, 'ПД2,5', 'Подробное описание ПД2,5');
INSERT INTO app_reference (guid, section, name, description) VALUES ('c15f6ed764d94626b8e48e37c692edc7', 6, 'ТО-0 (50 м/час)', 'Подробное описание ТО-0 (50 м/час)');
INSERT INTO app_reference (guid, section, name, description) VALUES ('06f32b44b05c497da6578d8e927486e8', 9, 'ООО Промышленная техника', 'Подробное описание ООО Промышленная техника');
INSERT INTO app_reference (guid, section, name, description) VALUES ('c62cc7e4105645eab0df06ccb11f6d9d', 9, 'ООО ФНС', 'Подробное описание ООО ФНС');
INSERT INTO app_reference (guid, section, name, description) VALUES ('83ed107e7a9448d8b37237f739b76761', 6, 'ТО-1 (200 м/час)', 'Подробное описание ТО-1 (200 м/час)');
INSERT INTO app_reference (guid, section, name, description) VALUES ('586dd08a880340d5b14f1f2526d8df1e', 6, 'ТО-2 (400 м/час)', 'Подробное описание ТО-2 (400 м/час)');
INSERT INTO app_reference (guid, section, name, description) VALUES ('ef602c5e6d724f6aad785e42763a20ef', 9, 'ООО Силант', 'Подробное описание ООО Силант');
INSERT INTO app_reference (guid, section, name, description) VALUES ('9740de3fd73c4b2aa3dfcc14f36f91d7', 6, 'ТО-4 (1000м/час)', 'Подробное описание ТО-4 (1000м/час)');
INSERT INTO app_reference (guid, section, name, description) VALUES ('5a9351860e784d6aa743d32e3fb0bb71', 9, 'самостоятельно', 'Подробное описание самостоятельно');
INSERT INTO app_reference (guid, section, name, description) VALUES ('c83d3daf00104452b31c0b61d5efcf13', 6, 'ТО-5 (2000м/час)', 'Подробное описание ТО-5 (2000м/час)');
INSERT INTO app_reference (guid, section, name, description) VALUES ('ce6eafa3a3fd43b4be704b7af42523aa', 7, 'Двигатель', 'Подробное описание Двигатель');
INSERT INTO app_reference (guid, section, name, description) VALUES ('da249023ffff4f529ae25481a241662b', 8, 'Ремонт узла', 'Подробное описание Ремонт узла');
INSERT INTO app_reference (guid, section, name, description) VALUES ('7f2492862f7b412c8828515204e67ca8', 7, 'Трансмиссия', 'Подробное описание Трансмиссия');
INSERT INTO app_reference (guid, section, name, description) VALUES ('05cf8f1390c24fb498e71b3e64a429a1', 8, 'Замена узла', 'Подробное описание Замена узла');
INSERT INTO app_reference (guid, section, name, description) VALUES ('cca9e85f4dd34a7f8534e8f7f68d254b', 7, 'Ведущий мост', 'Подробное описание Ведущий мост');
INSERT INTO app_reference (guid, section, name, description) VALUES ('507a9ecf6bef48a8939ea1d60ffbff2f', 7, 'Управляемый мост', 'Подробное описание Управляемый мост');
INSERT INTO app_reference (guid, section, name, description) VALUES ('8f6404bc289f465c8fbe6004f304d80a', 7, 'Подъёмное устройство', 'Подробное описание Подъёмное устройство');
INSERT INTO app_reference (guid, section, name, description) VALUES ('bc001493f8f949e6a6b8ed786dd793b7', 7, 'Гидросистема', 'Подробное описание Гидросистема');

-- Таблица: auth_user
DROP TABLE IF EXISTS auth_user;
CREATE TABLE "auth_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "username" varchar(150) NOT NULL UNIQUE, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" bool NOT NULL, "is_active" bool NOT NULL, "date_joined" datetime NOT NULL, "first_name" varchar(150) NOT NULL);
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (1, 'pbkdf2_sha256$600000$naFaZQOJTizPDskRogkDHq$RSImcNt3HPTRUdshmNTIY/Qi+4X+BTlaUXrcxx55cZI=', '2023-04-15 05:04:44.389890', 1, 'admin', '', 'admin@example.com', 1, 1, '2023-04-09 05:55:45.715058', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (2, '', NULL, 0, 'ИП Трудников С.В.', '', '', 0, 1, '2023-04-09 05:56:03.616162', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (3, '', NULL, 0, 'ООО Промышленная техника', '', '', 0, 1, '2023-04-09 05:56:03.631795', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (4, '', NULL, 0, 'ООО "ФПК21"', '', '', 0, 1, '2023-04-09 05:56:03.772422', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (5, '', NULL, 0, 'ООО Силант', '', '', 0, 1, '2023-04-09 05:56:03.788048', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (6, '', NULL, 0, 'ООО "МНС77"', '', '', 0, 1, '2023-04-09 05:56:03.834925', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (7, '', NULL, 0, 'ООО "Ранский ЛПХ"', '', '', 0, 1, '2023-04-09 05:56:03.975561', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (8, '', NULL, 0, 'ООО "Комплект-Поставка"', '', '', 0, 1, '2023-04-09 05:56:04.053690', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (9, '', NULL, 0, 'ООО "РМК"', '', '', 0, 1, '2023-04-09 05:56:04.163074', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (10, '', NULL, 0, 'АО "Зандер"', '', '', 0, 1, '2023-04-09 05:56:04.209951', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (11, '', NULL, 0, 'ООО ФНС', '', '', 0, 1, '2023-04-09 05:56:04.272464', '');
INSERT INTO auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (12, 'pbkdf2_sha256$600000$Q1duUJkwB3jXFrN0cuDPTH$i9WbH6Yj2xp+pxdR/72m7+m+SZmvFp3NtKn85RQQZrk=', NULL, 0, 'manager', '', '', 0, 1, '2023-04-09 06:09:40', '');

-- Индекс: app_machinery_bridge_ctrl_id_d3791692
DROP INDEX IF EXISTS app_machinery_bridge_ctrl_id_d3791692;
CREATE INDEX "app_machinery_bridge_ctrl_id_d3791692" ON "app_machinery" ("bridge_ctrl_id");

-- Индекс: app_machinery_bridge_drv_id_fa168b83
DROP INDEX IF EXISTS app_machinery_bridge_drv_id_fa168b83;
CREATE INDEX "app_machinery_bridge_drv_id_fa168b83" ON "app_machinery" ("bridge_drv_id");

-- Индекс: app_machinery_client_id_5badccc6
DROP INDEX IF EXISTS app_machinery_client_id_5badccc6;
CREATE INDEX "app_machinery_client_id_5badccc6" ON "app_machinery" ("client_id");

-- Индекс: app_machinery_model_id_66d019f8
DROP INDEX IF EXISTS app_machinery_model_id_66d019f8;
CREATE INDEX "app_machinery_model_id_66d019f8" ON "app_machinery" ("model_id");

-- Индекс: app_machinery_motor_id_5e7bacf5
DROP INDEX IF EXISTS app_machinery_motor_id_5e7bacf5;
CREATE INDEX "app_machinery_motor_id_5e7bacf5" ON "app_machinery" ("motor_id");

-- Индекс: app_machinery_service_id_6475d04b
DROP INDEX IF EXISTS app_machinery_service_id_6475d04b;
CREATE INDEX "app_machinery_service_id_6475d04b" ON "app_machinery" ("service_id");

-- Индекс: app_machinery_transmission_id_31fb7847
DROP INDEX IF EXISTS app_machinery_transmission_id_31fb7847;
CREATE INDEX "app_machinery_transmission_id_31fb7847" ON "app_machinery" ("transmission_id");

-- Индекс: app_maintenance_form_id_d2426353
DROP INDEX IF EXISTS app_maintenance_form_id_d2426353;
CREATE INDEX "app_maintenance_form_id_d2426353" ON "app_maintenance" ("form_id");

-- Индекс: app_maintenance_machine_id_c5279938
DROP INDEX IF EXISTS app_maintenance_machine_id_c5279938;
CREATE INDEX "app_maintenance_machine_id_c5279938" ON "app_maintenance" ("machine_id");

-- Индекс: app_maintenance_organization_id_bc1dd3d2
DROP INDEX IF EXISTS app_maintenance_organization_id_bc1dd3d2;
CREATE INDEX "app_maintenance_organization_id_bc1dd3d2" ON "app_maintenance" ("organization_id");

-- Индекс: app_maintenance_service_id_9d269776
DROP INDEX IF EXISTS app_maintenance_service_id_9d269776;
CREATE INDEX "app_maintenance_service_id_9d269776" ON "app_maintenance" ("service_id");

-- Индекс: app_reclamation_machine_id_040817c5
DROP INDEX IF EXISTS app_reclamation_machine_id_040817c5;
CREATE INDEX "app_reclamation_machine_id_040817c5" ON "app_reclamation" ("machine_id");

-- Индекс: app_reclamation_recovery_id_d12383da
DROP INDEX IF EXISTS app_reclamation_recovery_id_d12383da;
CREATE INDEX "app_reclamation_recovery_id_d12383da" ON "app_reclamation" ("recovery_id");

-- Индекс: app_reclamation_service_id_4c526944
DROP INDEX IF EXISTS app_reclamation_service_id_4c526944;
CREATE INDEX "app_reclamation_service_id_4c526944" ON "app_reclamation" ("service_id");

-- Индекс: app_reclamation_unit_id_2ff65144
DROP INDEX IF EXISTS app_reclamation_unit_id_2ff65144;
CREATE INDEX "app_reclamation_unit_id_2ff65144" ON "app_reclamation" ("unit_id");

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
